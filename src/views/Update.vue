<template>
  <div class=" flex items-center justify-center bg-gray-100">
        <div class="loader mt-40" v-if="load"></div>
    <div v-else-if="erreur">
      {{ erreur }}
    </div>
    <form v-else class="flex flex-col min-h-[50vh] px-8 my-15 w-[60vw] shadow-lg rounded-lg bg-white " @submit.prevent="update"
      method="post">
       <h2 class="text-4xl font-bold pt-6 pb-4">Update</h2>

      <input
        class=" my-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="title" placeholder="Titre" required />
      <textarea
        class="  my-2  appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="content" placeholder="Contenu" rows="8"  required></textarea>
      <button class=" my-2 py-4  mb-10 px-2 bg-blue-600 hover:bg-blue-700 duration-200 text-white cursor-pointer" type="submit">Enregistrer</button>
    </form>
  </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import { usePostIt } from "@/store/postIt";
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
const store = usePostIt();
const load=ref(true)
const erreur=ref(null)
const title = ref('')
const content = ref('')
const date = ref('')

onMounted(async () => {
  const postIt = await store.getOnePostIt(route.params._id);
  if (postIt.success) {
    console.log("Post-it récupéré :" + postIt.data)
    title.value = postIt.data.title
    content.value = postIt.data.content[0]
    date.value = postIt.data.updatedAt
    load.value = false
  } else {
    console.log("Échec :", postIt.error);
    erreur.value = "Impossible de charger ce Post-It.";
    load.value = false;

  }
});
function update() {
  // console.log(route.params._id);
  // console.log(c.value);

  store.updatePostIt(route.params._id, { title: title.value, content: content.value })

}
</script>
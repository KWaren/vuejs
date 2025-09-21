<template>
  <div class=" flex items-center justify-center">
    <div v-if="load">En chargement</div>
    <div v-else-if="erreur">
      {{ erreur }}
    </div>
    <form v-else class="flex flex-col min-h-[50vh] px-8 my-15 w-[40vw] shadow-lg rounded-lg " @submit.prevent="update"
      method="post">
      <input
        class=" my-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="title" placeholder="Titre" required />
      <textarea
        class="  my-2  appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="content" placeholder="Contenu" required></textarea>
      <button class=" my-2 py-4 px-2 bg-blue-600 text-white" type="submit">Enregistrer</button>
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
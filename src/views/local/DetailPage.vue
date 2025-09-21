<template>
  <div class=" flex items-center justify-center">
    <div class="loader mt-40" v-if="load"></div>
    <div v-else-if="erreur">
      {{ erreur }}
    </div>
    <div v-else class="flex flex-col flex-wrap bg-red-100 min-h-[60vh] my-15 w-[80vw] p-8 shadow rounded-xl ">
      <div class="flex w-full justify-center">
        <h2 class="break-normal line-clamp-8 text-3xl font-bold ">{{ title }}</h2>
      </div>
      <p>{{ content }}</p>
      <p>Date: {{ date }}</p>
      <RouterLink :to="{ name: 'local.notes.update', params: { _id: route.params._id } }" class="bg-green-200 w-20">
        update
      </RouterLink>
      <button @click="deleteOne" class="bg-red-200 w-20">
        Delete
      </button>
    </div>
  </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import { usePostIt } from "@/store/localPostIt";
import { useRouter, useRoute, RouterLink } from 'vue-router';
const route = useRoute()
const router = useRouter()
const store = usePostIt();
const load = ref(true)
const erreur = ref(null)
const title = ref('')
const content = ref('')
const date = ref('')
// console.log(route.params._id);

onMounted(() => {
  const postIt = store.getOnePostIt(route.params._id)
  console.log(postIt.success);

  if (postIt.success) {
    console.log("Post-it récupéré :" + postIt.data)
    title.value = postIt.data.title
    content.value = postIt.data.content
    date.value = postIt.data.updatedAt
    load.value = false
  } else {
    console.log("Échec :", postIt.error);
    erreur.value = "Impossible de charger ce Post-It.";
    load.value = false;

  }
})
function deleteOne() {
  store.deleteOne(route.params._id);

}
</script>
<template>
  <div class=" flex items-center justify-center bg-gray-100">


    <form class="flex flex-col min-h-[50vh] px-8 py-6 my-15 w-[70vw] shadow-lg rounded-lg bg-white" @submit.prevent="add"
      method="post">
      <h2 class="text-4xl font-bold text-blue-900 pb-1">Créer un post it</h2>
      <div v-for="erreur in erreurs" class="w-full my-2 flex justify-center ">
        <p class="w-[80%] py-2 text-center border text-red-600 rounded-lg bg-red-300 ">{{ erreur }}</p>
      </div>
      <input
        class=" my-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="title" placeholder="Titre" required />
      <textarea
        class="  my-2  appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="content" placeholder="Contenu" rows="8" required></textarea>
      <button class=" my-2 py-4 px-2 bg-blue-600 text-white hover:bg-blue-700 duration-200 cursor-pointer" type="submit">Enregistrer</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const title = ref('')
const content = ref('')
const erreurs=ref([])

import { usePostIt } from "@/store/postIt";
import { useRouter } from 'vue-router';
const router = useRouter();
const store = usePostIt();
function add() {
  if (title.value === null || title.value.trim() == "") {
    erreurs.value.push("Titre incorrect");

  }
  if (content.value === null || content.value.trim() == "") {
    erreurs.value.push("Description incorrect");
    console.log(erreurs.value);
  }
  if (erreurs.value.length === 0) {

    store.addPostIt({ title: title.value, content: content.value });
  }
  else {
    setTimeout(removeError, 5000);
    function removeError() {
      erreurs.value = []
    }
  }

}
</script>

<template>
  <div class=" flex items-center justify-center bg-gray-100">


    <form class="flex flex-col min-h-[50vh] px-8 my-15 w-[70vw] shadow-lg rounded-lg bg-white" @submit.prevent="add"
      method="post">
       <h2 class="text-4xl font-bold pt-2 pb-4">Create</h2>

      <input
        class=" my-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="title" placeholder="Titre" required />
      <textarea
        class="  my-2  appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="content" placeholder="Contenu" rows="8" required></textarea>
      <button class=" my-2 py-4 px-2 bg-blue-600 text-white" type="submit">Enregistrer</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const title = ref('')
const content = ref('')

import { usePostIt } from "@/store/postIt";
import { useRouter } from 'vue-router';
const router = useRouter();
const store = usePostIt();
function add() {
  store.addPostIt({ title: title.value, content: content.value });
  
}
</script>

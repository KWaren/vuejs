
<template>
  <div class=" flex items-center justify-center">
    <div class="flex flex-col flex-wrap bg-red-100 min-h-[60vh] my-15 w-[60vw] shadow rounded-lg ">
      <div class="flex w-full justify-center">
        <h2 class="text-4xl font-bold ">{{ title }}</h2>
      </div>
      <p>{{ content[0] }}</p>
      <p>Date: {{ date }}</p>
      <RouterLink
  :to="{ name: 'notes.update', params: { _id: route.params._id } }"
  class="bg-green-200 w-20"
>
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
import { usePostIt } from "@/store/postIt";
import { useRouter, useRoute, RouterLink } from 'vue-router';
const route = useRoute()
const router = useRouter()
const store = usePostIt();


const title = ref('')
const content = ref('')
const date = ref('')
// console.log(route.params._id);

onMounted(() => {
  const postIt = store.getOnePostIt(route.params._id)
  if (postIt) {
    title.value = postIt.title
    content.value = postIt.content
    date.value = postIt.updatedAt
  }
})
function deleteOne() {
  store.deleteOne(route.params._id);
  
}
</script>
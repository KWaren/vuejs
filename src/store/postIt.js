import router from "@/router";
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const usePostIt = defineStore("postIt", () => {
  const postIts = ref([]);
  async function getData() {
    const response = await fetch("https://post-it.epi-bluelock.bj/notes");
    const data = await response.json();
    // console.log('Réponse du serveur :', data);
      postIts.value = [];

    // data.notes[0].content[0];
    // data.notes[0]._id;
    // data.notes[0].title;
    // data.notes[0].createdAt;
    // data.notes[0].updatedAt;
    for (let i = 0; i < data.notes.length; i++) {
      postIts.value.push(data.notes[i]);
    }
    console.log(data);
    if (response.ok) {
      return "ok";
    }
  }

  const addPostIt = async (postIt) => {
    const response = await fetch("https://post-it.epi-bluelock.bj/notes", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: postIt.title,
        content: [
          postIt.content
        ]
      })
    });

    const data = await response.json();
    console.log("Success creation:", data.note_id);
    router.push('/');
  };
  async function getOnePostIt(_id) {
    try {
      const response = await fetch("https://post-it.epi-bluelock.bj/notes/" + _id, {
        method: "GET",
        headers: {
          accept: "application/json"
        }
      });

      if (!response.ok) {
        // Erreur côté serveur
        throw new Error("Erreur HTTP " + response.status + ": " + response.statusText);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }


  async function updatePostIt(_id, up) {
    console.log(up.title);
    console.log(up.content);

    // const i = postIts.value.findIndex(a => a._id === _id)
    // if (i !== -1) {
    //   postIts.value[i] = { ...postIts.value[i], ...up }
    // }
    const url = 'https://post-it.epi-bluelock.bj/notes/' + _id;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: up.title,
        content: [
          up.content
        ]
      })
    });
    const result = await response.json();
    console.log('Réponse du serveur :', result);
    router.push('/')



  }
  function deleteAll() {
    postIts.value = [];
  }

  async function deleteOne(_id) {

    const response = await fetch('https://post-it.epi-bluelock.bj/notes/' + _id, {
      method: "DELETE",
      headers: {
        "accept": "application/json"
      }
    });
    const data = await response.json();
    console.log("Deleted:", data);
    router.push('/');

    // postIts.value = postIts.value.filter(a => a._id !== _id)
  }

  return {
    postIts,
    getData,
    addPostIt,
    getOnePostIt,
    updatePostIt,
    deleteAll,
    deleteOne,
  };
},
  {
    persist: true,
  }
);
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostIt, import.meta.hot))
}
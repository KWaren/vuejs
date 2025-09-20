import router from "@/router";
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, watch } from "vue";

export const usePostIt = defineStore("postIt", () => {
  const postIts = ref([]);
  async function getData() {
    try {
      const response = await fetch("https://post-it.epi-bluelock.bj/notes");
      const data = await response.json();
      if (data.notes.length > 0) {
        console.log(data.notes.length);
        //  localStorage.removeItem("postIts");
        postIts.value = [];
        localStorage.removeItem("postIts");
        console.log("tABLEAU " + postIts.value);

      }
      // data.notes[0].content[0];
      // data.notes[0]._id;
      // data.notes[0].title;
      // data.notes[0].createdAt;
      // data.notes[0].updatedAt;
      console.log(data.notes[15]);
      // return data;
      for (let i = 0; i < 6; i++) {
        postIts.value.push(data.notes[i]);
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  }

  // Charger les données du localStorage au démarrage
  const savedPostIts = localStorage.getItem("postIts");
  if (savedPostIts) {
    postIts.value = JSON.parse(savedPostIts);
  }
  getData();

  const addPostIt = async (postIt) => {
    // const date = new Date();
    // const dateLocale = date.toLocaleString("fr-FR", {
    //   weekday: "long",
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   second: "numeric",
    // });
    // postIt._id = Date.now();
    // postIt.createdAt = dateLocale;
    // postIt.updatedAt = dateLocale;
    // postIts.value.push(postIt);
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
    console.log("Success:", data);
    router.push('/');
  };
  function getOnePostIt(_id) {
    // console.log(_id);
    return postIts.value.find(a => a._id === _id)
  }
  async function updatePostIt(_id, up) {
    // const date = new Date();
    // const dateLocale = date.toLocaleString("fr-FR", {
    //   weekday: "long",
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   second: "numeric",
    // });
    // up.updatedAt = dateLocale;

    const index = postIts.value.findIndex(a => a._id === _id)
    if (index !== -1) {
      postIts.value[index] = { ...postIts.value[index], ...up }
    }
    const url = 'https://post-it.epi-bluelock.bj/notes/'+_id;
    const data = {
      title: up.title,
      content: [
        up.content
      ]
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log('Réponse du serveur :', result);
     router.push('/')



  }
  function deleteAll() {
    postIts.value = [];
    localStorage.removeItem("postIts");
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
  // Sauvegarde automatique à chaque modification
  watch(
    postIts,
    (newPostIts) => {
      localStorage.setItem("postIts", JSON.stringify(newPostIts));
    },
    { deep: true }
  );

  return {
    postIts,
    addPostIt,
    getOnePostIt,
    updatePostIt,
    deleteAll,
    deleteOne,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostIt, import.meta.hot))
}
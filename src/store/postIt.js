import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const usePostIt = defineStore("postIt", () => {
  const postIts = ref([]);
  async function getData() {
        try {
            const response = await fetch("https://post-it.epi-bluelock.bj/notes");
            const data = await response.json();
            if (data.notes.length >0) {
              console.log(data.notes.length);
             localStorage.removeItem("postIts");
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
    getData();

  // Charger les données du localStorage au démarrage
  const savedPostIts = localStorage.getItem("postIts");
  if (savedPostIts) {
    postIts.value = JSON.parse(savedPostIts);
  }

  const addPostIt = async (postIt) => {
    const date = new Date();
    const dateLocale = date.toLocaleString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    postIt._id = Date.now();
    postIt.createdAt = dateLocale;
    postIt.updatedAt = dateLocale;
    postIts.value.push(postIt);
    const response = await fetch("https://post-it.epi-bluelock.bj/notes", {
  method: "POST",
  body: JSON.stringify(postIt),
  
});


  };
    function getOnePostIt(_id) {
      // console.log(_id);
    return postIts.value.find(a => a._id === _id)
  }
  function updatePostIt(_id, up) {
     const date = new Date();
    const dateLocale = date.toLocaleString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    up.updatedAt=dateLocale;
    const index = postIts.value.findIndex(a => a._id === _id)
    if (index !== -1) {
      postIts.value[index] = { ...postIts.value[index], ...up }
    }
  }
  function deleteAll() {
    localStorage.removeItem("postIts")
  }

  function deleteOne(_id) {
    postIts.value = postIts.value.filter(a => a._id !== _id)
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

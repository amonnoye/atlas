<template>
  <q-page class="q-pa-xl flex flex-center">
    <q-form @submit.prevent="submitProject" style="width: 50%">
      <q-input
        filled
        v-model="newProject.title"
        label="Titre du projet"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
      />
      <q-input
        filled
        v-model="newProject.texte"
        type="textarea"
        label="Texte"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
      />
      <q-input
        filled
        v-model="newProject.texte_gras"
        type="textarea"
        label="Texte en gras"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
      />
      <q-input
        filled
        v-model="newProject.id_instagram"
        bg-color="accent"
        label-color="white"
        label="ID Instagram"
        class="q-my-sm"
      />
      <q-file
        bg-color="accent"
        label-color="white"
        filled
        v-model="newProject.img_logo"
        label="Upload Logo"
        @change="handleFileChange"
        accept="image/*"
        class="q-my-sm"
      />
      <!-- <q-input
        bg-color="accent"
        label-color="white"
        filled
        v-model="newProject.order_by"
        type="number"
        label="Ordre"
        class="q-my-sm"
      /> -->

      <q-btn
        label="Créer Projet"
        type="submit"
        color="secondary"
        class="q-my-sm"
      />
    </q-form>
  </q-page>
</template>

<script>
import { inject, ref } from 'vue';
import { Project } from 'src/components/project';
import { api } from 'src/boot/axios';

export default {
  components: {},
  setup() {
    const background = inject('bg-key');
    background.value = 2;

    const nav = inject('nav-key');
    nav.value = 4;

    const header = inject('header-key');
    header.value = 1;

    const newProject = ref(
      new Project({
        id: '', // Généré par l'API si nécessaire
        title: '',
        texte: '',
        texte_gras: '',
        id_instagram: '',
        img_logo: null,
        order_by: '', // Laissez comme chaîne pour la saisie, convertissez en nombre avant l'envoi
      })
    );

    const submitProject = () => {
      // Convertir order_by en nombre si ce n'est pas déjà fait
      newProject.value.order_by = parseInt(newProject.value.order_by, 10);
      const formDataimg = new FormData();
      // Ici, envoyez newProject.value à votre API
      formDataimg.append(
        'fileToUpload',
        document.querySelector('input[type="file"]').files[0]
      );

      api
        .post('/upload', formDataimg, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // Traitez la réponse de succès
          console.log('Projet créé avec succès', response);
        })
        .catch((error) => {
          // Gérez l'erreur
          console.error('Erreur lors de la création du projet', error);
        });
      console.log(newProject.value);
      const formData = new FormData();
      formData.append('title', newProject.value.title);
      formData.append('texte', newProject.value.texte);
      formData.append('texte_gras', newProject.value.texte_gras);
      formData.append('id_instagram', newProject.value.id_instagram);
      formData.append(
        'img_logo',
        document.querySelector('input[type="file"]').files[0]['name']
      );
      formData.append('order_by', newProject.value.order_by);
      console.log(formData);
      api
        .post('/project_add', formData)
        .then((response) => {
          // Traitez la réponse de succès
          console.log('Projet créé avec succès', response);
        })
        .catch((error) => {
          // Gérez l'erreur
          console.error('Erreur lors de la création du projet', error);
        });
    };

    const handleFileChange = (event) => {
      const files = event.target.files;
      if (files && files[0]) {
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
          // Stocker le résultat dans newProject.img_logo pour l'aperçu ou l'envoyer directement
          // Cela suppose que votre API peut gérer la chaîne base64 pour l'upload d'image
          // Sinon, vous devrez ajuster cette logique pour uploader le fichier comme FormData
          newProject.value.img_logo = e.target.result;
        };

        fileReader.readAsDataURL(files[0]);
      }
    };

    return {
      newProject,
      submitProject,
      handleFileChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.q-input {
}
.title {
  text-transform: uppercase;
  font-size: 3.2vw;
  letter-spacing: 0.1vw;
}

.text-n {
  font-size: 4.9vw;
  font-weight: 100;
  color: white;
}

.text-caption {
  font-size: 1.8vw; /* Adjust the size as needed for your design */
  color: white;
  letter-spacing: 0.01vw;
  line-height: 2vw;
  white-space: pre-line; /* This will respect newlines in the text */
}
.home-button {
  position: fixed; /* Positionnement fixe par rapport à la fenêtre du navigateur */
  bottom: 1vh; /* Espacement par rapport au bas de la page */
  right: 50%; /* Espacement par rapport au côté droit de la page */
  z-index: 2001; /* Assurez-vous qu'il est au-dessus des autres éléments de la page */
  font-size: 1.4vw;
  color: #ffffff;
  text-transform: capitalize;
  border-radius: 5%;
}

// @media screen and (max-width: 600px) {
//   .text-n {
//     font-size: 2rem; /* Adjust for mobile view */
//   }

//   .text-caption {
//     font-size: 0.8rem; /* Adjust for mobile view */
//   }
// }
</style>

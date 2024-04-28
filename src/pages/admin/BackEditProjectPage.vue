<template>
  <q-page class="q-pa-xl flex flex-center addpropage" v-if="!showList">
    <q-item class="row fit flex flex-center justify-center">
      <q-item-section class="text-center item-link"
        >Modifier un project</q-item-section
      >

      <q-space />

      <q-btn
        label="Liste des projets"
        :to="{ name: 'backlistproject' }"
        color="green"
        class="q-my-sm"
      />
    </q-item>
    <q-form class="card-p" @submit.prevent="submitProject" style="width: 50%">
      <q-input
        filled
        v-model="edit_p.title"
        label="Titre du projet"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
      />
      <q-input
        filled
        v-model="edit_p.texte"
        type="textarea"
        label="Texte"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
      />
      <q-input
        filled
        v-model="edit_p.texte_gras"
        type="textarea"
        label="Texte en gras"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
        color="teal-10"
      />
      <q-input
        filled
        v-model="edit_p.id_instagram"
        bg-color="accent"
        label-color="white"
        label="ID Instagram"
        class="q-my-sm"
      />
      <q-file
        bg-color="accent"
        label-color="white"
        filled
        :v-model="edit_p.img_logo"
        label="Upload Logo"
        @update:model-value="handleFileChange"
        accept="image/*"
        class="q-my-sm"
      />
      <div class="row flex flex-center">
        <q-img
          v-if="edit_p.img_logo"
          :src="getImage(edit_p.img_logo)"
          style="width: 120px; height: auto; object-fit: contain"
        />
        <span v-if="newProject.img_logo" class="text-bold q-px-md">
          remplacé par ==></span
        >
        <q-img
          v-if="newProject.img_logo"
          :src="newProject.img_logo"
          style="width: 120px; height: auto; object-fit: contain"
        />
      </div>
      <div class="row flex flex-center">
        <q-btn
          label="Modifier le projet"
          type="submit"
          color="info"
          class="q-my-sm text-bold text-black"
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
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { inject, ref } from 'vue';
import { Project } from 'src/components/project';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default {
  components: {},
  setup() {
    const background = inject('bg-key');
    background.value = 2;
    const $q = useQuasar();
    const nav = inject('nav-key');
    nav.value = 4;
    const router = useRouter();
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
    const imagePreview = ref('');
    function getImage(name) {
      console.log(name);
      return 'http://dev2.agence-atlas.fr/api/medial/' + name;
    }

    const submitProject = () => {
      // Convertir order_by en nombre si ce n'est pas déjà fait
      edit_p.value.order_by = 5;
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
      formData.append('id', edit_p.value.id);
      formData.append('title', edit_p.value.title);
      formData.append('texte', edit_p.value.texte);
      formData.append('texte_gras', edit_p.value.texte_gras);
      formData.append('id_instagram', edit_p.value.id_instagram);
      if (document.querySelector('input[type="file"]').files.length > 0) {
        formData.append(
          'img_logo',
          document.querySelector('input[type="file"]').files[0]['name']
        );
      } else {
        formData.append('img_logo', edit_p.value.img_logo);
      }

      formData.append('order_by', edit_p.value.order_by);
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

    function handleFileChange(event) {
      // const files = event;
      // console.log(files);
      const tt = URL.createObjectURL(event);
      newProject.value.img_logo = tt;
      console.log(tt);
      // if (files && files[0]) {
      //   const fileReader = new FileReader();

      //   fileReader.onload = (e) => {
      //     console.log('???');
      //     console.log(e.target.result);
      //     // Stocker le résultat dans newProject.img_logo pour l'aperçu ou l'envoyer directement
      //     // Cela suppose que votre API peut gérer la chaîne base64 pour l'upload d'image
      //     // Sinon, vous devrez ajuster cette logique pour uploader le fichier comme FormData
      //     newProject.value.img_logo = e.target.result;
      //     imagePreview.value = e.target.result;
      //     console.log(e.target.result);
      //   };

      //   console.log(fileReader.readAsDataURL(files));
      // }
    }
    const showList = ref(false);
    const seeList = (showlist) => {
      showList.value = showlist;
    };
    const project = ref([]);
    const data = ref();
    const edit_p = ref(
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
    function loadData() {
      api
        .get('/project')
        .then((response) => {
          data.value = response.data;
          const valeur = ref();
          valeur.value = [];
          let row = {};
          let itemCount = 0;
          let rowIndex = 0;
          row['id'] = rowIndex;
          console.log(project.value);
          project.value = data.value.map((item) => {
            const projectInstance = new Project(item);
            // logos.value.push(projectInstance.img_logo); // Utilisez ici la propriété appropriée pour les logos
            //  sellogos.value.push('s_' + projectInstance.img_logo); // Assumant que sellogos utilise id_instagram
            return projectInstance;
          });
          console.log(project.value);
          console.log(router.currentRoute.value.params.id);
          edit_p.value = project.value.find((x) => {
            if (x.id === router.currentRoute.value.params.id) {
              return true;
            } else {
              return false;
            }
          });

          console.log(edit_p.value);
        })
        .catch((error) => {
          console.log(error);
          $q.notify('Une erreur s"est produite"');
        });
    }
    loadData();

    function supprimer(id) {
      const formData = new FormData();
      formData.append('id', id);
      api
        .post('/delete_project/', formData)
        .then(() => {
          // Suppression réussie, notifier l'utilisateur
          $q.notify({
            color: 'green',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Projet supprimé avec succès',
          });

          // Recharger la liste des projets pour refléter la suppression
          loadData();
        })
        .catch((error) => {
          // Gérer l'erreur
          console.error('Erreur lors de la suppression du projet', error);
          $q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'error',
            message: 'Erreur lors de la suppression du projet',
          });
        });
      // Affichez une boîte de dialogue de confirmation avant la suppression
      // $q.dialog({
      //   title: 'Confirmer la suppression',
      //   message: 'Voulez-vous vraiment supprimer ce projet ?',
      //   cancel: true,
      //   persistent: true,
      // })
      //   .onOk(() => {
      //     // Si l'utilisateur confirme, envoyez la requête de suppression

      //   })
      //   .onCancel(() => {
      //     // Si l'utilisateur annule, vous pouvez éventuellement gérer ce cas
      //     console.log('Suppression annulée');
      //   });
    }

    return {
      newProject,
      submitProject,
      handleFileChange,
      seeList,
      showList,
      project,
      supprimer,
      edit_p,
      getImage,
      imagePreview,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-p {
  border: 2px solid #b6b6b6;
  border-radius: 8px;
  padding: 5px;
  background-color: #f6f6f6;
}
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
<style lang="scss">
.addpropage {
  background-color: $secondary !important;
  padding: 0 !important;
}
</style>

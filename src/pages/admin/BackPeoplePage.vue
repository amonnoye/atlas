<template>
  <q-page class="q-pa-xl flex flex-center addpropage" v-if="!showList">
    <q-item class="row fit flex flex-center justify-center">
      <q-item-section class="text-center item-link"
        >Ajouter une Atlassienne</q-item-section
      >
    </q-item>
    <q-form @submit.prevent="submitProject" style="width: 50%">
      <q-input
        filled
        v-model="newProject.nom"
        label="Nom"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
      />
      <q-input
        filled
        v-model="newProject.prenom"
        label="Prénom"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
      />
      <q-input
        filled
        v-model="newProject.poste"
        label="Poste"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
      />
      <q-input
        filled
        v-model="newProject.resum"
        type="textarea"
        label="Résumé"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
      />
      <!-- <q-input
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
      /> -->
      <q-file
        bg-color="accent"
        label-color="white"
        filled
        v-model="newProject.picture"
        label="Upload photo"
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
        label="Créer le membre de l'équipe"
        type="submit"
        color="secondary"
        class="q-my-sm"
      />
      <q-space />
      <q-btn
        label="Liste des membres de l'équipe"
        :to="'listpeople'"
        color="green"
        class="q-my-sm"
      />
    </q-form>
  </q-page>
</template>

<script>
import { inject, ref } from 'vue';
import { Project, Team } from 'src/components/project';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

export default {
  components: {},
  setup() {
    const background = inject('bg-key');
    background.value = 2;
    const $q = useQuasar();
    const nav = inject('nav-key');
    nav.value = 4;

    const header = inject('header-key');
    header.value = 1;

    const newProject = ref(
      new Team({
        id: '', // Généré par l'API si nécessaire
        nom: '',
        prenom: '',
        poste: '',
        resum: '',
        picture: null,
        orderBy: '', // Laissez comme chaîne pour la saisie, convertissez en nombre avant l'envoi
      })
    );

    const submitProject = () => {
      // Convertir order_by en nombre si ce n'est pas déjà fait
      newProject.value.orderBy = parseInt(newProject.value.orderBy, 10);
      const formDataimg = new FormData();
      // Ici, envoyez newProject.value à votre API
      formDataimg.append(
        'fileToUpload',
        document.querySelector('input[type="file"]').files[0]
      );

      api
        .post('/uploadteam', formDataimg, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // Traitez la réponse de succès
          console.log('Photo créé avec succès', response);
        })
        .catch((error) => {
          // Gérez l'erreur
          console.error('Erreur lors de la création du photo', error);
        });
      console.log(newProject.value);

      const formData = new FormData();
      formData.append('id', newProject.value.id);
      formData.append('nom', newProject.value.nom);
      formData.append('prenom', newProject.value.prenom);
      formData.append('poste', newProject.value.poste);
      formData.append('resum', newProject.value.resum);
      if (document.querySelector('input[type="file"]').files.length > 0) {
        formData.append(
          'picture',
          document.querySelector('input[type="file"]').files[0]['name']
        );
      }

      formData.append('orderBy', newProject.value.orderBy);
      console.log(formData);
      api
        .post('/team_add', formData)
        .then((response) => {
          // Traitez la réponse de succès
          console.log('memebre créé avec succès', response);
        })
        .catch((error) => {
          // Gérez l'erreur
          console.error('Erreur lors de la création du membre', error);
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
    const showList = ref(false);
    const seeList = (showlist) => {
      showList.value = showlist;
    };
    const project = ref([]);
    const data = ref();
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
            const projectInstance = new Team(item);
            // logos.value.push(projectInstance.img_logo); // Utilisez ici la propriété appropriée pour les logos
            //  sellogos.value.push('s_' + projectInstance.img_logo); // Assumant que sellogos utilise id_instagram
            return projectInstance;
          });
          console.log(project.value);
          // console.log(logos.value);
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
        .post('/delete_team/', formData)
        .then(() => {
          // Suppression réussie, notifier l'utilisateur
          $q.notify({
            color: 'green',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Membre supprimé avec succès',
          });

          // Recharger la liste des projets pour refléter la suppression
          loadData();
        })
        .catch((error) => {
          // Gérer l'erreur
          console.error('Erreur lors de la suppression du membre', error);
          $q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'error',
            message: 'Erreur lors de la suppression du membre',
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
<style lang="scss">
.addpropage {
  background-color: $secondary !important;
  padding: 0 !important;
}
</style>

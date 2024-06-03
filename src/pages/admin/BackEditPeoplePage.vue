<template>
  <q-page class="q-pa-xl flex flex-center addpropage" v-if="!showList">
    <q-item class="row fit flex flex-center justify-center">
      <q-item-section class="text-center item-link"
        >Modifier un membre de l'équipe</q-item-section
      >

      <q-space />

      <q-btn
        label="Liste de l'équipe"
        :to="{ name: 'backlistpeople' }"
        color="green"
        class="q-my-sm"
      />
    </q-item>
    <q-form class="card-p" @submit.prevent="submitProject" style="width: 50%">
      <q-input
        filled
        v-model="edit_p.nom"
        label="Nom"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
      />
      <q-input
        filled
        v-model="edit_p.prenom"
        label="prénom"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
      />
      <q-input
        filled
        v-model="edit_p.poste"
        label="Poste"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
      />
      <q-input
        filled
        v-model="edit_p.resum"
        type="textarea"
        label="Resumé"
        bg-color="accent"
        label-color="white"
        class="q-my-sm"
      />

      <q-file
        bg-color="accent"
        label-color="white"
        filled
        v-model="newProject.picture"
        label="Upload Photo"
        @update:model-value="handleFileChange"
        accept="image/*"
        class="q-my-sm"
      />
      <div class="row flex flex-center bg-accent">
        <q-img
          v-if="edit_p.picture"
          :src="getImage(edit_p.picture)"
          style="width: 120px; height: auto; object-fit: contain"
        />
        <span v-if="newProject.picture" class="text-bold q-px-md">
          remplacé par ==></span
        >
        <q-img
          v-if="newImg"
          :src="newImg"
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
import { Project, Team } from 'src/components/project';
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
    const imagePreview = ref('');
    function getImage(name) {
      console.log(name);
      return 'http://dev2.agence-atlas.fr/api/media/' + name;
    }

    const submitProject = () => {
      // Convertir order_by en nombre si ce n'est pas déjà fait
      edit_p.value.orderBy = 5;
      const formDataimg = new FormData();
      console.log(document.querySelector('input[type="file"]').files[0]);
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
          console.log('photo créé avec succès', response);
        })
        .catch((error) => {
          // Gérez l'erreur
          console.error('Erreur lors de la création du photo', error);
        });
      console.log(newProject.value);
      const formData = new FormData();
      formData.append('id', edit_p.value.id);
      formData.append('nom', edit_p.value.nom);
      formData.append('prenom', edit_p.value.prenom);
      formData.append('poste', edit_p.value.poste);
      formData.append('resum', edit_p.value.resum);
      if (document.querySelector('input[type="file"]').files.length > 0) {
        formData.append(
          'picture',
          document.querySelector('input[type="file"]').files[0]['name']
        );
      } else {
        formData.append('picture', newProject.value.picture);
      }

      formData.append('orderBy', edit_p.value.orderBy);
      console.log(formData);
      api
        .post('/team_add', formData)
        .then((response) => {
          // Traitez la réponse de succès
          console.log('membre créé avec succès', response);
        })
        .catch((error) => {
          // Gérez l'erreur
          console.error('Erreur lors de la création du membre', error);
        });
    };

    const newImg = ref('');
    function handleFileChange(event) {
      // const files = event;
      // console.log(files);
      newImg.value = URL.createObjectURL(event);
      // newProject.value.img_logo = tt;
      // console.log(tt);
      const files = event.target.files;
      console.log(files);
      if (files && files[0]) {
        const fileReader = new FileReader();
        // console.log('ezrzerfzer');
        fileReader.onload = (e) => {
          // console.log('eueueuheheueh');
          // Stocker le résultat dans newProject.img_logo pour l'aperçu ou l'envoyer directement
          // Cela suppose que votre API peut gérer la chaîne base64 pour l'upload d'image
          // Sinon, vous devrez ajuster cette logique pour uploader le fichier comme FormData
          //edit_p.value.img_logo = e.target.result;
        };

        console.log(files[0]);
        fileReader.readAsDataURL(files[0]);
      }
    }
    const showList = ref(false);
    const seeList = (showlist) => {
      showList.value = showlist;
    };
    const project = ref([]);
    const data = ref();
    const edit_p = ref(
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
    function loadData() {
      api
        .get('/team')
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
          // console.log(project.value);
          // console.log(router.currentRoute.value.params.id);
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
        .post('/delete_team/', formData)
        .then(() => {
          // Suppression réussie, notifier l'utilisateur
          $q.notify({
            color: 'green',
            textColor: 'white',
            icon: 'check_circle',
            message: 'membre supprimé avec succès',
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

    // router.beforeEach((to, from, next) => {
    //   if (to.query.code) {
    //     // Vous avez le code ici, vous pouvez l'envoyer à votre serveur ou échanger le jeton ici
    //     console.log('Code Instagram:', to.query.code);
    //     // Ajoutez ici la logique pour échanger le code contre un jeton
    //   }
    //   next();
    // });

    // function AskInsta() {
    //   //IGQWRNZAUo3UUdoM2Uxdk15Q0FYdkVXcWlmOVotUUxraUx6UUtWS3lvd3dydTNsTDIxM1ZAleUliNzE1SE5vMXRaVW9TZAVRSbk1XMVhUT2t1d1V0RzZAtdG13dlhvR3JqRkJhQXZA5ZAWNyak9Va1duM29fcEZAiX05fWmMZD
    //   console.log('oeoeoeoeo');
    //   // 525847695669461
    //   const clientID = '525847695669461'; // Remplacez 'VotreClientID' par votre ID de client réel
    //   const redirectURI = encodeURIComponent(
    //     'https://dev2.agence-atlas.fr/api/auth'
    //   ); // Remplacez 'VotreRedirectURI' par votre URI de redirection
    //   const scope = encodeURIComponent('user_profile,user_media');
    //   const authURL = `https://api.instagram.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=code`;

    //   // Ouvrir une nouvelle fenêtre pour l'autorisation
    //   window.open(authURL, '_blank');
    // }

    return {
      // AskInsta,
      newImg,
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

<template>
  <q-page class="q-pa-xl flex flex-center propage">
    <q-item class="row fit flex flex-center justify-center">
      <q-item-section class="text-center item-link text-secondary"
        >Liste des Atlassiennes</q-item-section
      >
      <q-btn
        label="Nouvelle Atlassienne"
        icon="add"
        :to="'addpeople'"
        color="green"
        class="q-my-sm"
      />
    </q-item>
    <q-scroll-area style="height: 800px; width: 80%">
      <q-card
        dark
        v-for="projec in project"
        :key="projec.id"
        class="q-mb-md row card-p"
      >
        <q-card-section class="col-3">
          <div class="text-h6">{{ projec.poste }}</div>
        </q-card-section>
        <q-card-section class="col-1">
          <q-img
            height="40px"
            fit="contain"
            :src="getImage(projec.picture)"
          ></q-img>
        </q-card-section>
        <q-card-section class="col-2">
          {{ projec.nom }} {{ projec.prenom }}
        </q-card-section>
        <q-card-section class="col-4 col-text" style="">
          {{ projec.resum }}
        </q-card-section>
        <q-card-action class="col-2 bg-blue flex flex-center"
          ><q-btn
            icon="delete_forever"
            @click="supprimer(projec.id)"
            color="red"
            class="q-my-sm"
          >
            <q-tooltip
              class="bg-amber text-black text-bold shadow-4"
              :offset="[10, 10]"
            >
              Supprimer le membre de l'équipe
            </q-tooltip></q-btn
          >
          <q-btn
            icon="edit"
            @click="edit(projec.id)"
            color="info"
            class="q-ma-md"
          >
            <q-tooltip
              class="bg-amber text-black text-bold shadow-4"
              :offset="[10, 10]"
            >
              Modifier le membre de l'équipe
            </q-tooltip></q-btn
          >
        </q-card-action>
        <!-- Ajouter plus de sections de carte si nécessaire -->
      </q-card>

      <q-space />
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Project, Team } from 'src/components/project';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

export default {
  components: {},
  setup() {
    const router = useRouter();
    const background = inject('bg-key');
    background.value = 2;
    const $q = useQuasar();
    const nav = inject('nav-key');
    nav.value = 4;

    const header = inject('header-key');
    header.value = 1;

    const team = ref([]);
    const data = ref();
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
          console.log(team.value);
          team.value = data.value.map((item) => {
            const teamInstance = new Team(item);
            // logos.value.push(projectInstance.img_logo); // Utilisez ici la propriété appropriée pour les logos
            //  sellogos.value.push('s_' + projectInstance.img_logo); // Assumant que sellogos utilise id_instagram
            return teamInstance;
          });
          console.log(team.value);
          // console.log(logos.value);
        })
        .catch((error) => {
          console.log(error);
          $q.notify('Une erreur s"est produite"');
        });
    }
    loadData();

    function supprimer(id) {
      $q.dialog({
        title: 'Confirmation',
        message: 'Supprimer le membre ?',
        color: 'blue',
        class: 'bg-secondary text-bold',
        cancel: {
          push: true,
          color: 'info',
          textColor: 'accent',
          class: 'text-bold',
        },
        ok: {
          push: true,
          color: 'negative',
          textColor: 'white',
          class: 'text-bold',
        },
        persistent: false,
      })
        .onOk(() => {
          const formData = new FormData();
          formData.append('id', id);
          api
            .post('/team_delete/', formData)
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
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    function edit(id) {
      console.log('member : ' + id);
      router.push({ name: 'backeditpeople', params: { id: id } });
    }

    function getImage(name) {
      return 'http://dev2.agence-atlas.fr/api/media/' + name;
    }

    return {
      project: team,
      supprimer,
      edit,
      getImage,
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
.propage {
  background-color: $accent;
  padding: 0;

  .card-p {
    background-color: $secondary;
    border: 2px solid white;
  }

  .col-text {
    max-height: 60px !important;
    overflow: hidden;
  }
}
</style>

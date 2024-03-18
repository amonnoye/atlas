<template class="contact">
  <div class="contact-page">
    <div class="contact-info">
      <div style="font-size: 3.5vw; margin-bottom: 2vh">Contact</div>
      <div style="font-size: 1.7vw; margin-bottom: 5vh">
        <a href="mailto:contact@agence-atlas.fr">contact@agence-atlas.fr</a>
      </div>
      <div style="font-size: 1.7vw; line-height: 2vh">
        147 rue de la Délivrande
      </div>
      <div style="font-size: 1.7vw; margin-bottom: 3vh">14000 Caen</div>
      <div style="font-size: 1.7vw">09 72 91 32 28</div>
      <div class="social-media row">
        <q-btn
          flat
          dense
          label=""
          class="q-ml-lg q-pt-lg"
          :href="link.link_twitter"
          target="_blank"
        >
          <q-img
            v-if="false"
            src="../assets/img/logo/twitter-64.png"
            width="15"
          />
        </q-btn>
        <q-btn
          flat
          dense
          label=""
          class="q-ml-sm q-pt-lg"
          :href="link.link_fb"
          target="_blank"
        >
          <img src="../assets/img/logo/facebook.png" width="7" />
        </q-btn>
        <q-btn
          flat
          dense
          label=""
          class="q-ml-sm q-pt-lg"
          :href="link.link_insta"
          target="_blank"
        >
          <img src="../assets/img/logo/instagram.png" width="15" />
        </q-btn>
        <q-btn
          flat
          dense
          label=""
          class="q-ml-sm q-pt-lg"
          :href="link.link_youtube"
          target="_blank"
        >
          <v-img v-if="false" src="../assets/img/logo/youtube.png" width="15" />
        </q-btn>
      </div>
    </div>
    <div class="contact-form">
      <q-form @submit="submitForm" @reset="onReset" class="column">
        <q-input
          color="white"
          label-color="white"
          v-model="form.name"
          label="Nom*"
          required
          class="custom-input"
        />
        <q-input
          color="white"
          label-color="white"
          v-model="form.firstName"
          label="Prénom*"
          required
          class="custom-input"
        />
        <q-input
          color="white"
          label-color="white"
          v-model="form.email"
          label="Email*"
          type="email"
          required
          class="custom-input"
        />
        <q-input
          color="white"
          label-color="white"
          v-model="form.subject"
          label="Objet"
          class="custom-input"
        />
        <q-input
          v-model="form.message"
          label="Demande*"
          type="textarea"
          autogrow
          required
          color="white"
          label-color="white"
          class="custom-input"
        />
        <q-checkbox
          v-model="form.termsAccepted"
          label="J'ai lu les conditions générales du site Internet Atlas.fr"
          required
          class="custom-input"
          checked-icon="check_box"
          unchecked-icon="check_box_outline_blank"
          keep-color
          style="font-size: 01vw"
          color="white"
          size="lg"
        />

        <q-btn
          label="Envoyer"
          rounded
          type="submit"
          color="white"
          class="q-mt-xl"
          outline
          style="margin-left: 8vw; margin-right: 8vw; height: 3vw"
        />
        <div class="text-center q-mt-md">* Obligatoires</div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { inject, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

export default {
  components: {},
  setup() {
    const $q = useQuasar();
    const background = inject('bg-key');
    background.value = 3;

    const nav = inject('nav-key');
    nav.value = 4;

    const header = inject('header-key');
    header.value = 3;
    const form = ref({
      name: '',
      firstName: '',
      email: '',
      subject: '',
      message: '',
      termsAccepted: false,
    });

    const link = inject('link-ext');
    console.log(link);
    function submitForm() {
      // Logique pour traiter la soumission du formulaire
      console.log(form.value);
      let formData = new URLSearchParams();
      formData.append('name', form.value.name);
      formData.append('email', form.value.email);
      formData.append('message', form.value.message);
      formData.append('firstName', form.value.firstName);
      formData.append('subject', form.value.subject);
      api
        .post('/contact', formData)
        .then((response) => {
          // Gérez la réponse ici, par exemple en affichant un message de succès
          console.log('Succès :', response.data, formData);

          if (response.data['success']) {
            console.log(response.data['success']);
            $q.notify({
              message: 'Message envoyé avec succés!',
              color: 'accent',
              textColor: 'white',
              position: 'center',
              progress: true,
            });
            onReset();
          }
        })
        .catch((error) => {
          // Gérez les erreurs ici
          console.error('Erreur :', error);
        });
      // Ici, vous pouvez envoyer les données du formulaire à un serveur
    }

    function onReset() {
      // Logique pour réinitialiser le formulaire
      form.value = {
        name: '',
        firstName: '',
        email: '',
        subject: '',
        message: '',
        termsAccepted: false,
      };
    }

    return {
      submitForm,
      form,
      onReset,
      link,
    };
  },
};
</script>

<style lang="scss">
.q-field__label {
  font-size: 1vw !important;
  top: 0.5vh;
}
.q-field--standard .q-field__control::before {
  border-bottom: 1px solid white !important;
}
.q-field__native {
  color: white;
}
</style>
<style lang="scss" scoped>
a {
  color: inherit; /* ou toute autre couleur souhaitée */
  text-decoration: none; /* optionnel, pour enlever le soulignement */
  /* autres styles si nécessaire */
}
.social-media {
  // max-width: 40%;
  display: flex;
  align-items: flex-start;
  // justify-content: space-evenly;
}
.custom-input {
  margin-bottom: 2.5vh;
}
.contact-page {
  display: flex;
  align-items: flex-start;
  padding: 10vh 10vw 0vh 10vw; // Ajustez selon vos besoins
  color: white;
  .contact-info {
    width: 40%; // Ajustez selon vos besoins
    color: white;
    // Styles supplémentaires pour la typographie et l'espacement
  }

  .contact-form {
    width: 33%; // Ajustez selon vos besoins
    // Styles supplémentaires pour les champs de formulaire et le bouton
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    q-input,
    textarea {
      width: 100%; // Ajustez selon vos besoins
      margin-bottom: 100px; // Ajustez selon vos besoins
      // Styles supplémentaires pour les champs de saisie
      color: white;
    }

    button {
      // Styles pour le bouton d'envoi
    }
  }
}
</style>

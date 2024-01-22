<template class="contact">
  <div class="contact-page">
    <div class="contact-info">
      <div style="font-size: 3.5vw; margin-bottom: 2vh">Contact</div>
      <div style="font-size: 1.7vw; margin-bottom: 5vh">
        contact@agence-atlas.fr
      </div>
      <div style="font-size: 1.7vw; line-height: 2vh">
        147 rue de la Délivrande
      </div>
      <div style="font-size: 1.7vw; margin-bottom: 3vh">14000 Caen</div>
      <div style="font-size: 1.7vw">09 72 91 32 28</div>
      <div class="social-media row">
        <q-btn flat dense label="" class="q-ml-lg q-pt-lg">
          <img src="../assets/img/logo/twitter-64.png" width="15" />
        </q-btn>
        <q-btn flat dense label="" class="q-ml-sm q-pt-lg">
          <img src="../assets/img/logo/facebook.png" width="7" />
        </q-btn>
        <q-btn flat dense label="" class="q-ml-sm q-pt-lg">
          <img src="../assets/img/logo/instagram.png" width="15" />
        </q-btn>
        <q-btn flat dense label="" class="q-ml-sm q-pt-lg">
          <img src="../assets/img/logo/youtube.png" width="15" />
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

export default {
  components: {},
  setup() {
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

    function submitForm() {
      // Logique pour traiter la soumission du formulaire
      console.log(form.value);
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

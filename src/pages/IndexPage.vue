<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="col">
        <q-img
          src="logo.png"
          spinner-color="white"
          style="height: 200px; max-width: 300px"
        />
      </div>

      <div class="col text-h4 text-center q-my-md">
        SOCIAL ATLAS MEDIA <br />
        ASGARD ARGOS ! ABYSS
      </div>

      <div class="col text-center q-my-md">
        <q-btn color="primary" label="Projets" to="/projets" />
        <q-btn color="primary" label="Agence" to="/agence" />
        <q-btn color="primary" label="Contact" to="/contact" />
      </div>

      <div class="col text-center q-my-md">
        <q-btn color="primary" label="Expertises" to="/expertises" />
        <q-btn color="primary" label="Nos chiffres" to="/chiffres" />
        <q-btn color="primary" label="Équipe" to="/equipe" />
      </div>

      <div class="col text-center q-my-md">
        <q-btn color="primary" label="Mentions légales" to="/mentions" />
        <q-btn
          color="primary"
          label="Politiques de confidentialité"
          to="/politiques"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
};
</script>

<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'ErrorNotFound',
  setup() {
    console.log('error instaeeeg?');
    const router = useRouter();
    const route = useRoute();
    console.log(process.env.VUE_ROUTER_MODE);
    console.log(route.query);
    router.beforeEach((to, from, next) => {
      console.log(from.query.code);
      console.log(to.query.code + ' sdfsd');
      if (to.query.code) {
        // Vous avez le code ici, vous pouvez l'envoyer à votre serveur ou échanger le jeton ici
        console.log('Code Instagram:', to.query.code);

        // Ajoutez ici la logique pour échanger le code contre un jeton
      } else {
        console.log('pas de query code?');
      }
      next();
    });
    return {};
  },
});
</script>

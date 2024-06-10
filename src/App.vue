<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';

export default defineComponent({
  name: 'App',
  setup() {
    console.log('APP.');
    // const router = useRouter();
    // router.beforeEach((to, from, next) => {
    //   if (to.query.code) {
    //     // Vous avez le code ici, vous pouvez l'envoyer à votre serveur ou échanger le jeton ici
    //     console.log('Code Instagram:', to.query.code);
    //     const formData = new FormData();
    //     formData.append('client_id', '525847695669461');
    //     formData.append('client_secret', '8af352b0d39a68018aab1ce3e07efaad');
    //     formData.append('grant_type', 'authorization_code');
    //     formData.append('redirect_uri', 'https://dev2.agence-atlas.fr/');
    //     formData.append('code', to.query.code.toString());

    //     api
    //       .post('https://api.instagram.com/oauth/access_token', formData)
    //       .then((resp) => {
    //         console.log('Token:', response.data.access_token);
    //       })
    //       .catch((error) => {
    //         console.error('Error:', error);
    //       });
    //     // Ajoutez ici la logique pour échanger le code contre un jeton
    //   } else {
    //     console.log('Error Inst');
    //   }
    //   next();
    // });
    return {};
  },
});
</script>

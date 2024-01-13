<template>
  <q-layout
    view="hHh lpr fFf"
    class="gome"
    :style="{ backgroundImage: 'url(' + backgroundClass + ')' }"
  >
    <q-header>
      <q-toolbar class="header-tb">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          v-if="false"
        />
        <q-space />
        <q-btn
          flat
          unelevated
          style="color: #ffffff"
          label="Accueil"
          to="/home"
        />
        <q-btn
          flat
          unelevated
          style="color: #ffffff"
          label="Agence"
          to="/agence"
        />
        <q-btn
          flat
          unelevated
          style="color: #ffffff"
          label="Projets"
          to="/projects"
        />
        <q-btn
          flat
          unelevated
          style="color: #ffffff"
          label="Contact"
          to="/contact"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view v-slot="{ Component }">
        <Transition name="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </q-page-container>

    <q-footer
      ><q-toolbar class="footer-tb transparent">
        <q-btn flat dense class="q-mr-md" label="Asgard" />
        <q-btn flat dense label="ARGOS" class="q-mr-md" />
        <q-btn flat dense label="ABYSS" class="q-mr-md" />
        <q-space />
        <q-btn flat dense class="q-mr-md" label="Mentions Légales" />
        <q-btn
          flat
          dense
          label="Politiques de confidentialité"
          class="q-mr-md"
        />
        <q-btn flat dense label="Atlas @2024" class="q-mr-md" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, provide, ref, computed, reactive, watch } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    const backgroundImages = [
      { url: 'src/assets/img/background/default.png', active: true },
      { url: 'src/assets/img/background/accueil.png', active: false },
      { url: 'src/assets/img/background/chiffre.png', active: false },
      { url: 'src/assets/img/background/contact.png', active: false },
    ];
    const backgroundUrlIndex = ref(0);
    provide('bg-key', backgroundUrlIndex);

    const backgroundClass = computed(() => {
      const t = backgroundUrlIndex.value;
      // const activeBackground = backgroundImages.find((bg) => bg.active);
      // console.log(activeBackground);
      //return activeBackground ? activeBackground.url : '';
      return backgroundImages[t].url;
    });

    // Méthodes pour changer l'image de fond
    function changeBackground(newIndex) {
      // Désactivez toutes les images
      backgroundImages.forEach((bg) => (bg.active = false));
      // Activez la nouvelle image
      backgroundImages[newIndex].active = true;
    }

    // Observateurs pour gérer le changement d'image de fond
    watch(
      () => backgroundUrlIndex.value,
      (newIndex) => {
        changeBackground(newIndex);
        console.log('watcher');
        console.log(backgroundImages);
      }
    );

    return {
      backgroundClass,
      backgroundImages,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-tb,
.footer-tb {
  color: #000;
}

.background {
  background-size: auto 10%;
  // -webkit-transition: background-image 1s ease-in-out;
  // transition: background-image 1s ease-in-out;
}
.accueil {
  background-image: url('assets/img/background/acceuil.png');
}
.chiffre {
  background-image: url('assets/img/background/chiffre.png');
}
.contact {
  background-image: url('assets/img/background/contact.png');
}
.default {
  background-image: url('assets/img/background/default.png');
}

.gome {
  position: relative; // For absolute positioning of child elements
  background-color: rgb(255, 255, 255);
  background-size: cover; // Cover the entire background
  background-position: center; // Center the background image
  background-repeat: no-repeat; // Do not repeat the image
}
</style>

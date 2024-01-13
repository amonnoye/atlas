<template>
  <q-layout view="hHh lpr fFf" class="gome">
    <div class="background-wrapper">
      <Transition
        name="fade"
        mode="out-in"
        v-for="bg in backgroundImages"
        :key="bg.url"
      >
        <div
          v-show="bg.active"
          class="background-image"
          :style="{ backgroundImage: `url('${bg.url}')` }"
        ></div>
      </Transition>
    </div>
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

    <!-- <q-drawer v-model="leftDrawerOpen" v-if="false" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

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
      return backgroundImages[backgroundUrlIndex.value];
    });

    const backgrounds = reactive({
      current: 'default',
      next: 'accueil',
    });

    const animating = ref(false);

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
      }
    );

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      backgroundClass,
      backgroundImages,
      currentBackgroundStyle: computed(() => ({
        backgroundImage:
          "url('src/assets/img/background/" + backgrounds.current + ".png')",
        transform: animating.value ? 'translateY(-100%)' : 'translateY(0)',
      })),
      nextBackgroundStyle: computed(() => ({
        backgroundImage: `url('src/assets/img/background/${backgrounds.next}.png')`,
        transform: animating.value ? 'translateY(0)' : 'translateY(-100%)',
      })),
      animating,
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
  position: relative; // Pour positionner absolument les images de fond
  background-color: aliceblue;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active dans <2.1.8 */ {
    opacity: 0;
  }
}
</style>

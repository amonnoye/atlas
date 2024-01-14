<template>
  <q-layout
    view="hHh lpr fFf"
    class="gome"
    :style="{ backgroundImage: 'url(' + backgroundClass + ')' }"
  >
    <q-header>
      <q-toolbar class="header-tb silkfont">
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
          no-caps
          unelevated
          label="Accueil"
          to="/home"
          class="header-link q-pt-lg"
        />
        <q-btn
          flat
          no-caps
          unelevated
          label="Agence"
          to="/agence"
          class="header-link q-pt-lg"
          @mouseover="agenceDrop = true"
        >
          <q-menu
            v-model="agenceDrop"
            @mouseleave="agenceDrop = false"
            fit
            class="agence-menu silkfont"
            anchor="top left"
          >
            <q-list style="min-width: 100px">
              <q-item>
                <q-item-section></q-item-section>
              </q-item>
              <q-item style="background-color: aqua; height: 10px !important">
                <q-item-section></q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Expertise</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Nos chiffres</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Équipe</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn
          flat
          no-caps
          unelevated
          label="Projets"
          to="/projects"
          class="header-link q-pt-lg"
        />
        <q-btn
          flat
          no-caps
          unelevated
          label="Contact"
          to="/contact"
          class="header-link q-pt-lg"
        />
        <q-btn flat dense label="" class="q-ml-lg q-pt-lg">
          <img src="src/assets/img/logo/facebook.png" />
        </q-btn>
        <q-btn flat dense label="" class="q-ml-sm q-pt-lg">
          <img src="src/assets/img/logo/instagram.png" />
        </q-btn>
        <q-btn flat dense label="" class="q-ml-sm q-mr-lg q-pt-lg">
          <img src="src/assets/img/logo/linkedin.png" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <Transition name="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </q-page-container>

    <div class="navbar-btn silkfont">
      <div class="row">
        <div
          class="col-5 q-mt-sm"
          :style="!navbar[0].active ? 'color: transparent' : ''"
        >
          Accueil
        </div>
        <q-btn flat dense label="" class="col-5 q-ml-sm btn-fixed-width">
          <img src="src/assets/img/navbar/middle_o.png" />
        </q-btn>
      </div>
      <div class="row">
        <div
          class="col-5 q-mt-lg q-mb-md"
          :style="!navbar[1].active ? 'color: transparent' : ''"
        >
          Agence
        </div>
        <q-btn flat dense class="col-5 q-ml-sm q-mb-md q-mt-md btn-fixed-width">
          <img src="src/assets/img/navbar/middle_o.png" />
        </q-btn>
      </div>
      <div class="row">
        <div
          class="col-5 q-mt-sm"
          :style="!navbar[2].active ? 'color: transparent' : ''"
        >
          Expertise
        </div>
        <q-btn flat dense class="col-5 q-ml-sm btn-fixed-width">
          <img src="src/assets/img/navbar/middle_o.png" />
        </q-btn>
      </div>
    </div>

    <q-footer class=""
      ><q-toolbar class="footer-tb transparent silkfont">
        <q-btn flat dense class="q-mr-md q-ml-md q-mb-md q-mt-ml" label="">
          <img src="src/assets/img/logo/asgard_logo.png" />
        </q-btn>
        <q-btn flat dense label="" class="q-mr-md q-mb-md">
          <img src="src/assets/img/logo/argos_logo.png" />
        </q-btn>
        <q-btn flat dense label="" class="q-mr-md q-mb-md">
          <img src="src/assets/img/logo/abyss_logo.png" />
        </q-btn>
        <q-space />
        <q-btn
          flat
          dense
          no-caps
          class="q-mr-md footer-link"
          label="Mentions Légales"
        />
        <q-btn
          flat
          dense
          no-caps
          label="Politiques de confidentialité"
          class="q-mr-md footer-link"
        />
        <q-btn
          flat
          dense
          no-caps
          label="Atlas©2024"
          class="q-mr-md footer-link"
        />
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

    const navbarIndex = ref(0);
    provide('nav-key', navbarIndex);
    const navbar = ref([
      { name: 'accueil', active: true },
      { url: 'agence', active: false },
      { url: 'expertise', active: false },
    ]);

    const backgroundClass = computed(() => {
      const t = backgroundUrlIndex.value;
      return backgroundImages[t].url;
    });

    const agenceDrop = ref(false);

    // Méthodes pour changer l'image de fond
    function changeBackground(newIndex) {
      // Désactivez toutes les images
      backgroundImages.forEach((bg) => (bg.active = false));
      // Activez la nouvelle image
      backgroundImages[newIndex].active = true;
    }

    function changeNavbar(newIndex) {
      if (newIndex > 3) {
        navbar.value.forEach((nb) => (nb.active = false));
      } else {
        navbar.value.forEach((nb) => (nb.active = false));
        navbar.value[newIndex].active = true;
      }
    }
    // Observateurs pour gérer le changement d'image de fond
    watch(
      () => backgroundUrlIndex.value,
      (newIndex) => {
        changeBackground(newIndex);
      }
    );
    watch(
      () => navbarIndex.value,
      (newIndex) => {
        changeNavbar(newIndex);
      }
    );
    return {
      backgroundClass,
      backgroundImages,
      navbar,
      agenceDrop,
    };
  },
});
</script>

<style lang="scss">
.header-tb,
.footer-tb {
  color: #ffffff;
  text-transform: capitalize;
  font-weight: 200 !important;
}

.header-link {
  font-size: 1.6em;
}

.footer-link {
  font-size: 1.2em;
  font-weight: 100 !important;
}
.navbar-btn {
  position: absolute;
  top: 40%;
  right: 2%;
  text-transform: capitalize;
}
.nav-txt {
  font-size: 50px !important;
  font-weight: 100;
}
.btn-fixed-width {
  width: 50px;
  // height: 50px;
  border-radius: 50%;
}
.agence-menu {
  border-radius: 0;
  background-color: transparent;
  // background-color: rgba(black, 0.3) !important;
  background-image: linear-gradient(
    to bottom,
    rgba($color: #ffffff, $alpha: 0),
    rgba($color: #1e024d, $alpha: 0.8)
  ) !important;
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

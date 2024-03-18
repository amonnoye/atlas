<template>
  <q-layout
    view="hHh lpr fFf"
    class="gome"
    :style="{ backgroundImage: 'url(' + backgroundClass + ')' }"
  >
    <q-header>
      <q-toolbar class="header-tb position-relative" style="padding-left: 0%">
        <div class="background-project" v-if="headerIndex == 2">
          <div class="row full-width full-height">
            <div class="col-4"></div>
            <div class="col-8 bg-project"></div>
          </div>
        </div>
        <q-btn flat dense label="" class="q-ml-lg q-pt-lg" to="/home">
          <img src="../assets/img/logo/logoxs.png" />
        </q-btn>
        <q-space />
        <q-btn
          flat
          no-caps
          unelevated
          label="Accueil"
          to="/home"
          class="header-link q-pt-lg"
          :class="headerIndex == 0 ? 'header-active' : ''"
        />
        <q-btn
          flat
          no-caps
          unelevated
          label="Agence"
          to="/agence"
          class="header-link q-pt-lg"
          @mouseover="agenceDrop = true"
          :class="headerIndex == 1 ? 'header-active' : ''"
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
              <q-item style="height: 10px !important">
                <q-item-section></q-item-section>
              </q-item>
              <q-item active-class="" clickable to="/expertise">
                <q-item-section class="agence-menu-txt"
                  >Expertise</q-item-section
                >
              </q-item>
              <q-item active-class="" clickable to="/chiffre">
                <q-item-section class="agence-menu-txt"
                  >Nos chiffres</q-item-section
                >
              </q-item>
              <q-item active-class="" clickable to="/equipe">
                <q-item-section class="agence-menu-txt">Équipe</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-menu
            v-model="agenceDrop"
            @mouseleave="agenceDrop = false"
            fit
            class="agence-menu-2 silkfont"
            anchor="top left"
          >
            <q-list style="min-width: 100px">
              <q-item>
                <q-item-section></q-item-section>
              </q-item>
              <q-item style="height: 10px !important">
                <q-item-section></q-item-section>
              </q-item>
              <q-item active-class="" clickable to="/expertise">
                <q-item-section class="agence-menu-txt"
                  >Expertise</q-item-section
                >
              </q-item>
              <q-item active-class="" clickable to="/chiffre">
                <q-item-section class="agence-menu-txt"
                  >Nos chiffres</q-item-section
                >
              </q-item>
              <q-item active-class="" clickable to="/equipe">
                <q-item-section class="agence-menu-txt">Équipe</q-item-section>
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
          :class="headerIndex == 2 ? 'header-active' : ''"
        />
        <q-btn
          flat
          no-caps
          unelevated
          label="Contact"
          to="/contact"
          class="header-link q-pt-lg"
          :class="headerIndex == 3 ? 'header-active' : ''"
        />
        <q-btn
          flat
          dense
          label=""
          class="q-ml-lg q-pt-lg"
          :href="link_fb"
          target="_blank"
        >
          <img src="../assets/img/logo/facebook.png" />
        </q-btn>
        <q-btn
          flat
          dense
          label=""
          class="q-ml-sm q-pt-lg"
          :href="link_insta"
          target="_blank"
        >
          <img src="../assets/img/logo/instagram.png" />
        </q-btn>
        <q-btn
          flat
          dense
          label=""
          class="q-ml-sm q-mr-lg q-pt-lg"
          :href="link_lkd"
          target="_blank"
        >
          <img src="../assets/img/logo/linkedin.png" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <!-- <Transition name="slide" mode="in-out"> -->
        <!-- <CustomTransition transitionName="fade" mode="out-in"> -->
        <component :is="Component" />
        <!-- </Transition> -->
        <!-- </CustomTransition> -->
      </router-view>
    </q-page-container>

    <div class="navbar-btn silkfont" v-if="navbarIsShown">
      <div class="row">
        <div
          class="col-5 q-mt-sm"
          :style="!navbar[0].active ? 'color: transparent' : ''"
        >
          Accueil
        </div>
        <q-btn
          @click="goPage(0)"
          flat
          dense
          label=""
          class="col-5 q-ml-md btn-fixed-width"
        >
          <img :src="!navbar[0].active ? middleO : middleF" />
          <img
            style="position: absolute; bottom: 90%"
            src="../assets/img/navbar/bar.png"
          />
        </q-btn>
      </div>
      <div class="row">
        <div
          class="col-5 q-mt-lg q-mb-md"
          :style="!navbar[1].active ? 'color: transparent' : ''"
        >
          Agence
        </div>
        <q-btn
          @click="goPage(1)"
          flat
          dense
          class="col-5 q-ml-md q-mb-md q-mt-md btn-fixed-width"
        >
          <img :src="!navbar[1].active ? middleO : middleF" />
        </q-btn>
      </div>
      <div class="row">
        <div
          class="col-5 q-mt-sm"
          :style="!navbar[2].active ? 'color: transparent' : ''"
        >
          Expertise
        </div>
        <q-btn
          @click="goPage(2)"
          flat
          dense
          class="col-5 q-ml-md btn-fixed-width"
        >
          <img :src="!navbar[2].active ? middleO : middleF" />
          <img
            style="position: absolute; top: 90%"
            src="../assets/img/navbar/bar.png"
          />
        </q-btn>
      </div>
    </div>

    <q-footer class=""
      ><q-toolbar class="footer-tb transparent silkfont position-relative">
        <div class="background-project" v-if="headerIndex == 2">
          <div class="row full-width full-height">
            <div class="col-4"></div>
            <div class="col-8 bg-project"></div>
          </div>
        </div>
        <q-btn
          flat
          dense
          class="q-mr-md q-ml-md q-mb-md q-mt-ml"
          :href="link_asg"
          target="_blank"
        >
          <img src="../assets/img/logo/asgard_logo.png" />
        </q-btn>
        <q-btn
          flat
          dense
          label=""
          class="q-mr-md q-mb-md"
          :href="link_argos"
          target="_blank"
        >
          <img src="../assets/img/logo/argos_logo.png" />
        </q-btn>
        <q-btn
          flat
          dense
          label=""
          class="q-mr-md q-mb-md"
          :href="link_abyss"
          target="_blank"
        >
          <img src="../assets/img/logo/abyss_logo.png" />
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
import {
  defineComponent,
  provide,
  ref,
  computed,
  watch,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  reactive,
} from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import ScrollToTopTransition from 'components/ScrollToTopTransition.vue';
import CustomTransition from 'components/ScrollToTopTransition.vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    ScrollToTopTransition,
    CustomTransition,
  },

  setup() {
    const agenceDrop = ref(false);
    const router = useRouter();
    const backgroundImages = [
      {
        url: new URL('../assets/img/background/default.webp', import.meta.url)
          .href,
        active: true,
      },
      {
        url: new URL('../assets/img/background/accueil.webp', import.meta.url)
          .href,
        active: false,
      },
      {
        url: new URL('../assets/img/background/chiffre.webp', import.meta.url)
          .href,
        active: false,
      },
      {
        url: new URL('../assets/img/background/contact.webp', import.meta.url)
          .href,
        active: false,
      },
    ];

    const middleO = ref(
      new URL('../assets/img/navbar/middle_o.png', import.meta.url).href
    );
    const middleF = ref(
      new URL('../assets/img/navbar/middle_f.png', import.meta.url).href
    );
    const backgroundUrlIndex = ref(0);
    provide('bg-key', backgroundUrlIndex);

    const navbarIndex = ref(0);
    provide('nav-key', navbarIndex);
    const navbar = ref([
      { name: 'accueil', active: true },
      { url: 'agence', active: false },
      { url: 'expertise', active: false },
    ]);

    const headerIndex = ref(0);
    provide('header-key', headerIndex);
    const header = ref([
      { name: 'accueil', active: true },
      { url: 'agence', active: false },
      { url: 'projets', active: false },
      { url: 'contact', active: false },
    ]);

    const backgroundClass = computed(() => {
      const t = backgroundUrlIndex.value;
      return backgroundImages[t].url;
    });

    // Méthodes pour changer l'image de fond
    function changeBackground(newIndex) {
      // Désactivez toutes les images
      backgroundImages.forEach((bg) => (bg.active = false));
      // Activez la nouvelle image
      backgroundImages[newIndex].active = true;
    }

    const navbarIsShown = ref(true);
    function changeNavbar(newIndex) {
      if (newIndex > 3) {
        navbar.value.forEach((nb) => (nb.active = false));
        navbarIsShown.value = false;
      } else {
        navbar.value.forEach((nb) => (nb.active = false));
        navbar.value[newIndex].active = true;
        navbarIsShown.value = true;
      }
    }

    const handleScroll = (event) => {
      if ([0, 1, 2].indexOf(navbarIndex.value) !== -1) {
        if (event.deltaY > 0) {
          // console.log('Scrolling down');
          navbarIndex.value++;
          if (navbarIndex.value >= 3) navbarIndex.value = 0;
          changeNavbar(navbarIndex.value);
          goPage(navbarIndex.value);
        } else {
          // console.log('Scrolling up');
          navbarIndex.value--;
          if (navbarIndex.value < 0) navbarIndex.value = 2;
          changeNavbar(navbarIndex.value);
          goPage(navbarIndex.value);
        }
      }
    };

    const data = ref();
    const link_fb = ref('');
    const link_insta = ref('');
    const link_lkd = ref('');
    const link_asg = ref('');
    const link_argos = ref('');
    const link_abyss = ref('');
    const link_twitter = ref('');
    const link_youtube = ref('');
    const link = reactive({
      link_fb: link_fb.value,
      link_insta: link_insta.value,
      link_lkd: link_lkd.value,
      link_asg: link_asg.value,
      link_abyss: link_abyss.value,
      link_argos: link_argos.value,
      link_twitter: link_twitter.value,
      link_youtube: link_youtube.value,
    });
    function loadData() {
      api
        .get('/baseinfo')
        .then((response) => {
          data.value = response.data[0];
          link.link_fb = link_fb.value = data.value.link_fb;
          link.link_insta = link_insta.value = data.value.link_insta;
          link.link_lkd = link_lkd.value = data.value.link_lkd;
          link.link_asg = link_asg.value = data.value.link_asgard;
          link.link_abyss = link_abyss.value = data.value.link_abyss;
          link.link_argos = link_argos.value = data.value.link_argos;
          link.link_twitter = link_twitter.value = data.value.link_twitter;
          link.link_youtube = link_youtube.value = data.value.link_youtube;
          // console.log(data.value);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    provide('link-ext', link);

    onBeforeMount(() => {
      loadData();
    });

    onMounted(() => {
      window.addEventListener('wheel', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('wheel', handleScroll);
    });

    const pageList = ['home', 'agence', 'expertise'];

    function goPage(index) {
      router.push({ name: pageList[index] });
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
      navbarIsShown,
      agenceDrop,
      header,
      headerIndex,
      middleO,
      middleF,
      goPage,
      data,
      link_fb,
      link_insta,
      link_lkd,
      link_asg,
      link_abyss,
      link_argos,
    };
  },
});
</script>

<style lang="scss">
.header-tb,
.footer-tb {
  color: #ffffff;

  text-transform: capitalize;
  font-weight: 100 !important;
}

.header-link {
  font-size: 1.6em;
}

.header-active {
  font-weight: 600;
}

.header-active::before {
  content: '';
  position: absolute;
  left: 15%;
  top: 3em;
  width: 1.6em;
  height: 0.1em;
  transform: translateX(50%);
  background: white;
  z-index: 1;
}

.footer-link {
  font-size: 1.2em;
  font-weight: 100 !important;
}
.navbar-btn {
  position: absolute;
  top: 44%;
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
  position: relative;
  z-index: 1;
  border-radius: 0;
  background-color: transparent;
  // background-color: rgba(black, 0.3) !important;
  background-image: linear-gradient(
    to bottom,
    rgba($color: #ffffff, $alpha: 0),
    rgba($color: #1e024d, $alpha: 1)
  ) !important;
  mix-blend-mode: overlay !important;
  box-shadow: none;
  .q-item-section {
  }
}

.agence-menu-2 {
  position: relative;
  z-index: 1;
  border-radius: 0;
  background-color: transparent;
  box-shadow: none;
  // background-color: rgba(black, 0.3) !important;
  // background-image: linear-gradient(
  //   to bottom,
  //   rgba($color: #ffffff, $alpha: 0),
  //   rgba($color: #1e024d, $alpha: 1)
  // ) !important;
  // mix-blend-mode: color !important;
  // #1e024d
  .q-item-section {
  }
}

.agence-menu-txt {
  //background-color: aqua;
  mix-blend-mode: normal !important;
}

.background {
  background-size: auto 10%;
  // -webkit-transition: background-image 1s ease-in-out;
  // transition: background-image 1s ease-in-out;
}
.accueil {
  background-image: url('assets/img/background/accueil.webp');
}
.chiffre {
  background-image: url('assets/img/background/chiffre.webp');
}
.contact {
  background-image: url('assets/img/background/contact.webp');
}
.default {
  background-image: url('assets/img/background/default.webp');
}

.gome {
  position: relative; // For absolute positioning of child elements
  background-color: $accent;
  background-size: cover; // Cover the entire background
  background-position: center; // Center the background image
  background-repeat: no-repeat; // Do not repeat the image
}

.background-project {
  position: absolute;
  // background-color: #1e024d;
  height: 100%;
  width: 100%;
}

.bg-project {
  background-color: #1e024d;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.roll-enter-active,
.roll-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.roll-enter-from,
.roll-leave-to {
  transform: rotate(90deg) scale(0);
  opacity: 0;
}
.roll-enter-to,
.roll-leave-from {
  transform: rotate(0deg) scale(1);
  opacity: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>

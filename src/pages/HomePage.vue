<template class="home">
  <div class="position-relative">
    <div class="position-absolute atlas-back"></div>
    <div class="img-container">
      <transition
        appear
        enter-active-class="animated slow fadeInLeft"
        leave-active-class="animated slow fadeOutLeft"
        @after-leave="onAfterLeave"
        @after-enter="onAfterEnter"
      >
        <q-img
          v-if="show"
          alt="Atlas - Agence de social média marketing et d'influence"
          src="../assets/img/logo/logo_atlas.png"
          width="55vw"
          class="atlas-logo"
        >
        </q-img
      ></transition>
      <transition
        appear
        enter-active-class="animated slow fadeInRight"
        leave-active-class="animated slow fadeOutRight"
      >
        <q-img
          alt="Atlas - Agence de social média marketing et d'influence"
          src="../assets/img/circle.png"
          width="15vw"
          class="project-btn"
          @click="gotoProject"
          v-if="show"
        >
          <div
            class="absolute-full bg-transparent flex flex-center silkfont text-center"
          >
            Projets
          </div>
        </q-img>
      </transition>
    </div>
  </div>
</template>

<script>
import { inject, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

export default {
  components: {},
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const background = inject('bg-key');
    background.value = 1;
    const nav = inject('nav-key');
    nav.value = 0;
    const toggleAnim = inject('toggle-anim');
    const show = ref(false);
    const header = inject('header-key');
    header.value = 0;

    function gotoProject() {
      //show.value = !show.value;
      const navigationResult = router.push({ name: 'projects' });
    }

    const goPage = inject('goPage');
    // called when the leave transition has finished and the
    // element has been removed from the DOM.
    function onAfterLeave(el) {
      console.log('leave after');
      show.value = true;
      goPage(nav.value);
      // const navigationResult = router.push({ name: 'projects' });
    }

    onMounted(() => {
      show.value = true;
    });
    function onBeforeEnter(el) {
      show.value = true;
      console.log('before enter ' + toggleAnim.value);
      //toggleAnim.value = true;
    }
    const isShown = ref(false);
    function onAfterEnter(el) {
      console.log('aftert enter ' + toggleAnim.value);
      isShown.value = true;
    }

    watch(toggleAnim, (newVal) => {
      if (isShown.value) {
        show.value = false;
      }
    });
    // api
    //   .get('http://dev2.agence-atlas.fr/api/team') // This will work
    //   .then(function (response) {
    //     if (response.data.error) {
    //       this.errorMsg = response.data.message;
    //     } else {
    //       this.projects = response.data.projects;
    //     }
    //   });

    //loadData();

    return {
      gotoProject,
      show,
      onAfterLeave,
      onAfterEnter,
      onBeforeEnter,
      toggleAnim,
    };
  },
};
</script>

<style lang="scss" scoped>
.atlas-logo {
  // position: absolute;
  // top: 30%;
  margin-left: 5.1vw;
  opacity: 0.5;
  // filter: invert(30%) !important;
  transition: transform 0.5s ease;
}

.project-btn {
  position: absolute;
  top: 81%;
  left: 88%;
  font-size: 3vw;
}

.project-btn:hover {
  // background-color: aqua;
  scale: 1.1;
}
.img-container {
  position: absolute;
  top: 30%;
}
.atlas-back {
  width: 50%;
  background-image: url('assets/img/background/accueil.webp');
}
</style>

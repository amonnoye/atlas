<template class="agence silkfont">
  <div class="position-relative">
    <div class="txt-container">
      <!-- <Transition name="slide-fade" @after-leave="onAfterLeave"> -->
      <transition
        appear
        enter-active-class="animated slow fadeInDown"
        leave-active-class="animated slow fadeOutUp"
      >
        <div v-if="show" class="row position-relative">
          <div class="title">We are atlas</div>
        </div>
      </transition>
      <!-- </Transition> -->

      <div class="row position-relative">
        <transition
          appear
          enter-active-class="animated slow fadeInLeft"
          leave-active-class="animated slow fadeOutLeft"
          @after-leave="onAfterLeave"
          @after-enter="onAfterEnter"
        >
          <div v-if="show" class="subtitle">
            Nous portons sur nos épaules <br />
            votre image et réputation digitale.
          </div>
        </transition>
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
            @click="goToChiffre()"
            v-if="show"
          >
            <div
              class="absolute-full bg-transparent flex flex-center silkfont"
              style="padding-left: 2.2vw"
            >
              Nos chiffres
            </div>
          </q-img>
        </transition>
      </div>
    </div>
    <transition
      appear
      enter-active-class="animated slow fadeInLeft"
      leave-active-class="animated slow fadeOutLeft"
    >
      <div
        class="carroussel-container"
        v-if="show && valeur && valeur.length > 0"
      >
        <q-carousel
          v-model="slide"
          transition-prev="slide-down"
          transition-next="slide-up"
          vertical
          swipeable
          infinite
          animated
          autoplay
          control-color="white"
          navigation
          navigation-position="left"
          padding
          height="45vh"
          class="bg-transparent text-white rounded-borders"
        >
          <template v-slot:navigation-icon="{ active, btnProps, onClick }">
            <q-btn
              v-if="active"
              size="0.7vh"
              icon="radio_button_checked"
              flat
              round
              dense
              style="margin: 0; padding: 0.3vh"
              @click="onClick"
            />
            <q-btn
              v-else
              size="0.6vh"
              :icon="btnProps.icon"
              flat
              round
              dense
              style="margin: 0; padding: 0.3vh"
              @click="onClick"
            />
          </template>

          <q-carousel-slide
            :name="val.id"
            class="column no-wrap"
            v-for="val in valeur"
            v-bind:key="val.id"
          >
            <div class="q-mt-md val-title">{{ val.title }}</div>
            <div class="q-mt-md val-text">{{ val.texte }}</div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </transition>
  </div>
</template>

<script>
import { inject, ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';

export default {
  components: {},
  setup() {
    const router = useRouter();
    const background = inject('bg-key');
    background.value = 0;

    const slide = ref(0);
    const nav = inject('nav-key');
    nav.value = 1;

    const header = inject('header-key');
    header.value = 1;

    const valeur = ref([]);
    // console.log(valeur);

    const data = ref();
    function loadData() {
      api
        .get('/valeurs')
        .then((response) => {
          data.value = response.data;
          valeur.value = response.data;
          if (valeur.value.length > 0) {
            slide.value = valeur.value[0].id;
          }

          console.log(valeur.value);
        })
        .catch((error) => {
          console.log(error);
          $q.notify('Une erreur s"est produite"');
        });
    }
    loadData();
    function goToChiffre() {
      const navigationResult = router.push({ name: 'chiffre' });
    }

    const toggleAnim = inject('toggle-anim');
    const show = ref(false);
    const goPage = inject('goPage');
    function onAfterLeave(el) {
      console.log('leave after' + nav.value);
      show.value = true;
      goPage(nav.value);
      // const navigationResult = router.push({ name: 'projects' });
    }
    const isShown = ref(false);
    function onAfterEnter(el) {
      console.log('aftert enter ' + toggleAnim.value);
      isShown.value = true;
    }

    onMounted(() => {
      show.value = true;
    });

    watch(toggleAnim, (newVal) => {
      if (isShown.value) {
        show.value = false;
      }
    });
    return {
      slide,
      valeur,
      goToChiffre,
      onAfterLeave,
      show,
      onAfterEnter,
    };
  },
};
</script>

<style lang="scss">
.q-carousel__navigation--left > .q-carousel__navigation-inner,
.q-carousel__navigation--right > .q-carousel__navigation-inner {
  justify-content: flex-start !important;
  margin-top: 3vw;
}
</style>
<style lang="scss" scoped>
.title {
  font-size: 2.7em;
  text-transform: uppercase;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 100;
  letter-spacing: 0.4dvh;
}
.subtitle {
  font-family: 'mysilk';
  font-size: 3vmax;
  text-transform: uppercase;
  color: white;
  // font-weight: 100;
  letter-spacing: 0.4dvh;
}

.row {
  // margin-left: 10vw;
  // margin-right: 10vw;
}
.txt-container {
  position: absolute;
  top: 28%;
  margin-left: 10vw;
}

.carroussel-container {
  position: absolute;
  width: 26%;
  top: 55%;
  margin-left: 12vw;
  background-color: transparent;
}

.val-title {
  text-align: left !important;
  margin: 0;
  font-size: 2.6vw;
}
.val-text {
  font-size: 1vmax;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 100;
  overflow-wrap: break-word;
}
.project-btn {
  position: absolute;
  top: 80%;
  left: 90%;
  font-size: 3.5vw;
  z-index: 1;
  line-height: 3.5vw;
}

.project-btn:hover {
  // background-color: aqua;
  scale: 1.1;
}
</style>

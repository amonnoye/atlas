<template class="agence silkfont">
  <div class="position-relative">
    <div class="txt-container">
      <div class="row position-relative">
        <div class="title">We are atlas</div>
      </div>
      <div class="row position-relative">
        <div class="subtitle">
          Nous portons sur nos épaules <br />
          votre image et réputation digitale.
        </div>
        <q-img
          alt="Atlas - Agence de social média marketing et d'influence"
          src="src/assets/img/circle.png"
          width="15vw"
          class="project-btn"
        >
          <div
            class="absolute-full bg-transparent flex flex-center silkfont"
            style="padding-left: 2.2vw"
          >
            Nos chiffres
          </div>
        </q-img>
      </div>
    </div>
  </div>
  <!-- <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      vertical
      transition-prev="slide-down"
      transition-next="slide-up"
      swipeable
      animated
      control-color="white"
      navigation-icon="radio_button_unchecked"
      navigation
      padding
      arrows
      height="300px"
      class="bg-purple text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-icon name="style" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <q-icon name="live_tv" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="layers" class="column no-wrap flex-center">
        <q-icon name="layers" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="map" class="column no-wrap flex-center">
        <q-icon name="terrain" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div> -->
</template>

<script>
import { inject, ref } from 'vue';

export default {
  components: {},
  setup() {
    const background = inject('bg-key');
    background.value = 0;

    const nav = inject('nav-key');
    nav.value = 1;
    return {};
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 3.5vh;
  text-transform: uppercase;
  color: white;
}
.subtitle {
  font-family: 'mysilk';
  font-size: 6vh;
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
.project-btn {
  position: absolute;
  top: 80%;
  left: 90%;
  font-size: 3.5vw;
  z-index: 1;
  line-height: 3.5vw;
}
</style>

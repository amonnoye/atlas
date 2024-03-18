<!-- <template class="home">
  <div>
    <div class="row">
      <div class="col title silkfont">Nos Chiffres</div>
    </div>
  </div>
</template> -->

<template>
  <q-page class="flex flex-center">
    <div class="full-width" style="padding-left: 9vw">
      <div class="text-h3 title silkfont q-mb-xl">{{ title }}</div>
      <div class="row q-col-gutter-md" style="width: 50%">
        <div v-for="item in data" :key="item.id" class="col-auto col-sm-4">
          <div class="text-n">
            <NumberAnimation
              :ref="item.num"
              :from="0"
              :to="item.num"
              :format="theFormat"
              :duration="1.2"
              autoplay
              easing="linear"
            />
          </div>
          <div class="text-caption" style="">
            {{ item.txt }}
          </div>
        </div>
      </div>
      <q-btn fab unelevated flat class="home-button" to="/home">
        <div class="row items-center no-wrap">
          <q-icon left name="arrow_left" size="xl" />
          <div class="text-center">Accueil</div>
        </div>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import { inject, ref } from 'vue';
import NumberAnimation from 'vue-number-animation';

export default {
  components: {
    NumberAnimation,
  },
  setup() {
    const background = inject('bg-key');
    background.value = 2;

    const nav = inject('nav-key');
    nav.value = 4;

    const header = inject('header-key');
    header.value = 1;

    const title = 'Nos Chiffres';
    const data = ref([
      {
        id: 0,
        num: 38,
        txt: 'Jeux concours organisés / an',
      },
      {
        id: 1,
        num: 44,
        txt: 'Bilans\n présentés / an',
      },
      {
        id: 2,
        num: 65,
        txt: 'Partenariats influence / an',
      },
      {
        id: 3,
        num: 120,
        txt: 'Calendriers éditoriaux / an',
      },
      {
        id: 4,
        num: 300,
        txt: 'Unboxings adressés / an',
      },
      {
        id: 5,
        num: 2000,
        txt: 'Plus de 2 000 publications / an',
      },
    ]);

    const theFormat = (value) => {
      return Math.round(value).toString();
    };

    return {
      theFormat,
      title,
      data,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-transform: uppercase;
  font-size: 3.2vw;
  letter-spacing: 0.1vw;
}

.text-n {
  font-size: 4.9vw;
  font-weight: 100;
  color: white;
}

.text-caption {
  font-size: 1.8vw; /* Adjust the size as needed for your design */
  color: white;
  letter-spacing: 0.01vw;
  line-height: 2vw;
  white-space: pre-line; /* This will respect newlines in the text */
}
.home-button {
  position: fixed; /* Positionnement fixe par rapport à la fenêtre du navigateur */
  bottom: 1vh; /* Espacement par rapport au bas de la page */
  right: 50%; /* Espacement par rapport au côté droit de la page */
  z-index: 2001; /* Assurez-vous qu'il est au-dessus des autres éléments de la page */
  font-size: 1.4vw;
  color: #ffffff;
  text-transform: capitalize;
  border-radius: 5%;
}

// @media screen and (max-width: 600px) {
//   .text-n {
//     font-size: 2rem; /* Adjust for mobile view */
//   }

//   .text-caption {
//     font-size: 0.8rem; /* Adjust for mobile view */
//   }
// }
</style>

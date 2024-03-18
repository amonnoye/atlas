<template>
  <div class="logo-scroll-list">
    <q-btn icon="arrow_left" flat @click="scrollLeft" class="scroll-button" />
    <div class="logo-window" ref="logoWindow">
      <div
        class="logo-track position-relative"
        :style="{ transform: `translateX(-${scrollPosition}px)` }"
      >
        <img
          v-for="(logo, index) in duplicatedLogos"
          :src="getImage(selectedLogoIndex === index ? logosel[index] : logo)"
          :key="index"
          :alt="`Logo ${index + 1}`"
          class="logo-item"
          :class="{ 'selected-logo': selectedLogoIndex === index }"
          @click="selectLogo(index)"
        />
      </div>
    </div>
    <q-btn icon="arrow_right" flat @click="scrollRight" class="scroll-button" />
  </div>
</template>

<script>
import {
  ref,
  computed,
  inject,
  watch,
  onMounted,
  nextTick,
  watchEffect,
} from 'vue';

export default {
  props: {
    logos: {
      type: Array,
      required: true,
    },
    logosel: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const logoWindow = ref(null);
    const scrollPosition = ref(0);
    const selectedLogoIndex = inject('pindex');

    //const selectedLogoIndex = ref(-1);
    const logoWidth = ref(0); // Width of each logo including margin
    const visibleCount = ref(7);

    // Dupliquez les logos pour le défilement infini
    const duplicatedLogos = ref([...props.logos, ...props.logos]);

    const isRightEnd = computed(() => {
      // Calcul de la fin de la liste basé sur le pourcentage
      return (
        scrollPosition.value >=
        ((props.logos.length - visibleCount.value) * 100) / visibleCount.value
      );
    });

    function getImage(name) {
      return 'http://dev2.agence-atlas.fr/api/medial/' + name;
    }

    function selectLogo(index) {
      selectedLogoIndex.value = index % props.logos.length;
      console.log(selectedLogoIndex.value);

      // S'assurer que le DOM est à jour avant de calculer les positions
      nextTick().then(() => {
        console.log('qsdqsd');
        let targetIndex = index;
        if (index >= props.logos.length) {
          targetIndex = index - props.logos.length;
        }
        if (logoWindow.value) {
          console.log(scrollPosition.value);
          const halfWindowWidth = logoWindow.value.offsetWidth / 2;
          const logoHalfWidth = logoWidth.value / 2;
          const centerPosition =
            index * logoWidth.value + logoHalfWidth - halfWindowWidth;

          scrollPosition.value = Math.max(centerPosition, 0);
          console.log(scrollPosition.value);
          // Ajustez si le défilement dépasse la fin de la liste des logos
          const maxScrollPosition =
            duplicatedLogos.value.length * logoWidth.value -
            logoWindow.value.offsetWidth;

          console.log(
            maxScrollPosition +
              ' ' +
              scrollPosition.value +
              ' ' +
              centerPosition
          );

          if (scrollPosition.value > maxScrollPosition) {
            scrollPosition.value = maxScrollPosition;
          }

          // Si le logo sélectionné est dans la deuxième moitié des logos dupliqués
        }
      });
    }

    onMounted(() => {
      nextTick().then(() => {
        if (logoWindow.value) {
          // Assurez-vous que les logos ont été chargés et que la largeur peut être mesurée
          const logoElements = logoWindow.value.querySelectorAll('.logo-item');
          if (logoElements.length > 0) {
            logoWidth.value =
              logoElements[0].offsetWidth +
              parseInt(
                window.getComputedStyle(logoElements[0]).marginRight,
                10
              );
          }
        }
      });
    });

    const scrollRight = () => {
      if (
        scrollPosition.value <
        logoWidth.value * (props.logos.length - visibleCount.value)
      ) {
        scrollPosition.value += logoWidth.value;
      } else {
        // Réinitialiser la position pour le défilement infini
        scrollPosition.value = 0;
      }
    };

    const scrollLeft = () => {
      if (scrollPosition.value > 0) {
        scrollPosition.value -= logoWidth.value;
      } else {
        // Réinitialiser la position pour le défilement infini
        scrollPosition.value =
          logoWidth.value * (props.logos.length - visibleCount.value);
      }
    };

    watchEffect(() => {
      const handleResize = () => {
        if (logoWindow.value) {
          const logoElements = logoWindow.value.querySelectorAll('.logo-item');
          if (logoElements.length > 0) {
            logoWidth.value =
              logoElements[0].offsetWidth +
              parseInt(
                window.getComputedStyle(logoElements[0]).marginRight,
                10
              );
          }
        }
      };

      // Appel initial pour la configuration
      handleResize();

      // Setup l'écouteur d'événements
      window.addEventListener('resize', handleResize);

      // Fonction de nettoyage pour éviter les fuites de mémoire
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    // Surveiller le redimensionnement de la fenêtre pour ajuster la largeur de logo
    // watch(
    //   () => logoWindow.value.offsetWidth,
    //   (newWidth) => {
    //     if (logoWindow.value) {
    //       const logoElements = logoWindow.value.querySelectorAll('.logo-item');
    //       if (logoElements.length > 0) {
    //         logoWidth.value =
    //           logoElements[0].offsetWidth +
    //           parseInt(
    //             window.getComputedStyle(logoElements[0]).marginRight,
    //             10
    //           );
    //       }
    //     }
    //   }
    // );

    const getImageUrl = (name) => {
      return new URL(`../assets/img/project/${name}`, import.meta.url).href;
    };

    return {
      duplicatedLogos,
      logoWindow,
      scrollPosition,
      scrollLeft,
      scrollRight,
      isRightEnd,
      selectLogo,
      selectedLogoIndex,
      getImageUrl,
      getImage,
    };
  },
};
</script>

<style scoped>
.logo-scroll-list {
  display: flex;
}

.logo-window {
  overflow: hidden;
  width: calc(100vw - 4vw);
}

.logo-track {
  display: flex;
  transition: transform 0.5s ease;
  will-change: transform;
}

.logo-item {
  /* width en pourcentage pour une largeur réactive */
  width: calc(
    100vw / 8 - 2vw
  ) !important; /*Ici, 8 est le nombre de logos visibles et 2vw est l'espacement total à droite */
  /*height: auto !important;*/
  margin-right: 2vw; /* Espace entre les logos */
  object-fit: contain;
}
.selected-logo {
  /* border: 2px solid #c5a0d3; /* Style pour le logo sélectionné */
  color: #c5a0d3;
  /* background-color: #c5a0d3; */
}
.scroll-button {
  min-width: auto;
  color: white;
}

.selected-logo::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -10px; /* Ajustez en fonction de la distance souhaitée du bas du logo */
  width: 70%; /* Ajustez en fonction de la largeur souhaitée du trait */
  height: 2px; /* Ajustez en fonction de l'épaisseur souhaitée du trait */
  background: blue; /* Couleur du trait */
  transform: translateX(-50%);
  z-index: 1;
}
</style>

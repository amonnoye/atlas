<template>
  <div class="logo-scroll-list">
    <q-btn icon="arrow_left" flat @click="scrollLeft" class="scroll-button" />
    <div class="logo-window" ref="logoWindow">
      <div
        class="logo-track"
        :style="{ transform: `translateX(-${scrollPosition}px)` }"
      >
        <img
          v-for="(logo, index) in duplicatedLogos"
          :src="'src/assets/img/project/' + logo"
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
import { ref, computed, watch, onMounted, nextTick, watchEffect } from 'vue';

export default {
  props: {
    logos: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const logoWindow = ref(null);
    const scrollPosition = ref(0);

    const selectedLogoIndex = ref(-1);
    const logoWidth = ref(0); // Width of each logo including margin
    const visibleCount = ref(7);

    // Dupliquez les logos pour le défilement infini
    const duplicatedLogos = [...props.logos, ...props.logos];

    const isRightEnd = computed(() => {
      // Calcul de la fin de la liste basé sur le pourcentage
      return (
        scrollPosition.value >=
        ((props.logos.length - visibleCount.value) * 100) / visibleCount.value
      );
    });

    function selectLogo(index) {
      selectedLogoIndex.value = index;
      // Calculez et ajustez la position pour centrer le logo
      const logosBeforeSelected = index;
      const offset = logosBeforeSelected * logoWidth.value;
      const halfWindowWidth = logoWindow.value.offsetWidth / 2;
      const logoHalfWidth = logoWidth.value / 2;
      scrollPosition.value = Math.max(
        offset + logoHalfWidth - halfWindowWidth,
        0
      );
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

    return {
      duplicatedLogos,
      logoWindow,
      scrollPosition,
      scrollLeft,
      scrollRight,
      isRightEnd,
      selectLogo,
      selectedLogoIndex,
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
    100vw / 8 - 4vw
  ); /* Ici, 8 est le nombre de logos visibles et 2vw est l'espacement total à droite */
  /*height: auto !important;*/
  margin-right: 2vw; /* Espace entre les logos */
}
.selected-logo {
  /* border: 2px solid #c5a0d3; /* Style pour le logo sélectionné */
  color: #c5a0d3;
}
.scroll-button {
  min-width: auto;
  color: white;
}
</style>

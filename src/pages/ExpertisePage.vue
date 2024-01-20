<template class="expertise silkfont">
  <q-page padding class="flex">
    <div class="position-relative">
      <div class="txt-container">
        <div class="row position-relative">
          <div class="subtitle">
            L'agence de social média <br />
            Marketing et D'influence
          </div>
          <q-img
            alt="Atlas - Agence de social média marketing et d'influence"
            src="src/assets/img/circle_expert.png"
            width="20vw"
            class="project-btn"
            @click="goToChiffre()"
          >
            <div class="absolute-full bg-transparent flex flex-center silkfont">
              L'équipe
            </div>
          </q-img>
        </div>
      </div>
      <div class="services-section">
        <div class="row q-col-gutter-md" style="width: 50vw; height: 50vh">
          <service-card
            v-for="service in services"
            :key="service.title"
            :icon="service.icon"
            :title="service.title"
            :description="service.description"
            class="col-auto col-sm-4 q-px-md"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { inject, ref, defineComponent } from 'vue';
import ServiceCard from 'components/ServiceCard.vue';

export default {
  components: {
    ServiceCard,
  },
  setup() {
    const background = inject('bg-key');
    background.value = 0;

    const nav = inject('nav-key');
    nav.value = 2;

    const header = inject('header-key');
    header.value = 1;

    const services = [
      {
        icon: 'fas fa-book-open',
        title: 'Stratégie Sociale & Éditoriale',
        description:
          'Nous construisons une stratégie unique pour chacun de nos clients.',
      },
      {
        icon: 'mode',
        title: 'Création & Rédaction de contenus',
        description: 'Nous inventons des contenus adaptés à chaque plateforme',
      },
      {
        icon: 'fas fa-comments',
        title: 'Community Management',
        description:
          'Nous construisons une stratégie unique pour chacun de nos clients.',
      },
      {
        icon: 'lightbulb_outline',
        title: 'Stratégie Sociale & Éditoriale',
        description:
          'Nous construisons une stratégie unique pour chacun de nos clients.',
      },
      {
        icon: 'fas fa-box-open',
        title: 'Stratégie Sociale & Éditoriale',
        description:
          'Nous construisons une stratégie unique pour chacun de nos clients.',
      },
      {
        icon: 'phonelink',
        title: 'Stratégie Sociale & Éditoriale',
        description:
          'Nous construisons une stratégie unique pour chacun de nos clients.',
      },
    ];

    return {
      services,
    };
  },
};
</script>

<style lang="scss" scoped>
.project-btn {
  position: absolute;
  top: 8%;
  left: 90%;
  font-size: 3.5vw;
  z-index: 1;
  line-height: 3.5vw;
}

.project-btn:hover {
  // background-color: aqua;
  scale: 1.1;
}

.title {
  font-size: 1.5vw;
  text-transform: uppercase;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 100;
  letter-spacing: 0.4dvh;
}
.subtitle {
  font-family: 'mysilk';
  font-size: 3vw;
  text-transform: uppercase;
  color: white;
  // font-weight: 100;
  letter-spacing: 0.4dvh;
}

.txt-container {
  position: absolute;
  top: 8%;
  margin-left: 10vw;
}

.services-section {
  position: absolute;
  top: 35%;
  margin-left: 10vw;
}
</style>

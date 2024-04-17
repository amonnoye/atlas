<template class="expertise silkfont">
  <q-page padding class="flex">
    <div class="position-relative">
      <div class="txt-container">
        <div class="row position-relative">
          <transition
            appear
            enter-active-class="animated slow slideInDown"
            leave-active-class="animated slow slideOutUp"
          >
            <div class="subtitle" v-if="show">
              L'agence de social média <br />
              Marketing et D'influence
            </div>
          </transition>
          <transition
            appear
            enter-active-class="animated slow slideInRight"
            leave-active-class="animated slow slideOutRight"
          >
            <q-img
              v-if="show"
              alt="Atlas - Agence de social média marketing et d'influence"
              src="../assets/img/circle_expert.png"
              width="18vw"
              class="project-btn"
              @click="goToTeam()"
            >
              <div
                class="absolute-full bg-transparent flex flex-center silkfont"
              >
                L'équipe
              </div>
            </q-img></transition
          >
        </div>
      </div>
      <transition
        appear
        enter-active-class="animated slow slideInLeft"
        leave-active-class="animated slow slideOutLeft"
        @after-leave="onAfterLeave"
        @after-enter="onAfterEnter"
      >
        <div v-if="show" class="services-section">
          <div class="row" style="width: 54vw; height: 45vh">
            <service-card
              v-for="service in services"
              :key="service.title"
              :icon="service.icon"
              :title="service.title"
              :description="service.description"
              class="col-auto col-sm-4 q-pr-md"
            />
          </div>
        </div>
      </transition>
    </div>
  </q-page>
</template>
<script>
import { inject, ref, defineComponent, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ServiceCard from 'components/ServiceCard.vue';

export default {
  components: {
    ServiceCard,
  },
  setup() {
    const router = useRouter();
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
        title: 'Brand \n content',
        description:
          "Nous créons des contenus insmpirants pour créer de l'engagement",
      },
      {
        icon: 'fas fa-box-open',
        title: "L'influence et unboxing",
        description:
          "Nous montons des programmes d'influence pour démultiplier la visibilité de vos contenus",
      },
      {
        icon: 'phonelink',
        title: 'Activations & expériences digitales',
        description:
          'Nous contruisons une stratégie unique pour chacun de nos clients',
      },
    ];

    function goToTeam() {
      router.push({ name: 'equipe' });
    }

    const toggleAnim = inject('toggle-anim');
    const show = ref(false);
    const goPage = inject('goPage');
    function onAfterLeave(el) {
      console.log('leave after');
      show.value = true;
      goPage(nav.value);
      // const navigationResult = router.push({ name: 'projects' });
    }

    onMounted(() => {
      show.value = true;
    });

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
    return {
      services,
      goToTeam,
      show,
      onAfterLeave,
      onAfterEnter,
    };
  },
};
</script>

<style lang="scss" scoped>
.project-btn {
  position: absolute;
  top: 8%;
  left: 94%;
  font-size: 3vw;
  z-index: 1;
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
  top: 10%;
  margin-left: 9vw;
}

.services-section {
  position: absolute;
  top: 35%;
  margin-left: 9vw;
}
</style>

<template class="home">
  <div class="position-relative">
    <div class="img-container">
      <q-img
        alt="Atlas - Agence de social média marketing et d'influence"
        src="src/assets/img/logo/logo_atlas.png"
        width="55vw"
        class="atlas-logo"
      >
      </q-img>
      <q-img
        alt="Atlas - Agence de social média marketing et d'influence"
        src="src/assets/img/circle.png"
        width="15vw"
        class="project-btn"
        @click="gotoProject"
      >
        <div class="absolute-full bg-transparent flex flex-center silkfont">
          Projets
        </div>
      </q-img>
    </div>
  </div>
</template>

<script>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {},
  setup() {
    const router = useRouter();

    const background = inject('bg-key');
    background.value = 1;
    const nav = inject('nav-key');
    nav.value = 0;

    function gotoProject() {
      console.log('lol;');
      const navigationResult = router.push({ name: 'projects' });
    }

    return {
      gotoProject,
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
.atlas-img {
}
</style>

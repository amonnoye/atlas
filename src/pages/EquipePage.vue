<template class="project">
  <div class="position-relative">
    <div class="txt-container">
      <div class="row position-relative">
        <div class="title">We are titans</div>
      </div>
      <div class="row position-relative">
        <div class="subtitle">
          Nous sommes des conteurs<br />
          d'épopées digitales...
        </div>
        <div class="subtitle-plus">
          Nous sommes, volubiles, captivants, éloquents, prédicatifs,
          stupéfiants, spontanés, instinctifs, irrévérencieux... et beaucoup
          d'autres choses...
        </div>
        <q-img
          alt="Atlas - Agence de social média marketing et d'influence"
          src="../assets/img/circle.png"
          width="15vw"
          class="project-btn"
          @click="goToChiffre()"
        >
          <div class="absolute-full bg-transparent flex flex-center silkfont">
            Agence
          </div>
        </q-img>
      </div>
    </div>
    <div class="carroussel-container">
      <q-carousel
        v-model="slide"
        transition-prev="slide-left"
        transition-next="slide-right"
        swipeable
        infinite
        animated
        autoplay
        control-color="white"
        arrows
        padding
        height="50vh"
        class="bg-transparent text-white rounded-borders"
      >
        <q-carousel-slide
          :name="val.id"
          class="column no-wrap"
          v-for="val in valeur"
          v-bind:key="val.id"
        >
          <div class="row q-my-lg">
            <div class="col" v-for="member in teamMembers" :key="member.name">
              <q-card class="my-card">
                <div style="width: 70%">
                  <q-img
                    :src="getImageUrl(member.image)"
                    style="background-color: transparent"
                  />
                </div>
                <q-card-section style="border: none">
                  <div class="team-name">{{ member.name }}</div>
                  <div class="team-title">{{ member.role }}</div>
                  <div class="team-text-caption">{{ member.description }}</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
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
    background.value = 0;

    const nav = inject('nav-key');
    nav.value = 4;

    const header = inject('header-key');
    header.value = 1;
    const slide = ref(0);
    const valeur = [
      {
        id: 0,
        title: 'Éloquence',
        text: "Mais nous ne parlons pas pour ne rien dire, Lorsque Atlas prend la parole c'est qu'il y a un intérêt et que c'est pertinent pour votre marque.",
      },
      {
        id: 1,
        title: 'Éloquence2',
        text: "Mais nous ne parlons pas pour ne rien dire, Lorsque Atlas prend la parole c'est qu'il y a un intérêt et que c'est pertinent pour votre marque.",
      },
      {
        id: 2,
        title: 'Éloquence3',
        text: "Mais nous ne parlons pas pour ne rien dire, Lorsque Atlas prend la parole c'est qu'il y a un intérêt et que c'est pertinent pour votre marque.",
      },
      {
        id: 3,
        title: 'Éloquence4',
        text: "Mais nous ne parlons pas pour ne rien dire, Lorsque Atlas prend la parole c'est qu'il y a un intérêt et que c'est pertinent pour votre marque.",
      },
    ];
    console.log(valeur);

    const teamMembers = [
      {
        name: 'Evan Raphalen',
        role: 'DIRECTEUR GÉNÉRAL',
        description:
          "Evan encadre et manage toutes les équipes. Il cumule plus de 10 ans d'expérience au service de ses clients sur la stratégie et la création publicitaire et l'achat média.",
        image: 'evan.png',
      },
      {
        name: 'Camille Ternet',
        role: 'DIRECTEUR associée',
        description:
          'Camille a passé 10 ans chez Publicis pour accompagner des clients de la grande distribution, des constructeurs automobiles et un géant de la téléphonie dans la gestion et',
        image: 'camille.png',
      },
      {
        name: 'Emilie Gérard',
        role: 'Social Media MAnager',
        description:
          "Émilie est en charge de la stratégie social media et de l'influence pour son portefeuille clients",
        image: 'emilie.png',
      },
    ];

    function goToChiffre() {
      const navigationResult = router.push({ name: 'chiffre' });
    }
    const getImageUrl = (name) => {
      return new URL(`../assets/img/team/${name}`, import.meta.url).href;
    };
    return {
      slide,
      valeur,
      teamMembers,
      goToChiffre,
      getImageUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 2.2vw;
  text-transform: uppercase;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 100;
  letter-spacing: 0.4dvh;
}
.subtitle {
  font-family: 'mysilk';
  font-size: 2.8vw;
  text-transform: uppercase;
  color: white;
  // font-weight: 100;
  letter-spacing: 0.64dvh;
}

.row {
  // margin-left: 10vw;
  // margin-right: 10vw;
}
.txt-container {
  position: absolute;
  top: 12%;
  margin-left: 10vw;
}

.carroussel-container {
  position: absolute;
  width: 50%;
  top: 40%;
  margin-left: 9vw;
  background-color: transparent;
}

.val-title {
  text-align: left !important;
  margin: 0;
  font-size: 2.6vw;
}
.val-text {
  font-size: 1vw;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 100;
  overflow-wrap: break-word;
}
.project-btn {
  position: absolute;
  top: 40%;
  left: 87%;
  font-size: 3.5vw;
  z-index: 1;
  line-height: 3.5vw;
}

.project-btn:hover {
  // background-color: aqua;
  scale: 1.1;
}

.my-card {
  background-color: transparent;
  box-shadow: none;
  color: white;
}

.team-name {
  font-size: 1.5vw;
}

.team-title {
  text-transform: uppercase;
  font-size: 1vw;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.team-text-caption {
  font-size: 0.8vw;
}

.subtitle-plus {
  position: absolute;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1vw;
  width: 40vw !important;
  top: 100%;
}
</style>

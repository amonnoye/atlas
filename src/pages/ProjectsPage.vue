<template>
  <div class="position-relative page-project">
    <!-- <div class="position-absolute" style="max-height: 100%; height: 85.6vh"> -->
    <div class="row">
      <div class="col-4 colonne">
        <div class="row title-page">Projets</div>
        <div class="row client-page">Nos clients</div>
        <div class="row intro-page">
          {{ intro }}
        </div>
        <div class="row text-page">
          {{ text }}
        </div>
      </div>
      <div class="col-8 project-view">
        <!-- <logo-scroll-list
            v-if="logos.length > 0"
            :logos="logos"
            :logosel="sellogos"
            class="logo-scroll-list"
          /> -->
        <q-tabs
          v-model="tab"
          indicator-color="secondary"
          class="tab-content tabs-container"
          active-class="tab-active"
          narrow-indicator
          left-icon="arrow_left"
          right-icon="arrow_right"
          ref="tabsContainer"
        >
          <q-tab
            style=""
            v-for="(proj, index) in project"
            :key="index"
            :name="proj.id"
            :icon="'img:' + getImage(proj.img_logo)"
            @click="selectLogo(index)"
          />
        </q-tabs>

        <div class="row" v-if="project.length > 0">
          <div class="col-6">
            <q-scroll-area
              class=""
              style="height: 100%; max-width: 25vw; margin-top: 4vh"
            >
              <h1 class="title-p">{{ project[pindex].title }}</h1>
              <div class="intro-p">{{ project[pindex].texte_gras }}</div>
              <div class="text-p">{{ project[pindex].texte }}</div>
            </q-scroll-area>
          </div>
          <div class="col-6 q-pa-xl" style="">
            <!-- <div class="flex flex-center">
              <div class="row" style="margin-top: 7vh">
                <div
                  class="col-3"
                  v-for="media in instagramMedia"
                  :key="media.id"
                >
                  <q-img
                    :src="media.media_url"
                    class="instagram-image"
                    height="15vh"
                    width="15vh"
                  />
                </div>
              </div>
            </div> -->
            <div class="instagram-grid" v-if="instagramMedia.length > 0">
              <div
                v-for="media in instagramMedia"
                :key="media.id"
                class="instagram-item"
              >
                <q-img :src="media.media_url" class="instagram-image" />
              </div>
            </div>
            <div class="instagram-grid" v-else>
              <div class="instagram-item" v-for="n in 9" :key="n">
                <q-skeleton animation="blink" class="instagram-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { ref, inject, provide, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import QImgGallery from 'components/QImgGallery.vue'; // Assurez-vous d'avoir ce composant ou utilisez une alternative
//import LogoScrollList from 'src/components/LogoScrollList.vue';
import { Project } from 'src/components/project';

export default {
  components: {
    //QImgGallery,
    // LogoScrollList,
  },
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const background = inject('bg-key');
    background.value = 0;

    const nav = inject('nav-key');
    nav.value = 4;
    const pindex = ref(0);
    provide('pindex', pindex);
    const header = inject('header-key');
    header.value = 2;
    const slide = ref(0);
    const intro = ref(
      'Une stratégie sociale et éditoriale dans tous nos projets. Nous ' +
        'bâtissons la stratégie sociale et éditoriale pour développer votre ' +
        'univers de marque.'
    );
    const text = ref(
      '\nLes réseaux sociaux doivent venir prolonger le discours de votre' +
        ' marque en proposant des contenus intégrés et de nouvelles' +
        ' expériences pour vos communautés.\n Nous construisons une stratégie' +
        ' singulière pour chacun de nos clients, cela peut passer par la' +
        " manière dont va s'exprimer et interagir votre marque, des typologies" +
        ' de contenus, la création de personnages pour porter le discours de' +
        ' votre marque...'
    );

    const instagramMedia = ref([]);

    async function fetchInstagramMedia(projectId) {
      try {
        const response = await api.get(
          `get_long_lived_tokens?project_id=${projectId}`
        );
        if (response.data.media && response.data.media.length > 0) {
          console.log(response.data.media);
          instagramMedia.value = response.data.media;
        }
      } catch (error) {
        instagramMedia.value = [];
        console.error('Error fetching Instagram media:', error);
      }
    }

    function selectLogo(index) {
      pindex.value = index;
      fetchInstagramMedia(project.value[index].id);
      nextTick(() => {
        centerTab();
      });
    }

    async function fetchInstagramMediaForProject(projectId) {
      const selectedProject = project.value.find(
        (proj) => proj.id === projectId
      );
      if (selectedProject && selectedProject.access_token) {
        instagramMedia.value = await fetchInstagramMedia(
          selectedProject.access_token
        );
        console.log(instagramMedia.value);
      }
    }

    const logos = ref([
      // 'isigny.png',
      // 'fromage_aop.png',
      // 'sdn.png',
      // 'cnaol.png',
      // 'huitre.png',
      // 'livarot.png',
      // 'pontleveque.png',
      // 'viande.png',
      // Ajoutez plus de chemins vers les logos de vos clients
    ]);

    const sellogos = ref([
      // 'isigny_s.png',
      // 'fromage_aop_s.png',
      // 'sdn_s.png',
      // 'cnaol_s.png',
      // 'huitre_s.png',
      // 'livarot_s.png',
      // 'pontleveque_s.png',
      // 'viande_s.png',
      // Ajoutez plus de chemins vers les logos de vos clients
    ]);
    const project = ref([]);

    const galleryImages = [
      {
        src: 'path-to-image1.jpg',
        caption: 'Image 1',
        alt: 'Description image 1',
      },
      // Ajoutez plus d'objets pour les images de votre galerie
    ];

    const data = ref();
    const tab = ref('');
    function loadData() {
      api
        .get('/project')
        .then((response) => {
          console.log(response);
          data.value = response.data;
          const valeur = ref();
          valeur.value = [];
          let row = {};
          let itemCount = 0;
          let rowIndex = 0;
          row['id'] = rowIndex;
          console.log(project.value);
          project.value = data.value.map((item) => {
            const projectInstance = new Project(item);
            logos.value.push(projectInstance.img_logo); // Utilisez ici la propriété appropriée pour les logos
            sellogos.value.push('s_' + projectInstance.img_logo); // Assumant que sellogos utilise id_instagram
            return projectInstance;
          });
          console.log(project.value.length / 2);
          tab.value = project.value[Math.floor(project.value.length / 2)].id;
          selectLogo(Math.floor(project.value.length / 2));
          console.log(project.value);
          //console.log(logos.value);

          nextTick(() => {
            centerTab(); // Centre le logo après le chargement des données
          });
        })
        .catch((error) => {
          console.log(error);
          $q.notify('Une erreur s"est produite"');
        });
    }

    onMounted(() => {
      loadData();
    });

    function getImage(name) {
      return 'http://dev2.agence-atlas.fr/api/medial/' + name;
    }

    //SCROOL LOGO TEST GPT
    const tabsContainer = ref(null);

    function centerTab() {
      const t_absContainer = document.querySelector('.tabs-container');
      const tabs = t_absContainer.querySelectorAll('.q-tab');
      const selectedTab = tabs[pindex.value];

      if (selectedTab && t_absContainer) {
        const scrollContainer =
          t_absContainer.querySelector('.q-tabs__content');
        const scrollMiddle = scrollContainer.offsetWidth / 2;
        const tabMiddle = selectedTab.offsetWidth / 2;
        const scrollLeft = selectedTab.offsetLeft + tabMiddle - scrollMiddle;
        scrollContainer.scroll({
          left: scrollLeft,
          behavior: 'smooth',
        });
      }
    }

    return {
      tab,
      slide,
      logos,
      sellogos,
      galleryImages,
      text,
      intro,
      pindex,
      project,
      instagramMedia,
      selectLogo,
      getImage,

      tabsContainer,
    };
  },
};
</script>

<style scoped lang="scss">
.colonne {
  color: #ffffff;
  /* background-color: #df451220; */
  height: 750px !important;
  max-height: 598px !important;
  padding-top: 8vh;
  padding-left: 8vw;
  padding-right: 8vw;
}
.title-page {
  font-size: 3vw;
  margin-bottom: 2.5vh;
}
.client-page {
  margin-bottom: 2.5vh;
  font-size: 1.1vw;
  text-transform: uppercase;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.intro-page {
  font-size: 1vw;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
}
.text-page {
  font-size: 0.9vw;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  white-space: pre-line; /* This will respect newlines in the text */
}

.project-view {
  // background-color: #1e024d;
  padding: 2vw 4vw;
  color: #ffffff;
}

.title-p {
  font-size: 3vw;
  line-height: 1 !important;
  /* margin-bottom: 2.5vh; */
}
.client-p {
  /* margin-bottom: 2.5vh; */
  font-size: 1.1vw;
  text-transform: uppercase;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.intro-p {
  font-size: 1vw;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
}
.text-p {
  font-size: 0.9vw;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  white-space: pre-line; /* This will respect newlines in the text */
}

.tab-active {
  //background-color: $secondary !important;
}

.tab-content {
  padding: 0 70px;
}

.instagram-grid {
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  gap: 10px; /* Adjust the gap as needed */
}

.instagram-item {
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  position: relative;
}

.instagram-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* .logo-scroll-list {
  overflow-x: auto;
}*/
</style>

<style lang="scss">
.page-project {
  .q-tab__icon {
    //background-color: aqua !important;
    height: auto !important;
    width: 90px !important;
  }

  .q-tab__indicator {
    width: 50px;
    margin: auto;
  }
}
</style>

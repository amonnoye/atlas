<template>
  <div class="position-relative">
    <div class="position-absolute" style="max-height: 100%; height: 85.6vh">
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
          <logo-scroll-list
            v-if="logos.length > 0"
            :logos="logos"
            :logosel="sellogos"
            class="logo-scroll-list"
          />
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import QImgGallery from 'components/QImgGallery.vue'; // Assurez-vous d'avoir ce composant ou utilisez une alternative
import LogoScrollList from 'src/components/LogoScrollList.vue';
import { Project } from 'src/components/project';

export default {
  components: {
    //QImgGallery,
    LogoScrollList,
  },
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const background = inject('bg-key');
    background.value = 0;

    const nav = inject('nav-key');
    nav.value = 4;

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

    const sellogos = [
      'isigny_s.png',
      'fromage_aop_s.png',
      'sdn_s.png',
      'cnaol_s.png',
      'huitre_s.png',
      'livarot_s.png',
      'pontleveque_s.png',
      'viande_s.png',
      // Ajoutez plus de chemins vers les logos de vos clients
    ];
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
    function loadData() {
      api
        .get('/project')
        .then((response) => {
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
            // sellogos.value.push(projectInstance.id_instagram); // Assumant que sellogos utilise id_instagram
            return projectInstance;
          });
          console.log(project.value);
          console.log(logos.value);
        })
        .catch((error) => {
          console.log(error);
          $q.notify('Une erreur s"est produite"');
        });
    }
    loadData();

    return {
      slide,
      logos,
      sellogos,
      galleryImages,
      text,
      intro,
    };
  },
};
</script>

<style scoped>
.colonne {
  color: #ffffff;
  /* background-color: #df451220; */
  height: 85.6vh !important;
  max-height: 100% !important;
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
  background-color: #1e024d;
  padding: 4vw 8vw;
}

/* .logo-scroll-list {
  overflow-x: auto;
}*/
</style>

<template>
  <div class="gallery">
    <div class="row q-col-gutter-md">
      <div
        class="col-12 col-md-4"
        v-for="(image, index) in images"
        :key="index"
      >
        <q-img
          :src="image.src"
          :alt="image.alt"
          ratio="1"
          class="cursor-pointer"
          @click="showDialog(index)"
        />
      </div>
    </div>

    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="col-11">
            <h6>{{ currentImage.caption }}</h6>
          </div>
          <q-btn
            icon="close"
            class="col-1"
            flat
            round
            dense
            @click="dialog = false"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-img :src="currentImage.src" :alt="currentImage.alt" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const dialog = ref(false);
    const currentImage = ref(props.images[0]);

    function showDialog(index) {
      currentImage.value = props.images[index];
      dialog.value = true;
    }

    return { dialog, currentImage, showDialog };
  },
};
</script>

<style scoped>
.gallery img {
  width: 100%;
  transition: transform 0.2s;
}

.gallery img:hover {
  transform: scale(1.05);
}
</style>

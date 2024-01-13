<template class="home">
  <div class="col text-center text-weight-bold">TEST</div>
</template>

<script>
import { inject, ref } from 'vue';
import { KinesisContainer, KinesisElement } from 'vue-kinesis';

export default {
  components: {},
  setup() {
    const url = ref('https://picsum.photos/500/300');
    const background = inject('bg-key');
    background.value = 1;
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

<template class="home">
  <div class="col text-center text-weight-bold">Agence</div>
</template>

<script>
import { inject, ref } from 'vue';

export default {
  components: {},
  setup() {
    const background = inject('bg-key');
    background.value = 2;

    const nav = inject('nav-key');
    nav.value = 2;
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

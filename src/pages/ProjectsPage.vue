<template class="project">
  <div class="col text-center text-weight-bold">project</div>
</template>

<script>
import { inject, ref } from 'vue';

export default {
  components: {},
  setup() {
    const background = inject('bg-key');
    background.value = 0;
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

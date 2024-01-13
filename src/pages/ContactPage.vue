<template class="contact">
  <div class="col text-center text-weight-bold">Contact</div>
</template>

<script>
import { inject, ref } from 'vue';

export default {
  components: {},
  setup() {
    const background = inject('bg-key');
    background.value = 3;
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

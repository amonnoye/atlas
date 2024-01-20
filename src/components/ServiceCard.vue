<template>
  <div class="service-card">
    <q-icon :name="icon" size="lg" />
    <div class="text-title">{{ title }}</div>
    <div class="text-caption">{{ description }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ServiceCard',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    return {};
  },
});
</script>

<style scoped>
.service-card {
  color: #ffffff;
}
.text-title {
  font-size: 1.8vw;
}
.text-caption {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1vw;
}

/* Add additional styling here */
</style>

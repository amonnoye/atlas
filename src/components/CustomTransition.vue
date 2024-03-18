<template>
  <Transition :name="transitionName" :mode="mode">
    <slot></slot>
  </Transition>
</template>

<script>
export default {
  name: 'CustomTransition',
  props: {
    transitionName: {
      type: String,
      default: 'fade',
    },
    mode: {
      type: String,
      default: 'out-in',
    },
  },
};
</script>

<style>
/* Définissez ici les styles pour les transitions si nécessaire */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>

<template>
  <Transition @before-enter="beforeEnter" @after-enter="afterEnter">
    <slot></slot>
  </Transition>
</template>

<script>
export default {
  name: 'ScrollToTopTransition',
  methods: {
    beforeEnter(el) {
      // Vous pouvez personnaliser cette partie pour cibler un élément spécifique si nécessaire
      // Par exemple, pour cibler l'élément lui-même: el.scrollIntoView();
      // Dans cet exemple, nous scrollons simplement vers le haut de la page
      this.savedPosition = window.pageYOffset;
    },
    afterEnter() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
  data() {
    return {
      savedPosition: 0,
    };
  },
};
</script>

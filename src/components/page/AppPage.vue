<template>
  <transition name="fade-slide" mode="out-in" appear>
    <section class="cus-scroll-y wh-full flex-col bg-[#f5f6fb] dark:bg-hex-121212" style='padding: 3rem 3.75rem 0 3.75rem'>
      <slot />
      <AppFooter v-if="showFooter" mt-10 />
      <n-back-top :bottom="20" />
    </section>
  </transition>
</template>

<script setup>
defineProps({
  showFooter: {
    type: Boolean,
    default: false,
  },
})
</script>

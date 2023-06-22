<template>
    <iframe :src=url frameborder='0' style='width: 100%; height: 100%'></iframe>
</template>
<script setup>
let url = ref(import.meta.env.VITE_REACT_URL)
</script>
<template>
  <div>
    <h1 class="bg-danger" style="margin-top: 170px">Profile Page</h1>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: `auth`,
});
</script>

<style></style>

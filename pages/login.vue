<template>
  <section class="auth_section book_section">
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4 offset-md-4 mt-5">
          <div class="card">
            <LoginCard
              v-if="showLoginCard"
              @show-check-otp-form="showOtpCard"
            />
            <OtpCard v-else />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: `guest`,
});

const showLoginCard = ref(true);

function showOtpCard() {
  showLoginCard.value = false;
}
</script>

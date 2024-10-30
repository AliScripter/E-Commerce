<template>
  <div class="card-body">
    <!-- Show errors -->
    <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
      <ul class="mb-0">
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <!-- form -->
    <div class="form_container">
      <form @submit.prevent="checkOTP">
        <div class="mb-3">
          <label for="otpCode" class="form-label"> کد ورود </label>
          <input
            v-model="otpCode"
            type="text"
            class="form-control"
            id="otpCode"
            maxlength="6"
          />
        </div>
        <button
          @keydown.enter="checkOTP"
          type="submit"
          class="btn btn-primary btn-auth d-flex align-items-center"
        >
          تایید
          <div
            v-if="loading"
            class="spinner-border spinner-border-sm ms-2"
          ></div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';

const toast = useToast();
const { authUser } = useAuth();

const otpCode = ref(null);
const errors = ref([]);
const loading = ref(false);

async function checkOTP() {
  if (otpCode.value == null) {
    toast.error(`کد تایید الزامی است`);
    return;
  }

  const pattern = /^[0-9]{6}$/;
  if (!pattern.test(otpCode.value)) {
    toast.error(`فرمت کد ورود نامعتبر است`);
  }

  try {
    loading.value = true;
    errors.value = [];

    const data = await $fetch(`/api/auth/checkOtp`, {
      method: 'POST',
      body: { otp: otpCode.value },
    });

    toast.success(`با موفقیت وارد شدید`);
    authUser.value = data;
    return navigateTo(`/`);
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>

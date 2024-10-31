<template>
  <ClientOnly>
    <div class="d-flex align-items-center">
      <div class="mt-3 me-3">
        <vue-countdown
          v-if="!showResendBtn"
          @end="onCountdownEnd"
          dir="ltr"
          :time="3 * 1000"
          v-slot="{ minutes, seconds }"
          :transform="transformSlotProps"
        >
          {{ minutes }} : {{ seconds }}
        </vue-countdown>
      </div>

      <button
        v-if="showResendBtn"
        :disabled="loading"
        class="btn btn-dark"
        @click="resendFn"
      >
        ارسال مجدد

        <div v-if="loading" class="spinner-border spinner-border-sm ms-2"></div>
      </button>
    </div>
  </ClientOnly>
</template>

<script setup>
import VueCountdown from '@chenfengyuan/vue-countdown';
import { useToast } from 'vue-toastification';

const emit = defineEmits([`resend-otp-errors`]);
const loading = ref(false);

const showResendBtn = ref(false);
const toast = useToast();

// Add a 0 when number less than 10 -> 09 08 ...
function transformSlotProps(props) {
  const formattedProps = {};

  Object.entries(props).forEach(([key, value]) => {
    formattedProps[key] = value < 10 ? `0${value}` : String(value);
  });

  return formattedProps;
}

// End countdown and show resend otp btn
function onCountdownEnd() {
  showResendBtn.value = true;
}

// Resend Otp function
async function resendFn() {
  try {
    loading.value = true;
    await $fetch(`/api/auth/resendOtp`, {
      method: `POST`,
    });

    toast.success(`کد ورود مجددا ارسال شد`);
    showResendBtn.value = false;
  } catch (error) {
    emit(`resend-otp-errors`, Object.values(error?.data.data.message).flat());
  } finally {
    loading.value = false;
  }
}
</script>
<style></style>

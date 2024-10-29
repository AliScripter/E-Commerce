<template>
  <section class="auth_section book_section">
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4 offset-md-4 mt-5">
          <div class="card">
            <div class="card-body">
              <!-- Show errors -->
              <div
                v-if="errors.length > 0"
                class="alert alert-danger"
                role="alert"
              >
                <ul class="mb-0">
                  <li v-for="(error, index) in errors" :key="index">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <!-- form -->
              <div class="form_container">
                <form @submit.prevent="loginFn">
                  <div class="mb-3">
                    <label for="cellphone" class="form-label"
                      >شماره موبایل</label
                    >
                    <input
                      v-model="cellphone"
                      type="text"
                      class="form-control"
                      id="cellphone"
                      placeholder="09123456789"
                      maxlength="11"
                    />
                  </div>
                  <button
                    @keydown.enter="loginFn"
                    type="submit"
                    class="btn btn-primary btn-auth"
                  >
                    ورود
                    <div
                      v-if="loading"
                      class="spinner-border spinner-border-sm ms-2"
                    ></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useToast } from 'vue-toastification';
const toast = useToast();

const cellphone = ref(null);
const errors = ref([]);
const loading = ref(false);

async function loginFn() {
  if (cellphone.value == null) {
    toast.error(`شماره تماس معتبر الزامی است`);
    return;
  }

  const pattern = /^(\+98|0)?9\d{9}$/;
  if (!pattern.test(cellphone.value)) {
    toast.error(`فرمت شماره تماس نامعتبر است`);
  }

  try {
    loading.value = true;
    errors.value = [];

    const data = await $fetch(`/api/auth/login`, {
      method: 'POST',
      body: { cellphone: cellphone.value },
    });

    console.log(data);
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
#cellphone::placeholder {
  color: gray;
}
</style>

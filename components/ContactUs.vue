<template>
  <section class="book_section layout_padding">
    <div class="container">
      <div class="heading_container">
        <h2>تماس با ما</h2>
      </div>
      <div class="row">
        <!-- Form -->
        <div class="col-md-6">
          <div class="form_container">
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

            <form @submit.prevent="submitFn">
              <div>
                <input
                  v-model="formData.name"
                  type="text"
                  class="form-control"
                  placeholder="نام و نام خانوادگی"
                  autocomplete="name"
                />
              </div>
              <div>
                <input
                  v-model="formData.email"
                  type="email"
                  class="form-control"
                  placeholder="ایمیل"
                  autocomplete="email"
                />
              </div>
              <div>
                <input
                  v-model="formData.subject"
                  type="text"
                  class="form-control"
                  placeholder="موضوع پیام"
                />
              </div>
              <div>
                <textarea
                  v-model="formData.text"
                  rows="1"
                  class="form-control"
                  placeholder="متن پیام"
                  ref="textarea"
                  @input="autoresizeFn"
                ></textarea>
              </div>
              <div class="btn_box">
                <button type="submit" class="d-flex align-items-center">
                  ارسال پیام
                  <div
                    v-if="loading"
                    class="spinner-border spinner-border-sm ms-2"
                  ></div>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Map -->
        <div class="col-md-6">
          <div class="map_container">
            <div id="map" style="height: 345px">MAP</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useToast } from 'vue-toastification';
const { $leaflet } = useNuxtApp();
const {
  public: { apiBase },
} = useRuntimeConfig();

const errors = ref([]);
const loading = ref(false);
const toast = useToast();
const textarea = ref(null);

// For customize text area (height)
function autoresizeFn() {
  const el = textarea.value;
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

const formData = reactive({
  name: ``,
  email: ``,
  subject: ``,
  text: ``,
});

// form validation with Regex
const notComplete = computed(() => {
  const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{3,}$/; // نام باید حداقل ۳ حرف باشد و شامل اعداد نباشد
  const subjectTextRegex = /^.{3,}$/; // موضوع و متن باید حداقل ۳ کاراکتر یا بیشتر باشند

  return (
    !nameRegex.test(formData.name.trim()) || // نام نباید شامل اعداد باشد و نباید خالی باشد
    !formData.email.trim() || // ایمیل نباید خالی باشد
    !subjectTextRegex.test(formData.subject.trim()) || // موضوع باید حداقل ۳ حرف باشد
    !subjectTextRegex.test(formData.text.trim()) // متن باید حداقل ۳ حرف باشد
  );
});

async function submitFn() {
  if (notComplete.value) {
    toast.error(`تمام موارد فرم تماس با ما الزامی هست`);
    return;
  }

  try {
    loading.value = true;
    errors.value = [];
    const data = await $fetch(`${apiBase}/contact-us`, {
      method: 'POST',
      body: formData,
    });

    toast.success(`پیام شما با موفقیت ارسال شد`);
    // for clear form
    formData.name = '';
    formData.email = '';
    formData.subject = '';
    formData.text = '';
    autoresizeFn();
  } catch (error) {
    errors.value = Object.values(error.data.message).flat();
  } finally {
    loading.value = false;
  }
}

// Map

onMounted(() => {
  let map = $leaflet.map('map').setView([35.700105, 51.400394], 14);
  let tiles = $leaflet
    .tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
      }
    )
    .addTo(map);
  let marker = $leaflet
    .marker([35.700105, 51.400394], {
      icon: $leaflet.icon({
        popupAnchor: [12, 6],
        iconUrl: 'images/map/marker-icon.png',
        shadowUrl: 'images/map/marker-shadow.png'
      }),
    })
    .addTo(map)
    .bindPopup('<b>ما اینجاییم</b><br />منتظر شما')
    .openPopup();
});
</script>

<style>
textarea {
  resize: none;
  overflow: hidden;
}
</style>

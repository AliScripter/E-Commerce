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
            <form @submit.prevent="submitFn">
              <div>
                <input
                  v-model="formData.name"
                  type="text"
                  class="form-control"
                  placeholder="نام و نام خانوادگی"
                />
              </div>
              <div>
                <input
                  v-model="formData.email"
                  type="email"
                  class="form-control"
                  placeholder="ایمیل"
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
                  rows="10"
                  style="height: 100px"
                  class="form-control"
                  placeholder="متن پیام"
                ></textarea>
              </div>
              <div class="btn_box">
                <button type="submit">ارسال پیام</button>
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
const {
  public: { apiBase },
} = useRuntimeConfig();

const formData = reactive({
  name: ``,
  email: ``,
  subject: ``,
  text: ``,
});

async function submitFn() {
  try {
    const data = await $fetch(`${apiBase}/contact-us`, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.error(Object.values(error.data.message).flat());
  }
}
</script>

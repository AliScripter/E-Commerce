<template>
  <section class="food_section layout_padding">
    <div class="container">
      <div class="row">
        <!-- Filter coulmn -->
        <div class="col-sm-12 col-lg-3">
          <div>
            <label class="form-label">جستجو</label>
            <div class="input-group mb-3">
              <input
                v-model.trim="search"
                @keydown.enter="search !== '' && filterFn({ search })"
                type="text"
                class="form-control"
                placeholder="نام محصول ..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <button
                @click="search !== '' && filterFn({ search })"
                class="input-group-text"
                id="basic-addon2"
              >
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
          <hr />

          <!-- categories -->
          <div class="filter-list">
            <div class="form-label">دسته بندی</div>
            <ul>
              <li
                v-for="category in categories.data"
                @click="filterFn({ category: category.id })"
                :key="category.id"
                class="my-2 cursor-pointer"
              >
                {{ category.name }}
              </li>
            </ul>
          </div>

          <hr />

          <!-- sort -->
          <div>
            <label class="form-label">مرتب سازی</label>
            <div class="form-check my-2">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label
                class="form-check-label cursor-pointer"
                for="flexRadioDefault1"
              >
                بیشترین قیمت
              </label>
            </div>
            <div class="form-check my-2">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label
                class="form-check-label cursor-pointer"
                for="flexRadioDefault2"
              >
                کمترین قیمت
              </label>
            </div>
            <div class="form-check my-2">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                checked
              />
              <label
                class="form-check-label cursor-pointer"
                for="flexRadioDefault3"
              >
                پرفروش ترین
              </label>
            </div>
            <div class="form-check my-2">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
                checked
              />
              <label
                class="form-check-label cursor-pointer"
                for="flexRadioDefault4"
              >
                با تخفیف
              </label>
            </div>
          </div>
        </div>

        <!-- items coulmn -->
        <div class="col-sm-12 col-lg-9">
          <!-- loading -->
          <div
            v-if="pending"
            class="d-flex justify-content-center align-items-center mt-2"
          >
            <div class="spinner-border"></div>
          </div>

          <!-- show products -->
          <template v-else>
            <div
              v-if="data.data.products.length == 0"
              class="d-flex justify-content-center align-items-center h-100"
            >
              <h5>هیچ محصولی یافت نشد !</h5>
            </div>

            <div v-else>
              <div class="row g-3">
                <div
                  v-for="product in data.data.products"
                  :key="product.id"
                  class="col-sm-6 col-lg-4"
                >
                  <Product :product="product" />
                </div>
              </div>
            </div>
          </template>

          <!-- Pagination  -->
          <nav class="d-flex justify-content-center mt-5">
            <ul class="pagination">
              <li
                v-for="(link, index) in data.data.meta.links.slice(1, -1)"
                :key="index"
                class="page-item"
                :class="{ active: link.active }"
              >
                <button
                  @click="filterFn({ page: link.label })"
                  class="page-link"
                >
                  {{ link.label }}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const {
  public: { apiBase },
} = useRuntimeConfig();
const router = useRouter();
const route = useRoute();

const query = ref({});
const search = ref(``);

const { data: categories } = await useFetch(`${apiBase}/categories`);

query.value = route.query;
const { data, refresh, pending } = await useFetch(() => `${apiBase}/menu`, {
  query,
});

function filterFn(param) {
  query.value = { ...route.query, ...param };

  router.push({
    path: `/menu`,
    query: query.value,
  });

  refresh();
}
</script>

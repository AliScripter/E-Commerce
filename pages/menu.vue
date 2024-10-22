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
                @input="checkSearchBar"
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
                :class="{
                  'filter-list-active':
                    route.query.hasOwnProperty('category') &&
                    route.query.category == category.id,
                }"
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
                @click="filterFn({ sortBy: 'sale' })"
                :checked="
                  route.query.hasOwnProperty('sortBy') &&
                  route.query.sortBy == 'sale'
                "
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
              />
              <label
                class="form-check-label cursor-pointer"
                for="flexRadioDefault4"
              >
                با تخفیف
              </label>
            </div>
            <div class="form-check my-2">
              <input
                @click="filterFn({ sortBy: 'bestseller' })"
                :checked="
                  route.query.hasOwnProperty('sortBy') &&
                  route.query.sortBy == 'bestseller'
                "
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
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
                @click="filterFn({ sortBy: 'min' })"
                :checked="
                  route.query.hasOwnProperty('sortBy') &&
                  route.query.sortBy == 'min'
                "
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
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
                @click="filterFn({ sortBy: 'max' })"
                :checked="
                  route.query.hasOwnProperty('sortBy') &&
                  route.query.sortBy == 'max'
                "
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

watch(route, () => {
  if (Object.keys(route.query) == 0) {
    query.value = {};
    refresh();
  }
});

function filterFn(param) {
  query.value = { ...route.query, ...param };

  if (!param.hasOwnProperty(`page`)) {
    delete query.value.page;
  }

  router.push({
    path: `/menu`,
    query: query.value,
  });

  refresh();
}

function checkSearchBar(element) {
  if (element.target.value === ``) {
    if (query.value.hasOwnProperty(`search`)) {
      delete query.value.search;
    }

    router.push({
      path: `/menu`,
      query: query.value,
    });
  }

  console.log(element);
}
</script>

<style scoped>
li {
  width: fit-content;
}
</style>

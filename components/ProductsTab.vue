<template>
  <section class="food_section layout_padding-bottom">
    <div class="container">
      <div class="heading_container heading_center">
        <h2>منو محصولات</h2>
      </div>

      <tabs
        :options="{ useUrlFragment: false, disableScrollBehavior: true }"
        @clicked="tabClicked"
        @changed="tabChanged"
        nav-class="filters_menu"
        nav-item-achive-class="active"
      >
        <tab
          v-for="(tabList, index) in products.data.tabList"
          :key="index"
          :name="tabList"
        >
          <div class="filters_content">
            <div class="row grid">
              <div
                v-for="product in products.data.tabPanel[index]"
                :key="product.id"
                class="col-sm-6 col-lg-4 my_flex"
              >
                <Product :product="product" />
              </div>
            </div>
          </div>
        </tab>
      </tabs>

      <!-- <ul class="filters_menu">
        <li class="active">برگر</li>
        <li>پیتزا</li>
        <li>پیش غذا و سالاد</li>
      </ul> -->

      <div class="btn-box">
        <a href="" class="text-center"> مشاهده بیشتر </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Tabs, Tab } from 'vue3-tabs-component';

const {
  public: { apiBase },
} = useRuntimeConfig();

const { data: products, error } = await useFetch(
  `${apiBase}/products/products-tabs`
);
</script>

<style scoped>
.my_flex {
  flex: 1;
  margin-bottom: 10px;
}
</style>

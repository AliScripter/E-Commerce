<template>
  <header class="header_section bg-black">
    <div class="container">
      <nav class="navbar navbar-expand-lg custom_nav-container">
        <nuxtLink to="/" class="navbar-brand">
          <span> webprog.io </span>
        </nuxtLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          id="menuBtn"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item" :class="{ active: $route.path === '/' }">
              <nuxtLink class="nav-link" to="/">صفحه اصلی</nuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                class="nav-link"
                :class="{ active: $route.path === '/menu' }"
                to="/menu"
                >منو</NuxtLink
              >
            </li>
            <li class="nav-item">
              <nuxtLink
                class="nav-link"
                :class="{ active: $route.path === '/about-us' }"
                to="/about-us"
                >درباره ما</nuxtLink
              >
            </li>
            <li class="nav-item">
              <nuxtLink
                class="nav-link"
                :class="{ active: $route.path === '/contact-us' }"
                to="/contact-us"
                >تماس باما</nuxtLink
              >
            </li>
          </ul>
          <div class="user_option">
            <a class="cart_link position-relative" href="cart.html">
              <i class="bi bi-cart-fill text-white fs-5"></i>
              <span
                class="position-absolute top-0 translate-middle badge rounded-pill"
              >
                3
              </span>
            </a>

            <NuxtLink v-if="authUser" to="/profile" class="btn-auth">
              پروفایل
            </NuxtLink>

            <NuxtLink v-else to="/login" class="btn-auth"> ورود </NuxtLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
const { authUser } = useAuth();
</script>

<style scoped>
.active {
  color: #ffbe33 !important;
}

header {
  position: fixed;
  top: 0 !important;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;

  background: rgba(0, 0, 0, 0.6) !important;
  backdrop-filter: blur(3px) !important;
}

span.navbar-toggler-icon {
  background: white !important;
  color: white !important;
}
</style>

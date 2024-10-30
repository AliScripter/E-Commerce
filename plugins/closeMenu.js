export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('page:finish', () => {
    const btn = document.getElementById('menuBtn');
    const menu = document.querySelector('.navbar-collapse');
    if (btn && !btn.classList.contains('collapsed')) {
      btn.classList.add('collapsed');
      btn.setAttribute('aria-expanded', 'false');
    }
    if (menu && menu.classList.contains('show')) {
      menu.classList.remove('show');
    }
  });
});

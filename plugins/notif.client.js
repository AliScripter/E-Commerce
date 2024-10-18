`use strict`;

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options = {
  position: 'top-center',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: true,
};

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Toast, options);
});

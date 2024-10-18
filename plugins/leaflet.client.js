`use strict`;
// Leaflet lib for map in contact us

import leaflet from 'leaflet/dist/leaflet.js';
import 'leaflet/dist/leaflet.css';

export default defineNuxtPlugin(nuxtApp => {
  return nuxtApp.provide(`leaflet`, leaflet);
});

import { createApp } from "vue";
import App from "./App.vue";
import VCalendar from 'v-calendar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faBookmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTrashAlt, faBookmark, faSearch);

createApp(App)
  // Use the plugin with optional defaults
  .use(VCalendar, {})
  // FontAwesome
  .component("font-awesome-icon", FontAwesomeIcon)
  // Mount the app
  .mount('#app');
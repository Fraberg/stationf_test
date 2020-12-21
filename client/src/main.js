import { createApp } from "vue";
import App from "./App.vue";
import VCalendar from 'v-calendar';
import {
  faTrashAlt,
  faBookmark,
  faSearch,
  faUserAlt,
  faUserFriends,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faTrashAlt,
  faBookmark,
  faSearch,
  faUserAlt,
  faUserFriends,
  faUsers
);

createApp(App)
  // Use the plugin with optional defaults
  .use(VCalendar, {})
  // FontAwesome
  .component("font-awesome-icon", FontAwesomeIcon)
  // Mount the app
  .mount('#app');
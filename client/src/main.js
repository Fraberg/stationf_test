import { createApp } from "vue";
import App from "./App.vue";
import VCalendar from 'v-calendar';

createApp(App)
  // Use the plugin with optional defaults
  .use(VCalendar, {})
  // Mount the app
  .mount('#app');
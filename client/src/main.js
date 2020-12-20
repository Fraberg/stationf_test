import { createApp } from "vue";
import App from "./App.vue";
import VCalendar from 'v-calendar';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
 
createApp(App)
  // Use the plugin with optional defaults
  .use(VCalendar, {})
  // Swal
  .use(VueSweetalert2)
  // Mount the app
  .mount('#app');
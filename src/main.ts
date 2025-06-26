import { createApp } from 'vue'
import './styles/style.sass'
import './styles/search-form.sass'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { toastOptions } from './utils/toast-config'



const app = createApp(App);

app.use(Toast, toastOptions);
app.mount('#app');
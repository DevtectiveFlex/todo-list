import { createApp } from 'vue'
import './styles/style.sass'
import './styles/search-form.sass'
import './styles/task-item.sass'
import './styles/task-board.sass'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { toastOptions } from './utils/toast-config'
import { createPinia } from 'pinia'


const pinia = createPinia()
const app = createApp(App);
app.use(Toast, toastOptions);
app.use(pinia);
app.mount('#app');
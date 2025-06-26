import type { PluginOptions } from "vue-toastification";
import { POSITION } from "vue-toastification";

export const toastOptions: PluginOptions = {
  timeout: 3000,
  position: POSITION.TOP_CENTER,
  maxToasts: 1,
}

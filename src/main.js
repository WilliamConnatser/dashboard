import { createApp, configureCompat } from "vue";
import BootstrapVue from "bootstrap-vue/src/index.js";

import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";

import { satsToBtc } from "@/helpers/units.js";

// import "@/global-styles/designsystem.scss";
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App);

app.use(store);
app.use(router);

app.config.globalProperties.$filters = {
  unit: (value) => {
    if (store.state.system.unit === "sats") {
      return Number(value);
    } else if (store.state.system.unit === "btc") {
      return satsToBtc(value);
    }
  },
  sats: (value) => Number(value),
  btc: (value) => satsToBtc(value),
  formatUnit: (unit) => {
    if (unit === "sats") {
      return "Sats";
    } else if (unit === "btc") {
      return "BTC";
    }
  },
  satsToUSD: (value) => {
    if (isNaN(parseInt(value))) {
      return value;
    } else {
      return (
        "$" +
        Number(
          (satsToBtc(value) * store.state.bitcoin.price).toFixed(2)
        ).toLocaleString()
      );
    }
  },
};

configureCompat({
  INSTANCE_EVENT_EMITTER: true,
});

app.use(BootstrapVue);
app.mount("#app");

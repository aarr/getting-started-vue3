import { createApp } from "vue/dist/vue.esm-bundler";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App).use(store).use(router);

// Component
// Global Scope
// Mixin Global Custom Field Merge Logic Customize
app.config.optionMergeStrategies.custom = (toVal, fromVal) => {
  console.log(
    `MergeStrategy Changed. TO:${JSON.stringify(toVal)}, FROM:${JSON.stringify(
      fromVal
    )}`
  );
  return toVal || fromVal;
};
app
  // Mixin Global
  .mixin({
    data: function () {
      return {
        mixinMessage: "Mixin Sample Global",
      };
    },
    custom: {
      customMessage: "Mixin Custom Sample Global",
    },
    methods: {
      methodMixin: function () {
        alert(
          `DATA:${this.mixinMessage}, CUSTOM:${this.$options.custom.customMessage}`
        );
      },
    },
  })
  .component("global-component-sample", {
    props: {
      msg: String,
    },
    template: "<p>Global Component Sample [{{ msg }}]</p>",
  })
  // Dynamic Process
  .component("counter-component", {
    props: {
      initval: Number,
    },
    template:
      '<p><span>COUNT : </span><button v-on:click="countUp">{{ countComponent }}</button></p>',
    data: function () {
      return {
        countComponent: this.initval | 0,
      };
    },
    methods: {
      // Component
      countUp: function () {
        this.countComponent++;
      },
    },
  });
app.mount("#app");

import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TodoApp from "../views/TodoApp.vue";
import ShowcaseHome from "../views/ShowcaseHome.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/todoApp",
    name: "todo",
    component: TodoApp,
  },
  {
    path: "/showcase",
    name: "showcase",
    component: ShowcaseHome,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

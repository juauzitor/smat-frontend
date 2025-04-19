// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CompanyForm from "../components/CompanyForm.vue";
import TaskCategoryForm from "../components/TaskCategoryForm.vue";
import WorkFrequencyForm from "../components/WorkFrequencyForm.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/company-form",
    name: "CompanyForm",
    component: CompanyForm,
  },
  {
    path: "/task-category-form",
    name: "TaskCategoryForm",
    component: TaskCategoryForm,
  },
  {
    path: "/work-frequency-form",
    name: "WorkFrequencyForm",
    component: WorkFrequencyForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

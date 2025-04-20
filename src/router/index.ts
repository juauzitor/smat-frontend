// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CompanyForm from "../components/CompanyForm.vue";
import TaskCategoryForm from "../components/TaskCategoryForm.vue";
import WorkFrequencyForm from "../components/WorkFrequencyForm.vue";
import CompanyList from "../views/CompanyList.vue"; // Importe a nova view
import TaskCategoryList from "../views/TaskCategoryList.vue"; // Importe a nova view
import WorkFrequencyList from "../views/WorkFrequencyList.vue"; // Importe a nova view
import EditCompany from "../views/EditCompany.vue";
import EditTaskCategory from "../views/EditTaskCategory.vue";
import EditWorkFrequency from "../views/EditWorkFrequency.vue";

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
  {
    path: "/companies",
    name: "CompanyList",
    component: CompanyList,
  },
  {
    path: "/task-categories",
    name: "TaskCategoryList",
    component: TaskCategoryList,
  },
  {
    path: "/work-frequencies",
    name: "WorkFrequencyList",
    component: WorkFrequencyList,
  },
  {
    path: "/company/edit/:id", // :id será o UUID da empresa
    name: "EditCompany",
    component: EditCompany,
  },
  {
    path: "/tasks_categories/edit/:id", // :id será o UUID da empresa
    name: "EditTaskCategory",
    component: EditTaskCategory,
  },
  {
    path: "/work-frequencies/edit/:id", // :id será o UUID da empresa
    name: "EditWorkFrequency",
    component: EditWorkFrequency,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

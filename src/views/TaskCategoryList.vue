<template>
  <div>
    <h1>Lista de Categorias de Tarefa</h1>
    <ul v-if="taskCategories.length > 0">
      <li v-for="category in taskCategories" :key="category.taskCategoryId">
        {{ category.categoryName }} (ID: {{ category.taskCategoryId }})
        <button @click="goToEditTaskCategory(category.taskCategoryId)">
          Editar
        </button>
      </li>
    </ul>
    <p v-else-if="loading">Carregando categorias...</p>
    <p v-else>Nenhuma categoria encontrada.</p>
    <router-link to="/">Voltar para a Home</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

interface TaskCategory {
  taskCategoryId: string;
  categoryName: string;
}

const taskCategories = ref<TaskCategory[]>([]);
const loading = ref(false);
const router = useRouter();

onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      "http://localhost:8080/api/tasks_categories"
    );
    taskCategories.value = response.data;
  } catch (error: Error) {
    console.error("Erro ao buscar categorias:", error);
    // Adicione aqui um tratamento de erro para o usuário, se necessário
  } finally {
    loading.value = false;
  }
});

const goToEditTaskCategory = (id: string) => {
  router.push("/tasks_categories/edit/${id}");
};
</script>

<style scoped>
/* Estilos semelhantes à CompanyList */
button {
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>

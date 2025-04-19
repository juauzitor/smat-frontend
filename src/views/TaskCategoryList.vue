<template>
  <div>
    <h1>Lista de Categorias de Tarefa</h1>
    <ul v-if="taskCategories.length > 0">
      <li v-for="category in taskCategories" :key="category.taskCategoryId">
        {{ category.categoryName }} (ID: {{ category.taskCategoryId }})
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

interface TaskCategory {
  taskCategoryId: string;
  categoryName: string;
}

const taskCategories = ref<TaskCategory[]>([]);
const loading = ref(false);

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
</script>

<style scoped>
/* Estilos semelhantes à CompanyList */
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
}
</style>

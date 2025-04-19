<template>
  <div>
    <h1>Editar categorias</h1>
    <form @submit.prevent="updateTaskCategory">
      <div>
        <label for="categoryName">Nome da categoria:</label>
        <input type="text" id="categoryName" v-model="categoryName" required />
      </div>
      <button type="submit" :disabled="loading">
        <span v-if="loading">Salvando...</span>
        <span v-else>Salvar Alterações</span>
      </button>
      <div v-if="responseMessage" class="response">
        {{ responseMessage }}
      </div>
    </form>
    <router-link to="/task-categories"
      >Voltar para a Lista de Categorias</router-link
    >
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

interface TaskCategory {
  taskCategoryId?: string;
  categoryName: string;
}

const route = useRoute();
const router = useRouter();
const taskCategoryId = ref<string | null>(null);
const categoryName = ref("");
const loading = ref(false);
const responseMessage = ref("");

onMounted(async () => {
  taskCategoryId.value = route.params.id as string;
  if (taskCategoryId.value) {
    await fetchTaskCategory();
  }
});

const fetchTaskCategory = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `http://localhost:8080/api/tasks_categories/${taskCategoryId.value}`
    );
    categoryName.value = response.data.categoryName;
  } catch (error: any) {
    console.error("Erro ao buscar empresa para edição:", error);
    responseMessage.value = `Erro ao buscar empresa: ${
      error.message || "Erro desconhecido"
    }`;
  } finally {
    loading.value = false;
  }
};

const updateTaskCategory = async () => {
  if (!taskCategoryId.value) return;
  loading.value = true;
  try {
    const response = await axios.put(
      `http://localhost:8080/api/companies/${taskCategoryId.value}`,
      {
        categoryName: categoryName.value,
      }
    );
    responseMessage.value = `Empresa "${categoryName.value}" atualizada com sucesso! ID: ${response.data.taskCategoryId}`;
    // Redirecionar para a lista após um breve período
    setTimeout(() => {
      router.push("/companies");
    }, 1500);
  } catch (error: any) {
    console.error("Erro ao atualizar empresa:", error);
    responseMessage.value = `Erro ao atualizar empresa: ${
      error.message || "Erro desconhecido"
    }`;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-bottom: 20px;
}

div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

.response {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #4caf50;
  background-color: #e8f5e9;
  color: #4caf50;
  border-radius: 4px;
}
</style>

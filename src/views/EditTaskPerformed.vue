<template>
  <div>
    <h1>Editar Tarefa Realizada</h1>
    <form @submit.prevent="updateTaskPerformed">
      <div>
        <label for="companyId">Empresa:</label>
        <select id="companyId" v-model="formData.companyId" required>
          <option
            v-for="company in companies"
            :key="company.companyId"
            :value="company.companyId"
          >
            {{ company.companyName || company.companyId }}
          </option>
        </select>
      </div>
      <div>
        <label for="taskCategoryId">Categoria da Tarefa:</label>
        <select id="taskCategoryId" v-model="formData.taskCategoryId" required>
          <option
            v-for="category in taskCategories"
            :key="category.taskCategoryId"
            :value="category.taskCategoryId"
          >
            {{ category.categoryName || category.taskCategoryId }}
          </option>
        </select>
      </div>
      <div>
        <label for="workFrequencyId">Frequência de Trabalho:</label>
        <select
          id="workFrequencyId"
          v-model="formData.workFrequencyId"
          required
        >
          <option
            v-for="frequency in workFrequencies"
            :key="frequency.workFrequencyId"
            :value="frequency.workFrequencyId"
          >
            {{ frequency.workFrequencyId }} ({{
              formatDate(frequency.startWorkFrequency)
            }}
            - {{ formatDate(frequency.endWorkFrequency) }})
          </option>
        </select>
      </div>
      <div>
        <label for="description">Descrição:</label>
        <textarea id="description" v-model="formData.description"></textarea>
      </div>
      <button type="submit" :disabled="loading">
        <span v-if="loading">Salvando...</span>
        <span v-else>Salvar Alterações</span>
      </button>
      <div v-if="responseMessage" class="response">
        {{ responseMessage }}
      </div>
    </form>
    <router-link to="/task-performed"
      >Voltar para a Lista de Tarefas</router-link
    >
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

interface Company {
  companyId: string;
  companyName: string | null;
}

interface TaskCategory {
  taskCategoryId: string;
  categoryName: string | null;
}

interface WorkFrequency {
  workFrequencyId: string;
  startWorkFrequency: string | null;
  endWorkFrequency: string | null;
}

interface TaskPerformedPayload {
  companyId: string;
  taskCategoryId: string;
  workFrequencyId: string;
  description: string;
}

interface TaskPerformedResponse {
  taskPerformedId: string;
  company: Company;
  taskCategory: TaskCategory;
  workFrequency: WorkFrequency;
  description: string;
}

const route = useRoute();
const router = useRouter();
const taskId = ref<string | null>(null);
const companies = ref<Company[]>([]);
const taskCategories = ref<TaskCategory[]>([]);
const workFrequencies = ref<WorkFrequency[]>([]);
const formData = ref<TaskPerformedPayload>({
  companyId: "",
  taskCategoryId: "",
  workFrequencyId: "",
  description: "",
});
const loading = ref(false);
const responseMessage = ref("");

onMounted(async () => {
  taskId.value = route.params.id as string;
  await Promise.all([
    fetchCompanies(),
    fetchTaskCategories(),
    fetchWorkFrequencies(),
    fetchTaskPerformed(),
  ]);
});

const fetchCompanies = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/companies");
    companies.value = response.data;
  } catch (error: any) {
    console.error("Erro ao buscar empresas:", error);
  }
};

const fetchTaskCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/tasks_categories"
    );
    taskCategories.value = response.data;
  } catch (error: any) {
    console.error("Erro ao buscar categorias de tarefa:", error);
  }
};

const fetchWorkFrequencies = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/work_frequency"
    );
    workFrequencies.value = response.data;
  } catch (error: any) {
    console.error("Erro ao buscar frequências de trabalho:", error);
  }
};

const fetchTaskPerformed = async () => {
  if (!taskId.value) return;
  loading.value = true;
  try {
    const response = await axios.get(
      `http://localhost:8080/api/task_performed/${taskId.value}`
    );
    formData.value = {
      companyId: response.data.company.companyId,
      taskCategoryId: response.data.taskCategory.taskCategoryId,
      workFrequencyId: response.data.workFrequency.workFrequencyId,
      description: response.data.description,
    };
  } catch (error: any) {
    console.error("Erro ao buscar tarefa realizada para edição:", error);
    responseMessage.value = `Erro ao buscar tarefa: ${
      error.message || "Erro desconhecido"
    }`;
  } finally {
    loading.value = false;
  }
};

const updateTaskPerformed = async () => {
  if (!taskId.value) return;
  loading.value = true;
  try {
    const response = await axios.put(
      `http://localhost:8080/api/task_performed/${taskId.value}`,
      formData.value
    );
    responseMessage.value = `Tarefa realizada com ID ${response.data.taskPerformedId} atualizada com sucesso!`;
    setTimeout(() => {
      router.push("/task-performed");
    }, 1500);
  } catch (error: any) {
    console.error("Erro ao atualizar tarefa realizada:", error);
    responseMessage.value = `Erro ao atualizar tarefa: ${
      error.message || "Erro desconhecido"
    }`;
  } finally {
    loading.value = false;
  }
};

const formatDate = (isoDate: string | null) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
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

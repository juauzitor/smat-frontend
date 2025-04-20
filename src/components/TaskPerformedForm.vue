<template>
  <div>
    <h1>Criar Tarefa Realizada</h1>
    <form @submit.prevent="createTaskPerformed">
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
        <span v-if="loading">Criando...</span>
        <span v-else>Criar Tarefa</span>
      </button>
      <div v-if="responseMessage" class="response">
        {{ responseMessage }}
      </div>
    </form>
    <router-link to="/">Voltar para a Lista de Tarefas</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

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
const router = useRouter();

onMounted(async () => {
  await Promise.all([
    fetchCompanies(),
    fetchTaskCategories(),
    fetchWorkFrequencies(),
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

const createTaskPerformed = async () => {
  loading.value = true;
  try {
    const response = await axios.post(
      "http://localhost:8080/api/task_performed",
      formData.value
    );
    responseMessage.value = `Tarefa realizada criada com ID: ${response.data.taskPerformedId}`;
    formData.value = {
      companyId: "",
      taskCategoryId: "",
      workFrequencyId: "",
      description: "",
    }; // Limpar o formulário
    setTimeout(() => {
      router.push("/task-performed/create");
    }, 1500);
  } catch (error: any) {
    console.error("Erro ao criar tarefa realizada:", error);
    responseMessage.value = `Erro ao criar tarefa: ${
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

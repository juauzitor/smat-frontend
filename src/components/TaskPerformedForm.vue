<template>
  <div class="form-container">
    <header class="form-header">
      <h2 class="form-title">📝 Nova Tarefa Realizada</h2>
      <p class="form-subtitle">Registre as atividades executadas</p>
    </header>

    <form @submit.prevent="createTaskPerformed" class="form-content">
      <div class="form-grid">
        <!-- Coluna 1 -->
        <div class="form-column">
          <div class="input-group">
            <label for="companyId" class="input-label">
              <span class="label-icon">🏢</span>
              Empresa
            </label>
            <select
              id="companyId"
              v-model="formData.companyId"
              class="input-field select-field"
              required
            >
              <option disabled value="">Selecione uma empresa</option>
              <option
                v-for="company in companies"
                :key="company.companyId"
                :value="company.companyId"
              >
                {{ company.companyName || company.companyId }}
              </option>
            </select>
          </div>

          <div class="input-group">
            <label for="taskCategoryId" class="input-label">
              <span class="label-icon">📂</span>
              Categoria
            </label>
            <select
              id="taskCategoryId"
              v-model="formData.taskCategoryId"
              class="input-field select-field"
              required
            >
              <option disabled value="">Selecione uma categoria</option>
              <option
                v-for="category in taskCategories"
                :key="category.taskCategoryId"
                :value="category.taskCategoryId"
              >
                {{ category.categoryName || category.taskCategoryId }}
              </option>
            </select>
          </div>
        </div>

        <!-- Coluna 2 -->
        <div class="form-column">
          <div class="input-group">
            <label for="workFrequencyId" class="input-label">
              <span class="label-icon">⏱️</span>
              Frequência
            </label>
            <select
              id="workFrequencyId"
              v-model="formData.workFrequencyId"
              class="input-field select-field"
              required
            >
              <option disabled value="">Selecione uma frequência</option>
              <option
                v-for="frequency in workFrequencies"
                :key="frequency.workFrequencyId"
                :value="frequency.workFrequencyId"
              >
                {{ formatDate(frequency.startWorkFrequency) }}
                -
                {{ formatDate(frequency.endWorkFrequency) }}
              </option>
            </select>
          </div>

          <div class="input-group">
            <label for="description" class="input-label">
              <span class="label-icon">📄</span>
              Descrição
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              class="input-field textarea-field"
              placeholder="Detalhe a tarefa realizada..."
            ></textarea>
          </div>
        </div>
      </div>

      <button type="submit" class="submit-btn" :disabled="loading">
        <span v-if="loading" class="loading-dots"></span>
        <span v-else>🚀 Criar Tarefa</span>
      </button>

      <div
        v-if="responseMessage"
        :class="['response-message', responseSuccess ? 'success' : 'error']"
      >
        <span class="message-icon">{{ responseSuccess ? "✅" : "⚠️" }}</span>
        {{ responseMessage }}
      </div>
    </form>

    <router-link to="/" class="back-link">
      ← Voltar para a lista de tarefas
    </router-link>
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
const responseSuccess = ref(false);
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
    responseSuccess.value = true;
  } catch (error: any) {
    responseSuccess.value = false;
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
.form-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.form-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.select-field {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

.textarea-field {
  min-height: 120px;
  resize: vertical;
  line-height: 1.5;
  padding: 12px 16px;
}

.form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-title {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: #7f8c8d;
  font-size: 1rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #34495e;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.label-icon {
  font-size: 1.2rem;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  outline: none;
}

.input-hint {
  font-size: 0.875rem;
  color: #95a5a6;
  margin-top: 0.25rem;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-dots::after {
  content: "...";
  animation: dots 1.4s infinite;
}

@keyframes dots {
  0%,
  20% {
    content: ".";
  }
  40% {
    content: "..";
  }
  60% {
    content: "...";
  }
}

.response-message {
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.response-message.success {
  background: #e8f6ef;
  border: 2px solid #2ecc71;
  color: #27ae60;
}

.response-message.error {
  background: #fdeded;
  border: 2px solid #e74c3c;
  color: #c0392b;
}

.back-link {
  display: inline-block;
  margin-top: 2rem;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover {
  color: #2980b9;
}

@media (max-width: 640px) {
  .form-container {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style>

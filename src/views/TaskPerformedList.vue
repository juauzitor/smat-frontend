<template>
  <div class="list-container">
    <header class="list-header">
      <h2 class="list-title">✅ Tarefas Realizadas</h2>
      <p class="list-subtitle">Histórico de atividades executadas</p>
      <router-link to="/task-performed/create" class="create-link">
        ➕ Nova Tarefa
      </router-link>
    </header>

    <div class="list-content">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <span>Carregando tarefas...</span>
      </div>

      <div v-else-if="taskPerformedList.length === 0" class="empty-state">
        📭 Nenhuma tarefa registrada
      </div>

      <div v-else class="task-grid">
        <div
          v-for="task in taskPerformedList"
          :key="task.taskPerformedId"
          class="task-card"
        >
          <div class="card-header">
            <span class="task-id">#{{ task.taskPerformedId }}</span>
            <button
              @click="goToEditTaskPerformed(task.taskPerformedId)"
              class="edit-btn"
            >
              ✏️ Editar
            </button>
          </div>

          <div class="task-body">
            <div class="task-section">
              <label>🏢 Empresa:</label>
              <span>{{
                task.company?.companyName || task.company?.companyId
              }}</span>
            </div>

            <div class="task-section">
              <label>📂 Categoria:</label>
              <span>{{
                task.taskCategory?.categoryName ||
                task.taskCategory?.taskCategoryId
              }}</span>
            </div>

            <div class="task-section">
              <label>⏱️ Período:</label>
              <span>
                {{ formatDate(task.workFrequency?.startWorkFrequency) }}
                -
                {{ formatDate(task.workFrequency?.endWorkFrequency) }}
              </span>
            </div>

            <div class="task-section description">
              <label>📝 Descrição:</label>
              <p class="description-text">
                {{ task.description || "Nenhuma descrição fornecida" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-link to="/" class="back-link">
      ← Voltar para a página inicial
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

interface TaskPerformed {
  taskPerformedId: string;
  company?: Company | null;
  taskCategory?: TaskCategory | null;
  workFrequency?: WorkFrequency | null;
  description: string;
}

const taskPerformedList = ref<TaskPerformed[]>([]);
const loading = ref(false);
const router = useRouter();

onMounted(async () => {
  await fetchTaskPerformedList();
});

const fetchTaskPerformedList = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      "http://localhost:8080/api/task_performed"
    );
    taskPerformedList.value = response.data;
  } catch (error: any) {
    console.error("Erro ao buscar tarefas realizadas:", error);
  } finally {
    loading.value = false;
  }
};

const formatDate = (isoDate: string | null) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

const goToEditTaskPerformed = (id: string) => {
  router.push(`/task-performed/edit/${id}`);
};
</script>

<style scoped>
.task-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}

.task-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
}

.task-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.task-section {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 0.5rem;
  align-items: baseline;
}

.task-section label {
  color: #7f8c8d;
  font-weight: 500;
}

.task-section span {
  color: #2c3e50;
  font-weight: 600;
}

.description-text {
  margin: 0;
  color: #34495e;
  line-height: 1.5;
  max-height: 100px;
  overflow-y: auto;
}

.create-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s;
}

.create-link:hover {
  background: #2980b9;
}

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

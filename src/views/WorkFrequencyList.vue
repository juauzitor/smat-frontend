<template>
  <div class="list-container">
    <header class="list-header">
      <h2 class="list-title">📅 Frequências de Trabalho</h2>
      <p class="list-subtitle">Períodos de trabalho registrados</p>
    </header>

    <div class="list-content">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        Carregando frequências...
      </div>

      <div v-else-if="workFrequencies.length === 0" class="empty-state">
        📭 Nenhuma frequência encontrada
      </div>

      <div v-else class="frequency-grid">
        <div
          v-for="frequency in workFrequencies"
          :key="frequency.workFrequencyId"
          class="frequency-card"
        >
          <div class="card-header">
            <span class="card-id">#{{ frequency.workFrequencyId }}</span>
            <button
              @click="goToEditWorkFrequency(frequency.workFrequencyId)"
              class="edit-btn"
            >
              ✏️ Editar
            </button>
          </div>

          <div class="time-range">
            <div class="time-item">
              <span class="time-label">Início:</span>
              <span class="time-value">{{
                formatDate(frequency.startWorkFrequency)
              }}</span>
            </div>
            <div class="time-item">
              <span class="time-label">Término:</span>
              <span class="time-value">{{
                formatDate(frequency.endWorkFrequency)
              }}</span>
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
import { useDateFormat } from "@vueuse/core";

interface WorkFrequency {
  workFrequencyId: string;
  startWorkFrequency: string;
  endWorkFrequency: string;
}

const workFrequencies = ref<WorkFrequency[]>([]);
const loading = ref(false);
const router = useRouter();

onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      "http://localhost:8080/api/work_frequency"
    );
    workFrequencies.value = response.data;
  } catch (error: any) {
    console.error("Erro ao buscar frequências:", error);
    // Adicione aqui um tratamento de erro para o usuário, se necessário
  } finally {
    loading.value = false;
  }
});

const formatDate = (isoDate: string) => {
  return useDateFormat(isoDate, "DD/MM/YYYY HH:mm").value;
};

const goToEditWorkFrequency = (id: string) => {
  router.push(`/work-frequencies/edit/${id}`);
};
</script>

<style scoped>
.list-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
}

.list-header {
  text-align: center;
  margin-bottom: 2rem;
}

.list-title {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.list-subtitle {
  color: #7f8c8d;
  font-size: 1rem;
}

.frequency-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.frequency-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.frequency-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-id {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.edit-btn {
  background: #e8f4ff;
  color: #3498db;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-btn:hover {
  background: #d4e7ff;
}

.time-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.time-label {
  color: #7f8c8d;
  font-weight: 500;
}

.time-value {
  color: #2c3e50;
  font-weight: 600;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #7f8c8d;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #95a5a6;
  font-size: 1.1rem;
}

.datetime-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.datetime-field::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
  cursor: pointer;
  padding: 4px;
}

.datetime-field::-webkit-datetime-edit {
  padding: 0.5rem;
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

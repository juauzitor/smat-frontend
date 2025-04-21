<template>
  <div class="form-container">
    <header class="form-header">
      <h2 class="form-title">⏱️ Cadastro de Frequência</h2>
      <p class="form-subtitle">Defina o período de trabalho</p>
    </header>

    <form @submit.prevent="submitForm" class="form-content">
      <div class="datetime-grid">
        <div class="input-group">
          <label for="start_work_frequency" class="input-label">
            <span class="label-icon">🕒</span>
            Início
          </label>
          <input
            type="datetime-local"
            id="start_work_frequency"
            v-model="start_work_frequency"
            class="input-field datetime-field"
            required
          />
          <!--<div class="input-hint">Formato: DD/MM/AAAA HH:mm</div>-->
        </div>

        <div class="input-group">
          <label for="end_work_frequency" class="input-label">
            <span class="label-icon">🕤</span>
            Término
          </label>
          <input
            type="datetime-local"
            id="end_work_frequency"
            v-model="end_work_frequency"
            class="input-field datetime-field"
            required
          />
        </div>
      </div>

      <button type="submit" class="submit-btn" :disabled="loading">
        <span v-if="loading" class="loading-dots"></span>
        <span v-else>💾 Salvar Frequência</span>
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
      ← Voltar para a página inicial
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const start_work_frequency = ref("");
const end_work_frequency = ref("");
const responseMessage = ref("");
const responseSuccess = ref(false);
const loading = ref(false);

const submitForm = async () => {
  loading.value = true;
  try {
    const startISO = new Date(start_work_frequency.value).toISOString();
    const endISO = new Date(end_work_frequency.value).toISOString();

    const response = await axios.post(
      "http://localhost:8080/api/work_frequency",
      {
        startWorkFrequency: startISO,
        endWorkFrequency: endISO,
      }
    );

    responseMessage.value = `Frequência registrada! ID: ${
      response.data.workFrequencyId || "N/A"
    }`;
    responseSuccess.value = true;
    start_work_frequency.value = "";
    end_work_frequency.value = "";
  } catch (error: any) {
    responseMessage.value = `Erro: ${
      error.response?.data?.message || error.message
    }`;
    responseSuccess.value = false;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
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

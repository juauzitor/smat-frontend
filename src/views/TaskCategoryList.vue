<template>
  <div class="list-container">
    <header class="list-header">
      <h2 class="list-title">📂 categorias Cadastradas</h2>
      <p class="list-subtitle">Lista de organizações parceiras</p>
    </header>

    <div class="list-content">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <span>Carregando empresas...</span>
      </div>

      <div v-else-if="taskCategories.length === 0" class="empty-state">
        📭 Nenhuma categoria cadastrada
      </div>

      <div v-else class="category-grid">
        <div
          v-for="category in taskCategories"
          :key="category.taskCategoryId"
          class="category-card"
        >
          <div class="card-header">
            <div class="category-icon">📑</div>
            <div class="category-info">
              <h3 class="category-name">{{ category.categoryName }}</h3>
              <p class="category-id">ID: {{ category.taskCategoryId }}</p>
            </div>
          </div>
          <button
            @click="goToEditTaskCategory(category.taskCategoryId)"
            class="edit-btn"
          >
            ✏️ Editar
          </button>
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
  } catch (error: any) {
    console.error("Erro ao buscar categorias:", error);
    // Adicione aqui um tratamento de erro para o usuário, se necessário
  } finally {
    loading.value = false;
  }
});

const goToEditTaskCategory = (id: string) => {
  router.push(`/tasks_categories/edit/${id}`);
};
</script>

<style scoped>
.category-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.category-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.category-icon {
  font-size: 2rem;
}

.category-info {
  flex-grow: 1;
}

.category-name {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.category-id {
  margin: 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.edit-btn {
  align-self: flex-end;
  background: #e8f4ff;
  color: #3498db;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-btn:hover {
  background: #d4e7ff;
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

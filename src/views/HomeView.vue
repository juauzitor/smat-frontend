<template>
  <div class="home">
    <header class="header">
      <h1 class="title">Bem-vindo ao Painel de Controle</h1>
      <p class="subtitle">Selecione a ação desejada:</p>
    </header>

    <div class="actions-grid">
      <section class="action-group">
        <h2 class="group-title">📝 Formulários</h2>
        <div class="group-items">
          <router-link
            v-for="form in forms"
            :key="form.to"
            :to="form.to"
            class="action-card"
          >
            <div class="card-content">
              <span class="icon">📋</span>
              <span class="text">{{ form.label }}</span>
            </div>
          </router-link>
        </div>
      </section>

      <section class="action-group">
        <h2 class="group-title">📚 Listagens</h2>
        <div class="group-items">
          <router-link
            v-for="list in lists"
            :key="list.to"
            :to="list.to"
            class="action-card"
          >
            <div class="card-content">
              <span class="icon">🗂️</span>
              <span class="text">{{ list.label }}</span>
            </div>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

const forms = [
  { to: "/company-form", label: "Formulário de Empresa" },
  { to: "/task-category-form", label: "Formulário de Categoria de Tarefa" },
  { to: "/work-frequency-form", label: "Formulário de Frequência de Trabalho" },
  { to: "/task-performed/create", label: "Formulário de Tarefas" },
];

const lists = [
  { to: "/companies", label: "Listar Empresas" },
  { to: "/task-categories", label: "Listar Categorias de Tarefa" },
  { to: "/work-frequencies", label: "Listar Frequências de Trabalho" },
  { to: "/task-performed", label: "Listar Tarefas" },
];
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.2rem;
}

.actions-grid {
  display: grid;
  gap: 2rem;
}

.action-group {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.group-title {
  color: #34495e;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ecf0f1;
}

.group-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.action-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
  border: 1px solid transparent;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  border-color: #3498db;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon {
  font-size: 1.8rem;
}

.text {
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 500;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .group-items {
    grid-template-columns: 1fr;
  }
}
</style>

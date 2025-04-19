<template>
  <div class="home">
    <h1>Bem-vindo!</h1>
    <p>Selecione o formulário que você deseja preencher:</p>
    <ul>
      <li>
        <router-link to="/company-form">Formulário de Empresa</router-link>
      </li>
      <li>
        <router-link to="/task-category-form"
          >Formulário de Categoria de Tarefa</router-link
        >
      </li>
      <li>
        <router-link to="/work-frequency-form"
          >Formulário de Frequência de Trabalho</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: blue;
  font-weight: bold;
}
</style>

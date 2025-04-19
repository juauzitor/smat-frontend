<template>
  <div class="home">
    <h1>Bem-vindo!</h1>
    <p>Selecione a ação desejada:</p>
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
      <hr />
      <li>
        <router-link to="/companies">Listar Empresas</router-link>
      </li>
      <li>
        <router-link to="/task-categories"
          >Listar Categorias de Tarefa</router-link
        >
      </li>
      <li>
        <router-link to="/work-frequencies"
          >Listar Frequências de Trabalho</router-link
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

hr {
  margin: 20px 0;
  border: 0;
  border-top: 1px solid #ccc;
}
</style>

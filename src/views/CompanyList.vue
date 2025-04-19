<template>
  <div>
    <h1>Lista de Empresas</h1>
    <ul v-if="companies.length > 0">
      <li v-for="company in companies" :key="company.companyId">
        {{ company.companyName }} (ID: {{ company.companyId }})
      </li>
    </ul>
    <p v-else-if="loading">Carregando empresas...</p>
    <p v-else>Nenhuma empresa encontrada.</p>
    <router-link to="/">Voltar para a Home</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface Company {
  companyId: string;
  companyName: string;
}

const companies = ref<Company[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get("http://localhost:8080/api/companies");
    companies.value = response.data;
  } catch (error: Error) {
    console.error("Erro ao buscar empresas:", error);
    // Adicione aqui um tratamento de erro para o usuário, se necessário
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
}
</style>

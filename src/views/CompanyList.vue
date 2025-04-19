<template>
  <div>
    <h1>Lista de Empresas</h1>
    <ul v-if="companies.length > 0">
      <li v-for="company in companies" :key="company.companyId">
        {{ company.companyName }} (ID: {{ company.companyId }})
        <button @click="goToEditCompany(company.companyId)">Editar</button>
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
import { useRouter } from "vue-router";

interface Company {
  companyId: string;
  companyName: string;
}

const companies = ref<Company[]>([]);
const loading = ref(false);
const router = useRouter();

onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get("http://localhost:8080/api/companies");
    companies.value = response.data;
  } catch (error: Error) {
    console.error("Erro ao buscar empresas:", error);
  } finally {
    loading.value = false;
  }
});

const goToEditCompany = (id: string) => {
  router.push(`/company/edit/${id}`);
};
</script>

<style scoped>
/* ... seus estilos ... */
button {
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>

<template>
  <div>
    <h1>Lista de Frequências de Trabalho</h1>
    <ul v-if="workFrequencies.length > 0">
      <li v-for="frequency in workFrequencies" :key="frequency.workFrequencyId">
        ID: {{ frequency.workFrequencyId }} - Início:
        {{ formatDate(frequency.startWorkFrequency) }} - Fim:
        {{ formatDate(frequency.endWorkFrequency) }}
      </li>
    </ul>
    <p v-else-if="loading">Carregando frequências...</p>
    <p v-else>Nenhuma frequência encontrada.</p>
    <router-link to="/">Voltar para a Home</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface WorkFrequency {
  workFrequencyId: string;
  startWorkFrequency: string;
  endWorkFrequency: string;
}

const workFrequencies = ref<WorkFrequency[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      "http://localhost:8080/api/work_frequency"
    );
    workFrequencies.value = response.data;
  } catch (error: Error) {
    console.error("Erro ao buscar frequências:", error);
    // Adicione aqui um tratamento de erro para o usuário, se necessário
  } finally {
    loading.value = false;
  }
});

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
</script>

<style scoped>
/* Estilos semelhantes às outras listas */
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
}
</style>

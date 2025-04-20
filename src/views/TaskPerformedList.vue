<template>
  <div>
    <h1>Lista de Tarefas Realizadas</h1>
    <router-link to="/task-performed/create">Criar Nova Tarefa</router-link>
    <ul v-if="taskPerformedList.length > 0">
      <li v-for="task in taskPerformedList" :key="task.taskPerformedId">
        ID: {{ task.taskPerformedId }} - Empresa:
        {{ task.company?.companyName || task.company?.companyId }} - Categoria:
        {{
          task.taskCategory?.categoryName || task.taskCategory?.taskCategoryId
        }}
        - Frequência: {{ formatDate(task.workFrequency?.startWorkFrequency) }} -
        {{ formatDate(task.workFrequency?.endWorkFrequency) }} - Descrição:
        {{ task.description }}
        <button @click="goToEditTaskPerformed(task.taskPerformedId)">
          Editar
        </button>
      </li>
    </ul>
    <p v-else-if="loading">Carregando tarefas realizadas...</p>
    <p v-else>Nenhuma tarefa realizada encontrada.</p>
    <router-link to="/">Voltar para a Home</router-link>
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
/* Estilos de lista */
button {
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>

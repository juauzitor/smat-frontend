<template>
  <div>
    <h1>Editar Frequência de Trabalho</h1>
    <form @submit.prevent="updateWorkFrequency">
      <div>
        <label for="startWorkFrequency">Início da Frequência:</label>
        <input
          type="datetime-local"
          id="startWorkFrequency"
          v-model="startWorkFrequency"
          required
        />
      </div>
      <div>
        <label for="endWorkFrequency">Fim da Frequência:</label>
        <input
          type="datetime-local"
          id="endWorkFrequency"
          v-model="endWorkFrequency"
          required
        />
      </div>
      <button type="submit" :disabled="loading">
        <span v-if="loading">Salvando...</span>
        <span v-else>Salvar Alterações</span>
      </button>
      <div v-if="responseMessage" class="response">
        {{ responseMessage }}
      </div>
    </form>
    <router-link to="/work-frequencies"
      >Voltar para a Lista de Frequências</router-link
    >
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

interface WorkFrequency {
  workFrequencyId?: string;
  startWorkFrequency: string;
  endWorkFrequency: string;
}

const route = useRoute();
const router = useRouter();
const workFrequencyId = ref<string | null>(null);
const startWorkFrequency = ref("");
const endWorkFrequency = ref("");
const loading = ref(false);
const responseMessage = ref("");

onMounted(async () => {
  workFrequencyId.value = route.params.id as string;
  if (workFrequencyId.value) {
    await fetchWorkFrequency();
  }
});

const fetchWorkFrequency = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `http://localhost:8080/api/work_frequency/${workFrequencyId.value}`
    );
    // Formate as datas ISO para o formato de datetime-local
    const startDate = new Date(response.data.startWorkFrequency);
    const endDate = new Date(response.data.endWorkFrequency);
    startWorkFrequency.value = formatDateForInput(startDate);
    endWorkFrequency.value = formatDateForInput(endDate);
  } catch (error: any) {
    console.error("Erro ao buscar frequência para edição:", error);
    responseMessage.value = `Erro ao buscar frequência: ${
      error.message || "Erro desconhecido"
    }`;
  } finally {
    loading.value = false;
  }
};

const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0"); // Opcional, dependendo da precisão desejada
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const updateWorkFrequency = async () => {
  if (!workFrequencyId.value) return;
  loading.value = true;
  try {
    // As datas já estão no formato ISO 8601 devido ao v-model com datetime-local
    const startWorkFrequencyISO = new Date(
      startWorkFrequency.value
    ).toISOString();
    const endWorkFrequencyISO = new Date(endWorkFrequency.value).toISOString();

    const response = await axios.put(
      `http://localhost:8080/api/work_frequency/${workFrequencyId.value}`,
      {
        startWorkFrequency: startWorkFrequencyISO,
        endWorkFrequency: endWorkFrequencyISO,
      }
    );
    responseMessage.value = `Frequência de trabalho atualizada com sucesso! ID: ${response.data.workFrequencyId}`;
    setTimeout(() => {
      router.push("/work-frequencies");
    }, 1500);
  } catch (error: any) {
    console.error("Erro ao atualizar frequência:", error);
    responseMessage.value = `Erro ao atualizar frequência: ${
      error.message || "Erro desconhecido"
    }`;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Estilos semelhantes aos outros formulários */
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-bottom: 20px;
}

div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
input[type="datetime-local"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

.response {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #4caf50;
  background-color: #e8f5e9;
  color: #4caf50;
  border-radius: 4px;
}
</style>

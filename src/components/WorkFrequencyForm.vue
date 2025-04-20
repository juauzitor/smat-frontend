<template>
  <div>
    <h2>Formulário de Frequência de Trabalho</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="start_work_frequency">Início da Frequência:</label>
        <input
          type="datetime-local"
          id="start_work_frequency"
          v-model="start_work_frequency"
          required
        />
      </div>
      <div>
        <label for="end_work_frequency">Fim da Frequência:</label>
        <input
          type="datetime-local"
          id="end_work_frequency"
          v-model="end_work_frequency"
          required
        />
      </div>
      <button type="submit">Enviar Frequência</button>
      <div v-if="responseMessage" class="response">
        {{ responseMessage }}
      </div>
    </form>
    <router-link to="/">Voltar para a Home</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
//import { useRouter } from "vue-router";

const work_frequency_id = ref<number | null>(null);
const start_work_frequency = ref("");
const end_work_frequency = ref("");
const responseMessage = ref("");
//const router = useRouter();

const submitForm = async () => {
  try {
    // Formate as datas para ISO 8601
    const startWorkFrequencyISO = new Date(
      start_work_frequency.value
    ).toISOString();
    const endWorkFrequencyISO = new Date(
      end_work_frequency.value
    ).toISOString();

    const response = await axios.post(
      "http://localhost:8080/api/work_frequency",
      {
        startWorkFrequency: startWorkFrequencyISO,
        endWorkFrequency: endWorkFrequencyISO,
      }
    );
    responseMessage.value = `Frequência de trabalho com ID "${
      work_frequency_id.value
    }" enviada com sucesso! ID no backend: ${response.data.id || "N/A"}`;
    work_frequency_id.value = null;
    start_work_frequency.value = "";
    end_work_frequency.value = "";
  } catch (error: any) {
    responseMessage.value = `Erro ao enviar a frequência de trabalho: ${
      error.message || "Erro desconhecido"
    }`;
    console.error("Erro ao enviar frequência de trabalho:", error);
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

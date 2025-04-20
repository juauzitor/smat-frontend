<template>
  <div>
    <h2>Formulário de Empresa</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="companyName">Nome da Empresa:</label>
        <input type="text" id="companyName" v-model="companyName" required />
      </div>
      <button type="submit">Enviar Empresa</button>
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

const companyName = ref("");
const responseMessage = ref("");
//const router = useRouter();

const submitForm = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/companies", {
      companyName: companyName.value,
    });
    responseMessage.value = `Empresa "${
      companyName.value
    }" enviada com sucesso! ID: ${response.data.id || "N/A"}`;
    companyName.value = ""; // Limpa o formulário
  } catch (error: any) {
    responseMessage.value = `Erro ao enviar a empresa: ${
      error.message || "Erro desconhecido"
    }`;
    console.error("Erro ao enviar empresa:", error);
  }
};
</script>

<style scoped>
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

input[type="text"] {
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

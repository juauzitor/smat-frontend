<template>
  <div>
    <h2>Formulário de Categoria de Tarefa</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="categoryName">Nome da Categoria:</label>
        <input type="text" id="categoryName" v-model="categoryName" required />
      </div>
      <button type="submit">Enviar Categoria</button>
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

const categoryName = ref("");
const responseMessage = ref("");
//const router = useRouter();

const submitForm = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/tasks_categories",
      {
        categoryName: categoryName.value,
      }
    );
    responseMessage.value = `Categoria "${
      categoryName.value
    }" enviada com sucesso! ID: ${response.data.id || "N/A"}`;
    categoryName.value = ""; // Limpa o formulário
  } catch (error: any) {
    responseMessage.value = `Erro ao enviar a categoria: ${
      error.message || "Erro desconhecido"
    }`;
    console.error("Erro ao enviar categoria:", error);
  }
};
</script>

<style scoped>
/* Estilos semelhantes ao CompanyForm */
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

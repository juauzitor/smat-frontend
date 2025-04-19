<template>
  <div>
    <h1>Editar Empresa</h1>
    <form @submit.prevent="updateCompany">
      <div>
        <label for="companyName">Nome da Empresa:</label>
        <input type="text" id="companyName" v-model="companyName" required />
      </div>
      <button type="submit" :disabled="loading">
        <span v-if="loading">Salvando...</span>
        <span v-else>Salvar Alterações</span>
      </button>
      <div v-if="responseMessage" class="response">
        {{ responseMessage }}
      </div>
    </form>
    <router-link to="/companies">Voltar para a Lista de Empresas</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

interface Company {
  companyId?: string;
  companyName: string;
}

const route = useRoute();
const router = useRouter();
const companyId = ref<string | null>(null);
const companyName = ref("");
const loading = ref(false);
const responseMessage = ref("");

onMounted(async () => {
  companyId.value = route.params.id as string;
  if (companyId.value) {
    await fetchCompany();
  }
});

const fetchCompany = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `http://localhost:8080/api/companies/${companyId.value}`
    );
    companyName.value = response.data.companyName;
  } catch (error: any) {
    console.error("Erro ao buscar empresa para edição:", error);
    responseMessage.value = `Erro ao buscar empresa: ${
      error.message || "Erro desconhecido"
    }`;
  } finally {
    loading.value = false;
  }
};

const updateCompany = async () => {
  if (!companyId.value) return;
  loading.value = true;
  try {
    const response = await axios.put(
      `http://localhost:8080/api/companies/${companyId.value}`,
      {
        companyName: companyName.value,
      }
    );
    responseMessage.value = `Empresa "${companyName.value}" atualizada com sucesso! ID: ${response.data.companyId}`;
    // Redirecionar para a lista após um breve período
    setTimeout(() => {
      router.push("/companies");
    }, 1500);
  } catch (error: any) {
    console.error("Erro ao atualizar empresa:", error);
    responseMessage.value = `Erro ao atualizar empresa: ${
      error.message || "Erro desconhecido"
    }`;
  } finally {
    loading.value = false;
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

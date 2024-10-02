<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const id = localStorage.getItem('id');
const formData = reactive({
  advice_analys: 0,
});
const formErrors = reactive({});
const token = localStorage.getItem('token');
const successMessage = ref('');
const errorMessage = ref('');

const fetchData = async (id) => {
  try {
    const response = await axios.get(`https://gateway.berkompeten.com/api/admin/master/config/detail?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Object.assign(formData, response.data.data);
  } catch (error) {
    console.error('Error fetching config data:', error);
  }
};

const handleSubmit = async () => {
  try {
    const url = `https://gateway.berkompeten.com/api/admin/master/config/upsert`;
    const method = 'post';

    await axios({
      method,
      url,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    successMessage.value = 'Config saved successfully!';
    setTimeout(() => {
      resetForm();
      router.push('/config-management'); // Redirect to the questions list page after a delay
    }, 2000);
  } catch (error) {
    console.error('Error submitting form:', error);
    if (error.response && error.response.data) {
      if (error.response.status === 500) {
        errorMessage.value = error.response.data.message || 'An error occurred while saving. Please try again.';
      } else if (error.response.data.error) {
        Object.assign(formErrors, error.response.data.message);
        console.log('ERROR: ', formErrors);
      } else {
        errorMessage.value = 'An error occurred while saving. Please try again.';
      }
    } else {
      errorMessage.value = 'An error occurred while saving. Please try again.';
    }
  }
};

const resetForm = () => {
  Object.assign(formData, {
    advice_analys: 0,
  });
};

onMounted(() => {
  if (id) {
    fetchData(id);
  } else {
    localStorage.removeItem('id');
  }
});
</script>


<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Config Details">
        <VCardText>
          <VForm @submit.prevent="handleSubmit">
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="formData.advice_analys"
                  :error-messages="formErrors.advice_analys"
                  label="Advice Analys Limit"
                  type="number"
                />
              </VCol>
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit" color="#0080ff">Save</VBtn>
                <VBtn @click="resetForm" color="secondary" variant="outlined">Reset</VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VCardText>
          <VAlert v-if="successMessage" type="success" dismissible @click:close="successMessage = ''">
            {{ successMessage }}
          </VAlert>
          <VAlert v-if="errorMessage" type="error" dismissible @click:close="errorMessage = ''">
            {{ errorMessage }}
          </VAlert>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>


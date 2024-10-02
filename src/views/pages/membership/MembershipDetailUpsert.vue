<script setup>
  import axios from 'axios';
import {
onMounted,
reactive
} from 'vue';
import {
useRoute,
useRouter
} from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  const id = localStorage.getItem('id')
  const formData = reactive({
    name: '',
    class: '',
    description: '',
    image_url: '',
    price: '',
    activation_period: 0,
    is_active: 0,
  });
  const formErrors = reactive({});
  const token = localStorage.getItem('token');
  const successMessage = ref('');
  const errorMessage = ref('');
  const systemListOption = ref([])

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
      `https://gateway.berkompeten.com/api/admin/master/membership/detail?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Object.assign(formData, response.data.data);
    } catch (error) {
      console.error("Error fetching membership data:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      formData.is_active = formData.is_active ? 1 : 0;
      const url = `https://gateway.berkompeten.com/api/admin/master/membership/upsert`;
      const method = 'post';

      await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      successMessage.value = 'membership saved successfully!';
      setTimeout(() => {
        resetForm()
        router.push('/membership-management'); // Redirect to the questions list page after a delay
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.data) {
        if (error.response.status === 500) {
            errorMessage.value = error.response.data.message || 'An error occurred while saving. Please try again.';
        } else if (error.response.data.error) {
            Object.assign(formErrors, error.response.data.message);
            console.log("ERROR: ", formErrors);
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
      name: '',
      class: '',
      description: '',
      image_url: '',
      price: '',
      activation_period: 0,
      is_active: 0,
    });
  };

  onMounted(() => {
    if (id) {
      fetchData(id);
    }else{
      localStorage.removeItem('id');
    }
  });
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Membership Details">
        <VCardText>
          <VForm @submit.prevent="handleSubmit">
            <VRow>
              <VCol cols="12">
                <VTextField v-model="formData.name" :error-messages="formErrors.name"
                  label="Name" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.class" :error-messages="formErrors.class"
                  label="Class" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.description" :error-messages="formErrors.description"
                  label="Description" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.price" :error-messages="formErrors.price"
                  label="Price" type="number" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.activation_period" :error-messages="formErrors.activation_period"
                  label="Activation Period" type="number" />
              </VCol>
              <VCol cols="12">
                <VSwitch
                  color="#0080ff"
                  v-model="formData.is_active"
                  :error-messages="formErrors.is_active"
                  label="Is Active"
                />
                <div v-if="formErrors.image_url" class="text-red-500 text-sm">
              </div>
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

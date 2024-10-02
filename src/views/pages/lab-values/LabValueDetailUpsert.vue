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
    category_lab_id: 0,
    indicator: '',
    unit: '',
    reference_value: '',
  });
  const formErrors = reactive({});
  const token = localStorage.getItem('token');
  const successMessage = ref('');
  const errorMessage = ref('');
  const categoryLabOption = ref([])

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
      `https://gateway.berkompeten.com/api/admin/master/lab-value/detail?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Object.assign(formData, response.data.data);
    } catch (error) {
      console.error("Error fetching lab value data:", error);
    }
  };

  const fetchCategoryLab = async () => {
    try {
      const response = await axios.get('https://gateway.berkompeten.com/api/admin/master/category-lab/fetch', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // Assuming the API response has an array of educational statuses
      categoryLabOption.value = response.data.data.map(d => ({
        id: d.id,
        name: d.name,
      }))
    } catch (error) {
      console.error('Error fetching category options:', error)
    }
  }

  const handleSubmit = async () => {
    try {
      const url = `https://gateway.berkompeten.com/api/admin/master/lab-value/upsert`;
      const method = 'post';

      await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      successMessage.value = 'Lab value saved successfully!';
      setTimeout(() => {
        resetForm()
        router.push('/lab-value-management'); // Redirect to the questions list page after a delay
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
      category_lab_id: 0,
      indicator: '',
      unit: '',
      reference_value: '',
    });
  };

  onMounted(() => {
    fetchCategoryLab()
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
      <VCard title="Lab Value Details">
        <VCardText>
          <VForm @submit.prevent="handleSubmit">
            <VRow>
              <VCol cols="12">
                <VSelect v-model="formData.category_lab_id" :error-messages="formErrors.category_lab_id"
                  label="Category Lab" :items="categoryLabOption" placeholder="Select Category Lab" item-value="id"
                  item-title="name"></VSelect>
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.indicator" :error-messages="formErrors.indicator"
                  label="Indicator" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.unit" :error-messages="formErrors.unit"
                  label="Unit" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.reference_value" :error-messages="formErrors.reference_value"
                  label="Reference Value" />
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

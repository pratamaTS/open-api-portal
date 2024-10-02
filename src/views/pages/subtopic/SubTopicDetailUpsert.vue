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
    topic_id: 0,
    subtopic: '',
    competence: 0.0,
    is_active: 0,
  });
  const formErrors = reactive({});
  const token = localStorage.getItem('token');
  const successMessage = ref('');
  const errorMessage = ref('');
  const topicListOption = ref([])

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
      `https://gateway.berkompeten.com/api/admin/master/subtopic/detail?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Object.assign(formData, response.data.data);
    } catch (error) {
      console.error("Error fetching subtopic data:", error);
    }
  };

  const fetchTopicList = async () => {
    try {
      const response = await axios.get('https://gateway.berkompeten.com/api/admin/master/topic/fetch', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // Assuming the API response has an array of educational statuses
      topicListOption.value = response.data.data.map(d => ({
        id: d.id,
        name: d.topic,
      }))
    } catch (error) {
      console.error('Error fetching sub topic options:', error)
    }
  }

  watch(() => formData.competence, (newValue) => {
    formData.competence = parseFloat(newValue);
  });

  const handleSubmit = async () => {
    try {
      const url = `https://gateway.berkompeten.com/api/admin/master/subtopic/upsert`;
      const method = 'post';

      console.log("FORM DATA: ", formData)

      await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      successMessage.value = 'Sub topic saved successfully!';
      setTimeout(() => {
        resetForm()
        router.push('/subtopic-management'); // Redirect to the questions list page after a delay
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
      topic_id: 0,
      subtopic: '',
      competence: 0.0,
      is_active: 0,
    });
  };

  onMounted(() => {
    fetchTopicList()
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
      <VCard title="Sub Topic Details">
        <VCardText>
          <VForm @submit.prevent="handleSubmit">
            <VRow>
              <VCol cols="12">
                <VSelect v-model="formData.topic_id" :error-messages="formErrors.topic_id"
                  label="Topic List" :items="topicListOption" placeholder="Select Topic List" item-value="id"
                  item-title="name"></VSelect>
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.subtopic" :error-messages="formErrors.subtopic"
                  label="Sub Topic" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.competence" :error-messages="formErrors.competence" type="number" step="0.01"
                  label="Competence" />
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

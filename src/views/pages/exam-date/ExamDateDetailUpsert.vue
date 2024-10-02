<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const id = localStorage.getItem('id');

const formData = reactive({
  date: '',
  is_active: false,
});
const formErrors = reactive({});
const token = localStorage.getItem('token');
const successMessage = ref('');
const errorMessage = ref('');
const menu = ref(false);
const date = ref(null);
const time = ref(null);

const fetchData = async (id) => {
  try {
    const response = await axios.get(
      `https://gateway.berkompeten.com/api/admin/master/exam-date/detail?id=${id}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    Object.assign(formData, response.data.data);
    // Set the date and time from the response data if available
    if (formData.date) {
      const dateTime = new Date(formData.date);
      date.value = dateTime.toISOString().substr(0, 10); // Extract the date part
      time.value = dateTime.toISOString().substr(11, 5); // Extract the time part
    }
  } catch (error) {
    console.error("Error fetching exam date data:", error);
    errorMessage.value = 'Failed to fetch exam date data.';
  }
};

const handleSubmit = async () => {
  try {
    saveDateTime(); // Ensure date and time are saved before submitting
    const url = `https://gateway.berkompeten.com/api/admin/master/exam-date/upsert`;
    const method = 'post';

    await axios({
      method,
      url,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    successMessage.value = 'Exam Date saved successfully!';
    setTimeout(() => {
      resetForm();
      router.push('/exam-date-management');
    }, 2000);
  } catch (error) {
    console.error("Error submitting form:", error);
    if (error.response && error.response.data) {
      if (error.response.status === 500) {
        errorMessage.value = error.response.data.message || 'An error occurred while saving. Please try again.';
      } else if (error.response.data.error) {
        Object.assign(formErrors, error.response.data.message);
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
    date: '',
    is_active: false,
  });
  date.value = null;
  time.value = null;
  formErrors.value = {};
  successMessage.value = '';
  errorMessage.value = '';
};

const saveDateTime = () => {
  if (date.value && time.value) {
    const dateTime = new Date(`${date.value}T${time.value}`);
    formData.date = dateTime.toISOString();
    menu.value = false;
  }
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
      <VCard title="Exam Date Details">
        <VCardText>
          <VForm @submit.prevent="handleSubmit">
            <VRow>
              <VCol cols="12">
                <VMenu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <VTextField
                      v-model="date.value"
                      label="Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="formErrors.date"
                      @click="menu.value = true"
                    />
                  </template>
                  <VDatePicker
                    v-model="date.value"
                    no-title
                    scrollable
                    @change="menu.value = false"
                  />
                </VMenu>
              </VCol>
              <VCol cols="12">
                <VSwitch
                  color="#0080ff"
                  v-model="formData.is_active"
                  :error-messages="formErrors.is_active"
                  label="Is Active"
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

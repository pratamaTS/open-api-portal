<script setup>
  import avatar1 from '@images/avatars/avatar-1.png';
import axios from 'axios';
import {
computed,
onMounted,
reactive,
watch
} from 'vue';
import {
useRoute,
useRouter
} from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  const id = localStorage.getItem('question_id')
  const questionPacketsOption = ref([])
  const subtopicListOption = ref([])
  const formData = reactive({
    image_url: avatar1,
    question_packet_id: '',
    subtopic_list_id: '',
    scenario: '',
    question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    option_e: '',
    correct_answer: '',
    image_url: '',
    discussion: '',
    is_active: 0,
  });
  const formErrors = reactive({});
  const token = localStorage.getItem('token');
  const refInputEl = ref(null);
  const imgUrl = computed(() => formData.image_url || avatar1)
  const successMessage = ref('');
  const errorMessage = ref('');
  const fetchData = async (id) => {
    try {
      const response = await axios.get(
      `https://gateway.berkompeten.com/api/admin/master/question/detail?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Object.assign(formData, response.data.data);
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      formData.is_active = formData.is_active ? 1 : 0;
      const url = `https://gateway.berkompeten.com/api/admin/master/question/upsert`;
      const method = 'post';
      await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      successMessage.value = 'Question saved successfully!';
      setTimeout(() => {
        resetForm()
        router.push('/question-management'); // Redirect to the questions list page after a delay
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
        errorMessage.value = 'An error occurred while saving the question. Please try again.';
      }
    }
  };
  const resetForm = () => {
    Object.assign(formData, {
      image_url: null,
      question_packet_id: null,
      subtopic_list_id: null,
      question_number: null,
      scenario: '',
      question: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      option_e: '',
      correct_answer: '',
      image_url: '',
      discussion: '',
      is_active: 0,
    });
  };
  const fetchQuestionPackets = async () => {
    try {
      const response = await axios.get('https://gateway.berkompeten.com/api/admin/master/question-packet/fetch', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // Assuming the API response has an array of educational statuses
      questionPacketsOption.value = response.data.data.map(d => ({
        id: d.id,
        name: d.name,
      }))
    } catch (error) {
      console.error('Error fetching question packet options:', error)
    }
  }

  const fetchSubtopicList = async (search = '') => {
    try {
      const response = await axios.get(
        `https://gateway.berkompeten.com/api/admin/master/subtopic/fetch?search=${search}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      subtopicListOption.value = response.data.data.map(d => ({
        id: d.id,
        name: d.subtopic,
      }))
    } catch (error) {
      console.error("Error fetching subtopic list:", error);
    }
  };
  
  const getNextQuestionNumber = async () => {
    try {
      var url = 'https://gateway.berkompeten.com/api/admin/master/question/next-number'
      if (formData.question_packet_id) {
        url = url + "?question_packet_id=" + formData.question_packet_id
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // Assuming the API response has an array of educational statuses
      formData.question_number = response.data.data.next_number
      console.log("next number: ", formData.question_number)
    } catch (error) {
      console.error('Error fetching next number:', error)
    }
  }
  const changeImage = async (event) => {
    const file = event.target.files[0];
    const formDataImage = new FormData();
    formDataImage.append('image', file);
    try {
      const response = await axios.post('https://gateway.berkompeten.com/api/admin/master/upload-image',
        formDataImage, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      formData.image_url = response.data.data.image_url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const resetImage = () => {
    formData.image_url = '';formData.is_active = formData.is_active ? 1 : 0;
  };

  watch(() => formData.question_packet_id, (newVal, oldVal) => {
    console.log(`question_packet_id changed from ${oldVal} to ${newVal}`);
    if (newVal && !id) {
      getNextQuestionNumber();
    }
  });

  onMounted(() => {
    fetchQuestionPackets()
    fetchSubtopicList()
    if (id) {
      fetchData(id);
    }else{
      localStorage.removeItem('question_id');
    }
  });

  const handleSearch = (searchText) => {
    fetchSubtopicList(searchText);
  };

  watch(() => formData.subtopic_list_id, (newVal) => {
    if (newVal === '') {
      fetchSubtopicList('');
    }
  });
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Question Details">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar rounded="lg" size="100" class="me-6" :image="imgUrl" />
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn color="#0080ff" @click="refInputEl?.click()">
                <VIcon icon="ri-upload-cloud-line" class="d-sm-none" />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>
              <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden
                @input="changeImage" />
              <VBtn type="reset" color="error" variant="outlined" @click="resetImage">
                <span class="d-none d-sm-block">Reset</span>
                <VIcon icon="ri-refresh-line" class="d-sm-none" />
              </VBtn>
            </div>
            <p class="text-body-1 mb-0">Allowed JPG, GIF or PNG. Max size of 2048MB</p>
            <div v-if="formErrors.image_url" class="text-red-500 text-sm">
              <span style="color: red;">{{ formErrors.image_url[0] }}</span> 
            </div>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <VForm @submit.prevent="handleSubmit">
            <VRow>
              <VCol cols="12">
                <VSelect v-model="formData.question_packet_id" :error-messages="formErrors.question_packet_id"
                  label="Question Packet" :items="questionPacketsOption" placeholder="Select question packet"
                  item-value="id" item-title="name"></VSelect>
              </VCol>
              <VCol cols="12">
                <VAutocomplete 
                  v-model="formData.subtopic_list_id" 
                  :error-messages="formErrors.subtopic_list_id"
                  label="Sub Topic List" 
                  :items="subtopicListOption" 
                  placeholder="Select Sub Topic List" 
                  item-value="id"
                  item-title="name"
                  :search-input.sync="searchInput"
                  @update:search-input="handleSearch"
                />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.question_number" :error-messages="formErrors.question_number"
                  label="Question Number" readonly />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.scenario" :error-messages="formErrors.scenario"
                  label="Scenario" />
              </VCol>
              <VCol cols="12">
                <VTextarea v-model="formData.question" :error-messages="formErrors.question" label="Question"
                  placeholder="Enter question" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.option_a" :error-messages="formErrors.option_a" label="Option A"
                  placeholder="Enter option A" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.option_b" :error-messages="formErrors.option_b" label="Option B"
                  placeholder="Enter option B" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.option_c" :error-messages="formErrors.option_c" label="Option C"
                  placeholder="Enter option C" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.option_d" :error-messages="formErrors.option_d" label="Option D"
                  placeholder="Enter option D" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.option_e" :error-messages="formErrors.option_e" label="Option E"
                  placeholder="Enter option E" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="formData.correct_answer" :error-messages="formErrors.correct_answer"
                  label="Correct Answer" placeholder="Enter correct answer" />
              </VCol>
              <VCol cols="12">
                <VTextarea v-model="formData.discussion" :error-messages="formErrors.discussion" label="Discussion"
                  placeholder="Enter discussion" />
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

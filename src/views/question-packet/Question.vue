<script setup>
import { emitter } from '@/main';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

 // Replace with the actual key you use for the token
const question = ref({});
const router = useRouter();
const route = useRoute()
const options = ref([])
var token = localStorage.getItem('token');
const dialog = ref(false); // Added for dialog control

onMounted(async () => {
  emitter.on('refreshQuestion', (evt) => {
    console.log("run emit trigger: ", evt.number)
    selectedOption.value = null
    selectedOptionYakin.value = null
    getQuestion()
  })

  await getQuestion()
});

const getQuestion = async () => {
  if (token) {
    try {
      const routeQuestionPacketID = localStorage.getItem('paket')
      const number = localStorage.getItem('number')
      const response = await axios.get('https://gateway.berkompeten.com/api/student/question?id='+routeQuestionPacketID+'&number='+number, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      question.value = response.data.data;
      localStorage.setItem('question_id', response.data.data.id)

      console.log('question: ', question)

      const optionA = { label: response.data.data.option_a, value: 'A', color: "#0080ff" };
      const optionB = { label: response.data.data.option_b, value: 'B', color: "#0080ff" };
      const optionC = { label: response.data.data.option_c, value: 'C', color: "#0080ff" };
      const optionD = { label: response.data.data.option_d, value: 'D', color: "#0080ff" };
      const optionE = { label: response.data.data.option_e, value: 'E', color: "#0080ff" };

      options.value = [optionA, optionB, optionC, optionD, optionE]
      console.log('option: ', options)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if the response status is 401
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        router.push('/login');
      }
    }
  } else {
    // Redirect to login page if token is not present
    router.push('/login');
  }
};

const selectedOption = ref(null);
const selectedOptionYakin = ref(null);

const keyakinan = [
  { label: 'Sangat Yakin', value: 'yakin', color: 'success' },
  { label: 'Masih Ragu', value: 'ragu', color: 'warning' },
  { label: 'Saya tidak tahu untuk jawaban soal ini', value: 'tidak tahu', color: 'danger' },
];

const saveToLocalStorage = () => {
  console.log("selected option: ", selectedOption.value)
  localStorage.setItem('answer', selectedOption.value);
};

const saveYakinToLocalStorage = () => {
  console.log("selected option yakin: ", selectedOptionYakin.value)
  localStorage.setItem('answerValue', selectedOptionYakin.value);
};
</script>

<template>
  <VCard>
    <VCardItem class="outlined-card-item">
      <VCardTitle><span style="color: #0080ff;">{{ question.question_number }}</span></VCardTitle>
      <VImg v-if="question.image_url != ''" :src="question.image_url" style="block-size: 350px; cursor: pointer; inline-size: 350px;" @click="dialog = true" />
      <p style="color: black;" class="font-weight-semibold mb-1">
        {{ question.scenario }}
      </p>
      <p style="color: black; padding-block-start: 15px;" class="font-weight-semibold mb-1">
        {{ question.question }}
      </p>
      <div class="me-n3" style="padding: 20px;">
        <VRow align="center">
          <VCol cols="12" md="12">
            <!-- Use v-model to bind the selected option -->
            <VRadioGroup v-model="selectedOption" class="mb-2" @change="saveToLocalStorage">
              <!-- Loop through the options and create radio buttons -->
              <VRadio
                v-for="(option, index) in options"
                :key="index"
                :label="option.label"
                :value="option.value"
                :color="option.color"
              />
            </VRadioGroup>
          </VCol>
        </VRow>
      </div>
    </VCardItem>

    <VCardItem class="outlined-card-item">
      <VCardTitle><span style="color: #0080ff;">Seberapa yakin jawaban anda?</span></VCardTitle>
      <div class="me-n3" style="padding: 20px;">
        <VRow align="center">
          <VCol cols="12" md="12">
            <!-- Use v-model to bind the selected option -->
            <VRadioGroup v-model="selectedOptionYakin" class="mb-2" @change="saveYakinToLocalStorage">
              <!-- Loop through the options and create radio buttons -->
              <VRadio
                v-for="(option, index) in keyakinan"
                :key="index"
                :label="option.label"
                :value="option.value"
              />
            </VRadioGroup>
          </VCol>
        </VRow>
      </div>
    </VCardItem>

    <!-- Dialog content -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-text>
          <VImg v-if="question.image_url !== ''" :src="question.image_url" style="max-inline-size: 100%;" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </VCard>
</template>

<style lang="scss" scoped>
.outlined-card-item {
  border: 1px solid #ccc; /* Customize the color and size as needed */
  border-radius: 5px; /* Optional: Add border radius for rounded corners */
  margin: 10px;
}
</style>

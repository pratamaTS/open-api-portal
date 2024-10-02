<script setup>
import { emitter } from '@/main';
import axios from 'axios';
import { nextTick, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

 // Replace with the actual key you use for the token
const groupedButtons = ref([]);
const router = useRouter();
const route = useRoute()
const routeQuestionPacketID = ref(null)
const soal = ref(null)
var token = localStorage.getItem('token');
const errorMessage = ref(null)

const buttonsPerRow = 5;
onMounted(async () => {
  await getOrderNumber()
  await nextTick()
  scrollToCurrentNumber()
});

// Define the number of buttons per row
var answer = ref(null)
var answerValue = ref(null)
var previousNumber = ref(null)
var nextNumber = ref(null)
var question_packet_id = ref(null)
var question_id = ref(null)

// Compute the grouped buttons based on the specified logic

const getOrderNumber = async () => {
  if (token) {
    try {
      routeQuestionPacketID.value = localStorage.getItem('paket')
      soal.value = localStorage.getItem('number')
      const response = await axios.get('https://gateway.berkompeten.com/api/student/questions/orders?id='+routeQuestionPacketID.value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const questions = response.data.question_numbers;
      console.log("question length: ", questions.length)
      groupedButtons.value = computed(() => {
        const result = [];
        for (let i = 0; i < questions.length; i += buttonsPerRow) {
          result.push(questions.slice(i, i + buttonsPerRow));
        }
        console.log("result: ", result)
        return result;
      });
      console.log("GROUP BUT: ", groupedButtons);
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


const previousPage = async () => {
  localStorage.setItem('number', previousNumber)
  await getOrderNumber()
  await nextTick()
  scrollToCurrentNumber()
  emitter.emit('refreshQuestion', {'number': previousNumber})
};

const jumpPage = async (number) => {
  localStorage.setItem('number', number)
  await getOrderNumber()
  await nextTick()
  scrollToCurrentNumber()
  emitter.emit('refreshQuestion', {'number': number})
};

const nextPage = async () => {
  answer = localStorage.getItem("answer")
  answerValue = localStorage.getItem("answerValue")
  question_packet_id = localStorage.getItem('paket')
  question_id = localStorage.getItem("question_id")

  if (answer === null ){
    errorMessage.value = "Tolong pilih jawaban terlebih dahulu"
    return
  }

  if (answerValue === null){
    errorMessage.value = "Tolong pilih seberapa yakin jawaban anda terlebih dahulu"
    return
  }

  if (question_id === null){
    errorMessage.value = "question id is empty. please contact your administrator"
    return
  }

  try {
    // const tokenRecaptcha = await grecaptcha.execute('6LfXRJ8pAAAAAOt1gKzRNIj1GOYGtp-DB_tz73OR', { action: 'submit' });
    console.log("paket id: ",question_packet_id)
    console.log("ques id: ",question_id)
    console.log("answer: ",answer)
    console.log("answer val: ",answerValue)

    const response = await axios.post('https://gateway.berkompeten.com/api/student/user/answer/add', {
      question_packet_id: question_packet_id,
      question_id: question_id,
      answer: answer,
      answer_value: answerValue
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("answer submit: ", answer)
    console.log("answer val submit: ", answerValue)

    localStorage.removeItem('answer');
    localStorage.removeItem('answerValue');
    
    previousNumber = response.data.data.before_number
    nextNumber = response.data.data.next_number

    console.log("prev number: ", previousNumber)
    console.log("next number: ", nextNumber)

    localStorage.setItem('previousNumber', previousNumber)
    localStorage.setItem('number', nextNumber)

    await getOrderNumber()
    await nextTick()
    scrollToCurrentNumber()
    emitter.emit('refreshQuestion', {'number': nextNumber})
  } catch (error) {
    // Handle login error (display error message, redirect, etc.)
    console.error('answer failed:', error);
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.errors;
    } else {
      errorMessage.value = 'An unexpected error occurred during login.';
    }
  }
};

const scrollToCurrentNumber = () => {
  const container = document.querySelector('.vcardtext-container');
  const button = document.querySelector(`.v-btn.custom-btn.active`);
  if (container && button) {
    container.scrollTop = button.offsetTop - container.offsetTop - container.clientHeight / 2 + button.clientHeight / 2;
  }
};
</script>

<template>
  <VCard>
    <VRow no-gutters>
      <VCol
        md="12"
      >
        <VCardItem>
          <VCardTitle><span style="color: #0080ff;">Soal Dikerjakan</span></VCardTitle>

          <template #append>
            <p class="font-weight-semibold mb-1">
              <span style="color: #0080ff;">{{ soal }}</span> / 200
            </p>
          </template>
        </VCardItem>

        <VDivider />

        <VCardText class="vcardtext-container">
          <VRow v-for="(row, rowIndex) in groupedButtons.value" :key="rowIndex" class="row-item">
            <div 
              v-for="item in row"
              :key="item.number" 
              class="d-flex flex-wrap v-item">
              <VBtn
                :color="soal === item.number ? 'primary' : (item.is_fill ? '#0080ff' : '')"
                :variant="item.is_fill ? 'tonal' : 'outlined'"
                class="mb-1 custom-btn"
                :class="{ active: soal === item.number }" 
                style=" block-size: 40px;inline-size: 40px;"
                @click="jumpPage(item.number)"
                :ref="'button-' + item.number"
              >
                <span class="d-sm-block">{{ item.number }}</span>
              </VBtn>
            </div>
          </VRow>
        </VCardText>
      </VCol>
    </VRow>
    
    <VDivider />

    <VCardText class="vcardtext-container">
      <div v-if="errorMessage" class="mt-2 text-danger" style="color: #ff5252;">
        {{ errorMessage }}
      </div>
      <VRow class="d-flex flex-wrap">
        <VCol cols="6" class="mb-1">
          <VBtn @click="previousPage" color="#0080ff" variant="outlined">Kembali</VBtn>
        </VCol>
        
        <VCol cols="6" class="mb-1">
          <VBtn @click="nextPage" color="#0080ff">Selanjutnya</VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>

.custom-title-style {
  margin-block-end: 0 !important;
}

/* Add custom styling for scroll and reduce gap */
.vcardtext-container {
  margin-block-end: -10px; /* Adjust this margin to reduce the gap between rows */
  max-block-size: 350px; /* Adjust the max height as needed */
  overflow-y: auto;
}

.vcardtext-container{
  margin-block-end: 0; /* Remove bottom margin for the last row */
}

.row-item{
  margin-inline: 1%;

  /* Remove bottom margin for the last row */
}

.v-item {
  margin: 2px; /* Remove bottom margin for the last row */
}

.custom-btn:hover, .custom-btn:focus {
  background-color: #d9edf7 !important; /* Add your desired hover/focus background color */
}

.custom-btn.active {
  border: 2px solid #0080ff !important;
  background-color: white !important; /* Adjust the background color for the active button */
  color: #0080ff !important;
}
</style>

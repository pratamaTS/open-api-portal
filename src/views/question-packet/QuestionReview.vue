<script setup>
import reviewLogo from '@images/review.png';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

 // Replace with the actual key you use for the token
const questionPacket = ref({});
const skippedQuestions = ref([]);
const router = useRouter()
var token = localStorage.getItem('token');

const cardItems = ref([])

onMounted(async () => {
  await getQuestionPacketReview()
  await getSkipQuestions()
});

const getQuestionPacketReview = async () => {
  if (token) {
    try {
      const routeQuestionPacketID = localStorage.getItem('paket')
      const response = await axios.get('https://gateway.berkompeten.com/api/student/user/test/review?id='+routeQuestionPacketID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      questionPacket.value = response.data.data;
    } catch (error) {
      handleUnauthorizedError(error)
    }
  } else {
    // Redirect to login page if token is not present
    router.push('/login');
  }
};

const getSkipQuestions = async () => {
  if (token) {
    try {
      const routeQuestionPacketID = localStorage.getItem('paket')
      const response = await axios.get('https://gateway.berkompeten.com/api/student/user/skip/questions?id='+routeQuestionPacketID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      skippedQuestions.value = response.data.data;
    } catch (error) {
      handleUnauthorizedError(error)
    }
  } else {
    // Redirect to login page if token is not present
    router.push('/login');
  }
};

const handleUnauthorizedError = (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    router.push('/login');
  }
};

const previousPage = () => {
  router.push('/soal')
};

const finishTest = async () => {
  const question_packet_id = localStorage.getItem('paket')

  try {
    // const tokenRecaptcha = await grecaptcha.execute('6LfXRJ8pAAAAAOt1gKzRNIj1GOYGtp-DB_tz73OR', { action: 'submit' });
    console.log("paket id: ",question_packet_id)

    const response = await axios.post('https://gateway.berkompeten.com/api/student/user/finish-the-test', {
      question_packet_id: question_packet_id
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    router.push('/result')
  } catch (error) {
    handleUnauthorizedError(error)
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.errors;
    }
  }

};

const openQuestion = async (questionNumber) => {
  try {
    localStorage.setItem('number', questionNumber)

    router.push("/soal")
  } catch (error) {
    // Handle login error (display error message, redirect, etc.)
    console.error('answer failed:', error);
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.errors;
    } else {
      errorMessage.value = 'An unexpected error occurred during login.';
    }
  }
}

const handleHover = (index, isHover) => {
  if (cardItems.value[index]) {
    if (isHover) {
      cardItems.value[index].classList.add('hovered');
    } else {
      cardItems.value[index].classList.remove('hovered');
    }
  }
}
</script>

<template>
  <VCard>
    <VCardItem class="text-center">
      <VImg :src="reviewLogo" style="block-size: 150px; inline-size: 150px;" class="mx-auto"/>
      <VCardTitle><span style="color: #0080ff; font-size: larger;"><b>Review kembali hasil pengerjaan test Anda</b> </span></VCardTitle>
      <div class="me-n3" style="padding: 20px;">
        <VRow align="center">
          <VCol cols="6" md="6">
            <p style="color: black; padding-block-start: 15px;" class="font-weight-semibold mb-1">
              Soal yang telah dikerjakan:
            </p>
            <p style="color: #0080ff; padding-block-start: 15px;" class="font-weight-semibold mb-1">
              {{ questionPacket.total_answered }}
            </p>
          </VCol>
          <VCol cols="6" md="6">
            <p style="color: black; padding-block-start: 15px;" class="font-weight-semibold mb-1">
              Soal yang belum dikerjakan:
            </p>
            <p style="color: red; padding-block-start: 15px;" class="font-weight-semibold mb-1">
              {{ questionPacket.total_skip }}
            </p>
          </VCol>
        </VRow>
        <VRow class="justify-center">
          <VCol cols="6" class="mb-1">
            <VBtn @click="finishTest" color="#0080ff" block>Selesaikan Tes</VBtn> <!-- Added block prop -->
          </VCol>

          <VCol cols="6" class="mb-1">
            <VBtn @click="previousPage" color="#0080ff" variant="outlined" block> <!-- Added block prop -->
              Kembali Mengerjakan
            </VBtn>
          </VCol>
        </VRow>

        <VRow class="d-flex flex-wrap justify-center">
          <p style="color: black; padding-block-start: 15px;" class="font-weight-semibold mb-1">
              Berikut di bawah ini adalah soal-soal yang belum diberikan jawaban : <span style="color: #0080ff;">Ada {{ questionPacket.total_skip }} Soal</span>
          </p>
        </VRow>
      </div>
    </VCardItem>

    <div style="max-block-size: 300px; overflow-y: auto;">
      <VCardItem
        v-for="(question, index) in skippedQuestions"
        :key="question.id"
        class="outlined-card-item"
        @click="openQuestion(question.question_number)"
        @mouseenter="handleHover(index, true)"
        @mouseleave="handleHover(index, false)"
        ref="cardItems"
      >
        <div class="me-n3" style="padding: 10px;">
            <VRow align="center">
                <p style="color: black; padding-block-start: 15px;" class="font-weight-semibold mb-1">
                    {{ question.question_number }} {{ question.question }}
                </p>
            </VRow>
        </div>
      </VCardItem>  
    </div>
  </VCard>
</template>

<style lang="scss" scoped>
.outlined-card-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.outlined-card-item:hover {
  border-color: #42baf7;
  background-color: #d9edf7;
}

.outlined-card-item:focus {
  border-color: #42baf7;
  background-color: #d9edf7;
  outline: none;
}

.outlined-card-item.hovered {
  border-color: #42baf7;
  background-color: #d9edf7;
}

.outlined-card-item.active {
  background-color: #0080ff; /* Example active color */
  color: white;
}
</style>

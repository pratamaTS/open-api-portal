<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

 // Replace with the actual key you use for the token
var questionPackets = ref([]);
var token = localStorage.getItem('token');
const router = useRouter();

onMounted(async () => {
  getQuestionPacketOnProgress()
});

const getQuestionPacketOnProgress = async () => {
  if (token) {
    try {
      const response = await axios.get('https://gateway.berkompeten.com/api/student/dashboard/question-packet-on-progress', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      questionPackets.value = response.data.data
      
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

const openDetail = (id) => {
  localStorage.setItem('paket', id)
  router.push("/detail")
}
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle><span style="color: #0080ff;">Lanjutkan Misi Belajarmu</span></VCardTitle>
      <p v-if="questionPackets.length > 0" class="text-body-1 mb-0">
        <span class="d-inline-block font-weight-medium text-high-emphasis">Selesaikan Paket Soal Ini</span>
      </p>
      <div v-if="questionPackets.length > 0" class="me-n3" style="padding: 20px;">
        <VRow align="center" v-for="item in questionPackets">
          <VAvatar
            color="#0080ff"
            rounded
            size="40"
            class="elevation-2"
          >
            <VIcon
              size="24"
              icon="ri-apps-line"
            />
          </VAvatar>
          <VRow align="center">
            <VCol
              cols="12"
              md="6"
            >
              <div class="d-flex flex-column ms-1" style="padding: 10px;">
                <p class="font-weight-semibold mb-1">
                  {{ item.start_date }}
                </p>
                <h5 class="welcome-text text-h5 font-weight-semibold mb-1">
                  {{ item.title }}
                </h5>
              </div>
            </VCol>
            <VCol
              cols="12"
              md="4"
            >
            <VBtn v-if="item.is_accessed === true && item.is_done === false && item.answer > 0 && item.start_date !== null && item.finish_date === null"
                  block
                  type="submit"
                  @click="openDetail(item.id)"
                  :color="item.is_accessed ? '#0080ff' : '#cccccc'"
                >
                Lanjutkan
            </VBtn>
            </VCol>
            </VRow>
        </VRow>
      </div>
    </VCardItem>
  </VCard>
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

 // Replace with the actual key you use for the token
var data = ref({});
var token = localStorage.getItem('token');
const router = useRouter();

onMounted(async () => {
  getQuestionPacketIsAvailable()
});

const getQuestionPacketIsAvailable = async () => {
  if (token) {
    try {
      const response = await axios.get('https://gateway.berkompeten.com/api/student/dashboard/question-packet-is-available', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      data.value = response.data.data
      
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
</script>

<template>
  <VCard>
    <VCardItem>
      <template #subtitle>
        <VAvatar
          color="#0080ff"
          rounded
          size="40"
          class="elevation-2"
        >
          <VIcon
            size="24"
            icon="ri-file-3-line"
          />
        </VAvatar>
        <p class="text-body-1 mb-0">
          <span class="d-inline-block font-weight-medium text-high-emphasis">Paket Soal Tersedia</span>
        </p>
        <h4 class="text-h4 text-primary">
          <span style="color: #0080ff;">{{ data.is_available }}</span> <span class="text-high-emphasis">Paket Soal Lagi</span>
        </h4>
      </template>
    </VCardItem>
  </VCard>
</template>


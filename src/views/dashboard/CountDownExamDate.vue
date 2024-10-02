<script setup>
import axios from 'axios';
import { onMounted } from 'vue';

 // Replace with the actual key you use for the token
var countdown = ref(0);
var token = localStorage.getItem('token');

onMounted(async () => {
  getCountDown()
});

const getCountDown = async () => {
  if (token) {
    try {
      const response = await axios.get('https://gateway.berkompeten.com/api/student/dashboard/count-down-exam-date', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      countdown.value = response.data.data.count_down
      
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
  <VCard title="">
    <template #subtitle>
      <VAvatar
        color="#0080ff"
        rounded
        size="40"
        class="elevation-2"
      >
        <VIcon
          size="24"
          icon="ri-hourglass-fill"
        />
      </VAvatar>
      <p class="text-body-1 mb-0">
        <span class="d-inline-block font-weight-medium text-high-emphasis">Hitung Mundur Ujian (UKMPPD)</span>
      </p>
      <h4 class="text-h4 text-primary">
        <span style="color: #0080ff;">{{ countdown }}</span> <span class="text-high-emphasis">Hari Lagi</span>
      </h4>
    </template>
  </VCard>
</template>

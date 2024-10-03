<script setup>
import AdminList from '@/views/pages/admin/AdminList.vue';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const token = localStorage.getItem('token'); // Replace with the actual key you use for the token
const userProfile = ref(null);
const router = useRouter();

onMounted(async () => {
  if (token) {
    try {
      // const response = await axios.get('https://gateway.berkompeten.com/api/admin/profile', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // userProfile.value = response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if the response status is 401
        router.push('/login');
      }
    }
  } else {
    // Redirect to login page if token is not present
    router.push('/login');
  }
});
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="12"
    >
      <AdminList />
    </VCol>
  </VRow>
</template>

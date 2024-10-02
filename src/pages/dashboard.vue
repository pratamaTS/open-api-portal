<script setup>
import AverageDayAfterAdvis from '@/views/dashboard/AverageDayAfterAdvis.vue'
import DailyActiveUser from '@/views/dashboard/DailyActiveUser.vue'
import WeeklyActiveUser from '@/views/dashboard/WeeklyActiveUser.vue'
import WeeklyPaidUser from '@/views/dashboard/WeeklyPaidUser.vue'
import WeeklySignUp from '@/views/dashboard/WeeklySignUp.vue'


import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
 // Replace with the actual key you use for the toke
const userProfile = ref(null);
const router = useRouter();
const route = useRoute();
var token = localStorage.getItem('token');


onMounted(async () => {
  const routeToken = route.query.token;
  console.log("token get das: ", routeToken)
  if (routeToken){
    token = routeToken
    localStorage.setItem('token', token);
    console.log("token from route: ", token)
  }
  
  // if (token) {
  //   try {
  //     const response = await axios.get('https://gateway.berkompeten.com/api/student/profile', {
  //       headers: {  
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     console.log(response)

  //     userProfile.value = response.data;
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       // Redirect to login page if the response status is 401
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('profile');
  //       router.push('/login');
  //     }
  //   }
  // } else {
  //   // Redirect to login page if token is not present
  //   router.push('/login');
  // }
});
</script>

<template>
  <VRow v-if="token" class="match-height">
    <VCol
      cols="12"
      sm="12"
    >
      <WeeklyActiveUser />
    </VCol> 

    <VCol
      cols="12"
      sm="6"
    >
      <WeeklySignUp />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <AverageDayAfterAdvis />
    </VCol>

    <VCol
      cols="12"
      sm="12"
    >
      <WeeklyPaidUser />
    </VCol>
  </VRow>
</template>

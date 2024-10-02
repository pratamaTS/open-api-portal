<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

var token = localStorage.getItem('token');
const screenWidth = ref(window.innerWidth);

onMounted(async () => {
  window.addEventListener('resize', updateScreenWidth);
  updateScreenWidth();
  
  if (token) {
    console.log("question packet detail run: ")
    try {
      const routeQuestionPacketID = localStorage.getItem('paket');
      console.log("question packet detail id: ", routeQuestionPacketID)
      const response = await axios.get('https://gateway.berkompeten.com/api/student/question-packet/detail?id='+routeQuestionPacketID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("question packet detail resp: ", response.data.data)
      questionsPacket.value = response.data.data;
      console.log("question packet detail: ", questionsPacket)
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
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

const openReview = async () => {
  try {
    router.push("/review")
  } catch (error) {
    // Handle login error (display error message, redirect, etc.)
    console.error('review failed:', error);
  }
}
</script>

<template>
  <VCard>
    <VRow class="match-height">
      <VCol
        cols="12"
        md="3"
        v-show="screenWidth >= 768"
      >
        <!-- <VCardItem class="outlined-card-item">
          <p style="color: black;" class="font-weight-semibold mb-1">
            \ Topic \ <span style="color: #0080ff;">Test</span>
          </p>
        </VCardItem> -->
      </VCol>

      <VCol
        cols="12"
        md="9"
      >
        <VCardItem>
          <template #append>
            <VRow class="match-height">
            <VCol
              cols="12"
              md="7"
            >
              <VBtn
                    block
                    type="submit"
                    to="/lab-values"
                    color="#0080ff"
                    variant="outlined"
                  >
                  Nilai Normal Laboratorium
              </VBtn>
            </VCol>
            <VCol
              cols="12"
              md="5"
            >
              <VBtn
                    block
                    type="submit"
                    @click="openReview"
                    color="#0080ff"
                  >
                  Selesaikan Test
              </VBtn>
            </VCol>
          </VRow>
          </template>
          
          
        </VCardItem>
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.outlined-card-item {
  border: 1px solid #ccc; /* Customize the color and size as needed */
  border-radius: 5px; /* Optional: Add border radius for rounded corners */
  margin: 10px;
}
</style>

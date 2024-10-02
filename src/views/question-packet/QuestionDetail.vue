<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
 // Replace with the actual key you use for the token
const questionsPacket = ref({});
const router = useRouter();
const route = useRoute();
var token = localStorage.getItem('token');

onMounted(async () => {
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

const openQuestion = async (id, number) => {
  try {

    const response = await axios.post('https://gateway.berkompeten.com/api/student/user/do-the-test', {
      question_packet_id: id,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
 
    console.log("response open: ", response)
    
    localStorage.setItem('paket', id)
    localStorage.setItem('number', number)
    localStorage.removeItem('answer');
    localStorage.removeItem('answerValue');

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
</script>

<template>
  <VCard class="vcardtext-container">
    <VRow>
      <VCol
          cols="12"
          md="12"
        >
        <VCard class="mb-4">
          <VCardItem>
            <VCardTitle><span style="color: black; font-size: large;">{{ questionsPacket.name }}</span></VCardTitle>
            <VCol
                cols="12"
                md="12"
              >
              <VCard class="mb-4">
                <VCardItem>
                  <VRow align="center" class="d-flex flex-wrap row-item-parent">
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
                    <div class="me-n3" style="padding: 20px;">
                      
                      <VCardTitle><span style="color: gray;">Total Soal</span></VCardTitle>
                      <!-- <p style="color: #0080ff;" class="font-weight-semibold mb-1" v-if="item.finish_date === '-' && item.is_active === true">
                        Mulai dikerjakan: {{ item.start_date }}
                      </p>
                      <p style="color: #0080ff;" class="font-weight-semibold mb-1" v-if="item.finish_date !== '-' && item.is_active === true">
                        Diselesaikan: {{ item.finish_date }}
                      </p> -->
                      <p
                        style="color: black;"
                        href="javascript:void(0)"
                      ><b>{{ questionsPacket.total_question }}</b> Soal</p>
                    </div>
                  </VRow>
                </VCardItem>
              </VCard>
            </VCol>

            <template #append>
              
              <!-- <h6 class="text-h6" v-else="item.finish_date !== '-'">
                <a
                  :style="{ color: item.is_accessed ? '#0080ff' : '#cccccc' }"
                  href="javascript:void(0)"
                >Detail & Pembahasan</a>
              </h6> -->
            </template>
          </VCardItem>
          <VRow align="center" class="d-flex flex-wrap row-item">
            <div class="d-flex align-center flex-wrap mb-3">
              <p><b>Detail</b></p>
            </div>
            <VRow align="center" class="d-flex flex-wrap row-item">
              <p>#Lorem29873 ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
            </VRow>
          </VRow>
         
        </VCard>
      </VCol>
    </VRow>
    <!-- Detail Alert -->
    <VRow>
      <VCol
        cols="12"
        md="12"
      >
        <VCard class="mb-4">
          <VCardItem>
            <VRow class="d-flex flex-wrap row-item-parent">
              <VIcon
                size="24"
                icon="ri-error-warning-line"
                color="#0080ff"
                class="mr-2"
                style="margin-block-start: 10px;"
              />
              <div class="d-flex flex-column row-item" style="padding: 10px;">
                <!-- <p style="color: #0080ff;" class="font-weight-semibold mb-1" v-if="item.finish_date === '-' && item.is_active === true">
                  Mulai dikerjakan: {{ item.start_date }}
                </p>
                <p style="color: #0080ff;" class="font-weight-semibold mb-1" v-if="item.finish_date !== '-' && item.is_active === true">
                  Diselesaikan: {{ item.finish_date }}
                </p> -->
                <p class="mb-0"><span style=" color: #0080ff;margin-block-end: 0;">#Lorem29873 ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</span></p>
              </div>
            </VRow>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
    <!-- end of detail alert -->
    <VRow align="center" class="d-flex flex-wrap" style="margin-inline: 1px;  padding-block-start: 20px;">
      <VBtn v-if="questionsPacket.is_done === false && questionsPacket.next_question === 1"
            block
            type="submit"
            @click="openQuestion(questionsPacket.id, 1)"
            color="#0080ff"
          >
          Mulai Test
      </VBtn>
      <VBtn v-if="questionsPacket.is_done === false && questionsPacket.next_question !== 1"
            block
            type="submit"
            @click="openQuestion(questionsPacket.id, questionsPacket.next_question)"
            color="#0080ff"
          >
          Lanjutkan Test
      </VBtn>
    </VRow>
  </VCard>
</template>
<style lang="scss" scoped>

.custom-title-style {
  margin-block-end: 0 !important;
}

/* Add custom styling for scroll and reduce gap */
.vcardtext-container {
  margin-block-end: 15px; /* Adjust this margin to reduce the gap between rows */
}

.vcardtext-container{
  padding: 7px; /* Remove bottom margin for the last row */
}

.row-item-parent{
  margin-inline: 4px 1px;

  /* Remove bottom margin for the last row */
}

.row-item{
  margin-inline: 14px 1px;

  /* Remove bottom margin for the last row */
}

.v-item {
  margin: 2px; /* Remove bottom margin for the last row */
}
</style>

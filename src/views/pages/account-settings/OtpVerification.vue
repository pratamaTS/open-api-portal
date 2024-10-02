<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()
const otpSubmitted = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const otp = ref('')

const token = localStorage.getItem('token')

onMounted(async () => {
  try {
      const response = await axios.get('https://gateway.berkompeten.com/api/student/change-password/status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      otpSubmitted.value = response.data.data.otp_submitted
    } catch (error) {
      console.log("err: ", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        // Redirect to login page if the response status is 401
        router.push('/login');
      }
    }
});

const otpVerification = async () => {
  try {
    const response = await axios.post('https://gateway.berkompeten.com/api/student/otp-verification',  {
      otp: otp,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("resp otp: ", response)
    successMessage.value = response.data.message;
    router.push('/profile/security')
  } catch (error) {
    console.error('reset otp:', error);
    errorMessage.value = error.response.data.message;
  }
};

</script>

<template>
  <VRow>
    <!-- SECTION: OTP -->
    <VCol cols="12">
      <VCard title="Otp">
        <VForm>
          <VCardText v-if="otpSubmitted == true">
            <!-- 👉 Otp -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 OTP -->
                <VTextField
                  v-model="otp"
                  label="OTP"
                  autocomplete="on"
                  placeholder=""
                />
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn v-if="otpSubmitted == true" @click="otpVerification">Save changes</VBtn>
            
            <div v-if="successMessage" class="mt-2 text-success">
                {{ successMessage }}
            </div>
            <div v-if="errorMessage" class="mt-2 text-danger" style="color: #ff5252;">
                {{ errorMessage }}
            </div>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>
</template>

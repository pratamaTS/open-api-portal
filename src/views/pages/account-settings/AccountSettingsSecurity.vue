<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const canChangePassword = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const token = localStorage.getItem('token')

onMounted(async () => {
  try {
      const response = await axios.get('https://gateway.berkompeten.com/api/student/change-password/status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      canChangePassword.value = response.data.data.change_password
      console.log("change password: ", response.data.data.change_password)
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

const resetPassword = async () => {
  try {
    console.log("token reset password: ", token)
    // Make a request to the logout endpoint on your backend
    const response = await axios.get('https://gateway.berkompeten.com/api/student/reset-password', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("resp reset password: ", response)
    successMessage.value = response.data.message;
  } catch (error) {
    console.error('reset password error:', error);
    errorMessage.value = error.response.data.message;
  }
};

const changePassword = async () => {
  try {
    errorMessage.value = ""
    if (newPassword.value !== confirmPassword.value) {
      errorMessage.value = "Your password doesn't match with the confirmation password";
      return
    }
    
    const response = await axios.post('https://gateway.berkompeten.com/api/student/change-password',  {
      password: newPassword.value,
      password_confirmation: confirmPassword.value,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("change password otp: ", response)
    successMessage.value = response.data.message;
    router.push('/profile/security')
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.errors;
    } else {
      errorMessage.value = 'An unexpected error occurred.';
    }
  }
};

const passwordRequirements = [
  'Minimum 8 characters long - the more, the better',
  'At least one lowercase character',
  'At least one number, symbol, or whitespace character',
]

</script>

<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Change Password">
        <VForm>
          <VCardText v-if="canChangePassword == true">
            <!-- 👉 New Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 new password -->
                <VTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  label="New Password"
                  autocomplete="on"
                  placeholder=""
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 confirm password -->
                <VTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  autocomplete="on"
                  label="Confirm New Password"
                  placeholder=""
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <VCardText v-if="canChangePassword == true">
            <p class="text-base font-weight-medium mt-2">
              Password Requirements:
            </p>

            <ul class="d-flex flex-column gap-y-3">
              <li
                v-for="item in passwordRequirements"
                :key="item"
                class="d-flex"
              >
                <div>
                  <VIcon
                    size="7"
                    icon="ri-checkbox-blank-circle-fill"
                    class="me-3"
                  />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn v-if="canChangePassword == true" @click="changePassword">Save changes</VBtn>

            <VBtn
              type="reset"
              color="secondary"
              variant="outlined"
              @click="resetPassword"
              v-if="canChangePassword == false"
            >
              Reset
            </VBtn>
            
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

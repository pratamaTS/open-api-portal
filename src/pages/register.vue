<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/berkompeten_logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import axios from 'axios'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from 'vuetify'


const form = reactive({
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  privacyPolicies: false,
})

const vuetifyTheme = useTheme()
const router = useRouter()
const route = useRoute();

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

const registerError = ref(null)

const saveFormData = async () => {
  registerError.value = "";
  
  if (form.email == "") {
    registerError.value = "email is required";
      return
    }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    registerError.value = "Invalid email format";
    return;
  }

  if (form.password == "") {0
    registerError.value = "password is required";
    return
  }

  if (form.password.length < 8) {
    registerError.value = "password length must be 8 character or more";
    return
  }

  if (form.confirm_password == "") {
    registerError.value = "confirm password is required";
    return
  }

  if (form.confirm_password.length < 8) {
    registerError.value = "confirm password length must be 8 character or more";
    return
  }

  // Save email and password to local storage
  if (form.password !== form.confirm_password) {
    // Handle the case where passwords do not match (you can show an error message or take appropriate action)
    console.error('Password and confirm password do not match')
    registerError.value = "Password and confirm password do not match"
    return
  }

  try {
    const response = await axios.post('https://gateway.berkompeten.com/api/student/register/step/1', {
      email: form.email,
      password: form.password
    })
    
    console.log("RESPONSE STEP 1: ", response)
    
    localStorage.setItem('email', form.email)
    localStorage.setItem('password', form.password)
    localStorage.setItem('confirm_password', form.confirm_password)
    router.push("/register-step-2")
  } catch (error) {
    console.error('Login failed:', error)
    if (error.response && error.response.data) {
      if (error.response.data.errors.email) {
        registerError.value = error.response.data.errors.email[0]
        return
      }
      registerError.value = error.response.data.errors;
    }
  }
}

onMounted(() => {
  // Retrieve the email from local storage
  const storedEmail = localStorage.getItem('email');
  const queryEmail = route.query.email
  const queryName = route.query.name
  if (queryEmail){
    console.log("email get route: ", queryEmail)
    form.email = queryEmail
    localStorage.setItem('email', form.email)
    localStorage.setItem('name', queryName)
    router.push('/register');
  }

  console.log("email: ", storedEmail);
  if (storedEmail) {
    form.email = storedEmail;
  }
});

</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>
      </VCardItem>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- Email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                placeholder="example@email.com"
                type="email"
              />
            </VCol>
            <!-- Password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.confirm_password"
                label="Confirm Password"
                placeholder="············"
                :type="isConfirmPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isConfirmPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
              />
              <div class="d-flex align-center mt-1 mb-4">
              </div>

              <VBtn
                block
                type="submit"
                color="#0080ff"
                @click="saveFormData"
              >
                Next
              </VBtn>

              <div v-if="registerError" class="mt-2 text-danger" style="color: #ff5252;">
                {{ registerError }}
              </div>
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Already have an account?</span>
              <RouterLink
                class="text-primary ms-2"
                to="login"
              >
                Sign in instead
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@core/scss/pages/page-auth.scss";
</style>

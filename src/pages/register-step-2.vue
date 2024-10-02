<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/berkompeten_logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const form = reactive({
  email: '',
  password: '',
  password_confirmation: '',
  name: '',
  phone_number: '',
  gender: '',
  year_of_entry: '',
  exam_date_id: '',
  university_id: '',
  educational_status_id: '',
  privacyPolicies: false,
})

const vuetifyTheme = useTheme()
const router = useRouter()
const errorMessage = ref(null)

const today = new Date().toISOString().split('T')[0];

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const register = async () => {
  try {
    if (form.name == "") {
      errorMessage.value = "name is required";
      return
    }

    if (form.gender == "") {
      errorMessage.value = "gender is required";
      return
    }

    if (form.phone_number == "") {
      errorMessage.value = "phone number is required";
      return
    }

    if (form.exam_date_id == "") {
      errorMessage.value = "tahun masuk is required";
      return
    }

    if (form.university_id == "") {
      errorMessage.value = "universitas is required";
      return
    }

    if (form.educational_status_id == "") {
      errorMessage.value = "status edukasi is required";
      return
    }

    console.log("form: ", form);
    console.log("gender: ", form.gender.toLowerCase());
    console.log("university: ", form.university_id);
    console.log("educational: ", form.educational_status_id);
    console.log("name: ", form.name);
    const response = await axios.post('https://gateway.berkompeten.com/api/student/register', {
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation,
      name: form.name,
      gender: form.gender.toLowerCase(),
      phone_number: form.phone_number,
      year_of_entry: form.year_of_entry,
      exam_date_id: form.exam_date_id.toString(),
      university_id: form.university_id.toString(),
      educational_status_id: form.educational_status_id.toString()
    })

    console.log("register response: ", response);

    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('confirm_password');
    // Redirect to the desired route upon successful login
    router.push('/login')
  } catch (error) {
    // Handle login error (display error message, redirect, etc.)
    console.error('Register failed:', error)
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.errors;
    } else {
      errorMessage.value = 'An unexpected error occurred during register.';
    }
  }
}

onMounted(() => {
  // Retrieve the email from local storage
  fetchUniversityOptions()
  fetchEducationalStatusOptions()
  fetchExamDateOptions()
  const storedEmail = localStorage.getItem('email');
  form.name = localStorage.getItem('name');
  const storedPassword = localStorage.getItem('password');
  const storedConfirmPassword = localStorage.getItem('confirm_password');
  console.log("email r 2: ", storedEmail);
  console.log("password r 2: ", storedPassword);
  console.log("confirm password r 2: ", storedConfirmPassword);
  form.email = storedEmail;
  form.password = storedPassword;
  form.password_confirmation = storedConfirmPassword;
});

const genderOptions = [
        'Male',
        'Female',
      ]

// Initialize educationalStatusOptions as an empty array
const examDateOptions = ref([])
const universityOptions = ref([])
const educationalStatusOptions = ref([])

// Fetch univeristy options from the API
const fetchExamDateOptions = async () => {
  try {
    const response = await axios.get('https://gateway.berkompeten.com/api/student/exam-date')
    // Assuming the API response has an array of educational statuses
    examDateOptions.value = response.data.data.map(examDate => ({
      id: examDate.id,
      name: examDate.name,
    }))
  } catch (error) {
    console.error('Error fetching exam date options:', error)
  }
}

// Fetch univeristy options from the API
const fetchUniversityOptions = async () => {
  try {
    const response = await axios.get('https://gateway.berkompeten.com/api/student/university')
    // Assuming the API response has an array of educational statuses
    universityOptions.value = response.data.data.map(edu => ({
      id: edu.id,
      name: edu.name,
    }))
  } catch (error) {
    console.error('Error fetching university options:', error)
  }
}

// Fetch educational status options from the API
const fetchEducationalStatusOptions = async () => {
  try {
    const response = await axios.get('https://gateway.berkompeten.com/api/student/educational-status')
    // Assuming the API response has an array of educational statuses
    educationalStatusOptions.value = response.data.data.map(edu => ({
      id: edu.id,
      name: edu.name,
    }))
  } catch (error) {
    console.error('Error fetching educational status options:', error)
  }
}
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
            <!-- Name -->
            <VCol cols="12">
              <VTextField
                v-model="form.name"
                label="Name"
                placeholder="John Doe"
                type="email"
              />
            </VCol>

            <!-- Gender -->
            <VCol cols="12">
              <VSelect
                v-model="form.gender"
                label="Gender"
                :items="genderOptions"
                placeholder="Select gender"
              ></VSelect>
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="form.phone_number"
                label="Phone Number"
                placeholder="Phone Number"
                type="number"
              />
            </VCol>

            <!-- Year of Entry -->
            <VCol cols="12">
              <VTextField
                v-model="form.year_of_entry"
                label="Year of entry"
                placeholder="2013"
                type="number"
              />
            </VCol>

            <VCol cols="12">
              <!-- Target Exam Date -->
              <VSelect
                v-model="form.exam_date_id"
                label="Target Exam Date"
                :items="examDateOptions"
                placeholder="Select target exam date"
                item-value="id"
                item-title="name"   
              ></VSelect>
            </VCol>

            <!-- University -->
            <VCol cols="12">
              <VSelect
                v-model="form.university_id"
                label="University"
                :items="universityOptions"
                placeholder="Select university"
                item-value="id"
                item-title="name"   
              ></VSelect>
            </VCol>

            <!-- Educational Status -->
            <VCol cols="12">
              <VSelect
                v-model="form.educational_status_id"
                label="Educational Status"
                :items="educationalStatusOptions"
                placeholder="Select educational status"
                item-value="id"
                item-title="name"   
              ></VSelect>
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  <span class="me-1">I agree to</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  >privacy policy & terms</a>
                </VLabel>
              </div>

              <VBtn
                block
                type="submit"
                color="#0080ff"
                @click="register"
              >
                Sign up
              </VBtn>

              <div v-if="errorMessage" class="mt-2 text-danger" style="color: #ff5252;">
                {{ errorMessage }}
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

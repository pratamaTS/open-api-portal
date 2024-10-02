<script setup>
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import logo from '@images/yodu.svg?raw'
import { useTheme } from 'vuetify'

import { useRouter } from 'vue-router'


const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)
const loginError = ref(null)
var token = localStorage.getItem('token');

onMounted(async () => {
  console.log("token login: ", token)

  if (token) {
    router.push('/dashboard');
  }
});

const login = async (tokenRecaptcha) => {
  try {
    // Execute reCAPTCHA
    grecaptcha.ready(async function() {
      try {
        // const tokenRecaptcha = await grecaptcha.execute('6LfXRJ8pAAAAAOt1gKzRNIj1GOYGtp-DB_tz73OR', { action: 'submit' });
        console.log("rec resp: ",tokenRecaptcha)
        if (form.email === "") {
          loginError.value = "email is required"
          return
        }

        if (form.password === "") {
          loginError.value = "password is required"
          return
        }

        if (form.password.length < 8) {
          loginError.value = "password length must be 8 character or more";
          return
        }

        if (form.email !== "partner@yodu.id" || form.password !== "1234Password!") {
          loginError.value = "Wrong email or password"
          return
        }

        // const response = await axios.post('https://gateway.berkompeten.com/api/admin/login', {
        //   email: form.email,
        //   password: form.password,
        //   'g-recaptcha-response': tokenRecaptcha, // Include reCAPTCHA token in the request
        // });

        // console.log(response);

        // // Assuming your backend returns a token upon successful login
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjQ4NTJjZGM4YzE3MzE5MjYzOWMyNzJkNGU4ZDc2Y2ViMTFiNTY0YzUwZmUxM2UzMmE1MTk3YTY5YmY5YjhkYmY2NTU4NWU4ZmY4YzJjZjkiLCJpYXQiOjE3Mjc4ODYxODkuNDU2MDg4LCJuYmYiOjE3Mjc4ODYxODkuNDU2MDksImV4cCI6MTc1OTQyMjE4OS40NDgyODMsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.tadKMEBjm3Y6kHg30TvM2x9c3mBaIeD5cTVdgmRpCw9DJhrr5jOYHJh-EPqzGVEyWhgdd83Tm2kCJvjEPH-CArOuLUvpbH2X2pftKnJnb5MwTPetvt5uee4k5HFJQxIbVCA4_f8sS7J8HcIIdCNAcyF_5wpgmO1zL06Lf8ga3H6X7I2-ohyEvT5RehM69vs92u96JIjuuQDlgujHkag0NWWLFLtUj4Ax8OxNkRpB3Sj4sL_sZi4tIS_0ne9wwQpp8Y-Ft9pjTX1d4gyhYWWXAiSFqD1wjdHSDnCq0I9uakO8XYL22XUNOnx2nM099g9Icbt6B4uNrUdLBvRTYMTvAWMo_XcNDOvmtONeH1kbMKCJDzHXkHVKiWvPRIJIXLN5qYunhP4S5r7Y5WwXjS-H5fFDKwniFsfkXdm3BvKO46eQy7obgxpZdqZbayEoN-QK1oRIu8IFRHWBZWl6iPNhRW4ieRAoLRGg8wcjTAz-zPr49jImlIMeTPu-c8cLE_GlvrB51yQBkY9OrkZcXBb_ajn8Y7mSHS16sC_OASXdqM8A1OEktAGzXTNdVhVD00wFncYwizYkntDHgUfCaUprnXBN1iRf88sb-WtQGEt_WCyd4F5EQl0dLMd9kAfmIh7oipB_Sthjhbvg886T9MsXEqSmS6BZf2Jo3P3HtUgJJBI";

        console.log(token);

        // // Save the token in local storage or Vuex store for future requests
        localStorage.setItem('token', token);

        // // Redirect to the desired route upon successful login
        router.push('/dashboard');
      } catch (error) {
        // Handle login error (display error message, redirect, etc.)
        console.error('Login failed:', error);
        if (error.response && error.response.data) {
          loginError.value = error.response.data.message;

          if (error.response.data.errors){
            loginError.value = error.response.data.errors;
          }

          // Check if the user does not exist and store email in local storage
          if (error.response.data.is_exist === false) {
            localStorage.setItem('email', form.email);
            router.push('/register');
          }
          return
        } else {
          loginError.value = 'An unexpected error occurred during login.';
          return
        }
      }
    });
  } catch (error) {
    // Handle login error (display error message, redirect, etc.)
    console.error('Login failed:', error)
    if (error.response && error.response.data) {
      loginError.value = error.response.data.errors;
      return
    } else {
      loginError.value = 'An unexpected error occurred during login.';
      return
    }
  }
}

const navigateToForgotPassword = () => {
  router.push('/forgot-password')
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

      <VCardText class="pt-2">
        <p class="mb-0" style="text-align: center;">
          Please sign-in to your account
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="login">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <a
                  class="ms-2 mb-1"
                  @click="navigateToForgotPassword"
                >
                  Forgot Password?
                </a>
              </div>

              <!-- login button -->
              <div class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" data-callback="login">
                <VBtn
                  block
                  type="submit"
                  color="#0080ff"
                >
                  Login
                </VBtn>
              </div>

              <div v-if="loginError" class="mt-2 text-danger" style="color: #ff5252;">
                {{ loginError }}
              </div>
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

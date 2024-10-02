<script setup>
import logo from '@images/berkompeten_logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const router = useRouter()
const route = useRoute()
const form = reactive({ email: '', token: '', password: '', password_confirmation: '' })
const resetError = ref(null)
const resetMessage = ref(null)

onMounted(() => {
  form.email = route.query.email || ''
  form.token = route.query.token || ''
})

const resetPassword = async () => {
  try {
    if (form.password === '' || form.password_confirmation === '') {
      resetError.value = 'All fields are required'
      return
    }

    const response = await axios.post('https://gateway.berkompeten.com/api/admin/reset-password', {
      email: form.email,
      token: form.token,
      password: form.password,
      password_confirmation: form.password_confirmation,
    })

    resetMessage.value = response.data.message
    resetError.value = null
  } catch (error) {
    if (error.response && error.response.data) {
      resetError.value = error.response.data.message || 'An error occurred'
    } else {
      resetError.value = 'An unexpected error occurred'
    }
    resetMessage.value = null
  }
}

const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">Reset Password</h5>
        <p class="mb-0">Enter your new password</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="resetPassword">
          <VRow>
            <VCol cols="12">
              <VTextField v-model="form.email" label="Email" type="email" readonly />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="form.token" label="Token" type="text" readonly />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="form.password" label="New Password" type="password" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="form.password_confirmation" label="Confirm Password" type="password" />
            </VCol>

            <VCol cols="12">
              <VBtn block type="submit" color="#0080ff">Reset Password</VBtn>

              <div v-if="resetError" class="mt-2 text-danger" style="color: #ff5252;">
                {{ resetError }}
              </div>
              <div v-if="resetMessage" class="mt-2 text-success">
                {{ resetMessage }}
              </div>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
@use "@core/scss/pages/page-auth.scss";
</style>

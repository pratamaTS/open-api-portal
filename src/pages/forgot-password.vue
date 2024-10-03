<script setup>
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import logo from '@images/yodu.svg?raw'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const router = useRouter()
const form = reactive({ email: '' })
const resetError = ref(null)
const resetMessage = ref(null)

const sendResetLink = async () => {
  try {
    if (form.email === '') {
      resetError.value = 'Email is required'
      return
    }

    const response = await axios.post('https://gateway.berkompeten.com/api/admin/forgot-password', {
      email: form.email,
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
        <h5 class="text-h5 font-weight-semibold mb-1">Forgot Password?</h5>
        <p class="mb-0">Enter your email to receive a reset link</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="sendResetLink">
          <VRow>
            <VCol cols="12">
              <VTextField v-model="form.email" label="Email" type="email" />
            </VCol>

            <VCol cols="12">
              <VBtn block type="submit" color="#0080ff">Send Reset Link</VBtn>

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

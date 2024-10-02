<script setup>
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify';

const router = useRouter()

const { global } = useTheme()

const authProviders = [
  {
    icon: 'bxl-google',
    color: '#db4437',
    colorInDark: '#db4437',
  },
]

const handleAuthProviderClick = async (provider) => {
  try {
    // Make a request to your backend to initiate the Google login
    // You may need to adjust the actual endpoint based on your backend setup
    const response = await fetch('https://gateway.berkompeten.com/api/student/login/google/redirect', {
      method: 'GET',
      // Add any necessary headers or credentials here
    })

    // Assuming your backend redirects to the Google authentication page
    // Extract the Google authentication URL from the response
    const authUrl = await response.text()

    // Redirect the user to the Google authentication page
    console.log("response: ", authUrl)
    window.location.href = authUrl
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error('Error initiating Google login:', error)
  }
}
</script>

<template>
  <VBtn
    v-for="link in authProviders"
    :key="link.icon"
    :icon="link.icon"
    variant="text"
    :color="global.name.value === 'dark' ? link.colorInDark : link.color"
    @click="() => handleAuthProviderClick('google')"
  />
</template>

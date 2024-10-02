<script setup>
import Footer from '@/layouts/components/Footer.vue'
import NavItems from '@/layouts/components/NavItems.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import logo from '@images/yodu.svg?raw'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

var token = localStorage.getItem('token');
const name = ref("");
const formatDate = () => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const today = new Date();
  const dayOfWeek = days[today.getDay()];
  const dayOfMonth = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
};

const formattedDate = formatDate();

onMounted(async () => {
  console.log("token def: ", token);
  const routeToken = route.query.token;
  console.log("token route: ", routeToken)
  if (routeToken){
    token = routeToken
    localStorage.setItem('token', token);
    console.log("token from route: ", token)
    
    router.push('/dashboard');
  }

  // Retrieve the email from local storage
  if (token) {
    try {
      // const response = await axios.get('https://gateway.berkompeten.com/api/admin/profile', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      name.value = "Yodu Partner";

      // console.log("data: ", response.data);
      console.log("name: ", name);
    } catch (error) {
      console.log("err: ", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        // Redirect to login page if the response status is 401
        router.push('/login');
      }
    }
  } else {
    // Redirect to login page if token is not present
    router.push('/login');
  }

  if(routeToken){
    window.location.reload()
  }
});
</script>

<template>
  <VerticalNavLayout v-if="token">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="ri-menu-line" />
        </IconBtn>

        <div class="d-flex flex-column" style="padding-block-start: 20px;">
          <h5 class="welcome-text text-h5 font-weight-semibold mb-1">
            Hi, {{ name }} Selamat Datang
          </h5>
          <p class="date-text font-weight-semibold mb-1">
            {{ formattedDate }}
          </p>
        </div>
        <VSpacer />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-header="{ toggleIsOverlayNavActive }">
      <!-- 👉 Vertical nav toggle in overlay mode -->
      <IconBtn
        class="ms-n3 d-lg-none"
        @click="toggleVerticalOverlayNavActive(true)"
      >
        <VIcon icon="ri-menu-line" />
      </IconBtn>
      <RouterLink
        to="/"
        class="app-logo app-title-wrapper"
      >
        <div
          class="d-flex"
          v-html="logo"
        />
      </RouterLink>

      
    </template>

    <template #vertical-nav-content>
      <NavItems />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.75rem;
    text-transform: uppercase;
  }
}

.welcome-text {
  color: #0080ff; /* Set the desired color */

  /* Media query for smaller screens */
  @media (max-width: 768px) {
    display: none; /* Adjust font size as needed */
  }
}

.date-text {
  /* Media query for smaller screens */
  @media (max-width: 768px) {
    font-size: 0.75rem; /* Adjust font size as needed */
  }
}
</style>

<script setup>
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const token = localStorage.getItem('token'); // Replace with the actual key you use for the token
const userProfile = ref(null);
const router = useRouter();

// Live Mode Dropdown Data
const liveModes = ['Live Mode', 'Test Mode'];
const selectedLiveMode = ref(null);

// Deposit View Data
const depositAmount = ref(25000); // Replace this with your actual deposit value

const formattedDeposit = computed(() => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(depositAmount.value);
});

// Redirect to the money page when deposit is clicked
const goToMoneyPage = () => {
  router.push('/money-page'); // Replace with your actual money page route
};

const menuItems = {
  dashboard: {
    title: 'Beranda',
    items: [
      {
        title: 'Home',
        to: '/dashboard',
        icon: 'ri-home-smile-line',
      },
    ],
    icon: 'ri-file-line',
    badgeClass: 'ri-file-line',
    badgeContent: 'ri-file-line'
  },
  reports: {
    title: 'Reports',
    items: [
      {
        title: 'Report API',
        to: '/report-api',
        icon: 'ri-file-line',
      },
      {
        title: 'Report Tagihan',
        to: '/report-tagihan',
        icon: 'ri-file-line',
      },
      {
        title: 'Settlement History',
        to: '/settlement-history',
        icon: 'ri-file-line',
      },
    ],
    icon: 'ri-file-line',
    badgeClass: 'ri-file-line',
    badgeContent: 'ri-file-line'
  },
  profile: {
    title: 'Profile',
    items: [
      {
        title: 'Client Profile',
        to: '/client-profile',
        icon: 'ri-user-line',
      },
      {
        title: 'Company Profile',
        to: '/company-profile',
        icon: 'ri-building-4-line',
      },
    ],
    icon: 'ri-file-line',
    badgeClass: 'ri-file-line',
    badgeContent: 'ri-file-line'
  },
  userManagement: {
    title: 'User Management',
    items: [
      {
        title: 'User Management',
        to: '/user-management',
        icon: 'ri-user-add-line',
      },
      {
        title: 'Role Management',
        to: '/role-management',
        icon: 'ri-shield-line',
      },
      {
        title: 'Access Management',
        to: '/access-management',
        icon: 'ri-lock-line',
      },
      {
        title: 'Audit Trail',
        to: '/audit-trail',
        icon: 'ri-time-line',
      },
    ],
    icon: 'ri-file-line',
    badgeClass: 'ri-file-line',
    badgeContent: 'ri-file-line'
  },
  configuration: {
    title: 'Configuration',
    items: [
      {
        title: 'Company Transaction Limit',
        to: '/company-transaction-limit',
        icon: 'ri-settings-3-line',
      },
    ],
    icon: 'ri-file-line',
    badgeClass: 'ri-file-line',
    badgeContent: 'ri-file-line'
  },
  information: {
    title: 'Information',
    items: [
      {
        title: 'Yodu Information',
        to: '/yodu-information',
        icon: 'ri-information-line',
      },
      {
        title: 'Document Guide',
        to: '/document-guide',
        icon: 'ri-book-open-line',
      },
    ],
    icon: 'ri-file-line',
    badgeClass: 'ri-file-line',
    badgeContent: 'ri-file-line'
  },
};

onMounted(async () => {
  if (token) {
    try {
      // const response = await axios.get('https://gateway.berkompeten.com/api/admin/profile', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // userProfile.value = response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if the response status is 401
        router.push('/login');
      }
    }
  } else {
    // Redirect to login page if token is not present
    router.push('/login');
  }
});
</script>

<template>
  <!-- 👉 Live Mode Dropdown -->
  <v-select
    v-model="selectedLiveMode"
    :items="liveModes"
    label="Live Mode"
    outlined
    class="mb-4"
  ></v-select>

  <!-- 👉 Deposit View (Click to open money page) -->
  <v-card class="mb-4" @click="goToMoneyPage" outlined>
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <span>Deposit:</span>
        <strong>{{ formattedDeposit }}</strong>
      </div>
    </v-card-text>
  </v-card>
  
  <!-- 👉 Dashboards -->
  <VerticalNavLink
      :item="{
        title: 'Beranda',
        to: '/dashboard',
        icon: 'ri-home-smile-line',
      }"
  />

   <!-- 👉 Reports -->
   <VerticalNavGroup :item="menuItems.reports">
    <VerticalNavLink
      v-for="(item, index) in menuItems.reports.items"
      :key="index"
      :item="item"
    />
  </VerticalNavGroup>

  <!-- 👉 Profile -->
  <VerticalNavGroup :item="menuItems.profile">
    <VerticalNavLink
      v-for="(item, index) in menuItems.profile.items"
      :key="index"
      :item="item"
    />
  </VerticalNavGroup>

  <!-- 👉 User Management -->
  <VerticalNavGroup :item="menuItems.userManagement">
    <VerticalNavLink
      v-for="(item, index) in menuItems.userManagement.items"
      :key="index"
      :item="item"
    />
  </VerticalNavGroup>

  <!-- 👉 Configuration -->
  <VerticalNavGroup :item="menuItems.configuration">
    <VerticalNavLink
      v-for="(item, index) in menuItems.configuration.items"
      :key="index"
      :item="item"
    />
  </VerticalNavGroup>

  <!-- 👉 Information -->
  <VerticalNavGroup :item="menuItems.information">
    <VerticalNavLink
      v-for="(item, index) in menuItems.information.items"
      :key="index"
      :item="item"
    />
  </VerticalNavGroup>
</template>

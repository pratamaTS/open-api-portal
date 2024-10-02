<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
 // Replace with the actual key you use for the token
const membership = ref(null);
const router = useRouter();
const screenWidth = ref(window.innerWidth);
var token = localStorage.getItem('token');

onMounted(async () => {
  if (token) {
    try {
      const response = await axios.get('https://gateway.berkompeten.com/api/student/membership', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      membership.value = response.data.membership;
      console.log("Membership: ", membership)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page if the response status is 401
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        router.push('/login');
      }
    }
  } else {
    // Redirect to login page if token is not present
    router.push('/login');
  }

  window.addEventListener('resize', updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

const formatToIDR = (price) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

const truncateDescription = (description) => {
  if (description.length > 50) {
    return description.substring(0, 35) + '...';
  }
  return description;
};

const isSmallScreen = computed(() => screenWidth.value < 768);

const currentMembershipText = computed(() => {
  return isSmallScreen.value ? 'Current\nMembership' : 'Current Membership';
});
</script>

<template>
  <VCard class="vcardtext-container">
    <VCardTitle><span style="color: #0080ff;">Upgrade Membership</span></VCardTitle>
    <VRow>
      <VCol
          cols="12"
          md="6"
          v-for="item in membership"
          :key="item.id"
          class="question-card"
        >
        <VCard class="mb-4">
          <VCardItem>
            <VRow align="center" class="d-flex flex-wrap row-item-parent">
              <VAvatar
                    :color="item.is_active ? '#0080ff' : '#cccccc'"
                    rounded
                    size="40"
                    class="elevation-2 avatar-icon"
                  >
                <VIcon
                  size="24"
                  icon="ri-apps-line"
                  class="icon"
                />
              </VAvatar>
              <div class="title-container" style="padding: 20px;">
                
                <VCardTitle><span style="color: black;">{{ item.name }}</span></VCardTitle>
                <p class="status-text font-weight-semibold mb-1">
                  Periode Aktivasi: {{ item.activation_period }} Bulan
                </p>
                <p class="status-text-start font-weight-semibold mb-1">
                  Deskripsi paket: {{ truncateDescription(item.description) }}
                </p>
                <p v-if="item.price !== 0" class="status-text-price font-weight-semibold mb-1">
                  <b>Harga: {{ formatToIDR(item.price) }}</b>
                </p>
                <p v-if="item.price === 0" class="status-text-free font-weight-semibold mb-1">
                  <b>Free</b>
                </p>
              </div>
            </VRow>

            <template #append>
              <VBtn v-if="item.is_current === false && item.is_can_upgrade === true"
                    block
                    type="submit"
                    :to="{ path: '/membership/detail', query: { id: item.id } }"
                    :color="item.is_active ? '#0080ff' : '#cccccc'"
                    class="action-button"
                  >
                  View
              </VBtn>
              <p v-if="item.is_current === true" class="status-text-current font-weight-semibold mb-1">
                <b v-html="currentMembershipText"></b>
              </p>
            </template>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </VCard>
</template>
<style lang="scss" scoped>
@mixin media-breakpoint-down($breakpoint) {
  @if $breakpoint == sm {
    @media (max-width: 767px) {
      @content;
    }
  }
}

.custom-title-style {
  margin-block-end: 0 !important;
}

/* Add custom styling for scroll and reduce gap */
.vcardtext-container {
  padding: 10px; /* Remove bottom margin for the last row */
  margin-block-end: -10px; /* Adjust this margin to reduce the gap between rows */
  overflow-y: auto;

  @include media-breakpoint-down(sm) {
    padding: 4px;
  }
}

.row-item-parent{
  margin-inline: 4px 1px;

  @include media-breakpoint-down(sm) {
    margin-inline: 0 0 !important;
  }
}

.avatar-icon {
  @include media-breakpoint-down(sm) {
    block-size: 16px;
    inline-size: 16px;
  }
}

.icon {
  @include media-breakpoint-down(sm) {
    block-size: 12px;
    inline-size: 12px;
  }
}

.title-container {
  padding: 20px;

  @include media-breakpoint-down(sm) {
    padding: 2px;
  }
}

.title-text {
  font-size: 1rem;

  @include media-breakpoint-down(sm) {
    font-size: 0.55rem;
  }
}

.status-text {
  color: #0080ff;

  @include media-breakpoint-down(sm) {
    font-size: 0.70rem;
  }
}

.status-text-start {
  color: #0080ff;

  @include media-breakpoint-down(sm) {
    font-size: 0.60rem;
  }
}

.status-text-price, .status-text-free {
  @include media-breakpoint-down(sm) {
    font-size: 0.70rem;
  }
}

.status-text-current {
  @include media-breakpoint-down(sm) {
    font-size: 0.65rem;
    white-space: pre-line; /* Allows breaking within the line */
  }
}

.upgrade-link {
  color: #0080ff;
  cursor: pointer;
  text-decoration: underline;

  @include media-breakpoint-down(sm) {
    font-size: 0.55rem;
  }
}

.action-button {
  @include media-breakpoint-down(sm) {
    font-size: 0.65rem;
    padding-block: 8px;
    padding-inline: 10px;
  }
}
</style>

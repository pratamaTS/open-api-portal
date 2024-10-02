<script setup>
import axios from 'axios';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
 // Replace with the actual key you use for the token
const questions = ref([]);
const router = useRouter();
const screenWidth = ref(window.innerWidth);
var token = localStorage.getItem('token');

onMounted(async () => {
  if (token) {
    try {
      const response = await axios.get('https://gateway.berkompeten.com/api/student/question-packet', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      questions.value = response.data.data;
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

  // Add resize event listener
  window.addEventListener('resize', updateScreenWidth);
});

onUnmounted(() => {
  // Clean up the resize event listener
  window.removeEventListener('resize', updateScreenWidth);
});

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

const openDetail = (id) => {
  localStorage.setItem('paket', id)
  router.push("/detail")
}

const openMembership = () => {
  router.push("/upgrade/membership")
}

const isSmallScreen = computed(() => screenWidth.value < 768);

const getFilteredTopics = (topics) => {
  return isSmallScreen.value ? topics.slice(0, 3) : topics;
}
</script>

<template>
  <VCard class="vcardtext-container">
    <VRow>
      <VCol
          cols="12"
          md="6"
          v-for="item in questions"
          :key="item.id"
          class="question-card"
        >
        <VCard class="mb-4">
          <VCardItem>
            <VRow align="center" class="d-flex flex-wrap row-item-parent">
              <VAvatar
                    :color="item.is_accessed ? '#0080ff' : '#cccccc'"
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
                
                <VCardTitle><span style="color: black;">{{ item.title }}</span></VCardTitle>
                <p class="status-text font-weight-semibold mb-1" v-if="item.is_accessed === true && item.is_done === false && item.answer === 0">
                  Belum dikerjakan
                </p>
                <p class="status-text-start font-weight-semibold mb-1" v-if="item.is_accessed === true && item.is_done === false && item.answer > 0 && item.start_date !== null && item.finish_date === null">
                  Mulai dikerjakan: {{ item.start_date }}
                </p>
                <a
                  v-if="item.is_accessed === false"
                  class="upgrade-link"
                  @click="openMembership"
                >Silahkan upgrade membership untuk melanjutkan</a>
              </div>
            </VRow>

            <template #append class="append-container" :class="{ 'small-screen': isSmallScreen }">
              <VBtn v-if="item.is_accessed === true && item.is_done === false && item.answer === 0"
                    block
                    type="submit"
                    @click="openDetail(item.id)"
                    :color="item.is_accessed ? '#0080ff' : '#cccccc'"
                    class="action-button"
                  >
                  Kerjakan Sekarang
              </VBtn>
              <VBtn v-if="item.is_accessed === true && item.is_done === false && item.answer > 0 && item.start_date !== null && item.finish_date === null"
                    block
                    type="submit"
                    @click="openDetail(item.id)"
                    :color="item.is_accessed ? '#0080ff' : '#cccccc'"
                    class="action-button"
                  >
                  Lanjutkan
              </VBtn>
            </template>
          </VCardItem>
          <VRow align="center" class="d-flex flex-wrap row-item">
            <div class="d-flex align-center flex-wrap mb-3">
              <VChip
                class="d-flex flex-wrap v-item"
                :color="item.is_accessed ? '#0080ff' : '#cccccc'"
                size="small"
                v-for="child in getFilteredTopics(item.topics)"
                :key="child"
              >
                {{ child }}
              </VChip>
            </div>
          </VRow>
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
  margin-block-end: -10px; /* Adjust this margin to reduce the gap between rows */
  overflow-y: auto;
}

.vcardtext-container{
  padding: 10px; /* Remove bottom margin for the last row */
}

.row-item-parent{
  margin-inline: 4px 1px;

  /* Remove bottom margin for the last row */
  @include media-breakpoint-down(sm) {
    margin-inline: 0 0 !important;
  }
}

.row-item{
  margin-inline: 14px 1px;

  /* Remove bottom margin for the last row */
}

.v-item {
  margin: 2px; /* Remove bottom margin for the last row */

  @include media-breakpoint-down(sm) {
    font-size: 0.55rem;
    padding-block: 1px;
    padding-inline: 3px;
  }
}

.append-container.small-screen {
  padding-inline-start: 8px;
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
  padding: 12px;

  @include media-breakpoint-down(sm) {
    padding: 2px;
  }
}

.append-container {
  padding-inline-start: 8px;
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
    font-size: 0.60rem;
    padding-block: 6px;
    padding-inline: 8px;
  }
}

/* Media query for small screens */
@media (max-width: 767px) {
  .vcardtext-container {
    padding: 4px;
  }

  .row-item-parent {
    margin-inline: 0 0 !important; /* Override default margin */
  }

  .avatar-icon {
    block-size: 16px;
    inline-size: 16px;
  }

  .icon {
    block-size: 12px;
    inline-size: 12px;
  }

  .title-container {
    padding: 2px;
  }

  .append-container {
    padding-inline-start: 8px !important; /* Add !important to override scoped styles */
  }

  .title-text {
    font-size: 0.55rem;
  }

  .status-text {
    font-size: 0.70rem;
  }

  .status-text-start {
    font-size: 0.60rem;
  }

  .upgrade-link {
    font-size: 0.55rem;
  }

  .action-button {
    font-size: 0.60rem;
    padding-block: 6px;
    padding-inline: 8px;
  }

  .v-item {
    font-size: 0.55rem;
    padding-block: 1px;
    padding-inline: 3px;
  }
}
</style>

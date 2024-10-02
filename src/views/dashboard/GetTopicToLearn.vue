<script setup>
import axios from 'axios';
import { onMounted } from 'vue';

 // Replace with the actual key you use for the token
var topicLists = ref([]);
var token = localStorage.getItem('token');

onMounted(async () => {
  getTopicToLearn()
});

const getTopicToLearn = async () => {
  if (token) {
    try {
      const response = await axios.get('https://gateway.berkompeten.com/api/student/dashboard/get-need-to-learn-topic', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      topicLists.value = response.data.data
      
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
};
</script>

<template>
  <VCard>
    <VRow no-gutters>
      <VCol
        cols="12"
        md="12"
      >
        <VCardItem>
          <VCardTitle><span style="color: #0080ff;">Daftar Topik/Penyakit Prioritas</span></VCardTitle>

          <template #append>
            <h6 class="text-h6">
              <a
                style="color: #0080ff;"
                href="javascript:void(0)"
              >View All</a>
            </h6>
          </template>
        </VCardItem>

        <VCardText>
          <VList class="card-list">
            <VListItem
              v-for="(topic, index) in topicLists.slice(0, 5)"
              :key="index"
            >
              
              <VListItemTitle class="font-weight-medium mb-1 custom-title-style">
                <span style="color: #0080ff;">{{ topic.title }}</span>
              </VListItemTitle>
              <VListItemSubtitle class="text-body-1">
                <span style="color: #0080ff;">{{ topic.subtitle }}</span>
              </VListItemSubtitle>
            </VListItem>
          </VList>
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.25rem;
}

.custom-title-style {
  margin-block-end: 0 !important;
}
</style>

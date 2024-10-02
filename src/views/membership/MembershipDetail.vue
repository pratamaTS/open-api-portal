<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
 // Replace with the actual key you use for the token
const membership = ref(null);
const router = useRouter();
const route = useRoute();
var token = localStorage.getItem('token');

onMounted(async () => {
  const id = route.query.id

  if (token) {
    try {
      console.log("Membership id: ", id)
      const response = await axios.get('https://gateway.berkompeten.com/api/student/master/membership/detail?id='+id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      membership.value = response.data.membership;
      console.log("Membership detail: ", membership)
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
});

const formatToIDR = (price) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

const truncateDescription = (description) => {
  if (description.length > 50) {
    return description.substring(0, 35) + '...';
  }
  return description;
};

const pay = async (id) => {
  try {
    console.log("token: ", token)
    console.log("id: ", id)
    // Make a request to the logout endpoint on your backend
    const response = await axios.post('https://gateway.berkompeten.com/api/student/create-bill-payment', {
        id: id,
      }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const linkUrl = response.data.data.link_url
    console.log("resp payment: ", response)
    console.log("link: ", linkUrl)
    window.location.href = 'https://' + linkUrl
  } catch (error) {
    console.error('payment process error:', error);
  }
};
</script>

<template>
  <VCard class="vcardtext-container" v-if="membership">
    <VCardTitle><span style="color: #0080ff;">Membership {{ membership.name }}</span></VCardTitle>
    <VRow>
      <VCol
          cols="12"
          md="12"
        >
          <VCardItem>
            <VAvatar
                  :color="membership.is_active ? '#0080ff' : '#cccccc'"
                  rounded
                  size="38"
                  class="elevation-2"
                >
              <VIcon
                size="24"
                icon="ri-apps-line"
              />
            </VAvatar>
            <div class="me-n3" style="padding: 7px;">
              <p style="color: #0080ff;" class="font-weight-semibold mb-1">
                Periode Aktivasi: {{ membership.activation_period }} Bulan
              </p>
              <p style="color: #0080ff;" class="font-weight-semibold mb-1">
                Deskripsi paket: {{ truncateDescription(membership.description) }}
              </p>
              <p v-if="membership.price !== 0" style="color: black;" class="font-weight-semibold mb-1">
                <b>Harga: {{ formatToIDR(membership.price) }}</b>
              </p>
              <p v-if="membership.price === 0" style="color: black;" class="font-weight-semibold mb-1">
                <b>Free</b>
              </p>
            </div>
            
            <div class="me-n3" style="padding: 5px; padding-block-start: 10px;">
              <VBtn 
                    v-if="membership.is_current === false && membership.is_can_upgrade === true"
                    block
                    type="submit"
                    @click="pay(membership.id)"
                    :color="membership.is_active ? '#0080ff' : '#cccccc'"
                  >
                  Langganan
              </VBtn>
            </div>
          </VCardItem>
      </VCol>
    </VRow>
  </VCard>
</template>
<style lang="scss" scoped>

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
}

.row-item{
  margin-inline: 14px 1px;

  /* Remove bottom margin for the last row */
}

.v-item {
  margin: 2px; /* Remove bottom margin for the last row */
}
</style>

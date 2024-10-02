<script setup>
const { props } = defineProps(['userProfile']);
</script>

<template>
  <VCard class="position-relative">
    <VCardText>
      <div class="mb-2">
        <VBtn size="small" class="custom-rounded-button" color="#0080ff">
          <i class="ri-verified-badge-line"></i> {{ userProfile && userProfile.profile && userProfile.profile.membership && userProfile.profile.membership.name }}
        </VBtn>
        <div class="text-body-1">
          Masa Langganan Tersisa
        </div>
      </div>
      <h4 class="text-h4 text-primary">
        <span style="color: #0080ff;">{{ userProfile && userProfile.profile && userProfile.profile.membership && userProfile.profile.membership.activation_left }}</span> <span class="text-high-emphasis">Hari</span>
      </h4>
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.v-card .trophy {
  position: absolute;
  inline-size: 5.188rem;
  inset-block-end: 1.25rem;
  inset-inline-end: 1.25rem;
}

.custom-rounded-button {
  border-radius: 10px !important; /* Adjust the value to make it more or less rounded */
}

.text-body-1 {
  padding-block-start: 10px; /* Adjust the value to add the desired padding */
}

.ri-verified-badge-line {
  border-radius: 3px; /* Add border-radius for rounded corners */
  background-color: silver; /* Set the desired background color */
  color: #0080ff; /* Set the desired text color */
  padding-block: 3px;
  padding-inline: 6px; /* Adjust padding as needed */
}
</style>

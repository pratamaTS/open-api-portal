<script setup>
import LabValuesTable from '@/views/lab-values/LabValuesTable.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const goBack = () => {
  router.go(-1); // Go back one step in the history stack
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard style="color: #0080ff;">
        <div class="d-flex justify-between align-right" style=" padding: 10px;">
          <VCardTitle class="col-md-11">Nilai Normal Laboratorium</VCardTitle>
          <VBtn @click="goBack" class="mb-1" variant="outlined" style="block-size: 40px; inline-size: 40px; text-align: end;">
            <VIcon size="24" icon="ri-close-fill" />
          </VBtn>
        </div>
        <LabValuesTable />
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
  .back-button {
    display: inline-block;
    padding: 10px;
    border: none;
    border-radius: 50%;
    background-color: #ccc;
    color: #333;
    cursor: pointer;
    margin-block-start: 10px;
  }
</style>

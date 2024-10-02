<script setup>
import { computed, onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const series = ref([])
const chartOptions = computed(() => ({
  chart: { toolbar: { show: false } },
  xaxis: { categories: ['Weekly Sign Ups', 'Total Sign Ups'] },
  yaxis: { title: { text: 'Users' } },
  dataLabels: { enabled: true },
  stroke: { curve: 'smooth' }
}))
var token = localStorage.getItem('token');

onMounted(async () => {
  try {
    // const response = await axios.get('https://gateway.berkompeten.com/api/admin/stats/weekly-signups', {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    // const data = response.data.data
    series.value = [{ name: 'Sign Ups', data: [1, 1] }]
  } catch (error) {
    console.error('Failed to fetch weekly sign ups data:', error)
  }
})
</script>

<template>
  <VCard>
    <VCardText>
      <h4 class="text-h4">Weekly Sign Ups</h4>
      <VueApexCharts type="line" :options="chartOptions" :series="series" :height="350" class="my-1" />
    </VCardText>
  </VCard>
</template>

<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const series = ref([])
const chartOptions = computed(() => ({
  chart: { toolbar: { show: false } },
  xaxis: { categories: [] },
  yaxis: { title: { text: 'Users' } },
  dataLabels: { enabled: true },
  stroke: { curve: 'smooth' }
}))
var token = localStorage.getItem('token');

onMounted(async () => {
  try {
    const response = await axios.get('https://gateway.berkompeten.com/api/admin/stats/daily-active-users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    const data = response.data.data
    series.value = [{ name: 'Active Users', data: Object.values(data) }]
    chartOptions.value.xaxis.categories = Object.keys(data)
  } catch (error) {
    console.error('Failed to fetch daily active users data:', error)
  }
})
</script>

<template>
  <VCard>
    <VCardText>
      <h4 class="text-h4">Daily Active Users</h4>
      <VueApexCharts type="line" :options="chartOptions" :series="series" :height="350" class="my-1" />
    </VCardText>
  </VCard>
</template>

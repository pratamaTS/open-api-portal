<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
 // Replace with the actual key you use for the token
const lab = ref(null);
const router = useRouter();
var token = localStorage.getItem('token');

onMounted(async () => {
  if (token) {
    try {
      const response = await axios.get('https://gateway.berkompeten.com/api/student/lab-values', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      lab.value = response.data.data;
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
</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          Kategori
        </th>
        <th class="text-uppercase text-center">
          Indikator
        </th>
        <th class="text-uppercase text-center">
          Satuan
        </th>
        <th class="text-uppercase text-center">
          Nilai Normal
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in lab"
        :key="item.category_lab.name"
      >
        <td>
          {{ item.category_lab.name }}
        </td>
        <td class="text-center">
          {{ item.indicator }}
        </td>
        <td class="text-center">
          {{ item.unit }}
        </td>
        <td class="text-center">
          {{ item.reference_value }}
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

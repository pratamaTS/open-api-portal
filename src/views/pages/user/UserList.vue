<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const token = localStorage.getItem('token');
const datas = ref([]);
const searchQuery = ref('');
const pagination = ref({
  current_page: 1,
  from: 1,
  last_page: 1,
  next_page_url: null,
  prev_page_url: null,
  total: 0,
});

const fetchData = async (page = 1) => {
  try {
    const response = await axios.get(`https://gateway.berkompeten.com/api/admin/master/user?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    datas.value = response.data.User.data;
    pagination.value = response.data.User;
  } catch (error) {
    console.log("err: ", error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }
};

const filteredData = computed(() => {
  if (!searchQuery.value) {
    return datas.value;
  }
  return datas.value.filter(data => 
    data.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    data.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    data.phone_number.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    data.gender.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    data.role.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    data.year_of_entry.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    data.target_exam_date.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const nextPage = () => {
  if (pagination.value.next_page_url) {
    fetchData(pagination.value.current_page + 1);
  }
};

const prevPage = () => {
  if (pagination.value.prev_page_url) {
    fetchData(pagination.value.current_page - 1);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <VCardTitle class="mb-4">User Management</VCardTitle>
    <input v-model="searchQuery" placeholder="Search..." />
    <VTable height="250" fixed-header>
      <thead>
        <tr>
          <th class="text-uppercase">Name</th>
          <th class="text-center text-uppercase">Email</th>
          <th class="text-center text-uppercase">Phone Number</th>
          <th class="text-center text-uppercase">Gender</th>
          <th class="text-center text-uppercase">Role</th>
          <th class="text-center text-uppercase">Year of Entry</th>
          <th class="text-center text-uppercase">Target Exam Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredData" :key="user.id">
          <td>{{ user.name }}</td>
          <td class="text-center">{{ user.email }}</td>
          <td class="text-center">{{ user.phone_number }}</td>
          <td class="text-center">{{ user.gender }}</td>
          <td class="text-center">{{ user.role }}</td>
          <td class="text-center">{{ user.year_of_entry }}</td>
          <td class="text-center">{{ user.target_exam_date }}</td>
        </tr>
      </tbody>
    </VTable>
    <div>
      <button @click="prevPage" :disabled="!pagination.prev_page_url">Previous</button>
      <button @click="nextPage" :disabled="!pagination.next_page_url">Next</button>
    </div>
  </div>
</template>

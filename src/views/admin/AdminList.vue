<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const token = localStorage.getItem('token');
const admins = ref([]);
const searchQuery = ref('');
const pagination = ref({
  current_page: 1,
  from: 1,
  last_page: 1,
  next_page_url: null,
  prev_page_url: null,
  total: 0,
});

const fetchAdmins = async (page = 1) => {
  try {
    const response = await axios.get(`https://gateway.berkompeten.com/api/admin/master/admin?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    admins.value = response.data.Admin.data;
    pagination.value = response.data.Admin;
  } catch (error) {
    console.log("err: ", error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }
};

const filteredAdmins = computed(() => {
  if (!searchQuery.value) {
    return admins.value;
  }
  return admins.value.filter(admin => 
    admin.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const nextPage = () => {
  if (pagination.value.next_page_url) {
    fetchAdmins(pagination.value.current_page + 1);
  }
};

const prevPage = () => {
  if (pagination.value.prev_page_url) {
    fetchAdmins(pagination.value.current_page - 1);
  }
};

onMounted(() => {
  fetchAdmins();
});
</script>

<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />
    <VTable height="250" fixed-header>
      <thead>
        <tr>
          <th class="text-uppercase">Name</th>
          <th class="text-center text-uppercase">Email</th>
          <th class="text-center text-uppercase">Is Active</th>
          <th class="text-center text-uppercase">Created At</th>
          <th class="text-center text-uppercase">Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="admin in filteredAdmins" :key="admin.id">
          <td>{{ admin.name }}</td>
          <td class="text-center">{{ admin.email }}</td>
          <td class="text-center">{{ admin.is_active }}</td>
          <td class="text-center">{{ admin.created_at }}</td>
          <td class="text-center">{{ admin.updated_at }}</td>
        </tr>
      </tbody>
    </VTable>
    <div>
      <button @click="prevPage" :disabled="!pagination.prev_page_url">Previous</button>
      <button @click="nextPage" :disabled="!pagination.next_page_url">Next</button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const token = localStorage.getItem('token');
const datas = ref([]);
const searchQuery = ref('');
const selectedPacket = ref(null);
const questionPacketsOption = ref([]);
const pagination = ref({
  current_page: 1,
  from: 1,
  last_page: 1,
  next_page_url: null,
  prev_page_url: null,
  total: 0,
});

const isBulkUpsertDialogOpen = ref(false);
const bulkUpsertFile = ref(null);
const successMessage = ref('');
const errorMessage = ref('');

const fetchData = async (page = 1, searchQuery = '') => {
  try {
    let url = `https://gateway.berkompeten.com/api/admin/master/university?page=${page}`;
    if (searchQuery) {
      url += `&search=${searchQuery.toLowerCase()}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    datas.value = response.data.data.data;
    pagination.value = response.data.data;
  } catch (error) {
    console.log("err: ", error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }
};

watch([searchQuery], ([newSearchValue]) => {
  fetchData(1, newSearchValue);
});

const nextPage = () => {
  if (pagination.value.next_page_url) {
    fetchData(pagination.value.current_page + 1, searchQuery.value);
  }
};

const prevPage = () => {
  if (pagination.value.prev_page_url) {
    fetchData(pagination.value.current_page - 1, searchQuery.value);
  }
};

const createData = () => {
  localStorage.removeItem('id');
  router.push(`/university/detail`);
};

// const downloadTemplate = async () => {
//   try {
//     const response = await axios.get(`https://gateway.berkompeten.com/api/admin/master/question/download-template`, {
//       responseType: 'blob',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'questions_template.xlsx');
//     document.body.appendChild(link);
//     link.click();
//   } catch (error) {
//     console.error("Error downloading template:", error);
//   }
// };

// const bulkUpsert = () => {
//   localStorage.removeItem('question_id');
//   isBulkUpsertDialogOpen.value = true;
// };

// const closeBulkUpsertDialog = () => {
//   isBulkUpsertDialogOpen.value = false;
//   bulkUpsertFile.value = null;
//   successMessage.value = '';
//   errorMessage.value = '';
// };

// const handleBulkUpsert = async () => {
//   if (!bulkUpsertFile.value) {
//     errorMessage.value = 'Please upload a file'
//     setTimeout(() => {
//       errorMessage.value = ''
//     }, 5000);
//     return;
//   }

//   const formData = new FormData();
//   formData.append('file', bulkUpsertFile.value[0]);

//   console.log("FILE: ", bulkUpsertFile.value[0])

//   try {
//     const response = await axios.post('https://gateway.berkompeten.com/api/admin/master/question/bulk-upsert', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     successMessage.value = 'Bulk upsert completed successfully';
//     setTimeout(() => {
//       closeBulkUpsertDialog();
//       fetchData(pagination.value.current_page); 
//     }, 2000);
//   } catch (error) {
//     if (error.response && error.response.status === 422) {
//       errorMessage.value = 'Validation error: ' + JSON.stringify(error.response.data.message.file[0]);
//       setTimeout(() => {
//         errorMessage.value = '';
//       }, 5000);
//     } else {
//       errorMessage.value = 'Error bulk upsert: ' + error.response.data.message
//       setTimeout(() => {
//         errorMessage.value = '';
//       }, 5000);
//     }
//   }
// };

const editData = (id) => {
  localStorage.setItem('id', id)
  router.push(`/university/detail`);
};

const deleteData = async (id) => {
  try {
    const response = await axios.delete(`https://gateway.berkompeten.com/api/admin/master/university?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    successMessage.value = response.data.message;
    fetchData(pagination.value.current_page);
  } catch (error) {
    console.log("err: ", error);
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message || 'An error occurred while deleting. Please try again.';
    } else {
      errorMessage.value = 'An error occurred while deleting. Please try again.';
    }
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <VCardTitle class="mb-4">University Management</VCardTitle>
    <div class="table-header">
      <VTextField v-model="searchQuery" label="Search" class="mx-3" solo />
      <VBtn color="#0080ff" class="mx-1" @click="createData">Create</VBtn>
      <!-- <VBtn color="#0080ff" class="mx-1" @click="bulkUpsert">Bulk Upsert</VBtn>
      <VBtn color="#0080ff" class="mx-1" @click="downloadTemplate">Download Template</VBtn> -->
    </div>
    <VCardText>
      <VAlert v-if="successMessage" type="success" dismissible @click:close="successMessage = ''">
        {{ successMessage }}
      </VAlert>
      <VAlert v-if="errorMessage" type="error" dismissible @click:close="errorMessage = ''">
        {{ errorMessage }}
      </VAlert>
    </VCardText>
    <div class="table-container">
      <VTable fixed-header>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Is Active</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in datas" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.is_active }}</td>
            <td>{{ item.created_date }}</td>
            <td>
              <div>
                <VBtn icon @click="editData(item.id)" class="mx-1" color="transparent" style=" padding: 0; border: none;background-color: transparent; box-shadow: none;">
                  <VIcon style="color: orange;">ri-edit-line</VIcon>
                </VBtn>
                <VBtn icon @click="deleteData(item.id)" class="mx-1" color="transparent" style=" padding: 0; border: none;background-color: transparent; box-shadow: none;">
                  <VIcon style="color: red;">ri-delete-bin-line</VIcon>
                </VBtn>
              </div>
            </td>
          </tr>
        </tbody>
      </VTable>
    </div>
    <div class="pagination">
      <VBtn @click="prevPage" :disabled="!pagination.prev_page_url" class="mx-1" color="#0080ff">Previous</VBtn>
      <VBtn @click="nextPage" :disabled="!pagination.next_page_url" class="mx-1" color="#0080ff">Next</VBtn>
    </div>
    <!-- Bulk Upsert Modal -->
    <!-- <VDialog v-model="isBulkUpsertDialogOpen" max-width="500px">
      <VCard>
        <VCardTitle class="text-h5">Bulk Upsert</VCardTitle>
        <VCardText>
          <VFileInput
            v-model="bulkUpsertFile"
            label="Upload Excel File"
            accept=".csv,.xlsx,.xls"
            prepend-icon="mdi-upload"
          />
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="blue darken-1" text @click="closeBulkUpsertDialog">Cancel</VBtn>
          <VBtn color="#0080ff" text @click="handleBulkUpsert">Upload</VBtn>
        </VCardActions>
        <VCardText>
          <VAlert v-if="successMessage" type="success" dismissible @click:close="successMessage = ''">
            {{ successMessage }}
          </VAlert>
          <VAlert v-if="errorMessage" type="error" dismissible @click:close="errorMessage = ''">
            {{ errorMessage }}
          </VAlert>
        </VCardText>
      </VCard>
    </VDialog> -->
  </div>
</template>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  margin-block-end: 16px;
}

.table-container {
  border-radius: 8px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 10%);
  max-block-size: 500px;
  overflow-y: auto;
}

.v-table thead tr {
  background-color: #f5f5f5;
}

.v-table th, .v-table td {
  border-block-end: 1px solid #e0e0e0;
  padding-block: 12px;
  padding-inline: 8px;
  text-align: start;
}

.v-table tbody tr:nth-child(even) {
  background-color: #fafafa;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-block-start: 16px;
}

.v-btn {
  margin-block: 0;
  margin-inline: 4px;
}
</style>

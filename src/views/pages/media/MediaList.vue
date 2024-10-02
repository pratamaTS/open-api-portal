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

const isUploadDialogOpen = ref(false);
const uploadFile = ref(null);
const successMessage = ref('');
const errorMessage = ref('');

const fetchData = async (page = 1, searchQuery = '') => {
  try {
    let url = `https://gateway.berkompeten.com/api/admin/master/media?page=${page}`;
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

const uploadMedia = () => {
  localStorage.removeItem('question_id');
  isUploadDialogOpen.value = true;
};

const closeUploadDialog = () => {
  isUploadDialogOpen.value = false;
  uploadFile.value = null;
  successMessage.value = '';
  errorMessage.value = '';
};

const handleUpload = async () => {
  if (!uploadFile.value) {
    errorMessage.value = 'Please upload a file'
    setTimeout(() => {
      errorMessage.value = ''
    }, 5000);
    return;
  }

  const formData = new FormData();
  formData.append('image', uploadFile.value[0]);

  console.log("FILE: ", uploadFile.value[0])

  try {
    const response = await axios.post('https://gateway.berkompeten.com/api/admin/master/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    successMessage.value = 'Upload image completed successfully';
    setTimeout(() => {
      closeUploadDialog();
      fetchData(pagination.value.current_page); 
    }, 2000);
  } catch (error) {
    if (error.response && error.response.status === 422) {
      errorMessage.value = 'Validation error: ' + JSON.stringify(error.response.data.message.file[0]);
      setTimeout(() => {
        errorMessage.value = '';
      }, 5000);
    } else {
      errorMessage.value = 'Error upload image: ' + error.response.data.message
      setTimeout(() => {
        errorMessage.value = '';
      }, 5000);
    }
  }
};

const deleteData = async (id) => {
  try {
    await axios.delete(`https://gateway.berkompeten.com/api/admin/master/media?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchData(pagination.value.current_page);
  } catch (error) {
    console.log("err: ", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <div class="table-header">
      <VTextField v-model="searchQuery" label="Search" class="mx-3" solo />
      <VBtn color="#0080ff" class="mx-1" @click="uploadMedia">Upload</VBtn>
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
            <th>File Name</th>
            <th>URL</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in datas" :key="question.id">
            <td>{{ question.filename }}</td>
            <td>{{ question.url }}</td>
            <td>{{ question.created_at }}</td>az
            <!-- <td>
              <div v-if="question.is_used === false">
                <VBtn icon @click="editData(question.id)" class="mx-1" color="transparent" style=" padding: 0; border: none;background-color: transparent; box-shadow: none;">
                  <VIcon style="color: orange;">ri-edit-line</VIcon>
                </VBtn>
                <VBtn icon @click="deleteData(question.id)" class="mx-1" color="transparent" style=" padding: 0; border: none;background-color: transparent; box-shadow: none;">
                  <VIcon style="color: red;">ri-delete-bin-line</VIcon>
                </VBtn>
              </div>
            </td> -->
          </tr>
        </tbody>
      </VTable>
    </div>
    <div class="pagination">
      <VBtn @click="prevPage" :disabled="!pagination.prev_page_url" class="mx-1" color="#0080ff">Previous</VBtn>
      <VBtn @click="nextPage" :disabled="!pagination.next_page_url" class="mx-1" color="#0080ff">Next</VBtn>
    </div>
    <!-- Upload Modal -->
    <VDialog v-model="isUploadDialogOpen" max-width="500px">
      <VCard>
        <VCardTitle class="text-h5">Upload Image</VCardTitle>
        <VCardText>
          <VFileInput
            v-model="uploadFile"
            label="Upload File"
            accept=".jpg,.jpeg,.png"
            prepend-icon="mdi-upload"
          />
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="blue darken-1" text @click="closeUploadDialog">Cancel</VBtn>
          <VBtn color="#0080ff" text @click="handleUpload">Upload</VBtn>
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
    </VDialog>
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

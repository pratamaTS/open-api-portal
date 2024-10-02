<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const token = localStorage.getItem('token');

// Data and reactive variables
const searchQuery = ref('');
const bills = ref([]);
const errorMessage = ref('');
const successMessage = ref('');
const expanded = ref([]);
const pagination = ref({
  current_page: 1,
  from: 1,
  last_page: 1,
  next_page_url: null,
  prev_page_url: null,
  total: 0,
});

// Filtering and sorting
const startDate = ref('2024-06-01');
const endDate = ref('2024-06-30');
const sortBy = ref('created_at');
const sortType = ref('sort_desc');

const sortOptions = [
  { title: 'Created At', value: 'created_at' },
  { title: 'Amount', value: 'amount' },
  { title: 'Sender Name', value: 'sender_name' },
];

// Table headers
const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Bill Title', value: 'bill_title' },
  { title: 'Sender Name', value: 'sender_name' },
  { title: 'Sender Bank', value: 'sender_bank' },
  { title: 'Amount', value: 'amount' },
  { title: 'Status', value: 'status' },
  { title: 'Created At', value: 'created_at' },
];

// Methods
const fetchData = async (page = 1, searchQuery = '') => {
  try {
    const response = await axios.get('https://gateway.berkompeten.com/api/admin/report/bills', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        search: searchQuery.toLowerCase(),
        start_date: startDate.value,
        end_date: endDate.value,
        sort_by: sortBy.value,
        sort_type: sortType.value
      },
    });

    if (response.data.error) {
      errorMessage.value = response.data.message;
      bills.value = [];
      return
    }

    successMessage.value = response.data.message;
    bills.value = response.data.data.data;
    pagination.value = response.data.data;
  } catch (error) {
    errorMessage.value = 'Failed to fetch bills. Please try again.';
    console.log("err: ", error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }
};

watch([searchQuery, startDate, endDate, sortBy, sortType], ([newSearchValue]) => {
  fetchData(pagination.value.current_page, newSearchValue);
});

// Date formatting
const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US');
};

// Currency formatting
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
};

// Function to get chip color based on status
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'paid', 'successful':
      return 'success';
    case 'pending':
      return 'warning';
    case 'failed':
      return 'error';
    default:
      return 'info';
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>Bill List</v-card-title>

      <v-card-text>
        <v-form >
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="searchQuery" label="Search" class="mx-3" solo />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="startDate"
                label="Start Date"
                type="date"
                class="mx-3"
                solo
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="endDate"
                label="End Date"
                type="date"
                class="mx-3"
                solo
              />
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                :items="sortOptions"
                v-model="sortBy"
                item-text="title"
                item-value="value"
                label="Sort By"
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-text>
        <!-- Error and Success Messages -->
        <v-alert v-if="errorMessage" type="error" dismissible @click.stop.native="errorMessage = ''">
          {{ errorMessage }}
        </v-alert>
        <v-alert v-if="successMessage" type="success" dismissible @click.stop.native="successMessage = ''">
          {{ successMessage }}
        </v-alert>
        <!-- Bill Data Table -->
        <v-data-table
          :headers="headers"
          :items="bills"
          item-value="id"
          class="elevation-1"
          show-expand
          :expanded.sync="expanded"
          :single-expand="singleExpand"
        >
          <template v-slot:item.amount="{ item }">
            {{ formatCurrency(item.amount) }}
          </template>
          <template v-slot:item.created_at="{ item }">
            {{ formatDate(item.created_at) }}
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip :color="getStatusColor(item.status)" dark>{{ item.status }}</v-chip>
          </template>
          <template v-slot:expanded-row="{ item }">
            <td :colspan="headers.length" class="expanded-row">
              <v-card flat class="pa-3">
                <v-card-title>Additional Details for Bill ID: {{ item.id }}</v-card-title>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <strong>Sender Bank Type:</strong> {{ item.sender_bank_type }}<br />
                      <strong>Payment URL:</strong> <a :href="item.payment_url" target="_blank">{{ item.payment_url }}</a><br />
                      <strong>Virtual Account Number:</strong> {{ item.virtual_account_number }}<br />
                      <strong>Transaction Reference Number:</strong> {{ item.transaction_reference_number || 'N/A' }}<br />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <strong>Settlement Status:</strong> {{ item.settlement_status }}<br />
                      <strong>Bill Link:</strong> {{ item.bill_link }}<br />
                      <strong>Completed At:</strong> {{ formatDate(item.completed_at) }}<br />
                      <strong>Reference ID:</strong> {{ item.reference_id || 'N/A' }}<br />
                      <strong>Settlement Date:</strong> {{ formatDate(item.settlement_date) || 'N/A' }}
                    </v-col>
                  </v-row>
              </v-card>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.active-row {
  background-color: #e8f5e9; /* Light green for active bills */
}

.inactive-row {
  background-color: #ffebee; /* Light red for inactive bills */
}

.expanded-row {
  padding: 0;
  border-block-start: none;
}
</style>

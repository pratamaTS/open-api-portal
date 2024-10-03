<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as XLSX from 'xlsx';

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
  { title: 'API Title', value: 'bill_title' },
  { title: 'Sender Name', value: 'sender_name' },
  { title: 'Sender Bank', value: 'sender_bank' },
  { title: 'Amount', value: 'amount' },
  { title: 'Status', value: 'status' },
  { title: 'Created At', value: 'created_at' },
];

// Methods
const fetchData = async (page = 1, searchQuery = '') => {
  try {
    // const response = await axios.get('https://gateway.berkompeten.com/api/admin/report/bills', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   params: {
    //     page: page,
    //     search: searchQuery.toLowerCase(),
    //     start_date: startDate.value,
    //     end_date: endDate.value,
    //     sort_by: sortBy.value,
    //     sort_type: sortType.value
    //   },
    // });

    // if (response.data.error) {
    //   errorMessage.value = response.data.message;
    //   bills.value = [];
    //   return
    // }

    successMessage.value = "";
    bills.value = [
            {
                "id": "PGPWF10117182757505748433",
                "settlement_status": "Cancelled",
                "payment_url": "https://flip.id/pwf-sandbox/transaction/consolidated?redirected_from=internal&id=f8ca43e62a9f4dbe8f4fa36b5207c75b",
                "link_id": "110561",
                "bill_link": "flip.id/pwf-sandbox/$digdayanagroup/#gold-5151",
                "bill_title": "Gold",
                "sender_name": "Izzan",
                "sender_bank": "permata",
                "sender_bank_type": "virtual_account",
                "virtual_account_number": "7849449581701995",
                "amount": 900000,
                "status": "FAILED",
                "created_at": "2024-06-13 17:49:10",
                "completed_at": null,
                "transaction_reference_number": null,
                "reference_id": null,
                "settlement_date": null
            },
            {
                "id": "PGPWF10117182527915632432",
                "settlement_status": "Pending Settlement",
                "payment_url": "https://flip.id/pwf-sandbox/transaction/consolidated?redirected_from=internal&id=b751f28d256a4547bf7263dc53770c94",
                "link_id": "110463",
                "bill_link": "flip.id/pwf-sandbox/$digdayanagroup/#silver-8617",
                "bill_title": "Silver",
                "sender_name": "Izzan",
                "sender_bank": "bsm",
                "sender_bank_type": "virtual_account",
                "virtual_account_number": "41223022506812968",
                "amount": 500000,
                "status": "SUCCESSFUL",
                "created_at": "2024-06-13 11:26:31",
                "completed_at": null,
                "transaction_reference_number": null,
                "reference_id": null,
                "settlement_date": null
            },
            {
                "id": "PGPWF10117182520188387654",
                "settlement_status": "Pending Settlement",
                "payment_url": "https://flip.id/pwf-sandbox/transaction/consolidated?redirected_from=internal&id=500c4bbac44a409c95837fe8299f0df0",
                "link_id": "110461",
                "bill_link": "flip.id/pwf-sandbox/$digdayanagroup/#silver-3402",
                "bill_title": "Silver",
                "sender_name": "Hardianto Jouga Pratama",
                "sender_bank": "bca",
                "sender_bank_type": "virtual_account",
                "virtual_account_number": "81105290237156294",
                "amount": 500000,
                "status": "SUCCESSFUL",
                "created_at": "2024-06-13 11:13:38",
                "completed_at": null,
                "transaction_reference_number": null,
                "reference_id": null,
                "settlement_date": null
            },
          ];
    pagination.value = {
      "total_data": 9,
      "data_per_page": 9,
      "total_page": 1,
      "page": 1,
    };
  } catch (error) {
    errorMessage.value = 'Failed to fetch api report. Please try again.';
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

// Export to Excel function
const exportToExcel = () => {
  const data = bills.value.map(bill => ({
    ID: bill.id,
    'API Title': bill.bill_title,
    'Sender Name': bill.sender_name,
    'Sender Bank': bill.sender_bank,
    Amount: formatCurrency(bill.amount),
    Status: bill.status,
    'Created At': formatDate(bill.created_at),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bills');
  
  // Download the Excel file
  XLSX.writeFile(workbook, 'Report_api.xlsx');
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        Report Api List
        <v-spacer></v-spacer>
        <!-- Add the Export to Excel button -->
       
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" md="2">
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
            <v-col cols="12" md="2">
              <v-btn @click="exportToExcel" color="primary">Export to Excel</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-text>
        <!-- Error and Success Messages -->
        <v-alert v-if="errorMessage" type="error" dismissible>
          {{ errorMessage }}
        </v-alert>
        <v-alert v-if="successMessage" type="success" dismissible>
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
  background-color: #e8f5e9;
}

.inactive-row {
  background-color: #ffebee;
}

.expanded-row {
  padding: 0;
  border-block-start: none;
}
</style>

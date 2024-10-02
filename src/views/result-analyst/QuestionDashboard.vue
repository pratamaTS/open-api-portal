<script setup>
const questions = [
  {
    id: 1,
    title: 'Paket Soal Uji Coba (Trial)',
    start_date: '17 Februari 2024',
    finish_date: '18 Februari 2024',
    topics: [
      {
        title: "Reproduksi: Gangguan Pada Kehamilan"
      },
      {
        title: "Reproduksi: Persalinan Dan Nifas"
      },
      {
        title: "THT: Hidung"
      },
      {
        title: "Respirasi: Gawat Paru"
      },
      {
        title: "Dan Lainya"
      },
    ],
    is_active: true,
  },
  {
    id: 2,
    title: 'Paket Tryout UKMPPD 1',
    start_date: '17 Februari 2024',
    finish_date: '18 Februari 2024',
    topics: [
      {
        title: "Reproduksi: Gangguan Pada Kehamilan"
      },
      {
        title: "Reproduksi: Persalinan Dan Nifas"
      },
      {
        title: "THT: Hidung"
      },
      {
        title: "Respirasi: Gawat Paru"
      },
      {
        title: "Dan Lainya"
      },
    ],
    is_active: true,
  },
  {
    id: 3,
    title: 'Paket Tryout UKMPPD 2',
    start_date: '17 Februari 2024',
    finish_date: '18 Februari 2024',
    topics: [
      {
        title: "Reproduksi: Gangguan Pada Kehamilan"
      },
      {
        title: "Reproduksi: Persalinan Dan Nifas"
      },
      {
        title: "THT: Hidung"
      },
      {
        title: "Respirasi: Gawat Paru"
      },
      {
        title: "Dan Lainya"
      },
    ],
    is_active: true,
  },
  {
    id: 4,
    title: 'Paket Tryout UKMPPD 4',
    start_date: '27 Februari 2024',
    finish_date: '-',
    topics: [
      {
        title: "Reproduksi: Gangguan Pada Kehamilan"
      },
      {
        title: "Reproduksi: Persalinan Dan Nifas"
      },
      {
        title: "THT: Hidung"
      },
      {
        title: "Respirasi: Gawat Paru"
      },
      {
        title: "Dan Lainya"
      },
    ],
    is_active: true,
  },
  {
    id: 5,
    title: 'Paket Tryout UKMPPD 5',
    start_date: '27 Februari 2024',
    finish_date: '-',
    topics: [
      {
        title: "Reproduksi: Gangguan Pada Kehamilan"
      },
      {
        title: "Reproduksi: Persalinan Dan Nifas"
      },
      {
        title: "THT: Hidung"
      },
      {
        title: "Respirasi: Gawat Paru"
      },
      {
        title: "Dan Lainya"
      },
    ],
    is_active: false,
  }, 
]
</script>

<template>
  <VCard class="vcardtext-container">
    <VRow>
      <VCol
          cols="6"
          md="6"
          v-for="item in questions"
        >
        <VCard class="mb-4">
          <VCardItem>
            <VRow align="center" class="d-flex flex-wrap row-item-parent">
              <VAvatar
                    :color="item.is_active ? '#0080ff' : '#cccccc'"
                    rounded
                    size="40"
                    class="elevation-2"
                  >
                <VIcon
                  size="24"
                  icon="ri-apps-line"
                />
              </VAvatar>
              <div class="me-n3" style="padding: 20px;">
                
                <VCardTitle><span style="color: black;">{{ item.title }}</span></VCardTitle>
                <p style="color: #0080ff;" class="font-weight-semibold mb-1" v-if="item.finish_date === '-' && item.is_active === true">
                  Mulai dikerjakan: {{ item.start_date }}
                </p>
                <p style="color: #0080ff;" class="font-weight-semibold mb-1" v-if="item.finish_date !== '-' && item.is_active === true">
                  Diselesaikan: {{ item.finish_date }}
                </p>
                <a
                  v-if="item.is_active === false"
                  style="color: #0080ff;"
                  href="javascript:void(0)"
                >Langganan Paket Gold untuk melanjutkan</a>
              </div>
            </VRow>

            <template #append>
              <VBtn v-if="item.finish_date === '-' && item.is_active === true"
                    block
                    type="submit"
                    to="/soal"
                    :color="item.is_active ? '#0080ff' : '#cccccc'"
                  >
                  Lanjutkan
              </VBtn>
              <h6 class="text-h6" v-if="item.finish_date !== '-'">
                <a
                  :style="{ color: item.is_active ? '#0080ff' : '#cccccc' }"
                  href="javascript:void(0)"
                >Detail & Pembahasan</a>
              </h6>
            </template>
          </VCardItem>
          <VRow align="center" class="d-flex flex-wrap row-item">
            <div class="d-flex align-center flex-wrap mb-3">
              <VChip
                class="d-flex flex-wrap v-item"
                :color="item.is_active ? '#0080ff' : '#cccccc'"
                size="small"
                v-for="child in item.topics"
              >
                {{ child.title }}
              </VChip>
            </div>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
  </VCard>
</template>
<style lang="scss" scoped>

.custom-title-style {
  margin-bottom: 0px !important;
}

/* Add custom styling for scroll and reduce gap */
.vcardtext-container {
  overflow-y: auto;
  margin-bottom: -10px; /* Adjust this margin to reduce the gap between rows */
}

.vcardtext-container{
  padding: 10px; /* Remove bottom margin for the last row */
}

.row-item-parent{
  margin-left: 4px;
  margin-right: 1px; /* Remove bottom margin for the last row */
}
.row-item{
  margin-left: 14px;
  margin-right: 1px; /* Remove bottom margin for the last row */
}

.v-item {
  margin: 2px; /* Remove bottom margin for the last row */
}
</style>
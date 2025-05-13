<!-- src/views/HolidayManager.vue -->
<template>
  <div class="holiday-manager">
    <h2>Daftar Holiday List</h2>
    <ul>
      <li v-for="list in holidayLists" :key="list.name" @click="fetchDetails(list.name)">
        {{ list.name }}
      </li>
    </ul>

    <div v-if="selectedList">
      <h3>Detail Holiday: {{ selectedList }}</h3>
      <table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Deskripsi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="holiday in holidays" :key="holiday.holiday_date">
            <td>{{ holiday.holiday_date }}</td>
            <td>{{ holiday.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import frappeCall from "@/utils/frappeCall.js";
import Holiday from '@/components/Holiday.vue'

const holidayLists = ref([])
const selectedList = ref(null)
const holidays = ref([])

// Fetch all holiday list
const fetchHolidayLists = async () => {
  try {
    const res = await frappeCall('frappe.client.get_list', {
      doctype: 'Holiday List',
      fields: ['name'],
      limit_page_length: 20
    })
    holidayLists.value = res.message
  } catch (err) {
    console.error("Gagal memuat holiday list", err)
  }
}

// Fetch detail for selected holiday list
const fetchDetails = async (name) => {
  selectedList.value = name
  try {
    const res = await frappeCall('frappe.client.get', {
      doctype: 'Holiday List',
      name
    })
    holidays.value = res.message.holidays || []
  } catch (err) {
    console.error("Gagal memuat detail", err)
  }
}

onMounted(fetchHolidayLists)
</script>

<style scoped>
.holiday-manager {
  padding: 20px;
}
ul {
  padding-left: 20px;
}
li {
  cursor: pointer;
  margin-bottom: 5px;
  color: #2196f3;
}
li:hover {
  text-decoration: underline;
}
table {
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
}
th, td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
</style>

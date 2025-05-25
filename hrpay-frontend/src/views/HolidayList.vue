<template>
  <div class="holiday-manager">
    <h2>Holiday List</h2>
    <ul>
      <li v-for="holiday in holidayList" :key="holiday.name" @click="selectedHoliday = holiday">
        {{ holiday.description || holiday.name }}
      </li>
    </ul>

    <div v-if="selectedHoliday">
      <h3>Details: {{ selectedHoliday.description || selectedHoliday.name }}</h3>
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Not Fixed?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ selectedHoliday.start_date }}</td>
            <td>{{ selectedHoliday.end_date }}</td>
            <td>{{ selectedHoliday.description }}</td>
            <td>{{ selectedHoliday.is_not_fixed ? '✔' : '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <button @click="$router.push('/add-holiday')">Add Holiday</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getHolidays } from '../../../hrpay/api/holiday'

const holidayList = ref([])
const selectedHoliday = ref(null)

const loadHolidays = async () => {
  const res = await getHolidays()
  holidayList.value = res.message
}

onMounted(loadHolidays)
</script>

<style scoped>
button {
  margin-top: 20px;
  padding: 6px 12px;
}
</style>

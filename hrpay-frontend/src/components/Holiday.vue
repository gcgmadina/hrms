<!-- form add holiday -->
<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="holiday_date">Tanggal</label>
      <input type="date" v-model="form.holiday_date" required />
    </div>

    <div>
      <label for="description">Deskripsi</label>
      <input type="text" v-model="form.description" required />
    </div>

    <div>
      <label for="holiday_list">Holiday List</label>
      <select v-model="form.holiday_list" required>
        <option v-for="list in holidayLists" :key="list.name" :value="list.name">
          {{ list.name }}
        </option>
      </select>
    </div>

    <button type="submit">Tambah Hari Libur</button>
  </form>
</template>

<script>
import { ref, onMounted } from 'vue'
import frappeCall from "@/utils/frappeCall.js";

export default {
  setup() {
    const form = ref({
      holiday_date: '',
      description: '',
      holiday_list: ''
    })

    const holidayLists = ref([])

    const fetchHolidayLists = async () => {
      const res = await frappeCall('hrpay.api.holiday.get_holiday_lists')
      holidayLists.value = res.message || res
    }

    const submitForm = async () => {
      await frappeCall('hrpay.api.holiday.add_holiday', form.value)
      alert('Hari libur berhasil ditambahkan!')
      form.value = { holiday_date: '', description: '', holiday_list: '' }
    }

    onMounted(fetchHolidayLists)

    return {
      form,
      holidayLists,
      submitForm
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>

<template>
  <div>
    <h2>Add Holiday</h2>
    <form @submit.prevent="submitForm">
      <label>Start Date: <input type="date" v-model="form.start_date" required /></label><br/>
      <label>End Date: <input type="date" v-model="form.end_date" /></label><br/>
      <label>Description: <input type="text" v-model="form.description" /></label><br/>
      <label><input type="checkbox" v-model="form.is_not_fixed" /> Not Fixed</label><br/>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { addHoliday } from '../../../hrpay/api/holiday'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  start_date: '',
  end_date: '',
  description: '',
  is_not_fixed: false,
})

const submitForm = async () => {
  await addHoliday(form.value)
  router.push('/holiday')
}
</script>

<template>
  <div class="container">
    <h2>Tambah Payroll Periode</h2>
    <form @submit.prevent="submitPayrollPeriod">
      <label for="periode">Nama Periode:</label>
      <input
        type="text"
        v-model="payroll.periode"
        placeholder="Contoh: Payroll Maret 2025"
        required
        @focus="manualEdit = true"
        @blur="updatePeriode"
      >

      <label for="startDate">Tanggal Mulai:</label>
      <input type="date" v-model="payroll.start_date" required>

      <label for="endDate">Tanggal Selesai:</label>
      <input type="date" v-model="payroll.end_date" required>

      <label for="exchangeRate">Exchange Rate:</label>
      <input type="number" v-model="payroll.exchange_rate" step="0.01" required>

      <label for="payableAccount">Payroll Payable Account:</label>
      <input type="text" v-model="payroll.payroll_payable_account" placeholder="Contoh: Bank Account" required>

      <button type="button" @click="resetPeriode">Reset</button>
      <button type="submit">Submit Payroll</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/payroll'

const emit = defineEmits(['periodeAdded'])
const router = useRouter()

const payroll = ref({
  periode: '',
  start_date: '',
  end_date: '',
  exchange_rate: 1.0,
  payroll_payable_account: 'Bank Account'
})

const manualEdit = ref(false)

const autoPeriode = computed(() => {
  if (payroll.value.start_date) {
    const date = new Date(payroll.value.start_date)
    const month = date.toLocaleString('id-ID', { month: 'long' })
    const year = date.getFullYear()
    return `Payroll ${month} ${year}`
  }
  return ''
})

watch(() => payroll.value.start_date, () => {
  if (!manualEdit.value) payroll.value.periode = autoPeriode.value
})

watch(() => payroll.value.end_date, () => {
  if (!manualEdit.value && !payroll.value.periode) payroll.value.periode = autoPeriode.value
})

const submitPayrollPeriod = async () => {
  try {
    const formattedStartDate = formatDate(payroll.value.start_date)
    const formattedEndDate = formatDate(payroll.value.end_date)

    // Debugging tambahan
    console.log("Payload yang dikirim:", JSON.stringify({
      period_name: payroll.value.periode,
      period_date_start: formattedStartDate,
      period_date_end: formattedEndDate,
      exchange_rate: payroll.value.exchange_rate,
      payroll_payable_account: payroll.value.payroll_payable_account
    }));

    const response = await fetch("http://localhost:8000/api/method/hrpay.api.payroll.submit_payroll_period", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        period_name: payroll.value.periode,
        period_date_start: formattedStartDate,
        period_date_end: formattedEndDate,
        exchange_rate: payroll.value.exchange_rate,
        payroll_payable_account: payroll.value.payroll_payable_account
      })
    })

    const data = await response.json()

    console.log("Response status:", response.status)
    console.log("Response data:", data)

    if (response.ok) {
      alert("Payroll periode berhasil ditambahkan!")
      emit('periodeAdded')
      router.push('/payroll-entry')
    } else {
      throw new Error(data.message || "Gagal menambahkan payroll periode.")
    }
  } catch (error) {
    console.error("Error terjadi:", error)
    alert("Terjadi kesalahan saat submit payroll.")
  }
}

const resetPeriode = () => {
  manualEdit.value = false
  payroll.value.periode = autoPeriode.value
}
</script>

<style>
.container {
  max-width: 400px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
label {
  font-weight: bold;
  display: block;
  margin-top: 10px;
}
input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
}
button:hover {
  background-color: #218838;
}
</style>
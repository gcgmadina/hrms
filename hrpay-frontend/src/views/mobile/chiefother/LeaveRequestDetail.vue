<template>
  <div class="app-container">
    <AppHeader />

    <div class="box">
      <h3>Detail Pengajuan Cuti</h3>

      <table class="izin-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody v-if="leave">
          <tr>
            <td>Nama</td>
            <td>{{ leave.employee_name }}</td>
          </tr>
          <tr>
            <td>Jenis Cuti</td>
            <td>{{ leave.leave_type }}</td>
          </tr>
          <tr>
            <td>Tanggal</td>
            <td>{{ leave.from_date }} s/d {{ leave.to_date }}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <span :class="getStatusClass(leave.docstatus)">
                {{ getStatusText(leave.docstatus) }}
              </span>
            </td>
          </tr>

          <!-- Form Approval hanya muncul jika status masih proses (docstatus 0) -->
          <tr v-if="leave.docstatus === 0">
            <td colspan="2">
              <form @submit.prevent="submitApproval">
                <label>
                  Pilih Status:
                  <select v-model="status">
                    <option value="1">Disetujui</option>
                    <option value="2">Ditolak</option>
                  </select>
                </label>
                <label>
                  Catatan (opsional):
                  <textarea v-model="note" placeholder="Tulis catatan..."></textarea>
                </label>
                <button type="submit" :disabled="loading">
                  {{ loading ? 'Memproses...' : 'Submit' }}
                </button>
              </form>
              <p v-if="message" :class="{ error: isError }">{{ message }}</p>
            </td>
          </tr>

          <!-- Jika sudah disetujui atau ditolak tampilkan catatan -->
          <tr v-else>
            <td>Catatan</td>
            <td>{{ leave.note || '-' }}</td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr><td colspan="2">Loading data...</td></tr>
        </tbody>
      </table>

      <button @click="goBack" class="back-button">Kembali</button>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/mobile/dashboard/layout/Header.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const leave = ref(null)
const status = ref('1') // default approve
const note = ref('')
const loading = ref(false)
const message = ref('')
const isError = ref(false)

const getStatusText = (docstatus) => {
  if (docstatus === 0) return 'Proses'
  if (docstatus === 1) return 'Disetujui'
  if (docstatus === 2) return 'Ditolak'
  return 'Tidak Diketahui'
}

const getStatusClass = (docstatus) => {
  if (docstatus === 0) return 'menunggu'
  if (docstatus === 1) return 'disetujui'
  if (docstatus === 2) return 'ditolak'
  return ''
}

const fetchLeaveDetail = async () => {
  try {
    const res = await fetch(`http://localhost:8000/api/method/hrpay.api.leavereq.get_leave_request_detail?name=${route.params.name}`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Error ${res.status}: ${text}`)
    }

    const data = await res.json()
    leave.value = data.message || null
  } catch (error) {
    console.error('Gagal ambil detail cuti:', error)
    alert('Gagal mengambil data detail. Silakan cek koneksi atau izin user.')
  }
}

const submitApproval = async () => {
  loading.value = true
  message.value = ''
  isError.value = false

  try {
    const res = await fetch('http://localhost:8000/api/method/hrpay.api.leavereq.approve_request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: route.params.name,
        status: parseInt(status.value),
        note: note.value,
      }),
    })

    const data = await res.json()

    if (res.ok && data.message === 'Success') {
      message.value = 'Berhasil memproses pengajuan!'
      // Refresh detail untuk update status
      await fetchLeaveDetail()
    } else {
      isError.value = true
      message.value = data.message || 'Gagal memproses pengajuan.'
    }
  } catch (error) {
    isError.value = true
    message.value = 'Terjadi kesalahan jaringan atau server.'
  } finally {
    loading.value = false
  }
}

const goBack = () => router.back()

onMounted(() => {
  fetchLeaveDetail()
})
</script>

<style scoped>
.app-container {
  font-family: 'Arial', sans-serif;
  background: #f7f7f7;
  min-height: 100vh;
  padding-bottom: 60px;
}

.box {
  margin: 20px 10px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.izin-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
.izin-table th,
.izin-table td {
  padding: 8px;
  font-size: 0.9em;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.izin-table span {
  font-weight: bold;
  text-transform: capitalize;
}
.izin-table .disetujui { color: green; }
.izin-table .menunggu { color: orange; }
.izin-table .ditolak { color: red; }

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}
select, textarea {
  width: 100%;
  padding: 6px;
  font-size: 0.9em;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-top: 4px;
}
textarea {
  min-height: 80px;
  resize: vertical;
}
button {
  margin-top: 12px;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:disabled {
  background: #a0c5f5;
  cursor: not-allowed;
}
.error {
  color: red;
  margin-top: 10px;
}
.back-button {
  margin-top: 15px;
  padding: 8px 15px;
  background: #6c757d;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
.back-button:hover {
  background: #5a6268;
}
</style>

<template>
  <div class="leave-list">
    <h2>Daftar Pengajuan Cuti</h2>
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Tipe Cuti</th>
          <th>Tanggal</th>
          <th>Status</th>
          <th>Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="leave in leaveRequests" :key="leave.name">
          <td>{{ leave.employee_name }}</td>
          <td>{{ leave.leave_type }}</td>
          <td>{{ leave.from_date }} - {{ leave.to_date }}</td>
          <td>
            <span :class="statusClass(leave.status)">
              {{ leave.status }}
            </span>
          </td>
          <td>{{ leave.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { createResource } from 'frappe-ui'

const leaveRequests = ref([])

const leaveRequestResource = createResource({
  url: 'hrpay.api.leave.get_leave_requests', // ganti sesuai endpoint kamu
  auto: true,
  method: 'GET',
  transform(data) {
    leaveRequests.value = data
  }
})

export default {
  setup() {
    onMounted(() => leaveRequestResource.fetch())
    return {
      leaveRequests,
      statusClass(status) {
        if (status === 'Approved') return 'approved'
        if (status === 'Rejected') return 'rejected'
        return 'pending'
      }
    }
  }
}
</script>

<style scoped>
.leave-list {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.approved {
  color: green;
}
.rejected {
  color: red;
}
.pending {
  color: orange;
}
</style>

<template>
  <div class="salary-slip-requests">
    <!-- Button Back di Pojok Kiri -->
    <button class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i> Back
    </button>

    <h1>Salary Slip Requests</h1>

    <!-- Filter Sorting -->
    <div class="filters">
      <label for="period">Periode:</label>
      <select id="period" v-model="selectedPeriod" @change="filterRequests">
        <option value="">Semua</option>
        <option v-for="period in periods" :key="period.name" :value="period.name">
          {{ period.name }}
        </option>
      </select>

      <label for="status">Status:</label>
      <select id="status" v-model="selectedStatus" @change="filterRequests">
        <option value="">Semua</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
        <option value="Pending">Pending</option>
      </select>
    </div>

    <!-- Daftar Salary Slip Requests -->
    <div v-if="filteredRequests.length">
      <table>
        <thead>
          <tr>
            <th>Nama Karyawan</th>
            <th>Periode</th>
            <th>Status</th>
            <th>Tanggal Request</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in filteredRequests" :key="request.name">
            <td>{{ request.employee_name }}</td>
            <td>{{ request.period }}</td>
            <td :class="statusClass(request.status)">{{ request.status }}</td>
            <td>{{ formatDate(request.request_date) }}</td>
            <td>
              <button @click="viewRequestDetails(request)">Lihat Detail</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Jika Tidak Ada Data -->
    <div v-else>
      <p>Tidak ada permintaan cetak slip gaji.</p>
    </div>

    <!-- Pop-up Detail Request -->
    <div v-if="selectedRequest" class="popup">
      <div class="popup-content">
        <h2>Detail Request - {{ selectedRequest.employee_name }}</h2>
        <p><strong>Periode:</strong> {{ selectedRequest.period }}</p>
        <p><strong>Status:</strong> <span :class="statusClass(selectedRequest.status)">{{ selectedRequest.status }}</span></p>
        <p><strong>Tanggal Request:</strong> {{ formatDate(selectedRequest.request_date) }}</p>
        <p><strong>Keperluan:</strong> {{ selectedRequest.purpose }}</p>
        <p><strong>Alasan:</strong> {{ selectedRequest.reason }}</p>

        <h3>Lampiran:</h3>
        <p v-if="selectedRequest.attachment">
          <a :href="selectedRequest.attachment" target="_blank">Lihat Lampiran</a>
        </p>
        <p v-else>Tidak ada lampiran</p>

        <button @click="updateStatus(selectedRequest, 'Accepted')">Accept</button>
        <button @click="updateStatus(selectedRequest, 'Rejected')">Reject</button>
        <button @click="closeRequestDetails">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requests: [], // Data Salary Slip Requests dari ERPNext
      filteredRequests: [], // Data yang sudah difilter
      periods: [], // Data Periode dari ERPNext
      selectedPeriod: "", // Filter berdasarkan periode
      selectedStatus: "", // Filter berdasarkan status
      selectedRequest: null // Request yang dipilih untuk detail
    };
  },
  computed: {
    statusClass() {
      return status => {
        return {
          "status-accepted": status === "Accepted",
          "status-rejected": status === "Rejected",
          "status-pending": status === "Pending"
        };
      };
    }
  },
  methods: {
    goBack() {
      this.$router.push("/salary-slip"); // Kembali ke halaman Salary Slip
    },
    async fetchRequests() {
      try {
        const response = await fetch("https://your-frappe-instance/api/resource/Salary Slip Request");
        const result = await response.json();
        this.requests = result.data;
        this.filteredRequests = this.requests; // Default tanpa filter
      } catch (error) {
        console.error("Error fetching salary slip requests:", error);
      }
    },
    async fetchPeriods() {
      try {
        const response = await fetch("https://your-frappe-instance/api/resource/Payroll Period");
        const result = await response.json();
        this.periods = result.data;
      } catch (error) {
        console.error("Error fetching periods:", error);
      }
    },
    filterRequests() {
      this.filteredRequests = this.requests.filter(request => {
        return (
          (!this.selectedPeriod || request.period === this.selectedPeriod) &&
          (!this.selectedStatus || request.status === this.selectedStatus)
        );
      });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    viewRequestDetails(request) {
      this.selectedRequest = request;
    },
    closeRequestDetails() {
      this.selectedRequest = null;
    },
    async updateStatus(request, status) {
      try {
        const response = await fetch(`https://localhost:8000/api/resource/Salary%20Slip%20Request/${request.name}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`
          },
          body: JSON.stringify({ status })
        });

        const result = await response.json();
        if (response.ok) {
          alert(`Request ${status} berhasil!`);
          request.status = status; // Update status di UI
          this.closeRequestDetails();
        } else {
          alert("Gagal mengupdate status: " + result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengupdate status.");
      }
    }
  },
  mounted() {
    this.fetchRequests();
    this.fetchPeriods();
  }
};
</script>

<style scoped>
.salary-slip-requests {
  max-width: 800px;
  margin: auto;
  font-family: sans-serif;
  position: relative;
}
.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #4CAF50;
}
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
table, th, td {
  border: 1px solid #ccc;
}
th, td {
  padding: 8px;
  text-align: left;
}
.status-accepted {
  color: green;
  font-weight: bold;
}
.status-rejected {
  color: red;
  font-weight: bold;
}
.status-pending {
  color: orange;
  font-weight: bold;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
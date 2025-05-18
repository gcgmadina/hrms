<template>
  <div class="leave-requests">
    <!-- Button Back di Pojok Kiri -->
    <button class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i> Back
    </button>

    <h1>Daftar Pengajuan Cuti</h1>

    <!-- Filter Sorting -->
    <div class="filters">
      <label for="status">Status:</label>
      <select id="status" v-model="selectedStatus" @change="filterRequests">
        <option value="">Semua</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
        <option value="Pending">Pending</option>
      </select>
    </div>

    <!-- Daftar Leave Requests -->
    <div v-if="filteredRequests.length">
      <table>
        <thead>
          <tr>
            <th>Nama Karyawan</th>
            <th>Jenis Cuti</th>
            <th>Periode</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in filteredRequests" :key="request.name">
            <td>{{ request.employee_name }}</td>
            <td>{{ request.leave_type }}</td>
            <td>{{ request.from_date }} - {{ request.to_date }}</td>
            <td :class="statusClass(request.status)">{{ request.status }}</td>
            <td>
              <button @click="viewRequestDetails(request)">Lihat Detail</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Jika Tidak Ada Data -->
    <div v-else>
      <p>Tidak ada pengajuan cuti.</p>
    </div>

    <!-- Pop-up Detail Request -->
    <div v-if="selectedRequest" class="popup">
      <div class="popup-content">
        <h2>Detail Pengajuan - {{ selectedRequest.employee_name }}</h2>
        <p><strong>Jenis Cuti:</strong> {{ selectedRequest.leave_type }}</p>
        <p><strong>Periode:</strong> {{ selectedRequest.from_date }} - {{ selectedRequest.to_date }}</p>
        <p><strong>Status:</strong> <span :class="statusClass(selectedRequest.status)">{{ selectedRequest.status }}</span></p>
        <p><strong>Deskripsi:</strong> {{ selectedRequest.description }}</p>

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
      requests: [], // Data Leave Requests dari ERPNext
      filteredRequests: [], // Data yang sudah difilter
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
      this.$router.push("/dashboard"); // Kembali ke halaman utama
    },
    async fetchRequests() {
      try {
        const response = await fetch("https://localhost:8000/api/resource/Leave%20Request");
        const result = await response.json();
        this.requests = result.data;
        this.filteredRequests = this.requests; // Default tanpa filter
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    },
    filterRequests() {
      this.filteredRequests = this.requests.filter(request => {
        return !this.selectedStatus || request.status === this.selectedStatus;
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
        const response = await fetch(`https://localhost:8000/api/resource/Leave%20Request/${request.name}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`
          },
          body: JSON.stringify({ status })
        });

        const result = await response.json();
        if (response.ok) {
          alert(`Pengajuan ${status} berhasil!`);
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
  }
};
</script>

<style scoped>
.leave-requests {
  max-width: 100%;
  margin: auto;
  font-family: "Inter", sans-serif;
  padding: 20px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #007bff;
  transition: 0.3s ease-in-out;
}

.back-button:hover {
  color: #909dac;
}

.filters {
  display: flex;
  align-items: center;
  gap: 15px;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
}

select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background: #e3e3e3;
  font-weight: 600;
}

td {
  font-size: 14px;
}

.status-accepted {
  color: #2E7D32;
  background: #C8E6C9;
  padding: 6px 10px;
  border-radius: 15px;
  display: inline-block;
  font-weight: bold;
}

.status-rejected {
  color: #C62828;
  background: #FFCDD2;
  padding: 6px 10px;
  border-radius: 15px;
  display: inline-block;
  font-weight: bold;
}

.status-pending {
  color: #F57C00;
  background: #FFE0B2;
  padding: 6px 10px;
  border-radius: 15px;
  display: inline-block;
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
  border-radius: 10px;
  width: 450px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

button {
  background-color: #007bff;
  color: #007bff;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #909dac;
}
</style>
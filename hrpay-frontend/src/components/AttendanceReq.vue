<!-- untuk WFO dan WFA -->
<template>
  <div class="attendance-request">
    <div class="button-group">
      <button @click="goBack" class="btn-back">← Back</button>
    </div>

    <div class="card">
      <h2>Daftar Permintaan WFH/WFA</h2>

      <table>
        <thead>
          <tr>
            <th>Nama Karyawan</th>
            <th>Tanggal</th>
            <th>Jenis Request</th>
            <th>Alasan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in requests" :key="request.name">
            <td>{{ request.employee_name }}</td>
            <td>{{ request.date }}</td>
            <td>{{ request.request_type }}</td>
            <td>{{ request.reason }}</td>
            <td>{{ request.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requests: [],
    };
  },
  methods: {
    async fetchRequests() {
      try {
        const response = await fetch("http://localhost:8000/api/resource/Attendance%20Request", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.requests = data.data;
      } catch (error) {
        console.error("Error fetching attendance requests:", error);
      }
    },
        goBack() {
        this.$router.push("/attendance");
    },
  },
  mounted() {
    this.fetchRequests();
  },
};
</script>

<style scoped>
.attendance-request {
  max-width: 100%;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.button-group {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.btn-back {
  background-color: #9e9e9e;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}
</style>

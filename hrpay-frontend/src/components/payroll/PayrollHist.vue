<template>
  <div class="payroll-history">
    <!-- Button Back di Pojok Kiri -->
    <button class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i> Back
    </button>

    <h1>Riwayat Payroll</h1>

    <!-- Filter Periode -->
    <div class="filters">
      <label for="period">Periode:</label>
      <select id="period" v-model="selectedPeriod" @change="filterPayrolls">
        <option value="">Semua</option>
        <option v-for="period in periods" :key="period.name" :value="period.name">
          {{ period.name }}
        </option>
      </select>
    </div>

    <!-- Daftar Payroll -->
    <div v-if="filteredPayrolls.length">
      <table>
        <thead>
          <tr>
            <th>Periode</th>
            <th>Total Payroll</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payroll in filteredPayrolls" :key="payroll.name">
            <td>{{ payroll.period }}</td>
            <td>{{ formattedCurrency(payroll.total_amount) }}</td>
            <td :class="statusClass(payroll.status)">{{ payroll.status }}</td>
            <td>
              <button @click="viewPayrollDetails(payroll)">Lihat Detail</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Jika Tidak Ada Data -->
    <div v-else>
      <p>Tidak ada riwayat payroll untuk periode ini.</p>
    </div>

    <!-- Pop-up Detail Payroll -->
    <div v-if="selectedPayroll" class="popup">
      <div class="popup-content">
        <h2>Detail Payroll - {{ selectedPayroll.period }}</h2>
        <p><strong>Total Payroll:</strong> {{ formattedCurrency(selectedPayroll.total_amount) }}</p>
        <p><strong>Status:</strong> <span :class="statusClass(selectedPayroll.status)">{{ selectedPayroll.status }}</span></p>

        <h3>Daftar Karyawan</h3>
        <table>
          <thead>
            <tr>
              <th>Nama Karyawan</th>
              <th>Gaji Pokok</th>
              <th>Total Pendapatan</th>
              <th>Total Pemotongan</th>
              <th>Gaji Bersih</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in selectedPayroll.employees" :key="employee.name">
              <td>{{ employee.name }}</td>
              <td>{{ formattedCurrency(employee.base_salary) }}</td>
              <td>{{ formattedCurrency(employee.total_earnings) }}</td>
              <td>{{ formattedCurrency(employee.total_deductions) }}</td>
              <td>{{ formattedCurrency(employee.net_salary) }}</td>
            </tr>
          </tbody>
        </table>

        <button @click="closePayrollDetails">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payrolls: [], // Data Payroll dari ERPNext
      filteredPayrolls: [], // Data yang sudah difilter
      periods: [], // Data Periode dari ERPNext
      selectedPeriod: "", // Filter berdasarkan periode
      selectedPayroll: null // Payroll yang dipilih untuk detail
    };
  },
  computed: {
    statusClass() {
      return status => {
        return {
          "status-posted": status === "Posted",
          "status-draft": status === "Draft",
          "status-cancelled": status === "Cancelled"
        };
      };
    },
    formattedCurrency() {
      return amount => new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    }
  },
  methods: {
    goBack() {
      this.$router.push("/payroll"); // Kembali ke halaman Payroll
    },
    async fetchPayrolls() {
      try {
        const response = await fetch("https://localhost:8000/api/resource/Payroll%20Entry");
        const result = await response.json();
        this.payrolls = result.data;
        this.filteredPayrolls = this.payrolls; // Default tanpa filter
      } catch (error) {
        console.error("Error fetching payrolls:", error);
      }
    },
    async fetchPeriods() {
      try {
        const response = await fetch("https:/localhost:8000/api/resource/Payroll%20Periode");
        const result = await response.json();
        this.periods = result.data;
      } catch (error) {
        console.error("Error fetching periods:", error);
      }
    },
    filterPayrolls() {
      this.filteredPayrolls = this.payrolls.filter(payroll => {
        return !this.selectedPeriod || payroll.period === this.selectedPeriod;
      });
    },
    viewPayrollDetails(payroll) {
      this.selectedPayroll = payroll;
    },
    closePayrollDetails() {
      this.selectedPayroll = null;
    }
  },
  mounted() {
    this.fetchPayrolls();
    this.fetchPeriods();
  }
};
</script>

<style scoped>
.payroll-history {
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
.status-posted {
  color: green;
  font-weight: bold;
}
.status-draft {
  color: orange;
  font-weight: bold;
}
.status-cancelled {
  color: red;
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
  width: 500px;
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
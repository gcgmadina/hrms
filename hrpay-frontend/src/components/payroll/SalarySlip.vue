<template>
  <div class="salary-slip">
    <!-- Button Back di Pojok Kiri -->
    <button class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i> Back
    </button>

    <h1>Salary Slip</h1>

    <!-- Daftar Salary Slips -->
    <div v-if="salarySlips.length">
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Period</th>
            <th>Net</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="slip in salarySlips" :key="slip.name">
            <td>{{ slip.employee_name }}</td>
            <td>{{ slip.period }}</td>
            <td>{{ formattedCurrency(slip.net_salary) }}</td>
            <td>
              <button @click="viewSlipDetails(slip)">See Details..</button>
              <button @click="requestPrint(slip)">Request</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pop-up Detail Salary Slip -->
    <div v-if="selectedSalarySlip" class="popup">
      <div class="popup-content">
        <h2>Detail - {{ selectedSalarySlip.employee_name }}</h2>
        <p><strong>Period:</strong> {{ selectedSalarySlip.period }}</p>
        <p><strong>Net:</strong> {{ formattedCurrency(selectedSalarySlip.net_salary) }}</p>

        <h3>Earning Details</h3>
        <ul>
          <li v-for="earning in selectedSalarySlip.earnings" :key="earning.name">
            {{ earning.name }} - {{ formattedCurrency(earning.amount) }}
          </li>
        </ul>

        <h3>Rincian Pemotongan</h3>
        <ul>
          <li v-for="deduction in selectedSalarySlip.deductions" :key="deduction.name">
            {{ deduction.name }} - {{ formattedCurrency(deduction.amount) }}
          </li>
        </ul>

        <button @click="closeSlipDetails">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      salarySlips: [], // Data Salary Slips dari ERPNext
      selectedSalarySlip: null // Slip gaji yang dipilih untuk detail
    };
  },
  computed: {
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
    async fetchSalarySlips() {
      try {
        const response = await fetch("https://localhost:8000/api/resource/Salary Slip");
        const result = await response.json();
        this.salarySlips = result.data;
      } catch (error) {
        console.error("Error fetching salary slips:", error);
      }
    },
    viewSlipDetails(slip) {
      this.selectedSalarySlip = slip;
    },
    closeSlipDetails() {
      this.selectedSalarySlip = null;
    },
    requestPrint(slip) {
      this.$router.push(`/salary-print-request/${slip.name}`); // Navigasi ke halaman form SalaryPrintReq.vue
    }
  },
  mounted() {
    this.fetchSalarySlips();
  }
};
</script>

<style scoped>
.salary-slip {
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
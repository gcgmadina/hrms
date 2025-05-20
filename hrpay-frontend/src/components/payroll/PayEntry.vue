<template>
  <div class="payroll-entry">
    <h1>Payroll Entry</h1>

    <!-- Pilih Payroll Period -->
    <div class="form-group">
      <label for="periode">Payroll Period:</label>
      <select id="periode" v-model="selectedPayrollPeriod">
        <option v-for="period in payrollPeriods" :key="period.name" :value="period.name">
          {{ period.name }}
        </option>
      </select>
    </div>

    <!-- Pilih Daftar Karyawan -->
    <div class="form-group">
      <label>Pilih Karyawan:</label>
      <table>
        <thead>
          <tr>
            <th>Pilih</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Gaji Pokok</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.name">
            <td>
              <input type="checkbox" v-model="selectedEmployees" :value="employee.name" />
            </td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.position }}</td>
            <td>{{ formattedSalary(employee.salary) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pilih Chart of Account -->
    <div class="form-group">
      <label for="chartOfAccount">Chart of Account:</label>
      <select id="chartOfAccount" v-model="selectedChartOfAccount">
        <option v-for="account in chartOfAccounts" :key="account.name" :value="account.name">
          {{ account.name }}
        </option>
      </select>
    </div>

    <!-- Tombol SAVE dan SUBMIT -->
    <div class="button-group">
      <button @click="saveDraft">SAVE (DRAFT)</button>
      <button @click="submitPayroll">SUBMIT (POST)</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payrollPeriods: [], // Data Payroll Period dari ERPNext
      employees: [], // Data Karyawan dari ERPNext
      chartOfAccounts: [], // Data Chart of Account dari ERPNext
      selectedPayrollPeriod: "", // Payroll Period yang dipilih
      selectedEmployees: [], // Daftar karyawan yang dipilih
      selectedChartOfAccount: "" // Chart of Account yang dipilih
    };
  },
  computed: {
    formattedSalary() {
      return salary => new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(salary);
    }
  },
  methods: {
    async fetchPayrollPeriods() {
      try {
        const response = await fetch("https://localhost:8000/api/resource/Payroll%20Periode");
        const result = await response.json();
        this.payrollPeriods = result.data;
      } catch (error) {
        console.error("Error fetching payroll periods:", error);
      }
    },
    async fetchEmployees() {
      try {
        const response = await fetch("https://localhost:8000/api/resource/Employee%20ID");
        const result = await response.json();
        this.employees = result.data;
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },
    async fetchChartOfAccounts() {
      try {
        const response = await fetch("https://localhost:8000/api/resource/Chart%20of%20Account");
        const result = await response.json();
        this.chartOfAccounts = result.data;
      } catch (error) {
        console.error("Error fetching chart of accounts:", error);
      }
    },
    async saveDraft() {
      try {
        const payrollEntryData = {
          payroll_period: this.selectedPayrollPeriod,
          employees: this.selectedEmployees,
          chart_of_account: this.selectedChartOfAccount,
          status: "Draft"
        };

        const response = await fetch("https://localhost:8000/api/resource/Payroll%20Entry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`
          },
          credentials: 'include',
          body: JSON.stringify(payrollEntryData)
        });

        const result = await response.json();
        if (response.ok) {
          alert("Payroll Entry berhasil disimpan sebagai DRAFT!");
          console.log(result);
        } else {
          alert("Gagal menyimpan Payroll Entry: " + result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat menyimpan Payroll Entry.");
      }
    },
    async submitPayroll() {
      try {
        const payrollEntryData = {
          payroll_period: this.selectedPayrollPeriod,
          employees: this.selectedEmployees,
          chart_of_account: this.selectedChartOfAccount,
          status: "Posted"
        };

        const response = await fetch("https://localhost:8000/api/resource/Payroll%20Entry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`
          },
          credentials: 'include',
          body: JSON.stringify(payrollEntryData)
        });

        const result = await response.json();
        if (response.ok) {
          alert("Payroll Entry berhasil di-POST dan Slip Gaji dibuat!");
          console.log(result);
        } else {
          alert("Gagal memproses Payroll Entry: " + result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat memproses Payroll Entry.");
      }
    }
  },
  mounted() {
    this.fetchPayrollPeriods();
    this.fetchEmployees();
    this.fetchChartOfAccounts();
  }
};
</script>

<style scoped>
.payroll-entry {
  max-width: 600px;
  margin: auto;
  font-family: sans-serif;
}
.form-group {
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
input[type="checkbox"], select {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}
.button-group {
  display: flex;
  gap: 10px;
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
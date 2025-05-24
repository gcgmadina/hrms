<template>
  <div class="payroll-entry">
    <button
      @click="$emit('goBack')"
      class="mb-4 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 font-semibold rounded-xl shadow"
      > Kembali
    </button>

    <h1>Payroll Entry</h1>

    <!-- Pilih Payroll Period -->
    <div class="form-group">
      <label for="periode">Payroll Period:</label>
      <select id="periode" v-model="selectedPayrollPeriods">
        <option v-for="periode in payrollPeriods" :key="periode.period_name" :value="periode.period_name">
          {{ periode.period_name }}
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
          <tr v-for="employee in employees" :key="employee.full_name ">
            <td>
              <input type="checkbox" v-model="selectedEmployees" :value="employee.full_name " />
            </td>
            <td>{{ employee.department }}</td>
            <td>{{ employee.job_position }}</td>
            <td>{{ formattedSalary(employee.cost_to_company) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pilih Chart of Account -->
    <!-- <div class="form-group">
      <label for="chartOfAccount">Chart of Account:</label>
      <select id="chartOfAccount" v-model="selectedChartOfAccount">
        <option v-for="account in chartOfAccounts" :key="account.name" :value="account.name">
          {{ account.name }}
        </option>
      </select>
    </div> -->

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
        const fields = encodeURIComponent('["period_name","period_date_end","period_date_start"]');
        const url = `/api/resource/Payroll%20Periode?fields=${fields}`;
        const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
        const result = await response.json();
        this.payrollPeriods = result.data;
      } catch (error) {
        console.error("Error fetching payroll periods:", error);
      }
    },
    async fetchEmployees() {
  try {
    const fields = encodeURIComponent('["full_name","department","job_position","cost_to_company"]');
    const url = `/api/resource/Employee%20ID?fields=${fields}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) throw new Error("Gagal mengambil data karyawan");

    const result = await response.json();
    this.employees = result.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
},
    async fetchChartOfAccounts() {
      try {
        const response = await fetch("api/resource/Chart%20of%20Account");
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

        const response = await fetch("api/resource/Payroll%20Entry", {
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

        const response = await fetch("api/resource/Payroll%20Entry", {
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
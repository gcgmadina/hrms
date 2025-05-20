<template>
  <div class="container">
    <h2>Riwayat Payroll Periode</h2>
    <PayPeriodeForm @periodeAdded="fetchPayrollPeriods" />

    <table>
      <thead>
        <tr>
          <th>Nama Periode</th>
          <th>Tanggal Mulai</th>
          <th>Tanggal Akhir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="periode in payrollPeriods" :key="periode.name">
          <td>{{ periode.period_name }}</td>
          <td>{{ periode.period_date_start }}</td>
          <td>{{ periode.period_date_end }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PayPeriodeForm from "./PayPeriodeForm.vue";

export default {
  components: {
    PayPeriodeForm
  },
  data() {
    return {
      payrollPeriods: []
    };
  },
  methods: {
    async fetchPayrollPeriods() {
      const username = "your_username";
      const password = "your_password";
      const basicAuth = btoa(`${username}:${password}`);

      try {
        const response = await fetch("https://localhost:8000/api/resource/Payroll%20Periode", {
          method: "GET",
          headers: {
            
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data payroll periode!");
        }

        const data = await response.json();
        this.payrollPeriods = data.data; // Simpan data ke state
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      }
    }
  },
  mounted() {
    this.fetchPayrollPeriods(); // Ambil data saat komponen dimuat
  }
};
</script>

<style>
.container {
  max-width: 600px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
</style>
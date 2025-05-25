<template>
  <div class="container">
    <button
      @click="$emit('goBack')"
      class="mb-4 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 font-semibold rounded-xl shadow"
      >
    </button>

    <h2>Payroll Period History</h2>
    <table>
      <thead>
        <tr>
          <th>Period Name</th>
          <th>Start Date</th>
          <th>End Date</th>
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
// import PayPeriodeForm from "./PayPeriodeForm.vue";


export default {
  // components: {
  //   PayPeriodeForm
  // },
  data() {
    return {
      payrollPeriods: []
    };
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

    if (!response.ok) throw new Error("Error fetching periods!");

    const data = await response.json();
    this.payrollPeriods = data.data;
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
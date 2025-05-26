<template>
  <div class="container">
  <h2 class="text-xl font-bold mb-4">Payroll Period History</h2>
  
  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th>Period Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="periode in payrollPeriods" :key="periode.name">
          <td>{{ periode.period_name }}</td>
          <td>{{ periode.period_date_start }}</td>
          <td>{{ periode.period_date_end }}</td>
        <td class="px-4 py-2">
          <router-link
            v-if="!periode.is_processed"
            :to="{ path: '/payroll-entry', query: { period: periode.name } }"
            class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Create Payroll
          </router-link>
          <span v-else class="text-green-600 font-semibold">Processed</span>
        </td>
        </tr>
      </tbody>
    </table>
    </div>
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
.action-link {
    color: #0084ff;
    text-decoration: none;
    font-weight: 500;
}

.action-link:hover {
    text-decoration: underline;
}
</style>
<template>
  <div class="container">
    <h2>Riwayat Salary Component</h2>
    <button @click="goToAddForm">➕ Add New</button>
    <SalaryComponentForm @componentAdded="fetchSalaryComponents" />

    <table>
      <thead>
        <tr>
          <th>Nama Komponen</th>
          <th>Jenis</th>
          <th>Jumlah</th>
          <th>Persentase?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="component in salaryComponents" :key="component.name">
          <td>{{ component.component_name }}</td>
          <td>{{ component.component_type }}</td>
          <td>{{ component.amount }}</td>
          <td>{{ component.is_percentage ? '✅' : '❌' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SalaryComponentForm from "./SalaryCompForm.vue";

export default {
  components: {
    SalaryComponentForm
  },
  data() {
    return {
      salaryComponents: []
    };
  },
  methods: {
    async fetchSalaryComponents() {
      const username = "your_username";
      const password = "your_password";
      const basicAuth = btoa(`${username}:${password}`);

      try {
        const response = await fetch("https://localhost:8000/api/resource/Salary%20Component%20ID", {
          method: "GET",
          headers: {
            "Authorization": `Basic ${basicAuth}`
          }
        }); //API

        if (!response.ok) {
          throw new Error("Gagal mengambil data salary component!");
        }

        const data = await response.json();
        this.salaryComponents = data.data; // Simpan data ke state
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      }
    },
    goToAddForm() {
      this.$router.push("/add-salary-component"); // Navigasi ke form
    }
  },
  mounted() {
    this.fetchSalaryComponents(); // Ambil data saat komponen dimuat
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
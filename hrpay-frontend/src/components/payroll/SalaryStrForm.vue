<template>
  <div class="container">
    <h2>Create Salary Structure</h2>
    <form @submit.prevent="submitSalaryStructure">
      <label for="name">Structure Name:</label>
      <input type="text" v-model="salaryStructure.name" placeholder="E.g: Intern" required>

      <label for="component">Component:</label>
      <select v-model="salaryStructure.component" required>
        <option v-for="component in components" :key="component.name" :value="component.name">
          {{ component.component_name }}
        </option>
      </select>

      <label for="basicSalary">Base:</label>
      <input type="number" v-model="salaryStructure.basicSalary" placeholder="nominal" required>

      <button type="submit">SAVE (Draft)</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      salaryStructure: {
        name: "",
        component: "",
        basicSalary: 0,
        status: "Draft" // Default status
      },
      components: [] // Daftar komponen gaji dari ERPNext
    };
  },
  methods: {
    async fetchSalaryComponents() {
      const username = "your_username";
      const password = "your_password";
      const basicAuth = btoa(`${username}:${password}`);

      try {
        const response = await fetch("https://localhost:8000/api/resource/Salary%20Component", {
          method: "GET",
          headers: {
            "Authorization": `Basic ${basicAuth}`
          }
        });

        if (!response.ok) {
          throw new Error("Error fetching salary component!");
        }

        const data = await response.json();
        this.components = data.data; // Simpan daftar komponen gaji
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      }
    },

    async submitSalaryStructure() {
      // Validasi input
      if (!this.salaryStructure.name || !this.salaryStructure.component || this.salaryStructure.basicSalary <= 0) {
        alert("Fill the required field!");
        return;
      }

      const username = "your_username";
      const password = "your_password";
      const basicAuth = btoa(`${username}:${password}`);

      try {
        const response = await fetch("https://localhost:8000/api/resource/Salary%20Structure", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`
          },
          body: JSON.stringify({
            structure_name: this.salaryStructure.name,
            salary_component: this.salaryStructure.component,
            basic_salary: this.salaryStructure.basicSalary,
            status: "Draft" // Simpan sebagai Draft
          })
        });

        if (!response.ok) {
          throw new Error("Failed!");
        }

        const data = await response.json();
        alert(`Salary Structure "${this.salaryStructure.name}" saved as Draft!`);
        console.log(data);

        // Reset form setelah submit
        this.salaryStructure.name = "";
        this.salaryStructure.component = "";
        this.salaryStructure.basicSalary = 0;
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      }
    }
  },
  mounted() {
    this.fetchSalaryComponents(); // Ambil daftar komponen saat halaman dimuat
  }
};
</script>
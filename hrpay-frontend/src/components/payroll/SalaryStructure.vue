<template>
  <div class="salary-structure">
    <h1>Salary Structure Form</h1>

    <!-- Tabel Salary Components -->
    <div class="form-group">
      <label>Salary Components:</label>
      <table>
        <thead>
          <tr>
            <th>Nama Komponen</th>
            <th>Nominal</th>
            <th>Persentase</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(component, index) in salaryComponents" :key="index">
            <td>
              <input type="text" v-model="component.name" placeholder="Nama Komponen" readonly />
            </td>
            <td>
              <input type="number" v-model.number="component.amount" @change="confirmEdit(index)" />
            </td>
            <td>
              <input type="number" v-model.number="component.percentage" @input="calculateAmount(index)" />
            </td>
            <td>
              <button type="button" @click="removeComponent(index)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" @click="addComponent">Tambah Komponen</button>
    </div>

    <!-- Tombol Simpan -->
    <button type="submit" @click="submitSalaryStructure">Simpan Salary Structure</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      salaryComponents: [], // Daftar komponen gaji
      defaultSalaryComponents: [] // Menyimpan nilai default dari Salary Component
    };
  },
  methods: {
    async fetchSalaryComponents() {
      try {
        const response = await fetch("https://your-frappe-instance/api/resource/Salary%20Component%20ID");
        const result = await response.json();
        this.salaryComponents = result.data.map(component => ({
          name: component.name,
          amount: component.amount,
          percentage: component.percentage || 0
        }));
        this.defaultSalaryComponents = JSON.parse(JSON.stringify(this.salaryComponents)); // Simpan nilai default
      } catch (error) {
        console.error("Error fetching salary components:", error);
      }
    },
    addComponent() {
      this.salaryComponents.push({ name: "", amount: 0, percentage: 0 });
    },
    removeComponent(index) {
      this.salaryComponents.splice(index, 1);
    },
    calculateAmount(index) {
      if (this.salaryComponents[index].percentage) {
        this.salaryComponents[index].amount = (this.salaryComponents[index].percentage / 100) * this.employeeCTC;
      }
    },
    confirmEdit(index) {
      if (!confirm("Apakah Anda yakin ingin mengubah nominal ini?")) {
        this.salaryComponents[index].amount = this.defaultSalaryComponents[index].amount;
      }
    },
    async submitSalaryStructure() {
      try {
        const salaryStructureData = {
          salary_components: this.salaryComponents
        };

        const response = await fetch("https://localhost:8000/api/resource/Salary%20Structure", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`
          },
          body: JSON.stringify(salaryStructureData)
        });

        const result = await response.json();
        if (response.ok) {
          alert("Salary Structure berhasil disimpan!");
          console.log(result);
        } else {
          alert("Gagal menyimpan Salary Structure: " + result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat menyimpan Salary Structure.");
      }
    }
  },
  mounted() {
    this.fetchSalaryComponents();
  }
};
</script>

<style scoped>
.salary-structure {
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
input[type="text"], input[type="number"] {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
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

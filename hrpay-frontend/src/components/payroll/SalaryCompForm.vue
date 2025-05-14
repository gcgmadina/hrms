<template>
  <div class="container">
    <h2>Tambah Salary Component</h2>
    <form @submit.prevent="submitSalaryComponent">
      <label for="name">Nama Komponen:</label>
      <input type="text" v-model="salaryComponent.name" placeholder="Contoh: Tunjangan Transport" required>

      <label for="type">Jenis Komponen:</label>
      <select v-model="salaryComponent.type" required>
        <option value="Earning">Earning</option>
        <option value="Deduction">Deduction</option>
        <option value="Incentive">Incentive</option>
        <option value="Bonus">Bonus</option>
      </select>

      <label for="amount">Jumlah:</label>
      <input type="number" v-model="salaryComponent.amount" placeholder="Masukkan nominal atau persen" required>

      <label>
        <input type="checkbox" v-model="salaryComponent.isPercentage"> Is Percentage?
      </label>

      <button type="submit">SAVE</button>
      <button type="button" @click="goBack">🔙 Back</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      salaryComponent: {
        name: "",
        type: "Earning",
        amount: 0,
        isPercentage: false
      }
    };
  },
  methods: {
    async submitSalaryComponent() {
      const username = "your_username";
      const password = "your_password";
      const basicAuth = btoa(`${username}:${password}`);

      try {
        const response = await fetch("https://localhost:8000/api/resource/Salary%20Component%20ID", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`
          },
          body: JSON.stringify({
            component_name: this.salaryComponent.name,
            component_type: this.salaryComponent.type,
            amount: this.salaryComponent.amount,
            is_percentage: this.salaryComponent.isPercentage
          })
        });

        if (!response.ok) {
          throw new Error("Gagal menambahkan salary component!");
        }

        const data = await response.json();
        alert(`Salary Component "${this.salaryComponent.name}" berhasil ditambahkan!`);
        this.$emit("componentAdded"); // Emit event ke parent untuk refresh data

        // Reset form
        this.salaryComponent.name = "";
        this.salaryComponent.type = "Earning";
        this.salaryComponent.amount = 0;
        this.salaryComponent.isPercentage = false;
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      }
    },
    goBack() {
      this.$router.push("/salary-components"); // Kembali ke daftar salary component
    }
  }
};
</script>

<style>
.container {
  max-width: 400px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
label {
  font-weight: bold;
  display: block;
  margin-top: 10px;
}
input, select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
}
button:hover {
  background-color: #218838;
}
</style>
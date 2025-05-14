<template>
  <div class="container">
    <h2>Tambah Payroll Periode</h2>
    <form @submit.prevent="submitPayroll">
      <label for="periode">Nama Periode:</label>
      <input type="text" v-model="payroll.periode" placeholder="Contoh: Payroll Maret 2025" required>

      <label for="startDate">Tanggal Mulai:</label>
      <input type="date" v-model="payroll.startDate" required>

      <label for="endDate">Tanggal Akhir:</label>
      <input type="date" v-model="payroll.endDate" required>

      <button type="submit">Simpan Periode</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payroll: {
        periode: "",
        startDate: "",
        endDate: ""
      }
    };
  },
  methods: {
    async submitPayroll() {
      // Validasi tanggal
      if (new Date(this.payroll.startDate) > new Date(this.payroll.endDate)) {
        alert("Tanggal mulai tidak boleh lebih besar dari tanggal akhir!");
        return;
      }

      try {
        const response = await fetch("https://localhost:8000/api/resource/Payroll%20Periode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`
          },
          body: JSON.stringify({
            payroll_period_name: this.payroll.periode,
            start_date: this.payroll.startDate,
            end_date: this.payroll.endDate
          })
        });

        if (!response.ok) {
          throw new Error("Gagal menambahkan payroll periode!");
        }

        const data = await response.json();
        alert(`Payroll Periode "${this.payroll.periode}" berhasil ditambahkan!`);
        console.log(data);

        // Reset form
        this.payroll.periode = "";
        this.payroll.startDate = "";
        this.payroll.endDate = "";
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      }
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
input {
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
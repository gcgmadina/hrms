<template>
  <div class="salary-print-request">
    <!-- Button Back di Pojok Kiri -->
    <button class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i> Back
    </button>

    <h1>Request Cetak Slip Gaji</h1>

    <form @submit.prevent="submitRequest">
      <!-- ID Karyawan -->
      <div class="form-group">
        <label for="employeeId">ID Karyawan:</label>
        <input type="text" id="employeeId" v-model="request.employee_id" readonly />
      </div>

      <!-- Nama Karyawan -->
      <div class="form-group">
        <label for="employeeName">Nama Karyawan:</label>
        <input type="text" id="employeeName" v-model="request.employee_name" readonly />
      </div>

      <!-- Jabatan -->
      <div class="form-group">
        <label for="position">Jabatan:</label>
        <input type="text" id="position" v-model="request.position" readonly />
      </div>

      <!-- Periode -->
      <div class="form-group">
        <label for="period">Periode:</label>
        <input type="text" id="period" v-model="request.period" readonly />
      </div>

      <!-- Dropdown Keperluan -->
      <div class="form-group">
        <label for="purpose">Keperluan:</label>
        <select id="purpose" v-model="request.purpose" required>
          <option value="" disabled>Pilih Keperluan</option>
          <option value="Kredit/Pinjaman">Kredit/Pinjaman</option>
          <option value="Sewa Rumah/Kontrak Properti">Sewa Rumah/Kontrak Properti</option>
          <option value="Visa/Imigrasi">Visa/Imigrasi</option>
          <option value="Pendaftaran Sekolah/Beasiswa">Pendaftaran Sekolah/Beasiswa</option>
          <option value="Keperluan Pajak">Keperluan Pajak</option>
          <option value="Asuransi/Klaim">Asuransi/Klaim</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      <!-- Alasan Permintaan -->
      <div class="form-group">
        <label for="reason">Alasan Permintaan:</label>
        <textarea id="reason" v-model="request.reason" required></textarea>
      </div>

      <!-- Upload Lampiran -->
      <div class="form-group">
        <label for="attachment">Upload Lampiran (Opsional):</label>
        <input type="file" id="attachment" @change="handleFileUpload" />
      </div>

      <!-- Tombol Submit -->
      <button type="submit">Kirim Request</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      request: {
        employee_id: "",
        employee_name: "",
        position: "",
        period: "",
        purpose: "",
        reason: "",
        attachment: null,
        status: "Pending" // Status default saat request dikirim
      }
    };
  },
  methods: {
    goBack() {
      this.$router.push("/salary-slip"); // Kembali ke halaman daftar slip gaji
    },
    handleFileUpload(event) {
      this.request.attachment = event.target.files[0];
    },
    async submitRequest() {
      try {
        const formData = new FormData();
        formData.append("employee_id", this.request.employee_id);
        formData.append("employee_name", this.request.employee_name);
        formData.append("position", this.request.position);
        formData.append("period", this.request.period);
        formData.append("purpose", this.request.purpose);
        formData.append("reason", this.request.reason);
        formData.append("status", this.request.status);
        if (this.request.attachment) {
          formData.append("attachment", this.request.attachment);
        }

        const response = await fetch("https://localhost:8000/api/resource/Salary%20Slip%20Request", {
          method: "POST",
          headers: {
            "Authorization": `Basic ${basicAuth}`
          },
          body: formData
        });

        const result = await response.json();
        if (response.ok) {
          alert("Request berhasil dikirim!");
          this.$router.push("/salary-slip-request"); // Navigasi ke daftar request
        } else {
          alert("Gagal mengirim request: " + result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengirim request.");
      }
    }
  },
  mounted() {
    const slipId = this.$route.params.id;
    this.request.employee_id = "EMP123"; // Ambil dari API jika perlu
    this.request.employee_name = "Nama Karyawan"; // Ambil dari API jika perlu
    this.request.position = "Jabatan"; // Ambil dari API jika perlu
    this.request.period = "Periode"; // Ambil dari API jika perlu
  }
};
</script>

<style scoped>
.salary-print-request {
  max-width: 600px;
  margin: auto;
  font-family: sans-serif;
}
.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #4CAF50;
}
.back-button i {
  margin-right: 5px;
}
.back-button:hover {
  color: #45a049;
}
.form-group {
  margin-bottom: 20px;
}
input, select, textarea {
  width: 100%;
  padding: 8px;
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
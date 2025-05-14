<template>
  <div v-if="isMobile" class="leave-request-form">
    <!-- Button Back di Pojok Kiri -->
    <button class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i> Back
    </button>

    <h1>Form Pengajuan Cuti</h1>

    <form @submit.prevent="submitForm" class="form-container">
      <div class="form-field" v-for="field in fields" :key="field.name"
        v-show="field.name !== 'half_day_date' || form.half_day">
        <label :for="field.name">{{ field.label }}</label>

        <input
          v-if="field.type === 'Data'"
          :type="field.name === 'attachment' ? 'file' : 'text'"
          :id="field.name"
          v-model="form[field.name]"
          :readonly="field.autoFill"
          :required="field.name !== 'attachment'"
        />

        <input
          v-if="field.type === 'Date'"
          type="date"
          :id="field.name"
          v-model="form[field.name]"
          required
        />

        <input
          v-if="field.type === 'Int'"
          type="number"
          :id="field.name"
          v-model.number="form[field.name]"
          required
        />

        <select
          v-if="field.type === 'Select'"
          :id="field.name"
          v-model="form[field.name]"
          required
        >
          <option disabled value="">-- Pilih --</option>
          <option v-for="opt in leaveTypes" :key="opt" :value="opt">{{ opt }}</option>
        </select>

        <input
          v-if="field.type === 'Check'"
          type="checkbox"
          :id="field.name"
          v-model="form[field.name]"
        />
      </div>

      <button type="submit">Kirim Pengajuan</button>
    </form>
  </div>

  <div v-else class="access-restricted">
    <h2>Akses Terbatas</h2>
    <p>Fitur ini hanya tersedia untuk mobile karyawan.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
      form: {
        id: '',
        employee_name: '',
        job_position: '',
        department: '',
        leave_type: '',
        from_date: '',
        to_date: '',
        half_day: false,
        half_day_date: '',
        leave_bal: 0,
        description: '',
        leave_approver: '',
        attachment: ''
      },
      leaveTypes: ['Cuti Tahunan', 'Sakit', 'Cuti Melahirkan', 'Izin'], // bisa diubah sesuai di ERP
      fields: [
        { label: 'ID Karyawan', name: 'id', type: 'Data', autoFill: true },
        { label: 'Nama Karyawan', name: 'employee_name', type: 'Data', autoFill: true },
        { label: 'Jabatan', name: 'job_position', type: 'Data' },
        { label: 'Departemen', name: 'department', type: 'Data' },
        { label: 'Jenis Cuti', name: 'leave_type', type: 'Select' },
        { label: 'Dari Tanggal', name: 'from_date', type: 'Date' },
        { label: 'Sampai Tanggal', name: 'to_date', type: 'Date' },
        { label: 'Setengah Hari?', name: 'half_day', type: 'Check' },
        { label: 'Tanggal Setengah Hari', name: 'half_day_date', type: 'Date' },
        { label: 'Sisa Cuti', name: 'leave_bal', type: 'Int' },
        { label: 'Deskripsi', name: 'description', type: 'Data' },
        { label: 'Penyetuju', name: 'leave_approver', type: 'Data' },
        { label: 'Lampiran', name: 'attachment', type: 'Data' }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.push("/dashboard"); // Kembali ke halaman utama
    },
    detectMobile() {
      this.isMobile = /Mobi|Android/i.test(navigator.userAgent);
    },
    async fetchEmployeeData() {
      try {
        const response = await fetch("https://localhost:8000/api/resource/Employee%20ID/me", {
          headers: {
            "Authorization": `Basic ${basicAuth}`
          }
        });
        const result = await response.json();
        if (response.ok) {
          this.form.id = result.data.id;
          this.form.employee_name = result.data.employee_name;
          this.form.job_position = result.data.job_position;
          this.form.department = result.data.department;
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    },
    async submitForm() {
      if (!this.form.leave_type || !this.form.from_date || !this.form.to_date || !this.form.description || !this.form.leave_approver) {
        alert("Harap isi semua data yang diperlukan!");
        return;
      }

      try {
        const response = await fetch("https://localhost:8000/api/resource/Leave%20Request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`
          },
          body: JSON.stringify(this.form)
        });

        const result = await response.json();
        if (response.ok) {
          alert("Pengajuan cuti berhasil dikirim!");
          this.$router.push("/leave-history"); // Navigasi ke halaman riwayat cuti
        } else {
          alert("Gagal mengirim pengajuan: " + result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengirim pengajuan.");
      }
    }
  },
  mounted() {
    this.detectMobile();
    this.fetchEmployeeData();
  }
};
</script>

<style scoped>
.leave-request-form {
  max-width: 400px;
  margin: auto;
  font-family: sans-serif;
  padding: 20px;
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
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-field {
  display: flex;
  flex-direction: column;
}
input, select, textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.access-restricted {
  text-align: center;
  margin-top: 50px;
}
</style>
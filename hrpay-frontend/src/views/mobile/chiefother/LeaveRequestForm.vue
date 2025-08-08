<template>
  <div class="leave-request-form">
    <!-- Tombol Kembali -->
    <button class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i> Back
    </button>

    <h1 class="title">Form Pengajuan Cuti</h1>

    <form @submit.prevent="submitForm" class="form-container">
      <div
        class="form-field"
        v-for="field in fields"
        :key="field.name"
        v-show="field.name !== 'half_day_date' || form.half_day"
      >
        <label :for="field.name">{{ field.label }}</label>

        <!-- Input Text / File -->
        <!-- Untuk input file (attachment) -->
<input
  v-if="field.name === 'attachment'"
  type="file"
  :id="field.name"
  @change="handleFileUpload($event, field.name)"
  :readonly="field.autoFill"
  required
/>

<!-- Untuk input teks biasa -->
<input
  v-else
  type="text"
  :id="field.name"
  v-model="form[field.name]"
  :readonly="field.autoFill"
  required
/>


        <!-- Input Tanggal -->
        <input
          v-if="field.type === 'Date'"
          type="date"
          :id="field.name"
          v-model="form[field.name]"
          required
        />

        <!-- Input Angka -->
        <input
          v-if="field.type === 'Int'"
          type="number"
          :id="field.name"
          v-model.number="form[field.name]"
          required
        />

        <!-- Select -->
        <select
          v-if="field.type === 'Select'"
          :id="field.name"
          v-model="form[field.name]"
          required
        >
          <option disabled value="">-- Pilih --</option>
          <option v-for="opt in leaveTypes" :key="opt" :value="opt">{{ opt }}</option>
        </select>

        <!-- Checkbox -->
        <input
          v-if="field.type === 'Check'"
          type="checkbox"
          :id="field.name"
          v-model="form[field.name]"
        />
      </div>

      <button type="submit" class="submit-btn">Kirim Pengajuan</button>
    </form>
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
        attachment: null,
      },
      leaveTypes: ['Cuti Tahunan', 'Sakit', 'Cuti Melahirkan', 'Izin'],
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
      this.$router.push("/mobile/chief-other/leave-request");
    },
    detectMobile() {
      this.isMobile = /Mobi|Android/i.test(navigator.userAgent);
    },
    handleFileUpload(event, fieldName) {
      const file = event.target.files[0];
      if (file && fieldName === "attachment") {
        this.form.attachment = file;
      }
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

      const payload = { ...this.form };
      if (payload.attachment instanceof File) {
        payload.attachment = "[binary file omitted for now]";
        // Implement FormData if needed for file upload
      }

      try {
        const response = await fetch("https://localhost:8000/api/resource/Leave%20Request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (response.ok) {
          alert("Pengajuan cuti berhasil dikirim!");
          this.$router.push("/leave-history");
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
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.back-button {
  background: none;
  border: none;
  font-size: 16px;
  color: #007bff;
  cursor: pointer;
  margin-bottom: 16px;
}

.title {
  text-align: center;
  margin-bottom: 24px;
  font-size: 22px;
  color: #333;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-field label {
  margin-bottom: 6px;
  font-weight: bold;
}

.form-field input,
.form-field select {
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
}

.submit-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #218838;
}

/* Responsiveness */
@media (max-width: 600px) {
  .leave-request-form {
    padding: 16px;
  }

  .title {
    font-size: 18px;
  }

  .form-field input,
  .form-field select {
    font-size: 13px;
  }

  .submit-btn {
    font-size: 14px;
  }
}
</style>

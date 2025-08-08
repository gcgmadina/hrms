<template>
  <div v-if="isMobile" class="salary-slip-detail">
    <!-- Button Back di Pojok Kiri -->
    <button class="back-button" @click="goBack">
      <i class="fas fa-arrow-left"></i> Back
    </button>

    <h1>Slip Gaji - {{ slip.period }}</h1>

    <!-- Tampilan PDF Slip Gaji -->
    <iframe :src="slip.pdf_url" class="pdf-viewer"></iframe>

    <!-- Tombol Print -->
    <button class="print-button" @click="requestPrint">
      <i class="fas fa-print"></i> Print Slip Gaji
    </button>
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
      slip: {
        period: "",
        pdf_url: ""
      },
      isMobile: false
    };
  },
  methods: {
    goBack() {
      this.$router.push("/salary-slip"); // Kembali ke halaman Salary Slip
    },
    requestPrint() {
      this.$router.push(`/salary-print-request/${this.slip.period}`); // Navigasi ke halaman form SalaryPrintReq.vue
    },
    detectMobile() {
      this.isMobile = /Mobi|Android/i.test(navigator.userAgent);
    },
    preventScreenshot() {
      document.addEventListener("keydown", function (event) {
        if (event.key === "PrintScreen") {
          event.preventDefault();
          alert("Screenshot tidak diperbolehkan!");
        }
      });

      document.addEventListener("keyup", function (event) {
        if (event.key === "PrintScreen") {
          event.preventDefault();
        }
      });

      document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
      });
    }
  },
  mounted() {
    this.detectMobile();
    this.preventScreenshot();
    const slipId = this.$route.params.id;
    this.slip.period = "Periode"; // Ambil dari API jika perlu
    this.slip.pdf_url = "https://localhost:8000/api/resource/Salary%20Slip/" + slipId + "/pdf"; // Ambil dari API jika perlu
  }
};
</script>

<style scoped>
.salary-slip-detail {
  max-width: 600px;
  margin: auto;
  font-family: sans-serif;
  position: relative;
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
.pdf-viewer {
  width: 100%;
  height: 500px;
  border: none;
}
.print-button {
  display: block;
  margin: 20px auto;
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}
.print-button:hover {
  background-color: #0056b3;
}
.access-restricted {
  text-align: center;
  margin-top: 50px;
}
</style>
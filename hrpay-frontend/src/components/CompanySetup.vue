<template>
  <div>
    <h3>Setup Perusahaan</h3>

    <label>Nama Perusahaan:</label>
    <input type="text" v-model="company.name" />

    <label>Alamat:</label>
    <input type="text" v-model="company.address" />

    <label>Nomor Telepon:</label>
    <input type="text" v-model="company.phone" />

    <button @click="saveCompanyInfo">Simpan</button>
  </div>
</template>

<script>
import { getCompanyInfo, updateCompanyInfo } from "../../../hrpay/api/company.js";

export default {
  data() {
    return {
      company: {
        name: "",
        address: "",
        phone: "",
      },
    };
  },
  async mounted() {
    this.company = await getCompanyInfo();
  },
  methods: {
    async saveCompanyInfo() {
      const response = await updateCompanyInfo(this.company);
      if (response) {
        alert("Informasi perusahaan berhasil diperbarui!");
      } else {
        alert("Gagal memperbarui informasi perusahaan.");
      }
    },
  },
};
</script>
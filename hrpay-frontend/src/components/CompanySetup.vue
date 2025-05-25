<template>
  <div>
    <h3>Company Profile Setup</h3>

    <label>Company Name:</label>
    <input type="text" v-model="company.company_name" />

    <label>country:</label>
    <input type="text" v-model="company.country" />

    <label>Phone:</label>
    <input type="text" v-model="company.phone_no" />

    <label>Email:</label>
    <input type="text" v-model="company.email" />

    <label>Currency:</label>
    <input type="text" v-model="company.default_currency" />

    <label>Description:</label>
    <input type="text" v-model="company.company_description" />

    <label>Logo:</label>
    <input type="text" v-model="company.company_logo" />

    <button @click="saveCompanyInfo">Simpan</button>
  </div>
</template>

<script>
import { getCompanyInfo, updateCompanyInfo } from "../../../hrpay/api/company.js";

export default {
  data() {
    return {
      company: {
        company_name: "",
        country: "",
        phone_no: "",
        email: "",
        default_currency: "",
        company_description: "",
        company_logo: ""
      },
    };
  },
  async mounted() {
    const companyName = decodeURIComponent(this.$route.params.companyName);

    if (companyName === "new") {
      // Mode tambah data
      this.company = {
        company_name: "",
        country: "",
        phone_no: "",
        email: "",
        default_currency: "",
        company_description: "",
        company_logo: ""
      };
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/resource/Company/${companyName}`, {
        credentials: "include"
      });
      if (!response.ok) throw new Error(`Company ${companyName} not found`);
      const data = await response.json();
      this.company = data.data;
    } catch (error) {
      console.error("Error fetching company:", error);
      alert("Perusahaan tidak ditemukan.");
    }
  },
};
</script>
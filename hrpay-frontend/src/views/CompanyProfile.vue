<template>
  <div class="container">
    <!-- Tombol "Back" -->
    <button class="button back" @click="goBack">← Back to Dashboard</button>

    <div v-if="company" class="profile-card">
      <!-- Profil Perusahaan -->
      <img :src="company.logo" alt="Company Logo" class="profile-image" />
      <div class="profile-info">
        <h1>{{ company.name }}</h1>
        <p>{{ company.description }}</p>
        <button class="button edit" @click="editCompany">Edit</button>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <p>Belum ada perusahaan terdaftar.</p>
      <button class="button add" @click="addCompany">Add Company</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: null,
      isLoading: true,
      errorMessage: null
    };
  },

  async mounted() {
  const companyName = this.$route.params.companyName;
  console.log("companyName dari route:", companyName);

  if (companyName === "new") {
    // Mode tambah perusahaan baru
    this.company = {
      company_name: "",
      country: "",
      phone_no: "",
      email: "",
      default_currency: "",
      company_description: "",
      company_logo: ""
      // tambahkan field lain jika perlu
    };
    this.isLoading = false;
    return;
  }

  try {
    // Mode edit - fetch berdasarkan nama
    const response = await fetch(`http://localhost:8000/api/resource/Company/${companyName}`, {
      credentials: "include"
    });

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    this.company = data.data;
    console.log("Fetched Company Data:", this.company);
    } catch (error) {
      console.error("Error fetching company data:", error);
      this.errorMessage = "Gagal mengambil data perusahaan.";
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    goBack() {
      this.$router.push("/dashboard");
    },

    editCompany() {
      console.log("Company object:", this.company);
      if (this.company) {
        const encodedName = encodeURIComponent(this.company.name || this.company.company_name);
        console.log("Navigating to:", encodedName);
        this.$router.push({
          name: "CompanySetup",
          params: { companyName: encodedName }
        });
      } else {
        console.warn("Tidak ada perusahaan untuk diedit.");
      }
    },

    addCompany() {
      this.$router.push({
        name: "CompanySetup",
        params: { companyName: "new" }
      });
    },

    async saveChanges() {
      this.isSaving = true;
      try {
        const result = await updateCompanyInfo(this.company);
        alert("Berhasil disimpan!");
      } catch (error) {
        console.error("Gagal update:", error);
      } finally {
        this.isSaving = false;
      }
    }
  }
};
</script>
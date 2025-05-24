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
import { getCompanyInfo } from "/hrpay/api/company";

export default {
  data() {
    return {
      company: null,
      isLoading: true, // Tambahkan indikator loading
      errorMessage: null // Handle error jika API gagal
    };
  },
  
  async mounted() {
    try {
      this.company = await getCompanyInfo();
      console.log("Fetched Company Data:", this.company); // Debugging
    } catch (error) {
      console.error("Error fetching company data:", error);
      this.errorMessage = "Gagal mengambil data perusahaan.";
    } finally {
      this.isLoading = false;
    }
  },

  computed: {
    hasCompany() {
      return this.company !== null;
    }
  },

  watch: {
    company(newCompany) {
      console.log("Company Data Updated:", newCompany);
    }
  },

  methods: {
    goBack() {
      this.$router.push("/dashboard");
    },
    editCompany() {
      if (this.company) {
        this.$router.push(`/edit-company/${this.company.name}`);
      } else {
        console.warn("Tidak ada perusahaan untuk diedit.");
      }
    },
    addCompany() {
      this.$router.push("/add-company");
    }
  }
};
</script>

<style>
/* Container utama */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

/* Button styling */
.button {
  display: inline-block;
  padding: 10px 16px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.button.back {
  background: #f0f0f0;
  color: #333;
  border: none;
  margin-bottom: 10px;
}

.button.back:hover {
  background: #ddd;
}

.button.add {
  background: #007bff;
  color: white;
  border: none;
}

.button.add:hover {
  background: #0056b3;
}

.button.edit {
  background: #6c757d;
  color: white;
  border: none;
}

.button.edit:hover {
  background: #5a6268;
}

/* Profil Perusahaan */
.profile-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-info {
  flex: 1;
}

.profile-info h1 {
  font-size: 22px;
  margin-bottom: 5px;
}

.profile-info p {
  font-size: 14px;
  color: #777;
}

.empty-state {
  text-align: center;
  padding: 20px;
}
</style>
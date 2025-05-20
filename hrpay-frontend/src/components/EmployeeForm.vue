<script>
import { calculateFullPPH21 } from '@/utils/pphCalculation.js';
import { getDropdownData } from "../api/apiHandler.js";
import DependentsTab from './DependentsTab.vue';
import { ref, onMounted } from 'vue'


export default {
  components: {
    DependentsTab
  },
  data() {
    return {
      form: {
        id: '',
        full_name: '',
        date_of_birth: '', // ✅ Pastikan nilai awalnya ada
        marital_status: '',
        pph21_category: '',
        tariff_pph21: '',
        dependants: [],
        job_position: '',
        department: '',
        salary_structure: '',
        cost_to_company: null, // Bisa pakai null kalau angka
        salary_component: [],
        take_home_pay: 0,
        user_name: '',
        email: '',
        password: '',
        role_profile: '',
        form: {
          department: "",
          job_position: ""
      }
      }
    };
  },


  async mounted() {
    const { departments, jobPositions } = await getDropdownData();
    this.departments = departments;
    this.job_positions = jobPositions;

    const res = await fetch('/api/method/hrpay.api.employee.new_id');
    const { message } = await res.json();
    this.form.id = message.new_id;
    // Variabel untuk menyimpan daftar role dari API
    const roleList = ref([])

    // Fungsi untuk fetch data role
    const fetchRoles = async () => {
      try {
        const res = await fetch("https://localhost:8000/roles", {
          headers: {
            "Authorization": `Basic ${basicAuth}`, // Sesuaikan dengan autentikasi API kamu
            "Content-Type": "application/json"
          }
        })
        const data = await res.json()

        // Mapping data supaya sesuai format yang digunakan di dropdown
        roleList.value = data.roles.map(role => ({
          label: role.name,   // Nama Jabatan
          value: role.code    // Kode Jabatan
        }))
          } catch (err) {
            console.error('Gagal mengambil data role:', err)
          }
        }

        // Ambil data saat komponen dimuat
        onMounted(() => {
          fetchRoles()
        })

        // Variabel untuk menyimpan role yang dipilih
        const selectedRole = ref(null)
  },

  methods: {
    addDependant() {
      this.form.dependants.push({ name: '', relationship: '' });
      this.updateTaxDetails();
    },
    updateDependants(dependentsCount) {
      this.form.dependants = new Array(dependentsCount).fill({}); // Simpan jumlah dependants
      this.updateTaxDetails();
    },
    removeDependant(index) {
      this.form.dependants.splice(index, 1);
      this.updateTaxDetails();
    },
    updateTaxDetails() {
      const dependentsCount = this.form.dependants.length;

      // Hitung kategori PPh21 dan tarif pajak
      const { category, tax } = calculateFullPPH21(this.form.marital_status, dependentsCount, this.form.cost_to_company || 0);
      
      // Update kategori pajak dan tarif PPh21
      this.form.pph21_category = category;
      this.form.tariff_pph21 = tax;

      // Hitung Salary Breakdown
      this.updateSalaryComponents(tax);
    },
    updateSalaryComponents(tax) {
      if (!this.form.cost_to_company || !this.form.salary_structure) return;

      const selectedStructure = this.salary_structures.find(structure => structure.name === this.form.salary_structure);
      if (!selectedStructure) return;

      // Hitung salary breakdown berdasarkan CTC dan formatnya
      this.form.salary_components = selectedStructure.components.map(comp => ({
        ...comp,
        amount: comp.format === "percentage" ? (this.form.cost_to_company * comp.percentage) / 100 : comp.amount
      }));

      // Hitung Take Home Pay setelah pajak
      const totalEarnings = this.form.salary_components.reduce((acc, comp) => acc + (comp.type === "Earning" ? comp.amount : 0), 0);
      const totalDeductions = this.form.salary_components.reduce((acc, comp) => acc + (comp.type === "Deduction" ? comp.amount : 0), 0);

      this.form.take_home_pay = totalEarnings - totalDeductions - tax;
    }
  }
};
</script>

<template>
  <div class="employee-form">
    <div class="header">
      <h2 class="text-xl font-semibold text-center mb-4">Tambah Karyawan Baru</h2>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="form-container">
        <!-- Kolom Kiri: Data Pribadi -->
        <div class="form-column">
          <div class="form-group">
            <label>Employee ID</label>
            <input v-model="form.id" placeholder="EMP-0001" required readonly />
          </div>

          <div class="form-group">
            <label>Full Name</label>
            <input v-model="form.full_name" placeholder="Full Name" required />
          </div>

          <div class="form-group">
            <label>Date of Birth</label>
            <input v-model="form.date_of_birth" type="date" required />
          </div>

          <div class="form-group">
            <label>Marital Status</label>
            <select v-model="form.marital_status" required @change="updateTaxDetails">
              <option value="">-- Pilih Status --</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          <DependentsTab :maritalStatus="form.marital_status" @dependentsUpdated="updateDependants" />
          
          <div class="form-group">
            <label>PPh21 Kategori</label>
            <input v-model="form.pph21_category" readonly />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="Email" required />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input v-model="form.password" type="password" placeholder="Password" required />
          </div>
        </div>

        <!-- Kolom Kanan: Detail Penggajian -->
        <div class="form-column">
          <div class="form-group">
            <label>Job Position</label>
            <select v-model="form.job_position">
              <option value="">-- Pilih Job Position --</option>
              <option v-for="job in job_positions" :key="job.id" :value="job.name">
                {{ job.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Department</label>
            <select v-model="form.department">
              <option value="">-- Pilih Department --</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.name">
                {{ dept.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Salary Structure</label>
            <select v-model="form.salary_structure" required @change="fetchSalaryComponents">
              <option value="">-- Pilih Struktur Gaji --</option>
              <option v-for="structure in salary_structures" :key="structure.name" :value="structure.name">
                {{ structure.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Cost to Company</label>
            <input v-model="form.cost_to_company" type="number" placeholder="Cost to Company" @input="updateTaxDetails" />
          </div>

          <div class="form-group">
            <label>PPh21 Tariff</label>
            <input v-model="form.tariff_pph21" placeholder="PPh21 Tariff" readonly />
          </div>
        </div>
      </div>

      <div class="btn-container">
        <button type="submit" class="btn-primary">Submit</button>
        <button type="button" class="btn-secondary" @click="$router.back()">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Styling global form */
.employee-form {
  max-width: 100%;
  margin: 0 auto;
  background: #f8f9fa; /* Warna soft */
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.header h2 {
  color: #007bff;
}

/* Layout dua kolom */
.form-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}

.input-field, .input-dropdown {
  width: 100%;
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 8px;
  font-size: 16px;
}

.input-field:focus, .input-dropdown:focus {
  border-color: #007bff;
  box-shadow: 0 0 6px rgba(0, 123, 255, 0.2);
}

/* Tombol submit */
.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 18px;
  width: 100%;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* Tombol cancel */
.btn-secondary {
  background-color: #ccc;
  color: black;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 18px;
  width: 100%;
  cursor: pointer;
  transition: 0.3s;
}

.btn-secondary:hover {
  background-color: #aaa;
}

/* Responsif */
@media (max-width: 768px) {
  .form-container {
    grid-template-columns: 1fr;
  }
}
</style>

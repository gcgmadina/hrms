<script>
import { calculateFullPPH21 } from '@/utils/pphCalculation.js';
import { getDropdownData } from "../api/apiHandler.js";
import DependentsTab from './DependentsTab.vue';

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
  <div class="employee-form-container">
    <div class="header">
      <h2>Tambah Karyawan Baru</h2>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Employee ID</label>
        <input v-model="form.employee_id" placeholder="EMP-0001" required />
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

      <!-- Komponen DependentsTab (hanya muncul jika Marital Status terisi) -->
      <DependentsTab v-if="form.marital_status" @dependentsUpdated="updateDependants" />

      <div class="form-group">
        <label>PPh21 Kategori</label>
        <input v-model="form.pph21_category" readonly />
      </div>

      <div class="form-group">
        <label>PPh21 Tariff</label>
        <input v-model="form.tariff_pph21" placeholder="PPh21 Tariff" readonly />
      </div>

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

      <!-- Salary Component hanya muncul jika CTC terisi dan Salary Structure dipilih -->
      <div v-if="form.cost_to_company && form.salary_structure" class="salary-table">
        <h3>Salary Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Type</th>
              <th>Format</th>
              <th>Amount</th>
              <th>Validasi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(component, index) in form.salary_components" :key="index">
              <td>{{ component.name }}</td>
              <td>{{ component.type }}</td>
              <td>
                <select v-model="component.format" @change="updateSalaryComponents">
                  <option value="percentage">Persentase (%)</option>
                  <option value="fixed">Nominal (Rp)</option>
                </select>
              </td>
              <td>
                <input v-if="component.format === 'percentage'" v-model="component.percentage" type="number" placeholder="% dari CTC" @input="updateSalaryComponents" />
                <input v-else v-model="component.amount" type="number" placeholder="Nominal (Rp)" />
              </td>
              <td>
                <select v-model="component.validated">
                  <option value="yes">Iya</option>
                  <option value="no">Engga</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="form-group">
        <label>User Name</label>
        <input v-model="form.user_name" placeholder="User Name" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input v-model="form.email" type="email" placeholder="Email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="form.password" type="password" placeholder="Password" required />
      </div>

      <div class="form-group">
        <label>Role Profile</label>
        <input v-model="form.role_profile" placeholder="Role Profile" />
      </div>

      <div class="btn-container">
          <button type="submit" class="btn-primary">Submit</button>
          <button type="button" class="btn-secondary" @click="$router.back()">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.employee-form-container {
  max-width: 100%;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.header h2 {
  color: #007bff;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1.5px solid #253342;
  border-radius: 5px;
}

.btn-container {
  display: flex;
  gap: 10px; /* Kasih jarak antar tombol */
  justify-content: space-between;
}

.btn-primary {
  background: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background: #007bff;
}

.btn-secondary {
  background: #ddd;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #bbb;
}

@media (max-width: 768px) {
  .employee-form-container {
    width: 90%;
    padding: 15px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  input, select {
    font-size: 14px;
  }

  .btn-container {
    flex-direction: column; /* Supaya tombolnya nggak berdempetan di layar kecil */
    gap: 5px;
  }
}
</style>

<template>
  <div class="modal">
   <form @submit.prevent="handleSubmit">
    <input v-model="form.full_name" placeholder="Full Name" required />
    <input v-model="form.date_of_birth" type="date" required />
    
    <select v-model="form.marital_status" required>
      <option value="Single">Single</option>
      <option value="Married">Married</option>
    </select>

      <input v-model="form.tariff_pph21" placeholder="PPh21 Tariff" />
      <input v-model="form.job_position" placeholder="Job Position" />
      <input v-model="form.department" placeholder="Department" />
      <input v-model="form.salary_structure" placeholder="Salary Structure" />
      <input v-model="form.cost_to_company" type="number" placeholder="Cost to Company" />
    
    <input v-model="form.user_name" placeholder="User Name" />
    <input v-model="form.email" placeholder="Email" />
    <input v-model="form.password" placeholder="Password" type="password" />

    <input v-model="form.role_profile" placeholder="Role Profile" />

    <button type="submit">Submit</button>
  </form>
  </div>
</template>

<script>
// import frappeCall from "@/utils/frappeCall";
import { reactive } from 'vue';

const form = reactive({
  full_name: "",
  date_of_birth: "",
  marital_status: "Single",
  tariff_pph21: "",
  job_position: "",
  department: "",
  salary_structure: "",
  cost_to_company: "",
  employment_type: "Full Time",
  user_name: "",
  email: "",
  password: "",
  role_profile: ""
});

const handleSubmit = async () => {
  const response = await frappeCall("hrpay.api.add_employee", form);

  if (response.message === "ok") {
    alert("Karyawan berhasil ditambahkan!");
  } else {
    alert("Gagal menambahkan karyawan");
  }
};
</script>
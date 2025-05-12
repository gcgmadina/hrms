<template>
  <div class="modal">
    <h2>Add New Employee</h2>

    <label>Employee ID:</label>
    <input v-model="employee.employee_id" type="text" />

    <label>Full Name:</label>
    <input v-model="employee.full_name" type="text" />

    <label>Date of Birth:</label>
    <input v-model="employee.date_of_birth" type="date" />

    <label>Marital Status:</label>
    <select v-model="employee.marital_status">
      <option value="Single">Single</option>
      <option value="Married">Married</option>
    </select>

    <label>Dependents:</label>
    <textarea v-model="employee.dependents"></textarea>

    <label>PPh21 Tariff (%):</label>
    <input v-model="employee.tariff_pph21" type="number" step="0.01" />

    <label>Position:</label>
    <select v-model="employee.job_position">
      <option value="Software Engineer">Software Engineer</option>
      <option value="HR Manager">HR Manager</option>
    </select>

    <label>Department:</label>
    <select v-model="employee.department">
      <option value="IT">IT</option>
      <option value="HR">HR</option>
    </select>

    <label>Salary Structure:</label>
    <select v-model="employee.salary_structure">
      <option value="Standard">Standard</option>
      <option value="Executive">Executive</option>
    </select>

    <label>Cost to Company (CTC):</label>
    <input v-model="employee.cost_to_company" type="number" step="0.01" />

    <label>Employment Type:</label>
    <select v-model="employee.employment_type">
      <option value="Full Time">Full Time</option>
      <option value="Freelance">Freelance</option>
    </select>

    <button @click="submitEmployee">Save</button>
    <button @click="$emit('close')">Cancel</button>
  </div>
</template>

<script>
// 
// import { addEmployee } from "../services/employeeService";

export default {
  data() {
    return {
      employee: {
        employee_id: "",
        full_name: "",
        date_of_birth: "",
        marital_status: "",
        dependents: "",
        tariff_pph21: "",
        job_position: "",
        department: "",
        salary_structure: "",
        cost_to_company: "",
        employment_type: ""
      }
    };
  },
  methods: {
    async submitEmployee() {
      await addEmployee(this.employee);
      this.$emit("added");
      this.$emit("close");
    }
  }
};
</script>
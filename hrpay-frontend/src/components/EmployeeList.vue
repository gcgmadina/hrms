<template>
  <div>
    <h2>Employee List</h2>
    <div>
      <label>Position:</label>
      <select v-model="selectedPosition">
        <option value="">All Positions</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="HR Manager">HR Manager</option>
      </select>

      <label>Department:</label>
      <select v-model="selectedDepartment">
        <option value="">All Departments</option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
      </select>

      <button @click="fetchEmployees">Apply Filters</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Full Name</th>
          <th>Position</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.employee_id">
          <td>{{ employee.employee_id }}</td>
          <td>{{ employee.full_name }}</td>
          <td>{{ employee.job_position }}</td>
          <td>{{ employee.department }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="showForm = true">Add New Employee</button>
    <EmployeeForm v-if="showForm" @close="showForm = false" @added="refreshList" />
  </div>
</template>

<script>
// import { getEmployees } from "../services/employeeService";
import EmployeeForm from "./EmployeeForm.vue";
import { ref, onMounted } from 'vue'
import { createResource } from 'frappe-ui'

export default {
  components: { EmployeeForm },
  data() {
    return {
      employees: [],
      selectedPosition: "",
      selectedDepartment: "",
      showForm: false
    };
  },
  methods: {
    async fetchEmployees() {
      this.employees = await getEmployees(this.selectedPosition, this.selectedDepartment);
    }
  },
  mounted() {
    this.fetchEmployees();
  }
};
</script>
<template>
  <div> 
    <h1>Employee List</h1>
   
    <div class="top-bar">   
      <div class="actions">
        <router-link to="/employeeform">
          <button>+ Add Employee</button>
        </router-link>
      </div>

    <!-- Filter dropdowns -->
    <div class="filters">
      <button @click="resetFilters">Reset</button>
      
      <select v-model="selectedPosition" @change="fetchEmployees">
        <option value="">All Positions</option>
      </select>

      <select v-model="selectedDepartment" @change="fetchEmployees">
        <option value="">All Departments</option>
      </select>
    </div>
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
        <tr v-if="employees.length === 0">
          <td colspan="4">No employees found.</td>
        </tr>
        <tr v-for="(employee, index) in employees" :key="index">
          <td>{{ employee.employee_id }}</td>
          <td>{{ employee.full_name }}</td>
          <td>{{ employee.job_position }}</td>
          <td>{{ employee.department }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [],
      selectedPosition: "",
      selectedDepartment: ""
    };
  },
  methods: {
    async fetchEmployees() {
      try {
        const { getEmployees } = await import("../../../hrpay/api/employee");
        this.employees = await getEmployees(this.selectedPosition, this.selectedDepartment);
      } catch {
        this.employees = [
          { employee_id: "EMP001", full_name: "John Doe", job_position: "Software Engineer", department: "IT" },
          { employee_id: "EMP002", full_name: "Jane Smith", job_position: "HR Manager", department: "HR" }
        ];
        if (this.selectedPosition)
          this.employees = this.employees.filter(e => e.job_position === this.selectedPosition);
        if (this.selectedDepartment)
          this.employees = this.employees.filter(e => e.department === this.selectedDepartment);
      }
    },
    resetFilters() {
      this.selectedPosition = "";
      this.selectedDepartment = "";
      this.fetchEmployees();
    }
  },
  mounted() {
    this.fetchEmployees();
  }
};
</script>

<style scoped>
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }

  .actions, .filters {
    display: flex;
    gap: 20px;
  }

  div {
    font-family: 'Inter', sans-serif;
    padding: 15px;
    background-color: #f8f9fa;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 15px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  select {
    padding: 15px 15px;
    border-radius: 10px;
    border: 1.5px solid #ccc;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #007bff;
    color: white;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
</style>
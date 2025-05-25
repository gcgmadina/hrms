<template>
    <div>
      <h1>Employee</h1>
      <div class="button-group">
        <button @click="goBack" class="btn-back">← Back to Dashboard</button>
      </div>
      <EmployeeList ref="employeeList" />
    </div>
</template>

<script>
import EmployeeList from "../components/EmployeeList.vue";

export default {
  components: {
    EmployeeList
  },
  methods: {
    refreshList() {
      this.$refs.employeeList.fetchEmployees();
    },
    goBack() {
      this.$router.push("/dashboard");
    }
  }
};
</script>

<style scoped>
div {
  font-family: 'Inter', sans-serif;
  padding: 20px;
  background-color: #f8f9fa;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.button-group {
  margin-bottom: 16px;
}

.btn-back {
  background-color: #6c757d;
  color: white;
  padding: 8px 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  transition: background 0.3s;
}

.btn-back:hover {
  background-color: #5a6268;
}
</style>

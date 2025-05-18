<template>
  <layout>
    <div>
      <h1>Employee</h1>
      <EmployeeList ref="employeeList" />
    </div>
  </layout>
</template>

<script>
import EmployeeList from "../components/EmployeeList.vue";
import Layout from "../components/Layout.vue";

export default {
  components: {
    EmployeeList,
    Layout
  },
  methods: {
    refreshList() {
      this.$refs.employeeList.fetchEmployees();
    }
  }
};
</script>

<style>
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
</style>
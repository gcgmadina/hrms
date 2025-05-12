<template>
  <div>
    <h1>Employee List</h1>
    <EmployeeList />
    <button @click="showForm = true">Add New Employee</button>
    <EmployeeForm v-if="showForm" @close="showForm = false" @added="refreshList" />
  </div>
</template>

<script>
import EmployeeList from "../components/EmployeeList.vue";
import EmployeeForm from "../components/EmployeeForm.vue";

export default {
  components: { EmployeeList, EmployeeForm },
  data() {
    return {
      showForm: false
    };
  },
  methods: {
    refreshList() {
      this.$refs.employeeList.fetchEmployees();
    }
  }
};
</script>
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Employee from '../views/Employee.vue';
import Attendance from '../views/Attendance.vue';
import EmployeeList from "../components/EmployeeList.vue";
import LeaveRequests from '../components/LeaveRequests.vue';
import SalaryComponent from "./views/SalaryComponent.vue";
import SalaryCompForm from "./views/SalaryCompForm.vue";
import SalaryStructure from "./views/SalaryStructure.vue";
import SalaryStructureForm from "./views/SalaryStructureForm.vue";
// import PPh21 from "@/views/PPh21.vue";
// import User from "@/views/User.vue";
// import Profile from "@/views/Profile.vue";


const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: "/employee", component: Employee }, // Pastikan path ini benar
    { path: "/employees", component: EmployeeList },
    { path: "/attendance", component: Attendance },
    { path: "/leave_request", component: LeaveRequests},
    { path: "/salary-components", component: SalaryComponent },
    { path: "/add-salary-component", component: SalaryCompForm },
    { path: "/", component: SalaryStructure },
    { path: "/add-salary-structure", component: SalaryStructureForm },
//   { path: "/pph21", component: PPh21 },
//   { path: "/user", component: User },
//   { path: "/profile", component: Profile },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
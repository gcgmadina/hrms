import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Employee from '../views/Employee.vue';
import Attendance from '../views/Attendance.vue';
import EmployeeList from "../components/EmployeeList.vue";
import LeaveRequests from '../components/LeaveRequests.vue';
// import PPh21 from "@/views/PPh21.vue";
// import SalaryPayout from "@/views/SalaryPayout.vue";
// import User from "@/views/User.vue";
// import Profile from "@/views/Profile.vue";


const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: "/employee", component: Employee }, // Pastikan path ini benar
    { path: "/employees", component: EmployeeList },
    { path: "/attendance", component: Attendance },
    { path: "/leave_request", component: LeaveRequests},
//   { path: "/pph21", component: PPh21 },
//   { path: "/salary-payout", component: SalaryPayout },
//   { path: "/user", component: User },
//   { path: "/profile", component: Profile },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
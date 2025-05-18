import { createRouter, createWebHistory } from 'vue-router'
// view
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Employee from '../views/Employee.vue';
import Attendance from '../views/Attendance.vue';
import HolidayList from '../views/HolidayList.vue';
import Payroll from '../views/Payroll.vue';
import User from "../views/User.vue";
import Profile from "../views/Profile.vue";
import EmployeeForm from "../components/EmployeeForm.vue"
import LeaveReq from "../components/LeaveRequests.vue";
// mobile
// import DashApp from '../views/mobile/DashApp.vue';
// import LeaveHistory from '../views/mobile/LeaveHistory.vue';
// import LoginApp from '../views/mobile/LoginApp.vue';
// import SalaryHistory from '../views/mobile/SalaryHistory.vue';


const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: "/employees", component: Employee },
    { path: "/employeeform", component: EmployeeForm}, // Pastikan path ini benar
    { path: "/attendance", component: Attendance },
    { path: "/holiday", component: HolidayList},
    { path: "/payroll", component: Payroll},
    { path: "/user", component: User },
    { path: "/profile", component: Profile },
    { path: "/leave-requests", component: LeaveReq},
    // { path: "/pph21", component: PPh21 },
    // { path: "/dashApp", component: DashApp},
    // { path: "/leavehist", component: LeaveHistory},
    // { path: "/loginapp", component: LoginApp},
    // { path: "/salaryhist", component: SalaryHistory}
]

export default createRouter({
    history: createWebHistory(),
    routes
})
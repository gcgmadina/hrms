import { createRouter, createWebHistory } from 'vue-router'
// view
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Employee from '../views/Employee.vue';
import Attendance from '../views/Attendance.vue';
import HolidayList from '../views/HolidayList.vue';
import Payroll from '../views/Payroll.vue';
import User from "@/views/User.vue";
import Profile from "@/views/Profile.vue";

// component
import AttendanceChart from '../components/AttendanceChart.vue';
import AttendanceList from '../components/AttendanceList.vue';
import CompanySetup from '../components/CompanySetup.vue';
import DependentsTab from '../components/DependentsTab.vue';
import EmployeeList from "../components/EmployeeList.vue";
import EmployeeForm from "../components/EmployeeForm.vue";
import Holiday from "../components/Holiday.vue";
import LeaveRequests from '../components/LeaveRequests.vue';
import Role from '../components/Role.vue';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import SalaryComponent from "./component/payroll/SalaryComponent.vue";
import SalaryCompForm from "./component/payroll/SalaryCompForm.vue";
import SalaryStructure from "./component/payroll/SalaryStructure.vue";
import SalaryStrForm from "./component/payroll/SalaryStrForm.vue";
import SalarySlip from "./component/payroll/SalarySlip.vue";
import SalarySlipReq from '../components/payroll/SalarySlipReq.vue';
import PayPeriodeForm from '../components/payroll/PayPeriodeForm.vue';
import PayPeriode from '../components/payroll/PayPeriode.vue';
import PayEntry from '../components/payroll/PayEntry.vue';
import PayrollHist from '../components/payroll/PayrollHist.vue';
import PPh21 from "@/component/pph21/Pph21.vue";
import Kategori from "@/component/pph21/Kategori.vue";
import PTKPForm from "@/component/pph21/PTKPForm.vue";
import PKPForm from "@/component/pph21/PKPForm.vue";
import Kategori from "@/component/pph21/Kategori.vue";

// mobile
import DashApp from '../views/mobile/DashApp.vue';
import LeaveHistory from '../views/mobile/LeaveHistory.vue';
import LoginApp from '../views/mobile/LoginApp.vue';
import SalaryHistory from '../views/mobile/SalaryHistory.vue';
import LeaveReqForm from '../components/mobile/LeaveReqForm.vue';
import SalaryPrintReq from '../components/mobile/SalaryPrintReq.vue';
import SalarySlipDetail from '../components/mobile/SalarySlipDetail.vue';


const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: "/employee", component: Employee }, // Pastikan path ini benar
    { path: "/employees", component: EmployeeList },
    { path: "/attendance", component: Attendance },
    { path: "/leave_request", component: LeaveRequests},
    { path: "/salary-components", component: SalaryComponent },
    { path: "/add-salary-component", component: SalaryCompForm },
    { path: "/salary-structure", component: SalaryStructure },
    { path: "/add-salary-structure", component: SalaryStructureForm },
//   { path: "/pph21", component: PPh21 },
//   { path: "/user", component: User },
//   { path: "/profile", component: Profile },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
import { createRouter, createWebHistory } from 'vue-router'
// view
import Login from '../views/Login.vue';
import Layout from '../components/Layout.vue';
import Dashboard from '../views/Dashboard.vue';
import Employee from '../views/Employee.vue';
import Attendance from '../views/Attendance.vue';
import HolidayList from '../views/HolidayList.vue';
import Payroll from '../views/Payroll.vue';
import Role from "../views/Role.vue";
import RoleForm from "../components/RoleForm.vue"
import Profile from "../views/Profile.vue";
import EmployeeForm from "../components/EmployeeForm.vue"
import LeaveReq from "../components/LeaveRequests.vue";
import PayrollHist from "../components/payroll/PayrollHist.vue"
import PPh21 from "../components/pph21/Pph21.vue"
import AttendanceReq from "../components/AttendanceReq.vue"
import CompanyProfile from "../views/CompanyProfile.vue"
import CompanySetup from "../components/CompanySetup.vue"
import HolidayForm from "../components/Holiday.vue"
// mobile
// import DashApp from '../views/mobile/DashApp.vue';
// import LeaveHistory from '../views/mobile/LeaveHistory.vue';
// import LoginApp from '../views/mobile/LoginApp.vue';
// import SalaryHistory from '../views/mobile/SalaryHistory.vue';


const routes = [
    { path: '/login', component: Login },
    { path: '/', component: Layout,
    children: [
        { path: '', redirect: '/dashboard' }, // default ke dashboard
        { path: 'dashboard', component: Dashboard },
        { path: 'employees', component: Employee },
        { path: 'employeeform', component: EmployeeForm },
        { path: 'attendance', component: Attendance },
        { path: 'holiday', component: HolidayList },
        { path: 'add-holiday', component: HolidayForm },
        { path: 'payroll', component: Payroll },
        { path: 'manage-role', component: Role },
        { path: 'add-role', component: RoleForm },
        { path: 'profile', component: Profile },
        { path: 'leave-requests', component: LeaveReq },
        { path: 'payroll-entry', component: () => import('@/components/payroll/PayEntry.vue') },
        { path: 'payroll-hist', component: PayrollHist },
        { path: 'pph21', component: PPh21 },
        { path: 'attendance-request', component: AttendanceReq },
        { path: 'company-profile', component: CompanyProfile },
        { path: 'company-setup/:companyName', name: 'CompanySetup', component: CompanySetup }
    ]
    }

    // { path: "/dashApp", component: DashApp},
    // { path: "/leavehist", component: LeaveHistory},
    // { path: "/loginapp", component: LoginApp},
    // { path: "/salaryhist", component: SalaryHistory}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  if (to.path !== '/login' && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
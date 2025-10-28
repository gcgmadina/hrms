import { createRouter, createWebHistory } from "@ionic/vue-router"

import TabbedView from "@/views/TabbedView.vue"
import leaveRoutes from "./leaves"
import claimRoutes from "./claims"
import employeeAdvanceRoutes from "./advances"
import salarySlipRoutes from "./salary_slips"

const routes = [
	{
		path: "/",
		redirect: (to) => {
			// Domain-based routing untuk root path
			const currentDomain = window.location.hostname
			const isManusaDomain = currentDomain.includes("gcgmanusa.id") || currentDomain.includes("gcgsalus.id")
			
			if (isManusaDomain) {
				return "/home"
			} else {
				return "/select-app"
			}
		},
	},
	{
		path: "/",
		component: TabbedView,
		children: [
			{
				path: "",
				redirect: (to) => {
					const currentDomain = window.location.hostname
					const isManusaDomain = currentDomain.includes("gcgmanusa.id") || currentDomain.includes("gcgsalus.id")
					return isManusaDomain ? "/home" : "/select-app"
				},
			},
			{
				path: "/home",
				name: "Home",
				component: () => import("@/views/Home.vue"),
			},
			{
				path: "/dashboard/leaves",
				name: "LeavesDashboard",
				component: () => import("@/views/leave/Dashboard.vue"),
			},
			{
				path: "/dashboard/expense-claims",
				name: "ExpenseClaimsDashboard",
				component: () => import("@/views/expense_claim/Dashboard.vue"),
			},
			{
				path: "/dashboard/salary-slips",
				name: "SalarySlipsDashboard",
				component: () => import("@/views/salary_slip/Dashboard.vue"),
			},
		],
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/Login.vue"),
	},
	{
		path: "/select-app",
		name: "SelectApp",
		component: () => import("@/views/SelectApp.vue"),
	},
	{
		path: "/profile",
		name: "Profile",
		component: () => import("@/views/Profile.vue"),
	},
	{
		path: "/notifications",
		name: "Notifications",
		component: () => import("@/views/Notifications.vue"),
	},
	{
		path: "/settings",
		name: "Settings",
		component: () => import("@/views/AppSettings.vue"),
	},
	{
		path: "/invalid-employee",
		name: "InvalidEmployee",
		component: () => import("@/views/InvalidEmployee.vue"),
	},
	...leaveRoutes,
	...claimRoutes,
	...employeeAdvanceRoutes,
	...salarySlipRoutes,
]

const router = createRouter({
	history: createWebHistory("/hrms"),
	routes,
})

export default router

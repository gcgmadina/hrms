<template>
	<BaseLayout>
		<template #body>
			<div class="flex flex-col items-center my-7 p-4 gap-7">
				<CheckInPanel />
				<QuickLinks :items="quickLinks" title="Quick Links" />
				<RequestPanel />
			</div>
		</template>
	</BaseLayout>
</template>

<script setup>
import { markRaw, computed } from "vue"
import { FeatherIcon } from "frappe-ui"

import CheckInPanel from "@/components/CheckInPanel.vue"
import QuickLinks from "@/components/QuickLinks.vue"
import BaseLayout from "@/components/BaseLayout.vue"
import RequestPanel from "@/components/RequestPanel.vue"
import LeaveIcon from "@/components/icons/LeaveIcon.vue"
import ExpenseIcon from "@/components/icons/ExpenseIcon.vue"
import EmployeeAdvanceIcon from "@/components/icons/EmployeeAdvanceIcon.vue"
import SalaryIcon from "@/components/icons/SalaryIcon.vue"
import { userResource } from "@/data/user"

const quickLinks = computed(() => {
	const baseLinks = [
		{
			icon: markRaw(LeaveIcon),
			title: "Request Leave",
			route: "LeaveApplicationFormView",
		},
		{
			icon: markRaw(ExpenseIcon),
			title: "Claim an Expense",
			route: "ExpenseClaimFormView",
		},
		{
			icon: markRaw(EmployeeAdvanceIcon),
			title: "Request an Advance",
			route: "EmployeeAdvanceFormView",
		},
		{
			icon: markRaw(SalaryIcon),
			title: "View Salary Slips",
			route: "SalarySlipsDashboard",
		},
	]

	// Tambahkan shortcut POS jika user memiliki role Cashier
	const userRoles = userResource.data?.roles || []
	if (userRoles.includes("Cashier")) {
		console.log("User memiliki role Cashier")
		baseLinks.unshift({
			icon: markRaw(FeatherIcon),
			iconProps: { name: "shopping-cart" },
			title: "Buka POS",
			url: "/app/posapp",
			isExternal: true,
		})
	} else {
		console.log("User tidak memiliki role Cashier")
	}

	return baseLinks
})
</script>

import router from "@/router"
import { createResource } from "frappe-ui"

export const employeeResource = createResource({
	url: "hrms.api.get_current_employee_info",
	cache: "hrms:employee",
	onError(error) {
		if (error && error.exc_type === "AuthenticationError") {
			router.push("/login")
		}
	},
})


export function checkinDistance(lat, long, work_place) {
	return new Promise((resolve, reject) => {
		const resource = createResource({
			url: "hrms.api.employee_checkin.checkin",
			params: {
				lat: lat,
				long: long,
				work_place: work_place,
			},
			transform(data) {
				if (data.status == 'success') {
					resolve(data)
				} else {
					reject(data)
				}
			}
		})

		resource.reload()
	})
}
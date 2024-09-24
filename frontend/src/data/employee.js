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

export function checkIfFaceDataExists(empID) {
	return new Promise((resolve, reject) => {
		const resource = createResource({
			url: "hrms.api.employee_checkin.get_face_encode",
			method: "GET",
			params: {
				employee_id: empID,
			},
			transform(data) {
				if (data.status == 'success') {
					if (!data.data)
						resolve(false)
					else
						resolve(true)
				} else {
					reject(data.message)
				}
			}
		})

		resource.reload()
	})
}

export function saveFaceData(empID, image) {
	return new Promise((resolve, reject) => {
		const resource = createResource({
			url: "hrms.api.employee_checkin.register_face",
			params: {
				employee_id: empID,
				image: image,
			},
			transform(data) {
				if (data.status == 'success') {
					console.log(data)
					resolve(data)
				} else {
					reject(data)
				}
			}
		})

		resource.reload()
	})
}

export function compareFace(emp_id, img) {
	return new Promise((resolve, reject) => {
		const resource = createResource({
			url: "hrms.api.employee_checkin.compare_face",
			params: {
				employee_id: emp_id,
				image: img,
			},
			transform(data) {
				if (data.status == 'success') {
					resolve(data.message)
				} else {
					reject(data)
				}
			}
		})

		resource.reload()
	})
}
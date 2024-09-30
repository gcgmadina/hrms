import router from "@/router"
import { createResource } from "frappe-ui"

export const userResource = createResource({
	url: "hrms.api.get_current_user_info",
	cache: "hrms:user",
	onError(error) {
		if (error && error.exc_type === "AuthenticationError") {
			router.push({ name: "Login" })
		}
	},
})

export function updatePassword(new_password, old_password) {
	return new Promise((resolve, reject) => {
		const resource = createResource({
			url: "frappe.core.doctype.user.user.update_password",
			method: "POST",
			params: {
				new_password: new_password,
				old_password: old_password,
			},
			transform(data) {
				if (data) {
					resolve("Password updated successfully")
				} else {
					reject("Update failed")
				}
			}
		})

		if (resource.error) {
			reject(resource.error)
		} else {
			resource.fetch()
		}
	})
}
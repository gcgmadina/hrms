import router from "@/router"
import { createResource } from "frappe-ui"

export function checkWifiConnection (emp_id, ip_address) {
    return new Promise((resolve, reject) => {
        const resource = createResource({
            url: "hrms.api.employee_checkin.check_wifi_connection",
            params: {
                employee: emp_id,
                ip: ip_address,
            },
            transform(data) {
                if (data.status == 'success') {
                    resolve(data.data)
                } else {
                    reject(data.data)
                }
            }
        })

        resource.reload()
    })
}
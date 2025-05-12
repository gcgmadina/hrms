import { ref } from 'vue'
import { createResource } from 'frappe-ui'

export const attendanceData = ref([])
export const docAttendanceGet = createResource({
  url: hrpay.api.attendance.get_attendance_summary,
  auto: true,
  method: 'GET',
  transform(data) {
    attendanceData.value = data
  },
})
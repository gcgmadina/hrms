import { ref } from 'vue'
import { createResource } from 'frappe-ui'

export const attendanceData = ref([])

export const getAttendanceSummary = createResource({
  url: '/api/method/hrpay.api.attendance.get_attendance_summary',
  method: 'GET',
  auto: false,
  transform(response) {
    attendanceData.value = response.message || []
  }
})

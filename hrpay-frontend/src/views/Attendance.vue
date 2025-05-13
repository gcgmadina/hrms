<template>
  <div>
    <h1>Kehadiran</h1>
    <AttendanceList />
    <HolidayList />
  </div>
</template>

<script>
import AttendanceList from '@/components/AttendanceList.vue'
import HolidayList from "@/views/HolidayList.vue";

export default {
  components: {
    AttendanceList,
    HolidayList
  }
}
</script>
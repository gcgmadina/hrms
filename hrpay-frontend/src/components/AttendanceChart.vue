<template>
  <div>
    <h2>Attendance Overview</h2>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script>
import { onMounted, ref } from "vue"
import Chart from "chart.js/auto"
import { attendanceData, getAttendanceSummary } from "@/data/Attendance"

export default {
  setup() {
    const chartInstance = ref(null)
    const canvasRef = ref(null)

    onMounted(async () => {
      try {
        await getAttendanceSummary.fetch()
        const data = attendanceData.value
        console.log("Raw attendance data:", data)

        if (!Array.isArray(data)) {
          console.error("Expected array but got:", data)
          return
        }

        // Agregasi jumlah data per status
        const statusCounts = {}
        data.forEach(item => {
          const status = item.status || 'Unknown'
          if (!statusCounts[status]) {
            statusCounts[status] = 0
          }
          statusCounts[status]++
        })

        const labels = Object.keys(statusCounts)
        const values = Object.values(statusCounts)

        if (!canvasRef.value) {
          console.error("Canvas not found")
          return
        }
        const ctx = canvasRef.value.getContext("2d")

        if (chartInstance.value) {
          chartInstance.value.destroy()
        }

        chartInstance.value = new Chart(ctx, {
          type: "pie",
          data: {
            labels,
            datasets: [{
              data: values,
              backgroundColor: [
                "#4CAF50",
                "#FF9800",
                "#F44336",
                "#2196F3",
                "#9C27B0",
                "#FFEB3B",
                "#00BCD4"
              ]
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "bottom"
              }
            }
          }
        })

      } catch (error) {
        console.error("Failed to load attendance summary:", error)
      }
    })

    return {
      canvasRef
    }
  }
}
</script>

<style scoped>
canvas {
  max-width: 400px;
  margin: auto;
}
</style>

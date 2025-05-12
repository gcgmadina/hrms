<!-- <template>
  <div>
    <h2>Attendance Overview</h2>
    <canvas id="attendanceChart"></canvas>
  </div>
</template>

<script>

import { getAttendanceSummary } from "@/data/attendance";
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      attendanceData: []
    };
  },
  async mounted() {
    this.attendanceData = await getAttendanceSummary();
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById("attendanceChart").getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: this.attendanceData.map(item => item.status),
          datasets: [{
            data: this.attendanceData.map(item => item.total),
            backgroundColor: ["#4CAF50", "#FF9800", "#F44336", "#2196F3", "#9C27B0"]
          }]
        }
      });
    }
  }
};
</script> -->



<template>
  <div>
    <h2>Attendance Overview</h2>
    <canvas id="attendanceChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
// import { getAttendanceSummary } from "@/data/attendance";
// Dummy data function
async function getAttendanceSummary() {
  // Simulasi data yang biasanya diambil dari API/backend
  return [
    { status: "Hadir", total: 15 },
    { status: "Izin", total: 3 },
    { status: "Sakit", total: 2 },
    { status: "Alpha", total: 5 },
  ];
}

export default {
  data() {
    return {
      attendanceData: []
    };
  },
  async mounted() {
    this.attendanceData = await getAttendanceSummary();
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById("attendanceChart").getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: this.attendanceData.map(item => item.status),
          datasets: [{
            data: this.attendanceData.map(item => item.total),
            backgroundColor: ["#4CAF50", "#FF9800", "#F44336", "#2196F3"]
          }]
        }
      });
    }
  }
};
</script>

<style scoped>
canvas {
  max-width: 400px;
}
</style>

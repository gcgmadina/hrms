<template>
  <div class="attendance-wrap">
    <!-- Waktu -->
    <h2>{{ time }}</h2>
    <p>{{ date }}</p>

    <!-- Koordinat -->
    <p>Latitude: {{ latitude }}</p>
    <p>Longitude: {{ longitude }}</p>

    <!-- Map -->
    <div id="map" class="map"></div>

    <!-- Tombol -->
    <button class="confirm-btn" @click="confirmAction">
      Konfirmasi Check-in/out
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const time = ref("");
const date = ref("");
const latitude = ref(null);
const longitude = ref(null);
let map = null;

function updateDateTime() {
  const now = new Date();
  time.value = now.toLocaleTimeString("id-ID", { hour12: true });
  date.value = now.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

function initMap(lat, lng) {
  if (!map) {
    map = L.map("map").setView([lat, lng], 16);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19
    }).addTo(map);
    L.marker([lat, lng]).addTo(map);
  } else {
    map.setView([lat, lng], 16);
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      latitude.value = pos.coords.latitude.toFixed(6);
      longitude.value = pos.coords.longitude.toFixed(6);
      initMap(pos.coords.latitude, pos.coords.longitude);
    }, err => {
      console.error("Gagal mendapatkan lokasi:", err);
      alert("Gagal mendapatkan lokasi");
    });
  } else {
    alert("Geolocation tidak didukung browser ini");
  }
}

function confirmAction() {
   if (lat.value == null || lng.value == null) {
    alert("Lokasi belum terbaca. Coba lagi ya.");
    return;
  }
  router.push({
    name: "face",
    query: {
      employee: EMPLOYEE_ID,
      action: nextAction.value, // "checkin" | "checkout"
      lat: lat.value,
      lng: lng.value
    }
  });
}

onMounted(() => {
  updateDateTime();
  setInterval(updateDateTime, 1000);
  getLocation();
});
</script>

<style scoped>
.attendance-wrap {
  padding: 20px;
  text-align: center;
}

.map {
  width: 100%;
  height: 200px;
  margin: 15px 0;
  border-radius: 8px;
  overflow: hidden;
}

.confirm-btn {
  background: #ccc;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.confirm-btn:hover {
  background: #bbb;
}
</style>

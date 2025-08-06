<template>
  <div class="face-wrap">
    <h2 class="title">Verifikasi Wajah</h2>
    <p class="subtitle">Arahkan wajah ke kamera</p>

    <div class="cam-box">
      <video ref="video" autoplay playsinline muted></video>
      <canvas ref="canvas" class="hide"></canvas>
      <div v-if="loading" class="overlay">Memindai…</div>
    </div>

    <!-- Toast -->
    <div v-if="toast.show" :class="['toast', toast.type]">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

/** ===== Konfigurasi ===== */
const VERIFY_URL = import.meta.env.VITE_FACE_VERIFY_URL || ""; 
// contoh: `${BASE_URL}/api/method/my_app.api.verify_face_and_mark`

const SCAN_INTERVAL_MS = 800;  // jeda antar-capture
const SCAN_TIMEOUT_MS  = 20000; // berhenti setelah 20 detik

/** ===== Route params (dikirim dari map/attendance) ===== */
const route = useRoute();
const router = useRouter();
const employee = route.query.employee || "";
const action   = route.query.action || "checkin";
const lat      = route.query.lat || null;
const lng      = route.query.lng || null;

/** ===== Refs & State ===== */
const video = ref(null);
const canvas = ref(null);
let mediaStream = null;
let scanTimer = null;
let timeoutTimer = null;

const loading = ref(true);
const toast = ref({ show: false, type: "info", message: "" });

/** ===== Utils ===== */
function showToast(message, type = "info", ttl = 2000) {
  toast.value = { show: true, type, message };
  setTimeout(() => (toast.value.show = false), ttl);
}

async function startCamera() {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false
    });
    video.value.srcObject = mediaStream;
    await video.value.play();
  } catch (e) {
    console.error(e);
    showToast("Izin kamera ditolak", "error", 3000);
  }
}

function stopCamera() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
}

function grabFrameBase64(quality = 0.9) {
  const w = video.value.videoWidth || 640;
  const h = video.value.videoHeight || 480;
  if (!w || !h) return null;
  const cvs = canvas.value;
  cvs.width = w; cvs.height = h;
  const ctx = cvs.getContext("2d");
  ctx.drawImage(video.value, 0, 0, w, h);
  return cvs.toDataURL("image/jpeg", quality).split(",")[1];
}

async function tryVerifyOnce() {
  try {
    const image_base64 = grabFrameBase64();
    if (!image_base64) return false;

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ employee, action, lat, lng, image_base64 })
    });

    const json = await res.json();
    const ok = json.message?.ok || json.message?.status === "success";
    if (ok) {
      showToast("Absensi berhasil ✅", "success", 1500);
      // beri sedikit delay agar user sempat melihat toast
      setTimeout(() => router.back(), 800);
      return true;
    } else {
      // jika backend membalas tidak cocok, munculkan notifikasi tipis lalu lanjut scan
      showToast(json.message?.error || "Wajah tidak terdeteksi", "error", 900);
      return false;
    }
  } catch (e) {
    console.error(e);
    showToast("Gagal terhubung ke server", "error", 1200);
    return false;
  }
}

function startScanningLoop() {
  loading.value = true;

  // timeout global agar tidak scan selamanya
  timeoutTimer = setTimeout(() => {
    clearInterval(scanTimer);
    loading.value = false;
    showToast("Waktu habis, coba lagi.", "error", 2000);
  }, SCAN_TIMEOUT_MS);

  // loop scan
  scanTimer = setInterval(async () => {
    const success = await tryVerifyOnce();
    if (success) {
      clearInterval(scanTimer);
      clearTimeout(timeoutTimer);
      loading.value = false;
    }
  }, SCAN_INTERVAL_MS);
}

/** ===== Lifecycle ===== */
onMounted(async () => {
  await startCamera();
  startScanningLoop();
});

onBeforeUnmount(() => {
  clearInterval(scanTimer);
  clearTimeout(timeoutTimer);
  stopCamera();
});
</script>

<style scoped>
.face-wrap { max-width: 420px; margin: 0 auto; padding: 20px; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif; }
.title { text-align: center; margin: 0; font-size: 22px; font-weight: 800; }
.subtitle { text-align: center; margin: 4px 0 12px; color: #666; }

.cam-box { position: relative; border-radius: 14px; overflow: hidden; background: #000; }
video { width: 100%; display: block; background: #000; }
canvas.hide { display: none; }

.overlay {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; background: rgba(0,0,0,.2);
}

.toast {
  position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
  padding: 10px 14px; border-radius: 12px; font-weight: 700; font-size: 14px;
  color: #111; background: #e9e9eb; box-shadow: 0 6px 18px rgba(0,0,0,.16);
}
.toast.success { background: #c8f7cf; }
.toast.error { background: #ffd6d6; }
</style>

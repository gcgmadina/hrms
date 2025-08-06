<template>
  <div class="sheet">
    <div class="grabber" aria-hidden="true"></div>

    <div class="info">
      <p class="row"><span class="label">Nama:</span><span class="value">{{ nama || "—" }}</span></p>
      <p class="row"><span class="label">Dept :</span><span class="value">{{ dept || "—" }}</span></p>
    </div>

    <div class="datetime">
      <span>{{ tanggal }}</span>
      <span>{{ waktu }}</span>
    </div>

    <div class="ket">
      <label for="ket"><strong>Keterangan:</strong></label>
      <textarea id="ket" v-model="keterangan" placeholder=""></textarea>
    </div>

    <button class="btn" :disabled="loading" @click="konfirmasi">
      {{ loading ? "Memproses..." : "Konfirmasi Permintaan" }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

/** ====== KONFIGURASI CEPAT ====== */
// Base URL Frappe (tanpa trailing slash)
const BASE_URL = import.meta.env.VITE_FRAPPE_BASE_URL || "http://localhost:8000";
// Doctype dan dokumen yang mau diambil
const DOCTYPE = "Employee";
const DOCNAME = "EMP-0001"; // ganti dengan employee id/dokumen aktif

// Jika pakai API Token (opsional). Kalau pakai session cookie, biarkan kosong.
const API_KEY = import.meta.env.VITE_FRAPPE_API_KEY || "";
const API_SECRET = import.meta.env.VITE_FRAPPE_API_SECRET || "";

/** ====== STATE ====== */
const nama = ref("");
const dept = ref("");
const tanggal = ref("");
const waktu = ref("");
const keterangan = ref("");
const loading = ref(false);
let timer;

/** ====== UTIL ====== */
function authHeaders() {
  const h = { "Content-Type": "application/json" };
  if (API_KEY && API_SECRET) {
    h["Authorization"] = `token ${API_KEY}:${API_SECRET}`;
  }
  return h;
}

function formatNow() {
  const now = new Date();
  // Paksa zona Asia/Jakarta agar konsisten dengan desain
  tanggal.value = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
  waktu.value = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Jakarta",
  });
}

function mapEmployee(data) {
  // Sesuaikan nama field sesuai Doctype-mu
  nama.value = data.employee_name ?? data.employee ?? "";
  dept.value = data.department ?? "";
}

/** ====== API ====== */
async function loadEmployee() {
  const url = `${BASE_URL}/api/resource/${DOCTYPE}/${encodeURIComponent(DOCNAME)}`;
  const res = await fetch(url, {
    method: "GET",
    headers: authHeaders(),
    // kalau pakai session cookie (login), aktifkan credentials:
    credentials: API_KEY ? "omit" : "include",
  });
  if (!res.ok) throw new Error(`Gagal ambil data: ${res.status}`);
  const json = await res.json();
  mapEmployee(json.data || {});
}

async function konfirmasi() {
  loading.value = true;
  try {
    // Contoh panggil whitelisted method di Frappe
    // Buat file python: my_app/api.py -> @frappe.whitelist() def confirm_request(employee, note): ...
    const url = `${BASE_URL}/api/method/my_app.api.confirm_request`;
    const payload = {
      employee: DOCNAME,
      note: keterangan.value || "",
      client_timestamp: new Date().toISOString(),
    };

    const res = await fetch(url, {
      method: "POST",
      headers: authHeaders(),
      credentials: API_KEY ? "omit" : "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Gagal konfirmasi: ${res.status}`);
    const json = await res.json();
    // Kamu bisa pakai frappe.msgprint di backend; di sini cukup alert sederhana
    alert("Permintaan dikonfirmasi ✅");
    keterangan.value = "";
  } catch (e) {
    console.error(e);
    alert(e.message || "Terjadi kesalahan");
  } finally {
    loading.value = false;
  }
}

/** ====== LIFECYCLE ====== */
onMounted(async () => {
  formatNow();
  timer = setInterval(formatNow, 1000);
  try {
    await loadEmployee();
  } catch (e) {
    console.error(e);
  }
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
/* Latar seperti sheet modal iOS */
.sheet {
  background: #e9e9eb;
  border-radius: 24px 24px 0 0;
  padding: 20px 20px 28px;
  max-width: 420px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #111;
  box-shadow: 0 -6px 20px rgba(0,0,0,0.06);
}

.grabber {
  width: 140px;
  height: 6px;
  background: #1c1c1e;
  opacity: 0.6;
  border-radius: 999px;
  margin: 0 auto 22px;
}

.info {
  margin-bottom: 20px;
}

.row {
  display: flex;
  gap: 12px;
  margin: 6px 0;
  font-size: 18px;
  line-height: 1.4;
}

.label {
  font-weight: 700;
  min-width: 86px;
}

.value {
  font-weight: 500;
}

.datetime {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 12px 0 18px;
  font-size: 18px;
}

.ket {
  margin: 10px 0 18px;
}

.ket label {
  display: block;
  margin-bottom: 8px;
  font-size: 20px;
}

textarea {
  width: 100%;
  height: 160px;
  padding: 12px;
  border: 2px dashed #4a4a4a;
  border-radius: 14px;
  resize: none;
  font-size: 16px;
  background: #f6f6f6;
  outline: none;
}

textarea:focus {
  border-color: #2f2f2f;
}

.btn {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 14px;
  background: #cfcfd3;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>

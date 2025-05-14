<template>
  <div>
    <h2>Profil HR</h2>

    <label>Nama Lengkap:</label>
    <input type="text" v-model="profile.full_name" />

    <label>Email:</label>
    <input type="email" v-model="profile.email" />

    <label>Jabatan:</label>
    <input type="text" v-model="profile.position" disabled />

    <button @click="saveProfile">Simpan</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getHRProfile, updateHRProfile } from "../hrpay/api/user.js";

const profile = ref({
  full_name: "",
  email: "",
  position: "HR",
});

onMounted(async () => {
  const data = await getHRProfile();
  if (data) profile.value = data;
});

async function saveProfile() {
  const response = await updateHRProfile(profile.value);
  if (response) {
    alert("Profil berhasil diperbarui!");
  } else {
    alert("Gagal memperbarui profil.");
  }
}
</script>
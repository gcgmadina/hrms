<template>
  <aside class="sidebar">
    <h2>Menu</h2>
    <ul>
      <li><router-link to="/dashboard">📊 Dashboard</router-link></li>
      <li><router-link to="/company-setup">🏢 Company</router-link></li>
      <li><router-link to="/employees">👥 Karyawan</router-link></li>
      <li><router-link to="/attendance">📅 Attendance</router-link></li>
      <li><router-link to="/leave-requests">📝 Leave Request</router-link></li>
      <li><router-link to="/payroll">💰 Payroll</router-link></li>
      <li><router-link to="/setup-user">⚙️ Setup User</router-link></li>
    </ul>
      <!-- Komponen Setup Perusahaan -->
    <!-- <CompanySetup /> -->

    <!-- Profil Pengguna di Paling Bawah -->
    <div class="user-profile">
      <!-- <img :src="user.profilePicture" alt="Profile Picture" class="profile-pic" /> -->
      <div class="user-info">
        <p>{{ user.name }}</p>
        <span>{{ user.role }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
// import CompanySetup from "../components/CompanySetup.vue";

const user = {
  name: "HR Manager",
  role: "HR",
  // profilePicture: "https://your-image-url.com/hr-profile.jpg" // Ganti dengan URL foto profil dari database
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #f0f0f0; /* Warna lebih netral */
  color: #333; /* Warna teks lebih lembut */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Pastikan tidak di tengah */
  border: none !important; /* Hilangkan border */
  box-shadow: none !important; /* Hilangkan shadow */
}

.sidebar ul li a {
  color: #333; /* Warna teks lebih netral */
}

.user-profile {
  padding: 15px;
  background: transparent; /* Hapus warna background */
  border: none !important;
}

</style>
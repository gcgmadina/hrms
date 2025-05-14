<template>
  <aside class="sidebar">
    <h2>Menu</h2>
    <ul>
      <li><router-link to="/dashboard">📊 Dashboard</router-link></li>
      <li><router-link to="/employees">👥 Karyawan</router-link></li>
      <li><router-link to="/attendance">📅 Attendance</router-link></li>
      <li><router-link to="/leave-requests">📝 Leave Request</router-link></li>
      <li><router-link to="/payroll">💰 Payroll</router-link></li>
      <li><router-link to="/setup-user">⚙️ Setup User</router-link></li>
    </ul>
      <!-- Komponen Setup Perusahaan -->
    <CompanySetup />

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
import CompanySetup from "../components/CompanySetup.vue";

const user = {
  name: "HR Manager",
  role: "HR",
  // profilePicture: "https://your-image-url.com/hr-profile.jpg" // Ganti dengan URL foto profil dari database
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.sidebar h2 {
  text-align: center;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar ul li {
  margin: 15px 0;
}
.sidebar ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: flex;
  align-items: center;
}
.sidebar ul li a:hover {
  text-decoration: underline;
}

/* Profil Pengguna */
.user-profile {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #34495e;
  border-radius: 10px;
}
.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.user-info p {
  font-size: 16px;
  font-weight: bold;
}
.user-info span {
  font-size: 14px;
  color: #bdc3c7;
}
</style>
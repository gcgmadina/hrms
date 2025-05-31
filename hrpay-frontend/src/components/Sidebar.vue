<template>
  <aside class="sidebar">
    <h2>Menu</h2>
    <ul>
      <li><router-link to="/dashboard">📊 Dashboard</router-link></li>
      <li><router-link to="/company-profile">🏢 Company</router-link></li>
      <li><router-link to="/employees">👥 Employee</router-link></li>
      <li><router-link to="/attendance">📅 Attendance</router-link></li>
      <li><router-link to="/leave-requests">📝 Leave Request</router-link></li>
      <li><router-link to="/payroll">💰 Payroll</router-link></li>
      <li><router-link to="/holiday">🎉 Holiday</router-link></li>
      <li><router-link to="/manage-role">⚙️ Manage Role</router-link></li>
      <li><router-link to="/manage-role">⚙️ HR Manager</router-link></li>
      <li><router-link to="/manage-role">⚙️ HR</router-link></li>
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
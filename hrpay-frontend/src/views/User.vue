<!-- src/views/User.vue -->
<template>
  <div class="user-management p-6">
    <h2 class="text-2xl font-bold mb-4">Manajemen Pengguna</h2>

    <!-- Daftar User -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Daftar Akun Absensi</h3>
      <table class="w-full border border-gray-300 rounded">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 text-left">Nama</th>
            <th class="p-2 text-left">Email</th>
            <th class="p-2 text-left">Role</th>
            <th class="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.name">
            <td class="p-2">{{ user.full_name }}</td>
            <td class="p-2">{{ user.email }}</td>
            <td class="p-2">{{ user.role }}</td>
            <td class="p-2">
              <span :class="user.enabled ? 'text-green-600' : 'text-red-600'">
                {{ user.enabled ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form Tambah User -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">Tambah User Baru</h3>
      <form @submit.prevent="addUser" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="newUser.full_name" type="text" placeholder="Nama Lengkap" class="input" required />
        <input v-model="newUser.email" type="email" placeholder="Email" class="input" required />
        <input v-model="newUser.password" type="password" placeholder="Password" class="input" required />
        <select v-model="newUser.role" class="input" required>
          <option disabled value="">Pilih Role</option>
          <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
        </select>
        <button type="submit" class="col-span-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded">
          Tambah User
        </button>
      </form>
    </div>

    <!-- Pengaturan Role -->
    <div>
      <h3 class="text-lg font-semibold mb-2">Pengaturan Role</h3>
      <Role />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Role from '@/components/Role.vue'
import frappeCall from '@/utils/frappeCall'

const users = ref([])
const roles = ref(['HR', 'Karyawan', 'Supervisor']) // sementara hardcoded

const newUser = ref({
  full_name: '',
  email: '',
  password: '',
  role: ''
})

async function fetchUsers() {
  const res = await frappeCall('frappe.desk.report.user.user_list.get_user_list', {}) // ganti dengan endpoint custom kalau perlu
  if (res.message) users.value = res.message
}

async function addUser() {
  const res = await frappeCall('your_custom_app.api.user.add_user', newUser.value)
  if (res.message === 'ok') {
    fetchUsers()
    newUser.value = { full_name: '', email: '', password: '', role: '' }
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.input {
  @apply border rounded p-2 w-full;
}
</style>

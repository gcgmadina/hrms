<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-4">Manage Roles</h1>
    <button @click="goToAdd" class="mb-4 px-4 py-2 bg-green-600 text-white rounded">Add Role</button>

    <table class="min-w-full bg-white border border-gray-300 rounded">
      <thead class="bg-gray-100">
        <tr>
          <th class="text-left px-4 py-2 border-b">Name</th>
          <th class="text-left px-4 py-2 border-b">ID</th>
          <th class="text-left px-4 py-2 border-b">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.name" class="hover:bg-gray-50">
          <td class="px-4 py-2 border-b">{{ role.name }}</td>
          <td class="px-4 py-2 border-b">{{ role.name }}</td>
          <td class="px-4 py-2 border-b">
            {{ role.disabled ? 'Inactive' : 'Active' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: []
    }
  },
  methods: {
    async fetchRoles() {
      try {
        const res = await fetch('/api/resource/Role?fields=["name","disabled"]');
        const data = await res.json();
        this.roles = data.data;
      } catch (err) {
        console.error('Gagal ambil role:', err);
      }
    },
    goToAdd() {
      this.$router.push('/add-role');
    }
  },
  mounted() {
    this.fetchRoles();
  }
}
</script>

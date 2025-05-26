<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Create New Role</h1>

    <div class="mb-4">
      <label class="block mb-1 font-medium">Role Name <span class="text-red-500">*</span></label>
      <input
        v-model="role_profile"
        type="text"
        class="w-full p-2 border border-gray-300 rounded"
        placeholder="Enter role name"
      />
    </div>

    <div class="mb-4">
      <label class="block mb-2 font-medium">Assign Permissions</label>
      <div class="flex gap-4 mb-2">
        <button @click="selectAll" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Select All</button>
        <button @click="unselectAll" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Unselect All</button>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto border p-3 rounded">
        <label v-for="perm in allPermissions" :key="perm" class="flex items-center gap-2">
          <input
            type="checkbox"
            :value="perm"
            v-model="selectedPermissions"
          />
          {{ perm }}
        </label>
      </div>
    </div>

    <div class="flex gap-2">
      <button
        @click="submitRole"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save Role
      </button>
      <button
        @click="cancel"
        class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role_profile: '',
      allPermissions: [
        'Accounts Manager', 'Item Manager', 'Stock Manager', 'Stock User',
        'Employee', 'HR Manager', 'Newsletter Manager', 'System Manager',
        'Sales User', 'Purchase User', 'Website Manager', 'Report Manager',
        'Prepared Report User', 'Script Manager', 'Workspace Manager',
        'Knowledge Base Editor', 'Knowledge Base Contributor', 'Guest', 'All'
      ],
      selectedPermissions: []
    }
  },
  methods: {
    selectAll() {
      this.selectedPermissions = [...this.allPermissions];
    },
    unselectAll() {
      this.selectedPermissions = [];
    },
    async submitRole() {
      try {
        const res = await fetch('/api/resource/Role', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.roleName,
            desk_access: 1
          })
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || 'Failed to create role');
        }

        this.$router.push('/manage-role');
      } catch (err) {
        console.error('Error creating role:', err);
        alert('Failed to create role: ' + err.message);
      }
    },
    cancel() {
      this.$router.push('/manage-role');
    }
  }
}
</script>

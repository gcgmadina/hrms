<template>
  <div class="role-manager">
    <h3>Tambah User Baru</h3>
    <form @submit.prevent="handleAddUser">
      <div>
        <label>Nama Lengkap:</label>
        <input v-model="form.full_name" type="text" required />
      </div>
      <div>
        <label>Email:</label>
        <input v-model="form.email" type="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="form.password" type="password" required />
      </div>
      <div>
        <label>Role:</label>
        <select v-model="form.role" required>
          <option v-for="role in roles" :key="role" :value="role">
            {{ role }}
          </option>
        </select>
      </div>
      <button type="submit">Tambah User</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { addUser, getRoles } from "../data/User";

const roles = ref([]);
const form = ref({
  full_name: "",
  email: "",
  password: "",
  role: ""
});

onMounted(async () => {
  roles.value = await getRoles();
});

const handleAddUser = async () => {
  const result = await addUser(form.value);
  if (result.success) {
    alert(result.message);
    form.value = { full_name: "", email: "", password: "", role: "" };
  } else {
    alert("Gagal: " + result.message);
  }
};
</script>

<style scoped>
.role-manager {
  padding: 20px;
  max-width: 400px;
}
form > div {
  margin-bottom: 12px;
}
input, select {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}
button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>

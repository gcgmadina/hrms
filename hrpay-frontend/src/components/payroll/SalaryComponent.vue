<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Komponen Gaji</h2>
      <button class="btn-primary" @click="openAdd">+ Tambah Komponen</button>
    </div>

    <!-- List Komponen Gaji -->
    <div v-if="components.length" class="grid gap-4">
      <div v-for="comp in components" :key="comp.name" class="border rounded-lg p-4 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <div class="font-semibold">{{ comp.component_name }}</div>
            <div class="text-sm text-gray-500">{{ comp.type }} - {{ comp.code }}</div>
            <div class="text-sm">
              Jumlah Tetap: <strong>{{ comp.is_fixed ? 'Ya' : 'Tidak' }}</strong>
            </div>
          </div>
          <button @click="openEdit(comp)" class="text-blue-600 hover:underline">Edit</button>
        </div>
      </div>
    </div>
    <div v-else class="text-gray-500">Belum ada komponen gaji</div>

    <!-- Modal Form -->
    <SalaryComponentForm
      v-if="showForm"
      :editData="editData"
      @close="closeForm"
      @saved="fetchComponents"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SalaryComponentForm from './SalaryCompForm.vue'

const components = ref([])
const showForm = ref(false)
const editData = ref(null)

const fetchComponents = async () => {
  try {
    const res = await fetch('https://localhost:8000/api/resource/Salary%20Component%20ID', {
      headers: {
        'Authorization': `Basic ${basicAuth}`
      }
    })
    const data = await res.json()
    components.value = data.data
  } catch (err) {
    alert('Gagal mengambil data komponen gaji!')
  }
}

const openAdd = () => {
  editData.value = null
  showForm.value = true
}

const openEdit = (item) => {
  editData.value = item
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
}

onMounted(fetchComponents)
</script>

<style scoped>
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700;
}
</style>

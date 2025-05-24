<template>
  <div class="form-card p-4 space-y-4 rounded-lg shadow-md bg-white">
    <button @click="$emit('goBack')"
        class="mb-4 px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 font-semibold rounded-xl shadow">Back</button>
    <h2 class="text-xl font-semibold mb-2">
      {{ editData ? 'Edit Komponen Gaji' : 'Tambah Komponen Gaji' }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label>Nama Komponen</label>
        <input v-model="form.componentName" type="text" class="input-field" required />
      </div>

      <div>
        <label>Jenis</label>
        <select v-model="form.type" class="input-field">
          <option value="Earning">Pendapatan (Earning)</option>
          <option value="Deduction">Potongan (Deduction)</option>
          <option value="Incentives">Insentif (Incentives)</option>
        </select>
      </div>

      <div>
        <label>Kode Komponen</label>
        <input v-model="form.code" type="text" class="input-field" required />
      </div>

      <div>
        <label>Jumlah Tetap?</label>
        <select v-model="form.isFixed" class="input-field">
          <option :value="1">Ya</option>
          <option :value="0">Tidak</option>
        </select>
      </div>

      <div>
        <label>Jumlah (Amount)</label>
        <div class="relative">
          <input v-model.number="form.amount" type="number" class="input-field pr-10" placeholder="Masukkan nominal atau persentase" />
          <span class="absolute right-3 top-2.5 text-gray-500">
            {{ form.isPercentage ? '%' : 'Rp' }}
          </span>
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <input id="isPercentage" v-model="form.isPercentage" type="checkbox" />
        <label for="isPercentage" class="text-sm">Gunakan Persentase (%)</label>
      </div>
    </div>

    <div class="flex justify-end mt-4 space-x-2">
      <button class="btn-secondary" @click="$emit('close')">Batal</button>
      <button class="btn-primary" @click="submitForm">
        {{ editData ? 'Update' : 'Simpan' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        componentName: "",
        type: "Earning",
        code: "",
        isFixed: 1,
        amount: 0,
        isPercentage: false
      }
    };
  },
  mounted() {
    if (this.editData) {
      this.form.componentName = this.editData.component_name;
      this.form.type = this.editData.type;
      this.form.code = this.editData.code;
      this.form.isFixed = this.editData.is_fixed ? 1 : 0;
      this.form.amount = this.editData.amount || 0;
      this.form.isPercentage = this.editData.is_percentage || false;
    }
  },
  methods: {
    async submitForm() {
      const url = this.editData
        ? `https://localhost:8000/api/resource/Salary%20Component%20ID/${this.editData.name}`
        : `https://localhost:8000/api/resource/Salary%20Component%20ID`;

      const method = this.editData ? "PUT" : "POST";

      try {
        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`
          },
          body: JSON.stringify({
            component_name: this.form.componentName,
            type: this.form.type,
            code: this.form.code,
            is_fixed: Boolean(this.form.isFixed),
            amount: this.form.amount,
            is_percentage: this.form.isPercentage
          })
        });

        if (!res.ok) throw new Error("Gagal menyimpan data komponen!");

        const data = await res.json();
        alert(`Komponen Gaji berhasil ${this.editData ? "diperbarui" : "ditambahkan"}!`);
        this.$emit('saved');
        this.$emit('close');
      } catch (err) {
        alert(err.message);
      }
    }
  }
};
</script>

<style scoped>
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400;
}
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700;
}
.btn-secondary {
  @apply px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400;
}
.form-card {
  @apply max-w-3xl mx-auto bg-white;
}
</style>

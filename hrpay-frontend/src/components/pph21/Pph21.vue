<template>
  <div class="pph21-view p-4">
    <h1 class="text-2xl font-semibold mb-4">Pengaturan PPH21</h1>

    <!-- Tarif Umum -->
    <section class="mb-6">
      <h2 class="text-xl font-medium mb-2">Tarif Umum</h2>
      <table class="w-full border">
        <thead>
          <tr class="bg-gray-100">
            <th class="text-left p-2 border">Batas Bawah</th>
            <th class="text-left p-2 border">Batas Atas</th>
            <th class="text-left p-2 border">Persentase (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tarif, index) in tarifUmum" :key="index">
            <td class="p-2 border">{{ tarif.min_income }}</td>
            <td class="p-2 border">{{ tarif.max_income }}</td>
            <td class="p-2 border">{{ tarif.percentage }}%</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Kategori TK/K -->
    <section class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-xl font-medium">Kategori TK/K</h2>
        <button @click="addCategory" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Tambah Kategori
        </button>
      </div>
      <table class="w-full border">
        <thead>
          <tr class="bg-gray-100">
            <th class="text-left p-2 border">Kode</th>
            <th class="text-left p-2 border">Jumlah Tanggungan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(kat, index) in kategoriTK" :key="index">
            <td class="p-2 border">{{ kat.kode }}</td>
            <td class="p-2 border">{{ kat.tanggungan }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Tombol tambah tarif -->
    <div class="text-right">
      <button @click="addTarif" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Tambah Tarif
      </button>
    </div>
  </div>
</template>

<script>
import frappeCall from "@/utils/frappeCall";

export default {
  data() {
    return {
      tarifUmum: [],
      kategoriTK: []
    };
  },
  async mounted() {
    await this.fetchTarif();
    await this.fetchKategori();
  },
  methods: {
    async fetchTarif() {
      try {
        const res = await frappeCall("hrpay.api.pph21.get_tarif_umum");
        this.tarifUmum = res.message || [];
      } catch (err) {
        console.error("Gagal fetch tarif:", err);
      }
    },
    async fetchKategori() {
      try {
        const res = await frappeCall("hrpay.api.pph21.get_kategori_tk");
        this.kategoriTK = res.message || [];
      } catch (err) {
        console.error("Gagal fetch kategori:", err);
      }
    },
    addCategory() {
      console.log("Tambah kategori diklik");
      // buka komponen atau form nanti
    },
    addTarif() {
      console.log("Tambah tarif diklik");
      // buka komponen atau form nanti
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
}
</style>

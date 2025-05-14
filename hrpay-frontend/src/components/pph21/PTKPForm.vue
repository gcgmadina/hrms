<template>
  <div>
    <h3>Tambah Tarif PTKP</h3>
    <label>Kategori:</label>
    <select v-model="kategori">
      <option value="TK">TK</option>
      <option value="K">K</option>
    </select>

    <label>Jumlah Tanggungan:</label>
    <input type="number" v-model="tanggungan" min="0" max="3" />

    <label>Range Penghasilan:</label>
    <input type="number" v-model="min" placeholder="Dari (Rp)" />
    <input type="number" v-model="max" placeholder="Sampai (Rp)" />

    <button @click="savePTKP">Simpan</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kategori: "TK",
      tanggungan: 0,
      min: 0,
      max: 0,
    };
  },
  methods: {
    savePTKP() {
      this.$emit("ptkpAdded", { kategori: this.kategori, tanggungan: this.tanggungan, min: this.min, max: this.max });
      this.kategori = "TK";
      this.tanggungan = 0;
      this.min = 0;
      this.max = 0;
    },
  },
};
</script>
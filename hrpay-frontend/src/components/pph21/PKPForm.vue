<template>
  <div>
    <h3>Tambah Tarif PKP</h3>
    <label>Range PKP:</label>
    <input type="number" v-model="min" placeholder="Dari (Rp)" />
    <input type="number" v-model="max" placeholder="Sampai (Rp)" />

    <label>Tarif Pajak:</label>
    <input type="number" v-model="tarif" placeholder="Tarif (%)" />

    <button @click="savePKP">Simpan</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      min: 0,
      max: 0,
      tarif: 5,
    };
  },
  methods: {
    savePKP() {
      this.$emit("pkpAdded", { min: this.min, max: this.max, tarif: this.tarif });
      this.min = 0;
      this.max = 0;
      this.tarif = 5;
    },
  },
};
</script>
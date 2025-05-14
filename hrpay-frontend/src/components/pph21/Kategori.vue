<template>
  <div>
    <h3>Tambah Kategori</h3>
    <input type="text" v-model="nama" placeholder="Nama Kategori (Kawin/Tidak Kawin)" />
    <input type="text" v-model="kode" placeholder="Kode (K/TK)" />
    <button @click="saveKategori">Simpan</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nama: "",
      kode: "",
    };
  },
  methods: {
    saveKategori() {
      this.$emit("kategoriAdded", { nama: this.nama, kode: this.kode });
      this.nama = "";
      this.kode = "";
    },
  },
};
</script>
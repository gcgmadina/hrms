<template>
  <div>
    <h2>Manajemen PPh 21</h2>

    <!-- Form Penambahan Kategori -->
    <KategoriForm @kategoriAdded="addKategori" />

    <!-- Form Penambahan Tarif PTKP -->
    <PTKPForm @ptkpAdded="addPTKP" />

    <!-- Form Penambahan Tarif PKP -->
    <PKPForm @pkpAdded="addPKP" />

    <!-- Tabel Data Kategori -->
    <h3>Daftar Kategori</h3>
    <table border="1">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Kode</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in kategoriList" :key="index">
          <td>{{ item.nama }}</td>
          <td>{{ item.kode }}</td>
          <td>
            <button @click="deleteKategori(index)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Tabel Data Tarif PTKP -->
    <h3>Daftar Tarif PTKP</h3>
    <table border="1">
      <thead>
        <tr>
          <th>Kategori</th>
          <th>Tanggungan</th>
          <th>Range Penghasilan</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in ptkpList" :key="index">
          <td>{{ item.kategori }}</td>
          <td>{{ item.tanggungan }}</td>
          <td>Rp{{ formatCurrency(item.min) }} - Rp{{ formatCurrency(item.max) }}</td>
          <td>
            <button @click="deletePTKP(index)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Tabel Data Tarif PKP -->
    <h3>Daftar Tarif PKP</h3>
    <table border="1">
      <thead>
        <tr>
          <th>Range PKP</th>
          <th>Tarif Pajak</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in pkpList" :key="index">
          <td>Rp{{ formatCurrency(item.min) }} - Rp{{ formatCurrency(item.max) }}</td>
          <td>{{ item.tarif }}%</td>
          <td>
            <button @click="deletePKP(index)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import KategoriForm from "./KategoriForm.vue";
import PTKPForm from "./PTKPForm.vue";
import PKPForm from "./PKPForm.vue";

export default {
  components: {
    KategoriForm,
    PTKPForm,
    PKPForm,
  },
  data() {
    return {
      kategoriList: [],
      ptkpList: [],
      pkpList: [],
    };
  },
  methods: {
    addKategori(newKategori) {
      this.kategoriList.push(newKategori);
    },
    deleteKategori(index) {
      this.kategoriList.splice(index, 1);
    },
    addPTKP(newPTKP) {
      this.ptkpList.push(newPTKP);
    },
    deletePTKP(index) {
      this.ptkpList.splice(index, 1);
    },
    addPKP(newPKP) {
      this.pkpList.push(newPKP);
    },
    deletePKP(index) {
      this.pkpList.splice(index, 1);
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);
    },
  },
};
</script>
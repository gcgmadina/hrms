<template>
  <div>
    <h3>Dependents</h3>
    <table border="1">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Hubungan</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dependent, index) in dependents" :key="index">
          <td>{{ dependent.name }}</td>
          <td>{{ dependent.relationship }}</td>
          <td>
            <button @click="removeDependent(index)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <input type="text" v-model="newDependent.name" placeholder="Nama Tanggungan" />
    <select v-model="newDependent.relationship">
      <option value="anak">Anak</option>
      <option value="istri">Istri</option>
      <option value="lainnta">Lainnya</option>
    </select>
    <button @click="addDependent">Tambah</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dependents: [],
      newDependent: { name: "", relationship: "anak" },
    };
  },
  methods: {
    addDependent() {
      if (this.dependents.length < 3) {
        this.dependents.push({ ...this.newDependent });
        this.$emit("dependentsUpdated", this.dependents.length);
        this.newDependent = { name: "", relationship: "anak" };
      } else {
        alert("Maksimal 3 tanggungan!");
      }
    },
    removeDependent(index) {
      this.dependents.splice(index, 1);
      this.$emit("dependentsUpdated", this.dependents.length);
    },
  },
};
</script>
<template>
  <div class="dependent-container">
    <h3 class="title">Dependents </h3>

    <table class="dependent-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Relation</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dependent, index) in dependents" :key="index">
          <td>{{ dependent.name }}</td>
          <td>{{ dependent.relationship }}</td>
          <td>
            <button class="delete-btn" @click="removeDependent(index)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="form-row">
      <input type="text" v-model="newDependent.name" placeholder="Nama Tanggungan" class="input-field"/>
      <select v-model="newDependent.relationship" class="input-dropdown">
        <option value="anak">Child</option>
        <option v-if="maritalStatus === 'Married'" value="istri">Wife</option>
        <option v-if="maritalStatus === 'Married'" value="suami">Husband</option>
        <option value="lainnya">Other...</option>
      </select>
      <button class="add-btn" @click="addDependent">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maritalStatus: {
      type: String,
      required: true
    },
   }, // Ambil status pernikahan dari form utama
  data() {
    return {
      dependents: [],
      newDependent: { name: "", relationship: "anak" }
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
    }
  }
};
</script>

<style>
.dependent-container {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 12px;
}

.dependent-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

tr:hover {
  background-color: #f9f9f9;
}

.form-row {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 16px;
}

.input-field, .input-dropdown {
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 8px;
  font-size: 16px;
}

.add-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
}

.add-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
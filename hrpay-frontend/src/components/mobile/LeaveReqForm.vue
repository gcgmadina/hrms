<template>
  <form @submit.prevent="submitForm" class="form-container">
    <div class="form-field" v-for="field in fields" :key="field.name"
        v-show="field.name !== 'half_day_date' || form.half_day">
      <label :for="field.name">{{ field.label }}</label>

      <input
        v-if="field.type === 'Data'"
        :type="field.name === 'attachment' ? 'file' : 'text'"
        :id="field.name"
        v-model="form[field.name]"
      />

      <input
        v-if="field.type === 'Date'"
        type="date"
        :id="field.name"
        v-model="form[field.name]"
      />

      <input
        v-if="field.type === 'Int'"
        type="number"
        :id="field.name"
        v-model.number="form[field.name]"
      />

      <select
        v-if="field.type === 'Select'"
        :id="field.name"
        v-model="form[field.name]"
      >
        <option disabled value="">-- Select --</option>
        <option v-for="opt in leaveTypes" :key="opt" :value="opt">{{ opt }}</option>
      </select>

      <input
        v-if="field.type === 'Check'"
        type="checkbox"
        :id="field.name"
        v-model="form[field.name]"
      />
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: '',
        employee_name: '',
        job_position: '',
        department: '',
        leave_type: '',
        from_date: '',
        to_date: '',
        half_day: false,
        half_day_date: '',
        leave_bal: 0,
        description: '',
        leave_approver: '',
        attachment: ''
      },
      leaveTypes: ['Cuti Tahunan', 'Sakit', 'Cuti Melahirkan', 'Izin'], // bisa diubah sesuai di ERP
      fields: [
        { label: 'ID', name: 'id', type: 'Data' },
        { label: 'Employee Name', name: 'employee_name', type: 'Data' },
        { label: 'Position', name: 'job_position', type: 'Data' },
        { label: 'Department', name: 'department', type: 'Data' },
        { label: 'Leave Type', name: 'leave_type', type: 'Select' },
        { label: 'From', name: 'from_date', type: 'Date' },
        { label: 'To', name: 'to_date', type: 'Date' },
        { label: 'Half Day', name: 'half_day', type: 'Check' },
        { label: 'Half Day Date', name: 'half_day_date', type: 'Date' },
        { label: 'Leave Balance', name: 'leave_bal', type: 'Int' },
        { label: 'Description', name: 'description', type: 'Data' },
        { label: 'Approver', name: 'leave_approver', type: 'Data' },
        { label: 'Attachment', name: 'attachment', type: 'Data' }
      ]
    };
  },
  methods: {
    submitForm() {
      console.log("Submitting form data:", this.form);
      // Kirim ke backend pakai API kalau perlu
    }
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
}

.form-field {
  display: flex;
  flex-direction: column;
}
</style>

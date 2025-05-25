<!-- src/components/Notification.vue -->
<template>
  <transition name="fade">
    <div v-if="visible" :class="['notification', type]">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: String,
    type: {
      type: String,
      default: 'info' // success, error, warning, info
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      visible: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.visible = false
      this.$emit('close')
    }, this.duration)
  }
}
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 16px 24px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 9999;
}
.success {
  background-color: #4caf50;
}
.error {
  background-color: #f44336;
}
.warning {
  background-color: #ff9800;
}
.info {
  background-color: #2196f3;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <v-alert
    color="red"
    dense
    elevation="3"
    outlined
    text
    type="error"
    @input="onClose"
  >{{ text }}
  </v-alert>
</template>
<script>
export default {
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" v-if="signInErr">
      <app-alert @dismissed="onDismiss" :text="signInErr.message"></app-alert>
    </v-col>
    <v-col xs="12" md="8" offset-md="2">
      <v-card
        class="mx-auto px-16 py-5"
        width="444"
      >
        <h1 class="text-center">Sign In Account</h1>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="onSignIn"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show = !show"
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="onSignIn"
            block
            :loading="isLoading"
          >
            Sign Up
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    show: false,
    password: '',
    valid: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      value => !!value || 'Password is required.',
      v => v.length >= 8 || 'Min 8 characters'
    ],
    feedback: ''
  }),
  methods: {
    onSignIn () {
      this.$refs.form.validate()
      this.feedback = ''
      if (this.password && this.email) {
        const data = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('signUserIn', data)
      }
    },
    onDismiss () {
      console.log(this.signInErr)
      this.$store.dispatch('clearErr')
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    signInErr () {
      return this.$store.getters.getAuthErr
    },
    isLoading () {
      return this.$store.getters.getLoading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push({ name: 'Home' })
      }
    }
  },
  created () {
    this.$store.dispatch('clearErr')
  }
}
</script>

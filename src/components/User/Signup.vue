<template>
  <v-row>
    <v-col cols="12" v-if="signUpErr">
      <app-alert @dismissed="onDismiss" :text="signUpErr.message"></app-alert>
    </v-col>
    <v-col xs="12" md="8" offset-md="2">
      <v-card
        class="mx-auto px-16 py-5"
        width="444"
      >
        <h1 class="text-center">Register Account</h1>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="onSignUp"
        >
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

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
          <v-text-field
            v-model="confirmPassword"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            name="password"
            label="Confirm Password"
            hint="At least 8 characters"
            counter
            @click:append="show = !show"
            class="mb-4"
          ></v-text-field>
          <h5 class="red--text text-center text--lighten-1">{{ comparePasswords }}</h5>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="onSignUp"
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
    confirmPassword: '',
    valid: false,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
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
    onSignUp () {
      this.$refs.form.validate()
      this.feedback = ''
      if (this.name && this.email && this.password && this.confirmPassword) {
        const data = {
          email: this.email,
          password: this.password,
          username: this.name
        }
        this.$store.dispatch('signUserUp', data)
      }
    },
    onDismiss () {
      console.log('Dismissed alert!')
      this.$store.dispatch('clearErr')
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    },
    user () {
      return this.$store.getters.getUser
    },
    signUpErr () {
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
    },
    signUpErr (value) {
      return this.$store.getters.getAuthErr
    }
  },
  created () {
    this.$store.dispatch('clearErr')
  }
}
</script>

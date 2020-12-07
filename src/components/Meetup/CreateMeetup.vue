<template>
  <v-app>
    <v-card
      class="mt-2"
      flat
    >
      <template v-slot:progress>
        <v-progress-linear
          absolute
          color="green lighten-3"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-img
        :src="imageURL"
        width="400"
        class="ml-auto mr-auto"
      >
        <v-row>
          <v-row
            align="center"
            justify="center"
          >
            <v-col class="text-center pt-0">
              <h3>
                {{ location }}
              </h3>
              <span class="grey--text text--lighten-1">{{ date }}</span>
            </v-col>
          </v-row>
        </v-row>
      </v-img>
      <v-form @submit.prevent="onCreateMeetup">
        <v-container>
          <v-row
            justify="space-around"
            align="center"
          >
            <v-date-picker v-model="date"
                           elevation="10"
                           class="mb-3"
            ></v-date-picker>
            <v-time-picker
              v-model="time"
              elevation="10"
              format="ampm"
            ></v-time-picker>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="location"
                :disabled="isUpdating"
                filled
                :rules="locationNameRules"
                :counter="50"
                required
                color="blue-grey lighten-2"
                label="Location Name*"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-file-input
                :rules="imageRules"
                placeholder="Pick an image"
                prepend-icon="mdi-camera"
                label="Image"
                :disabled="isUpdating"
                accept="image/*"
                filled
                @change="onPickFile"
              ></v-file-input>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="title"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Title*"
                :rules="titleRule"
                :counter="100"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                filled
                name="input-7-4"
                label="Description"
                value=""
                v-model="description"
              ></v-textarea>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
            </v-col>
          </v-row>
          <p v-if="feedback" class="text-center" style="color: #ff0000;">{{ feedback }}</p>
          <v-btn
            block
            elevation="2"
            large
            @click="onCreateMeetup"
          >Post
          </v-btn>
        </v-container>
      </v-form>
      <v-divider></v-divider>
    </v-card>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      isUpdating: false,
      imageURL: '',
      image: null,
      location: '',
      title: '',
      description: '',
      date: '',
      time: '',
      locationNameRules: [
        v => !!v || 'Location name is required',
        v => v.length <= 50 || 'Location name must be less than 50 characters'
      ],
      titleRule: [
        v => !!v || 'Title is required',
        v => v.length <= 100 || 'Title must be less than 100 characters'
      ],
      imageRules: [
        value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!'
      ],
      isFileValid: false,
      feedback: null
    }
  },
  methods: {
    onCreateMeetup () {
      const payload = {
        id: this.$store.getters.getUser,
        author_id: this.$store.getters.getUser.id,
        author_name: this.$store.getters.getUser.username,
        date: this.date,
        image: this.image,
        description: this.description,
        place: this.location,
        title: this.title,
        time: this.time,
        timestamp: new Date(this.date + ' ' + this.time).valueOf()
      }
      if (!this.isFileValid) {
        return alert('Please add valid file')
      }
      if (this.date && this.location && this.image && this.title && this.description && this.time && this.date) {
        this.$store.dispatch('createMeetup', payload)
        this.$router.push({
          name: 'Home'
        })
      } else {
        this.feedback = 'You must fill all field'
      }
    },
    onPickFile (file) {
      if (!file) {
        this.isFileValid = false
        return false
      }
      const filename = file.name
      const allowedFileExtensions = /(\.jpeg|\.jpg|\.gif|\.png)$/i
      if (!allowedFileExtensions.test(filename)) {
        this.isFileValid = false
        return alert('Please add valid file. .jpeg .jpg .gif .png')
      }
      this.isFileValid = true
      this.image = file
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.imageURL = fileReader.result
      }
      fileReader.readAsDataURL(file)
    }
  },
  created () {
  }
}
</script>

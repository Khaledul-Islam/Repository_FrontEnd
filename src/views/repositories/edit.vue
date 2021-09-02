<template>
  <v-row justify="center">
    <v-dialog v-model="editdialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Update Developer</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="devdata.developerName" required label="Developer Name"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="close()" text> Close </v-btn>
          <v-btn color="blue darken-1" @click="Update()" text> Update </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Axios from 'axios'
import { commonConfig, postConfig } from '../../../public/ApiLib'
import { RepositoryAPI } from '../../../public/config'
export default {
  data: () => ({
    editdialog: true,
  }),

  methods: {
    Update() {
      this.editBody = {
        path: '/Developer/UpdateDeveloper',
        method: 'POST',
        data: {
          developerID: '',
          developerName: '',
        },
      }
      let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.editBody.path
      this.editBody.data.developerID = this.devdata.developerID
      this.editBody.data.developerName = this.devdata.developerName

      Axios.post(requestPath, this.editBody.data)
        .then(response => {
          if (response['data']) {
            this.$root.snackbar.setsuccesstext('Data updated successfully')
            this.close()
          }
        })
        .catch(e => {
          this.$root.snackbar.seterrortext(e)
        })
    },
    close() {
      this.$emit('closeeditdialog', !this.value)
    },
  },

  created() {},
  computed: {
    devdata: {
      get() {
        return this.$store.state.DevelopersInfoData.developerdata
      },
    },
  },
  watch: {
    devdata: {
      deep: true,
      handler(newValue) {
        this.$store.commit('setdeveloperInfo', newValue)
      },
    },
  },
}
</script>
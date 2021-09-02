<template>
  <v-row justify="center">
    <v-dialog v-model="editdialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Update Client</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field v-model="clientdata.client_Name" required label="Client Name"></v-text-field>
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
        path: '/Client/UpdateClient',
        method: 'POST',
        data: {
          clientID: '',
          client_Name: '',
        },
      }
      let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.editBody.path
      this.editBody.data.clientID = this.clientdata.clientID
      this.editBody.data.client_Name = this.clientdata.client_Name

      Axios.post(requestPath, this.editBody.data)
        .then(response => {
          if (response['data']) {
            this.$root.snackbar.setsuccesstext('Data updated successfully')
            this.close()
          }
        })
        .catch(e => {
          this.$root.snackbar.seterrortext(e)
          this.editdialog = false
        })
    },
    close() {
      this.$emit('closeeditdialog', !this.value)
    },

    rowClick: function (item, row) {
      row.select(true)
      this.selectedId = item.GROUP_ID
      this.selectedItem = item
    },
  },

  created() {},
  computed: {
    clientdata: {
      get() {
        return this.$store.state.ClientsInfoData.clientdata
      },
    },
  },
  watch: {
    clientdata: {
      deep: true,
      handler(newValue) {
        this.$store.commit('setClientInfo', newValue)
      },
    },
  },
}
</script>
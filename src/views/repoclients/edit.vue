<template>
  <ValidationObserver ref="form_observer">
    <v-row justify="center">
      <v-dialog v-model="editdialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Update RepoClient</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <ValidationProvider name="Repositories" :rules="{ required: true }">
                    <v-autocomplete
                      clearable
                      hint="Enter Repository List"
                      :items="repoList"
                      item-text="repositoryName"
                      item-value="id"
                      label="Repositories"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                      v-model="repoclientdata.repoID"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="6">
                  <ValidationProvider name="Clients" :rules="{ required: true }">
                    <v-autocomplete
                      clearable
                      hint="Enter Repository Type"
                      :items="clientList"
                      item-text="client_Name"
                      item-value="clientID"
                      label="Clients"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                      v-model="repoclientdata.clientID"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <DatePickerWithText v-model="repoclientdata.dates" dateLabel="Date" :requiredRules="true" />
                </v-col>
              </v-row>
              <v-row> </v-row>
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
  </ValidationObserver>
</template>

<script>
var repositoryListAPIBodyData = {
  path: '/Repositories/GetRepositories',
  method: 'GET',
  data: {},
}
var clientListAPIBodyData = {
  path: '/Client/GetClientList',
  method: 'GET',
  data: {},
}

import Axios from 'axios'
import { commonConfig } from '../../../public/ApiLib'
import { RepositoryAPI } from '../../../public/config'
export default {
  data: () => ({
    editdialog: true,
    repoList: [],
    clientList: [],
    repositoryListAPIBody: repositoryListAPIBodyData,
    clientListAPIBody: clientListAPIBodyData,
  }),
  methods: {
    GetClientList() {
      let config = commonConfig(this.clientListAPIBody, RepositoryAPI)
      Axios(config)
        .then(response => {
          this.clientList = response['data']
        })
        .catch(error => {
          this.$root.snackbar.seterrortext(error)
        })
    },
    GetRepositoryList() {
      let config = commonConfig(this.repositoryListAPIBody, RepositoryAPI)
      Axios(config)
        .then(response => {
          this.repoList = response['data']
        })
        .catch(error => {
          this.$root.snackbar.seterrortext(error)
        })
    },
    async Update() {
      let isValid = await this.$refs['form_observer'].validate()
      if (!isValid) {
        this.$root.snackbar.seterrortext('Please Fill The Required Field')
      } else {
        this.$emit('SetEditItem', this.repoclientdata)
        this.close()
      }
    },

    close() {
      this.$emit('closeeditdialog', !this.value)
    },
  },

  created() {
    this.GetClientList()
    this.GetRepositoryList()
  },
  computed: {
    repoclientdata: {
      get() {
        return this.$store.state.RepoClientInfoData.repoclientdata
      },
    },
  },
  watch: {
    repoclientdata: {
      deep: true,
      handler(newValue) {
        this.$store.commit('setrepoclientInfo', newValue)
      },
    },
  },
}
</script>
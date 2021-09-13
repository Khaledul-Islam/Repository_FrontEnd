<template>
  <ValidationObserver ref="form_observer">
    <v-row justify="center">
      <v-dialog v-model="editdialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">HandOver</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <ValidationProvider name="Project Name" :rules="{ required: true }">
                    <v-autocomplete
                      clearable
                      hint="Enter Project Name"
                      :items="repoList"
                      item-text="repositoryName"
                      item-value="id"
                      label="Project"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                      v-model="handoverdata.repoID"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4">
                  <ValidationProvider name="Developer" :rules="{ required: true }">
                    <v-autocomplete
                      disabled
                      :items="developerList"
                      item-text="developerName"
                      item-value="developerID"
                      label="Current Developers"
                      v-model="handoverdata.devID"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4">
                  <DatePickerWithText v-model="handoverdata.assignDate" dateLabel="Assign Date" :requiredRules="true" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <ValidationProvider name="Developer" :rules="{ required: true }">
                    <v-autocomplete
                      clearable
                      :items="developerList"
                      item-text="developerName"
                      item-value="developerID"
                      label="New Developers"
                      v-model="handoverdata.newDev"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="6">
                  <DatePickerWithText v-model="handoverdata.newDate" dateLabel="Date" :requiredRules="true" />
                </v-col>
              </v-row>
              <v-row> </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="close()" text> Close </v-btn>
            <v-btn color="blue darken-1" @click="Update()" text> Handover </v-btn>
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
var developerListAPIBodyData = {
  path: '/Developer/GetDeveloperList',
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
    developerList: [],
    repositoryListAPIBody: repositoryListAPIBodyData,
    developerListAPIBody: developerListAPIBodyData,
  }),
  methods: {
    GetDeveloperList() {
      let config = commonConfig(this.developerListAPIBody, RepositoryAPI)
      Axios(config)
        .then(response => {
          this.developerList = response['data']
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
        this.$emit('SetEditItem', this.handoverdata)
        this.close()
      }
    },

    close() {
      this.$emit('closeeditdialog', !this.value)
    },
  },

  created() {
    this.GetDeveloperList()
    this.GetRepositoryList()
  },
  computed: {
    handoverdata: {
      get() {
        return this.$store.state.HandoverInfoData.handoverdata
      },
    },
  },
  watch: {
    handoverdata: {
      deep: true,
      handler(newValue) {
        this.$store.commit('sethandoverInfo', newValue)
      },
    },
  },
}
</script>
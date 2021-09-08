<template>
  <ValidationObserver ref="form_observer">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Create Repository Developer</span>
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
                      v-model="repodev.repoList"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="6">
                  <ValidationProvider name="Developer" :rules="{ required: true }">
                    <v-autocomplete
                      clearable
                      hint="Enter Developer List"
                      :items="developerList"
                      item-text="developerName"
                      item-value="developerID"
                      label="Developers"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                      v-model="repodev.developerList"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <DatePickerWithText v-model="repodev.assignDate" dateLabel="Assign Date" :requiredRules="true" />
                </v-col>
                <v-col cols="12" md="6">
                  <ValidationProvider name="assign Form" :rules="{ required: false }">
                    <v-text-field
                      v-model="repodev.assignForm"
                      label="Assign Form"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row> </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="close()" text> Close </v-btn>
            <v-btn color="blue darken-1" @click="sendItemToParent()" text> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </ValidationObserver>
</template>

<script>
import Axios from 'axios'
import { commonConfig, postConfig } from '../../../public/ApiLib'
import { RepositoryAPI } from '../../../public/config.js'

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
export default {
  data: () => ({
    dialog: true,
    repoList: [],
    developerList: [],
    repositoryListAPIBody: repositoryListAPIBodyData,
    developerListAPIBody: developerListAPIBodyData,
    repodev: {
      repoList: null,
      developerList: null,
      assignDate: null,
      assignForm: null,
      isFirstAssign: true,
    },
  }),
  methods: {
    close() {
      this.$emit('closedialog', !this.value)
    },
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
    async sendItemToParent() {
      let isValid = await this.$refs['form_observer'].validate()
      if (!isValid) {
        this.$root.snackbar.seterrortext('Please Fill The Required Field')
      } else {
        this.$emit('SetItem', this.repodev)
        this.close()
      }
    },
  },
  created() {
    this.GetDeveloperList()
    this.GetRepositoryList()
  },
}
</script>
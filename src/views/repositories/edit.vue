<template>
  <ValidationObserver ref="form_observer">
    <v-row justify="center">
      <v-dialog v-model="editdialog" persistent max-width="800px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Update Repositories</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <ValidationProvider name="Repository Name" :rules="{ required: true, max: 50 }">
                    <v-text-field
                      hint="Enter Repository Name"
                      v-model="repodata.repositoryName"
                      required
                      label="Repository Name"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4">
                  <ValidationProvider name="Repository Type" :rules="{ required: true, max: 50 }">
                    <v-autocomplete
                      clearable
                      hint="Enter Repository Type"
                      :items="repoTypeList"
                      item-text="Name"
                      item-value="id"
                      label="Repository Type"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                      v-model="repodata.repoType"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4">
                  <ValidationProvider name="Technology" :rules="{ required: true, max: 50 }">
                    <v-text-field
                      v-model="repodata.toolsTech"
                      required
                      label="Technology"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <ValidationProvider name="URL" :rules="{ required: true, max: 50 }">
                    <v-text-field
                      v-model="repodata.url"
                      required
                      label="URL"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <!-- <v-col cols="12" md="6">
                  <DatePickerWithText v-model="repository.createDate" dateLabel="Create Date" :requiredRules="true" />
                </v-col> -->
                <v-col cols="12" md="6">
                  <DatePickerWithText v-model="repodata.lastUpdate" dateLabel="Date" :requiredRules="true" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <ValidationProvider name="Comments" :rules="{ required: false, max: 100 }">
                    <v-text-field
                      v-model="repodata.comments"
                      required
                      label="Comments"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                    ></v-text-field>
                  </ValidationProvider>
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
  </ValidationObserver>
</template>

<script>
import Axios from 'axios'
import { commonConfig, postConfig } from '../../../public/ApiLib'
import { RepositoryAPI } from '../../../public/config'
export default {
  data: () => ({
    repoTypeList: [
      {
        id: 'GIT',
        Name: 'GIT',
      },
      {
        id: 'SVN',
        Name: 'SVN',
      },
      {
        id: 'Azure',
        Name: 'Azure',
      },
      {
        id: 'TFS',
        Name: 'TFS',
      },
    ],
    editdialog: true,
  }),
  methods: {
    async Update() {
      let isValid = await this.$refs['form_observer'].validate()
      if (!isValid) {
        this.$root.snackbar.seterrortext('Please Fill The Required Field')
      } else {
        this.UpdateAPICall()
        this.close()
      }
    },
    UpdateAPICall() {
      this.editBody = {
        path: '/Repositories/UpdateRepository',
        method: 'POST',
        data: {
          id: '',
          repositoryName: '',
          url: '',
          toolsTech: '',
          comments: '',
          repoType: '',
          createDate: '',
          createDate: '',
          lastUpdate: '',
        },
      }
      let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.editBody.path
      this.editBody.data = this.repodata

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
    repodata: {
      get() {
        return this.$store.state.RepositoryInfoData.repositorydata
      },
    },
  },
  watch: {
    repodata: {
      deep: true,
      handler(newValue) {
        this.$store.commit('setrepositoryInfo', newValue)
      },
    },
  },
}
</script>
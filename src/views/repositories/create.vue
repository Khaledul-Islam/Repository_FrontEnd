<template>
  <ValidationObserver ref="form_observer">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Create Repositories</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <ValidationProvider name="Repository Name" :rules="{ required: true, max: 50 }">
                    <v-text-field
                      hint="Enter Repository Name"
                      v-model="repository.repositoryname"
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
                      v-model="repository.repoType"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4">
                  <ValidationProvider name="Technology" :rules="{ required: true, max: 50 }">
                    <v-text-field
                      v-model="repository.toolsTech"
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
                  <ValidationProvider name="URL" :rules="{required: true, max: 200 }">
                    <v-text-field
                      v-model="repository.url"
                      required
                      label="URL"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="6">
                  <DatePickerWithText v-model="repository.createDate" dateLabel="Create Date" :requiredRules="true" />
                </v-col>
                <!-- <v-col cols="12" md="4">
                  <DatePickerWithText
                    v-model="repository.lastUpdate"
                    dateLabel="Last update"
                    :requiredRules="requiredDate"
                  />
                </v-col> -->
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <ValidationProvider name="Comments" :rules="{ required: false, max: 100 }">
                    <v-text-field
                      v-model="repository.comments"
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
            <v-btn color="blue darken-1" @click="sendItemToParent()" text> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </ValidationObserver>
</template>

<script>
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
    dialog: true,
    repository: {
      //
      repositoryName: null,
      url: null,
      toolsTech: null,
      comments: null,
      repoType: null,
      createDate: null,
      lastUpdate: null,
    },
  }),
  methods: {
    close() {
      this.$emit('closedialog', !this.value)
    },
    async sendItemToParent() {
      let isValid = await this.$refs['form_observer'].validate()
      if (!isValid) {
        this.$root.snackbar.seterrortext('Please Fill The Required Field')
      } else {
        this.$emit('SetItem', this.repository)
        this.close()
      }
    },
  },
}
</script>
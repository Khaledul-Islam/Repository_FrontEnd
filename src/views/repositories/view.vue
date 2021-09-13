<template>
  <v-row justify="center">
    <v-dialog v-model="viewdialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Repositories</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="repodata.repositoryName" label="Repository Name" disabled filled></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete
                  disabled
                  filled
                  :items="repoTypeList"
                  item-text="Name"
                  item-value="id"
                  label="Repository Type"
                  v-model="repodata.repoType"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field disabled filled v-model="repodata.toolsTech" label="Technology"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field disabled filled v-model="repodata.createDate" label="Create Date"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field disabled filled v-model="repodata.lastUpdate" label="Last update"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-textarea disabled filled v-model="repodata.url" label="URL"></v-textarea>
              </v-col>
              <!-- <v-col cols="12" md="6">
                  <DatePickerWithText v-model="repository.createDate" dateLabel="Create Date" :Rules="true" />
                </v-col> -->
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field disabled filled v-model="repodata.comments" label="Comments"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="close()" text> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
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
    viewdialog: true,
  }),
  methods: {
    close() {
      this.$emit('closeviewdialog', !this.value)
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
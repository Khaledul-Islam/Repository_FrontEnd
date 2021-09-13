<template>
  <v-card class="mx-auto">
    <v-card-title>Project Handover</v-card-title>
    <v-spacer></v-spacer>
    <v-card-title>
      <v-row>
        <v-col cols="4" md="4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-row>
      <v-col cols="12" md="12">
        <v-data-table
          :headers="headers"
          :items="ApiResponse"
          item-key="id"
          :search="search"
          @dblclick:row="rowDblClick"
          class="elevation-1 pb-5 mt-5"
        >
          <template v-slot:[`item.Edit`]="{ item }">
            <v-btn class="mx-2" small color="primary" dark left @click="handoverProject(item)">
              <v-icon>mdi-handshake</v-icon>Handover</v-btn
            >
          </template>
        </v-data-table>
      </v-col>
      <EditModal
        v-if="editdialog === true"
        v-model="editdialog"
        @SetEditItem="GetEditItem($event)"
        @closeeditdialog="Closedialog($event)"
      />
    </v-row>
  </v-card>
</template>

<script>
import Axios from 'axios'
import { commonConfig } from '../../../public/ApiLib'
import { RepositoryAPI } from '../../../public/config.js'
import EditModal from './edit.vue'

var HandoverListAPIBodyData = {
  path: '/RepoDev/GetAllRepoDevs',
  method: 'GET',
  data: {},
}

var headersData = [
  {
    text: 'ID',
    value: 'id',
  },
  {
    text: 'Repository Name',
    value: 'repositoryList.repositoryName',
  },
  {
    text: 'Current Developer',
    value: 'developer.developerName',
  },
  {
    text: 'Assign Date',
    value: 'assignDate',
  },
  {
    text: 'Previous Developer ID',
    value: 'newDev',
  },
  {
    text: 'Date',
    value: 'newDate',
  },
  {
    text: '',
    value: 'Edit',
  },
]

export default {
  data() {
    return {
      search: '',
      dialog: false,
      editdialog: false,
      repodev: {},
      objhandover: {},
      isIndex: true,
      selectIndex: {},
      ApiResponse: [],
      headers: headersData,
      HandoverListAPIBody: HandoverListAPIBodyData,
    }
  },
  components: {
    EditModal,
  },
  methods: {
    UpdateAPICall() {
      this.editBody = {
        path: '/Handover/UpdateHandOver',
        method: 'POST',
        data: {
          id: 0,
          new_Dev: '',
          newDate: '',
          isFirstAssign: false,
          repoID: 0,
          devID: 0,
        },
      }
      let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.editBody.path

      this.editBody.data.id = this.objhandover.id
      this.editBody.data.new_Dev = this.objhandover.newDev
      this.editBody.data.newDate = this.objhandover.newDate
      this.editBody.data.repoID = this.objhandover.repoID
      this.editBody.data.devID = this.objhandover.devID

      Axios.post(requestPath, this.editBody.data)
        .then(response => {
          if (response['data']) {
            this.$root.snackbar.setsuccesstext('Data updated successfully')
            this.HandOverList()
          }
        })
        .catch(e => {
          this.$root.snackbar.seterrortext(e)
        })
    },
    GetEditItem(item) {
      this.objhandover = item
      console.log('this.objhandover')
      console.log(this.objhandover)
      this.UpdateAPICall()
    },
    Closedialog() {
      this.dialog = false
      this.editdialog = false
      // this.$store.commit("resethandoverInfo");
    },
    HandOverList() {
      let config = commonConfig(this.HandoverListAPIBody, RepositoryAPI)
      Axios(config)
        .then(response => {
          this.ApiResponse = response['data']
        })
        .catch(error => {
          this.$root.snackbar.seterrortext(error)
        })
    },

    handoverProject(item) {
      this.$store.commit('sethandoverInfo', item)
      this.editdialog = true
    },
    rowDblClick: function (mouseEvent, row) {
      let data = row['item']
      this.$store.commit('sethandoverInfo', data)
      this.editdialog = true
    },
  },

  created() {
    this.HandOverList()
  },
}
</script>


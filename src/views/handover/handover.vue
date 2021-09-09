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
        <v-col cols="8" md="8" class="text-right">
          <v-btn color="primary" @click="createNew()"><v-icon dark left> mdi-plus-circle </v-icon> Handover </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-row>
      <v-col cols="12" md="12">
        <v-data-table
          :headers="headers"
          :items="ApiResponse"
          item-key="clientID"
          :search="search"
          @dblclick:row="rowDblClick"
          class="elevation-1 pb-5 mt-5"
        >
          <template v-slot:[`item.Edit`]="{ item }">
            <v-btn class="mx-2" x-small color="secondary" dark fab @click="rowClickEdit(item)">
              <v-icon>mdi-pencil</v-icon></v-btn
            >
            <v-btn class="mx-2" x-small color="error" dark fab @click="rowClickDelete(item)">
              <v-icon>mdi-delete</v-icon></v-btn
            >
          </template>
        </v-data-table>
      </v-col>
      <CreateModal
        v-if="dialog === true"
        v-model="dialog"
        @SetItem="GetItem($event)"
        @closedialog="Closedialog($event)"
      />
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
import { commonConfig, postConfig } from '../../../public/ApiLib'
import { RepositoryAPI } from '../../../public/config.js'
import CreateModal from './create.vue'
import EditModal from './edit.vue'

var HandoverListAPIBodyData = {
  path: '/Handover/GetHandOver',
  method: 'GET',
  data: {},
}

var headersData = [
  {
    text: 'ID',
    value: 'id',
  },
  {
    text: 'Project Name',
    value: 'projectID',
  },
  {
    text: 'Previous Developer',
    value: 'prev_dev',
  },
  {
    text: 'Assign Date',
    value: 'assignDate',
  },
  {
    text: 'Current Developer',
    value: 'new_Dev',
  },
  {
    text: 'Date',
    value: 'date',
  },
  {
    text: '',
    value: 'Edit',
  },
  {
    text: '',
    value: 'Delete',
  },
]

export default {
  data() {
    return {
      search: '',
      dialog: false,
      editdialog: false,
      repodev: {},
      objrepodev: {},
      isIndex: true,
      selectIndex: {},
      ApiResponse: [],
      headers: headersData,
      HandoverListAPIBody: HandoverListAPIBodyData,
    }
  },
  components: {
    CreateModal,
    EditModal,
  },
  methods: {
    saveRepoDev() {
      this.saveBody = {
        path: '/RepoDev/CreateRepoDev',
        method: 'POST',
        data: {
          // id: 0,
          isFirstAssign: true,
          assignDate: '',
          assignFrom: '',
          repoID: 0,
          devID: 0,
        },
      }
      let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.saveBody.path
      this.saveBody.data.assignDate = this.repodev.assignDate
      this.saveBody.data.assignFrom = this.repodev.assignForm
      this.saveBody.data.devID = this.repodev.developerList
      this.saveBody.data.isFirstAssign = this.repodev.isFirstAssign
      this.saveBody.data.repoID = this.repodev.repoList

      Axios.post(requestPath, this.saveBody.data)
        .then(response => {
          if (response['data']) {
            this.$root.snackbar.setsuccesstext('Data saved successfully')
            this.RepoDevList()
          }
        })
        .catch(e => {
          this.$root.snackbar.seterrortext('Already exist.Try Another')
        })
    },
    GetItem(item) {
      this.repodev = item
      this.saveRepoDev()
    },
    UpdateAPICall() {
      this.editBody = {
        path: '/RepoDev/UpdateRepoDev',
        method: 'POST',
        data: {
          id: null,
          isFirstAssign: null,
          assignDate: null,
          assignFrom: null,
          repoID: null,
          devID: null,
        },
      }
      let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.editBody.path

      this.editBody.data.id = this.objrepodev.id
      this.editBody.data.isFirstAssign = this.objrepodev.isFirstAssign
      this.editBody.data.assignDate = this.objrepodev.assignDate
      this.editBody.data.assignFrom = this.objrepodev.assignFrom
      this.editBody.data.repoID = this.objrepodev.repoID
      this.editBody.data.devID = this.objrepodev.devID

      Axios.post(requestPath, this.editBody.data)
        .then(response => {
          if (response['data']) {
            this.$root.snackbar.setsuccesstext('Data updated successfully')
          }
        })
        .catch(e => {
          this.$root.snackbar.seterrortext(e)
        })
    },
    GetEditItem(item) {
      this.objrepodev = item
      this.UpdateAPICall()
    },
    Closedialog() {
      this.dialog = false
      this.editdialog = false
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
    createNew() {
      this.dialog = true
    },
    DeleteRepoDev() {
      this.deleteBody = {
        path: '/RepoDev/DeleteRepoDev?id=',
        method: 'POST',
      }
      let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.deleteBody.path + this.selectIndex.id

      Axios.post(requestPath, this.deleteBody.data)
        .then(response => {
          if (response['data']) {
            this.$root.snackbar.setsuccesstext('deleted successfully')
          }
        })
        .catch(e => {
          this.$root.snackbar.seterrortext(e)
        })
    },
    rowClickEdit(item) {
      this.$store.commit('setrepodevInfo', item)
      this.editdialog = true
    },
    rowDblClick: function (mouseEvent, row) {
      let data = row['item']
      this.$store.commit('setrepodevInfo', data)
      this.editdialog = true
    },
    rowClickDelete(item) {
      this.selectIndex = item
      const proceed = confirm('Confirm remove?')
      if (proceed) {
        this.DeleteRepoDev()
        const addressIndex = this.ApiResponse.findIndex(obj => obj.ID === item.ID)
        this.ApiResponse.splice(addressIndex, 1)
      }
    },
  },

  created() {
    this.HandOverList()
  },
}
</script>


<template>
  <v-card class="mx-auto">
    <v-card-title>Clients</v-card-title>
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
          <v-btn color="primary" @click="createNew()"><v-icon dark left> mdi-plus-circle </v-icon> create </v-btn>
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
      <EditModal v-if="editdialog === true" v-model="editdialog" @closeeditdialog="Closedialog($event)" />
    </v-row>
  </v-card>
</template>

<script>
import Axios from 'axios'
import { commonConfig, postConfig } from '../../../public/ApiLib'
import { RepositoryAPI } from '../../../public/config.js'
import CreateModal from './create.vue'
import EditModal from './edit.vue'

var clientListAPIBodyData = {
  path: '/Client/GetClientList',
  method: 'GET',
  data: {},
}

var headersData = [
  {
    text: 'ID',
    value: 'clientID',
  },
  {
    text: 'Client Name',
    value: 'client_Name',
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
      client_name: null,
      isIndex: true,
      selectIndex: null,
      ApiResponse: [],
      headers: headersData,
      clientListAPIBody: clientListAPIBodyData,
    }
  },
  components: {
    CreateModal,
    EditModal,
  },
  methods: {
    saveClient() {
      this.saveBody = {
        path: '/Client/ClientSave',
        method: 'POST',
        data: {
          client_Name: '',
        },
      }
      let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.saveBody.path
      this.saveBody.data.client_Name = this.client_name

      Axios.post(requestPath, this.saveBody.data)
        .then(response => {
          if (response['data']) {
            this.$root.snackbar.setsuccesstext('Data saved successfully')
            this.GetClientList()
          }
        })
        .catch(e => {
          this.$root.snackbar.seterrortext('Client already exist.Try Another')
        })
    },
    GetItem(item) {
      this.client_name = item
      this.saveClient()
    },
    Closedialog() {
      this.dialog = false
      this.editdialog = false
    },
    GetClientList() {
      let config = commonConfig(this.clientListAPIBody, RepositoryAPI)
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
    DeleteClient() {
      this.deleteBody = {
        path: '/Client/RemoveClient?Id=',
        method: 'POST',
      }
      let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.deleteBody.path + this.selectIndex.clientID

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
      this.$store.commit('setClientInfo', item)
      //ClientsInfoData
      this.editdialog = true
    },
    rowClickDelete(item) {
      this.selectIndex = item
      const proceed = confirm('Confirm remove?')
      if (proceed) {
        this.DeleteClient()
        const addressIndex = this.ApiResponse.findIndex(obj => obj.clientID === item.clientID)
        this.ApiResponse.splice(addressIndex, 1)
      }
    },
    rowDblClick: function (mouseEvent, row) {
      let data = row['item']
      this.$store.commit('setClientInfo', data)
      this.editdialog = true
    },
  },

  created() {
    this.GetClientList()
  },
}
</script>


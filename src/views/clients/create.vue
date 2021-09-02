<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  hint="Enter Client Name"
                  @keypress.enter="sendItemToParent()"
                  v-model="clientname"
                  required
                  label="Client Name"
                ></v-text-field>
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
</template>

<script>
export default {
  data: () => ({
    dialog: true,
    clientname: null,
  }),
  methods: {
    close() {
      this.$emit('closedialog', !this.value)
    },
    sendItemToParent() {
      if (this.clientname === null || this.clientname === undefined) {
        this.$root.snackbar.seterrortext('Client Name Required')
        this.dialog = true
      } else {
        this.$emit('SetItem', this.clientname)
        this.close()
      }
    },
  },
}
</script>
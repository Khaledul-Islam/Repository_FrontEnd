<template>

    <v-row>
      <v-col cols="12" md="6">
        <TotalClients></TotalClients>
      </v-col>
      <v-col cols="12" md="6">
        <TotalDevelopers></TotalDevelopers>
      </v-col>
      <v-col cols="12" md="6">
        <dashboard-card-total-earning></dashboard-card-total-earning>
      </v-col>
      <v-col cols="12" md="6">
        <dashboard-card-total-earning></dashboard-card-total-earning>
      </v-col>
      <v-col cols="12" md="12">
        <TotalRepositories></TotalRepositories>
      </v-col>

      
    </v-row>

</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiPoll, mdiLabelVariantOutline, mdiCurrencyUsd, mdiHelpCircleOutline } from '@mdi/js'
import StatisticsCardVertical from '@/components/statistics-card/StatisticsCardVertical.vue'

// demos
import TotalClients from './TotalClients.vue'
import TotalDevelopers from './TotalDevelopers.vue'
import TotalRepositories from './TotalRepositories.vue'
import DashboardCardTotalEarning from './DashboardCardTotalEarning.vue'
import DashboardCardTotalEarning2 from './DashboardCardTotalEarning2.vue'

export default {
  components: {
    TotalDevelopers,
    TotalClients,
    TotalRepositories,
    DashboardCardTotalEarning,
    DashboardCardTotalEarning2,
  },
  setup() {
    return {}
  },
}
</script>

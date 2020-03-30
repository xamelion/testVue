<template>
  <v-app light>
    <v-app-bar color="primary" :clipped-left="clipped" fixed app short>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-container>
        <v-row>
          <v-spacer />
          <v-col cols="4">
            <v-select
              v-model="dimension"
              :items="dimensionsSelect"
              :menu-props="{ offsetY: true, contentClass: 'primary' }"
              color="blue"
              dense
              hide-details
              label="Dimensions"
              outlined
              prepend-inner-icon="mdi-view-dashboard"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import DimensionStore from '../store/dimensions'
import ConfigsStore from '../store/configs'
import { stateLoadData } from '~/store';

const DataDimensions = require('~/testData/dimensions.json')
const DataConfigs = require('~/testData/config.json')

const loadData = (): Promise<void> => {
  return stateLoadData([
    DimensionStore.setDimensions(DataDimensions),
    ConfigsStore.setConfigs(DataConfigs)
  ]);
}

export default {
  computed: {
    dimension: {
      get () { return DimensionStore.dimension },
      set (value:string) { DimensionStore.setDimension(value) }
    },
    ...mapState({
      dimensions: () => DimensionStore.getDimensions,
      dimensionsSelect: () => DimensionStore.getDimensionsSelect,
      configs: () => ConfigsStore.getConfigs,
    })
  },
  data() {
    return {
      clipped: false,
      fixed: false,
      title: 'Obalor'
    }
  },
  mounted() {
    const alreadyDimensions = !!DimensionStore.getDimensions
    const alreadyConfigs = !!ConfigsStore.getConfigs
    if (!alreadyDimensions || !alreadyConfigs) {
      loadData()
    }
  },
  serverPrefetch() {
    return loadData()
  }
}
</script>

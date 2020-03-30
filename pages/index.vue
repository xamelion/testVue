<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
     {{dimension}}
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import DimensionStore from '../store/dimensions'
import ConfigsStore from '../store/configs'

export default {
 computed: {
    ...mapState({
      dimension: () => DimensionStore.dimension,
      dimensions: () => DimensionStore.getDimensions,
      configs: () => ConfigsStore.getConfigs,
    })
  }
}
</script>

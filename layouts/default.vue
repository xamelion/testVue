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
              :items="dimensions"
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

<script>
export default {
  data() {
    return {
      dimension: '',
      dimensions: [],
      clipped: false,
      fixed: false,
      title: 'Obalor'
    }
  }
}
</script>

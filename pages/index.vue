<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!--Dialog-->
        <v-dialog v-model="dialog" max-width="900">
          <v-card>
            <v-card-title class="headline">Actual params</v-card-title>

            <v-card-text>
              <v-container v-for="(item, index) in params" :key="index">
                <v-row>
                  <v-col col="12">
                    <v-data-table
                      hide-default-header
                      hide-default-footer
                      dense
                      :items="item"
                      :headers="headers"
                      class="elevation-1"
                    >
                      <template v-slot:item.value="{ item }">
                        <template
                          v-if="
                        item.key == 'marksColor' || 
                        item.key == 'iconsColor' || 
                        item.key == 'lineThroughColor' || 
                        item.key == 'promoMarkColor' || 
                        item.key == 'backgroundColor' || 
                        item.key == 'labelTitleColor' || 
                        item.key == 'labelSubtitleColor' || 
                        item.key == 'buttonTextColor' || 
                        item.key == 'buttonBackgroundColor' || 
                        item.key == 'textColor' || 
                        item.key == 'titleColor' || 
                        item.key == 'subtitleColor' || 
                        item.key == 'promoMarkBackColor'
                        "
                        >
                          <v-container>
                            <v-row>
                              <v-col col="12">
                                <v-layout row justify-center align-start>
                                  <div class="picker__wrapper">
                                    <div class="picker" :style="{'background-color': item.value}"></div>
                                  </div>
                                  <v-flex row justify-start align-center>{{item.value}}</v-flex>
                                </v-layout>
                              </v-col>
                            </v-row>
                          </v-container>
                        </template>

                        <template
                          v-else-if="
                        item.key == 'imageLink' || 
                        item.key == 'bg' || 
                        item.key == 'thumbImage' || 
                        item.key == 'labelBackground' || 
                        item.key == 'personImage' || 
                        item.key == 'backgroundImage' || 
                        item.key == 'packsImage'
                        "
                        >
                          <v-container>
                            <v-row>
                              <v-col col="12">
                                <v-img :src="item.value" aspect-ratio="1"></v-img>
                              </v-col>
                            </v-row>
                          </v-container>
                        </template>

                        <template v-else-if="item.key == 'reviews'">
                          <v-container>
                            <v-row v-for="(element, i) in item.value" :key="i">
                              <v-col col="12">
                                <template v-if="typeof(element) === 'string'">
                                  <v-img :src="element" aspect-ratio="1"></v-img>
                                </template>

                                <template v-else>
                                  <v-list-item
                                    two-line
                                    v-for="(elementValue, elementIndex) in element"
                                    :key="elementIndex"
                                  >
                                    <v-list-item-content>
                                      <v-list-item-title>
                                        <template
                                          v-if="elementIndex == 'beforeImage' || elementIndex == 'afterImage'"
                                        >
                                          <v-img :src="elementValue" aspect-ratio="1"></v-img>
                                        </template>
                                        <template v-else>{{elementValue}}</template>
                                      </v-list-item-title>
                                      <v-list-item-subtitle>{{elementIndex}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                  </v-list-item>
                                </template>
                              </v-col>
                            </v-row>
                          </v-container>
                        </template>

                        <template
                          v-else-if="
                            item.key == 'categories' ||
                            item.key == 'additionalCategories'
                          "
                        >
                          <v-container>
                            <v-row v-for="(element, i) in item.value" :key="i">
                              <v-col col="12">
                                <h3>{{element['title']}} - {{element['name']}}</h3>

                                <v-list-item
                                  v-for="(question, questionIndex) in element.questions"
                                  :key="questionIndex"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title>{{question.question}}</v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-col>
                            </v-row>
                          </v-container>
                        </template>

                        <template v-else-if="item.key == 'icons'">
                          <v-container>
                            <v-row v-for="(element, i) in item.value" :key="i">
                              <v-col col="12">
                                <v-layout row justify-center align-start>
                                  <div class="picker__wrapper">
                                    <div
                                      class="picker"
                                      :style="{'background-image': 'url(' + (element.iconSrc||element.imageLink) + ')'}"
                                    ></div>
                                  </div>
                                  <v-flex row justify-start align-center v-html="element.text"></v-flex>
                                </v-layout>
                              </v-col>
                            </v-row>
                          </v-container>
                        </template>

                        <template v-else>{{item.value}}</template>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!--Card-->
        <v-card>
          <v-layout column justify-start align-end>
            <v-flex xs12 sm8 md6>  
              <v-btn small @click.prevent="genJson()">Скачать json</v-btn>
            </v-flex>
          </v-layout>            
          <v-layout column justify-start align-start>
            <v-flex xs12 sm8 md6>              
              <v-treeview :items="[configs]" :dense="true">
                <template slot="label" slot-scope="{ item }">
                  <a @click.prevent="openDialog(item)">{{ item.name }}</a>
                </template>
              </v-treeview>
            </v-flex>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.v-treeview-node__label a {
  color: #2f80f3;
}
.v-data-table__wrapper .text-start:first-child {
  width: 150px;
}
.picker__wrapper {
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .picker {
    background-color: #fff;
    border: 1px solid #333;
    background-size: contain;
    float: left;
    width: 20px;
    height: 20px;
  }
}
</style>

<script>
import { mapState } from 'vuex'
import DimensionStore from '../store/dimensions'
import ConfigsStore from '../store/configs'
import _ from 'lodash'
import { stateLoadData } from '~/store'

const filterData = () => {
  return stateLoadData([
    ConfigsStore.setFiltredConfigs({
      dimension: DimensionStore.dimension,
      base_type: DimensionStore.base_type,
      additional_data: DimensionStore.additional_data
    })
  ])
}

export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: 'Наименование', value: 'key' },
        { text: 'Значение', value: 'value' }
      ],
      params: []
    }
  },
  watch: {
    dimension() {
      filterData()
    }
  },
  computed: {
    ...mapState({
      dimension: () => DimensionStore.dimension,
      dimensions: () => DimensionStore.getDimensions,
      configs: () => ConfigsStore.getFilterConfigs
    })
  },
  mounted() {
    filterData()
  },
  methods: {
    genJson() {
      const data = JSON.stringify(this.configs)
      const blob = new Blob([data], { type: 'text/plain' })
      const e = document.createEvent('MouseEvents'),
        a = document.createElement('a')
      a.download = 'test.json'
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      )
      a.dispatchEvent(e)
    },
    openDialog(params) {
      params = _.map(params.rules, (v) => {
        return _.map(v.parameters, (value, key) => {
          return { key, value }
        })
      })

      this.params = params

      this.dialog = true
    }
  }
}
</script>

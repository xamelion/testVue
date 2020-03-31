import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'

import { store } from "~/store";
import _ from 'lodash';


export interface Config {
}

/***
* Проверка прав доступа
*/

const checkRevertRule = (filter: any, rulesData: any) => {
  let rules:any[] = [];

  if (rulesData['rules'] && rulesData['rules'].length > 0) {

    // dimension: "menu_type", base_type: "enum", additional_data: "fit"
    
    rules = rulesData['rules'].filter((v: any) => {
      if (v['filters'].length === 0 ) { return false; }

      const letFilterParams = Object.entries(v['filters'][0]);

      return letFilterParams.every((element: any) => {
        let [key, value] = element;
        value = value[0] != null ? value[0] : value;    
        return filter['dimension'] == key && filter['additional_data'] == value;
      });
    });

    // Если нет ни одного совпадения в rules, то children не вызываем
    if (!rules || rules.length === 0) {
      return {};
    }
  }


  const children = rulesData['children'].length === 0 ?
    [] :
    rulesData['children'].map((v: any) => checkRevertRule(filter, v)).filter((v: any) => v.name);

  return {
    'name': rulesData['name'],
    'rules': rules,
    'children': children,
  };

}

@Module({
  name: 'configs',
  stateFactory: true,
  namespaced: true,
  dynamic: true,
  store
})
export class ConfigsModuleStore extends VuexModule {
  private configs: Config = {};
  private filtredConfigs: Config = {};


  /**
   * Получение полных данных
   */
  get getConfigs(): Config {
    return this.configs;
  }

  /**
   * Получение фильтрованных данных
   */
  get getFilterConfigs(): Config {
    return this.filtredConfigs;
  }

  @Mutation
  setConfigs(configs: Config) {
    this.configs = configs
  }

  @Mutation
  setFiltredConfigs(filter: any) {
    this.filtredConfigs = checkRevertRule(filter, this.configs);
  }

}


export default getModule(ConfigsModuleStore);

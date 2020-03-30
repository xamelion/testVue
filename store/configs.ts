import {
    Module,
    VuexModule,
    Action,
    Mutation,
    getModule
  } from 'vuex-module-decorators'
  
  import { store } from "~/store";
  
  
  export interface Config {
  }
  
  @Module({
    name: 'configs',
    stateFactory: true,
    namespaced: true,
    dynamic: true,
    store
  })
  export class ConfigsModuleStore extends VuexModule {
    private configs: Config[] = [];
  
    /**
     * Получение полных данных
     */
    get getConfigs(): Config[] {
      return this.configs;
    }
  
    @Mutation
    setConfigs(configs: Config[]) {
      this.configs = configs
    }
  
  }
  
  
  export default getModule(ConfigsModuleStore);
  
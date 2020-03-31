import {
  Module,
  VuexModule,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'

import { store } from "~/store";

interface DimensionDataTypeAdditional {
  values: string[]
}

interface DimensionDataType {
  base_type: string,
  additional_data?: DimensionDataTypeAdditional
}

export interface Dimension {
  name: string,
  front_name: string,
  data_type: DimensionDataType
}

@Module({
  name: 'dimensions',
  stateFactory: true,
  namespaced: true,
  dynamic: true,
  store
})
export class DimensionsModuleStore extends VuexModule {
  private dimensions: Dimension[] = [];
  private dimention: string = 'current_target';
  private base_type: string = 'enum';
  private additional_data: string|boolean = 'p1';

  get dimension(): string {
    return this.dimention;
  }

  /**
   * Получение полных данных
   */
  get getDimensions(): Dimension[] {
    return this.dimensions;
  }

  /**
   * Получение полнных данных
   */
  get getDimensionsSelect() {
    return this.dimensions.map( v => {
      return { text: v.front_name, value: v.name}
    });
  }

  @Mutation
  setDimensions(dimensions: Dimension[]) {
    this.dimensions = dimensions
  }

  @Mutation
  setDimension(label: string) {
    this.dimention = label;
    // Находим связанные данные
    const selectedDimension: any = this.dimensions.find(v => v.name === label);
    this.base_type = selectedDimension['data_type']['base_type'];
    this.additional_data = this.base_type === 'enum' ? selectedDimension['data_type']['additional_data']['values'][0] : false;
  }


}


export default getModule(DimensionsModuleStore);

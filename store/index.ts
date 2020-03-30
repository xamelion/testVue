import Vuex, { Store } from "vuex";
import Vue from 'vue';

Vue.use(Vuex)

interface RootState {}
export const store = new Vuex.Store<RootState>({
  actions: {
    nuxtServerInit: () => {}
  }
});
export const stateLoadData = (setData:any[]): Promise<void> => {
  let setPromise:Promise<void>[] = [];
  for(let i = 0; i < setData.length; i++) {
    setPromise.push(new Promise((resolve, reject) => {
      setTimeout(() => resolve(setData[i]), 200)
    }))
  }

  return new Promise((resolve, reject) => {
    Promise.all(setPromise).then(() => {
      resolve()
    })
  })
}
const createStore = (): Store<RootState> => {
  return store;
};
export default createStore;
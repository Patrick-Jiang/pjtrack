import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/assets/lib/clone';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[]
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },
    createRecord(state,record){
      const deepCloneRecord: RecordItem = clone(record);
      deepCloneRecord.createdAt = new Date();
      state.recordList?.push(deepCloneRecord);
      console.log(state.recordList);
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
          JSON.stringify(state.recordList));
    },
  },
  actions: {
  },
  modules: {
  }
})

export  default store

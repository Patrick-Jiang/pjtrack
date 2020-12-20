import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/assets/lib/clone';
import createID from '@/assets/lib/createID';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[]
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
    fetchTags(state){
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
    },
    createTag(state,name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('Can not create duplicated tags');
        return 'duplicated'
      }
      if (name === ' ') {
        window.alert('Can not create empty tags');
        return 'empty'
      }
      const id = createID().toString();
      state.tagList.push({id: id, name: name});
      store.commit('saveTags');
      // window.alert('Success added tag');
      return 'success';

    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }
  },
  actions: {
  },
  modules: {
  }
})

export  default store

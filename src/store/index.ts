import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/assets/lib/clone';
import createID from '@/assets/lib/createID';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,


  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },
    createRecord(state,record){
      const deepCloneRecord: RecordItem = clone(record);
      deepCloneRecord.createdAt =  deepCloneRecord.createdAt || new Date().toISOString();
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
      if(!state.tagList || state.tagList.length===0){
        store.commit('createTag', 'Food')
        store.commit('createTag', 'Cloth')
        store.commit('createTag', 'TPT')
      }
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
      return 'success';

    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    removeTag(state,id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTags')
    },
    findTag(state,id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    updateTag(state, payload: { id: string;name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('Can not create duplicated tags');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags')
        }
      }
    },
  },
  actions: {
  },
  modules: {
  }
})

export  default store

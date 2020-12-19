import {recordListModel} from '@/models/recordListModel';
import {tagListModel} from '@/models/tagListModel';

const store = {
    //Record
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => {
        recordListModel.create(record);
    },

    // Tag
    tagList: tagListModel.fetch(),
    createTag: (name: string) => {
        const msg = tagListModel.create(name);
        if (msg === 'duplicated') {
            window.alert('Can not create duplicated tags');
        }
    },
    removeTag: (id: string) => {
        return tagListModel.remove(id);
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name);
    },
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    }
};

export default store;
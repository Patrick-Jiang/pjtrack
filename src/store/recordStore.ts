// import {recordListModel} from '@/models/recordListModel';
import clone from '@/assets/lib/clone';

const localStorageKeyName = 'recordList';
// let data: RecordItem[] | undefined = undefined;


const recordStore = {
    //Record
    recordList: [] as RecordItem[],
    fetchRecords() {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.recordList;
    },

    createRecord(record: RecordItem) {
        // recordListModel.create(record);
        const deepCloneRecord: RecordItem = clone(record);
        deepCloneRecord.createdAt = deepCloneRecord.createdAt || new Date().toISOString();
        this.recordList?.push(deepCloneRecord);
        recordStore.saveRecords();
    },
    saveRecords() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },
};
recordStore.fetchRecords();
export default recordStore;
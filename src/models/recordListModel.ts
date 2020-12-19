import clone from '@/components/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
    data:[] as RecordItem[],

    fetch() {
        this.data= JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data
        },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(record: RecordItem){
        const deepCloneRecord: RecordItem = clone(record);
        deepCloneRecord.createdAt = new Date();
        this.data.push(deepCloneRecord);
        this.save()
    }
};
export {recordListModel};
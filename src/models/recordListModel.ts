const localStorageKeyName = 'recordList';
const recordListModel = {
    clone(data: RecordItem | RecordItem[]){
        return JSON.parse(JSON.stringify(data));
    },
    fetch() {
        const result: RecordItem[] = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return result
        },
    save(data: RecordItem[]) {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    }
};
export {recordListModel};
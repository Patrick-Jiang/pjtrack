
import createID from '@/assets/lib/createID';


const localStorageKeyName = 'tagList';
const tagStore = {

    // Tag
    tagList: [] as Tag[],
    fetchTags(){
        tagStore.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.tagList
    },
    createTag(name: string) {
        const names = this.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            window.alert('Can not create duplicated tags');
            return 'duplicated'
        }
        if (name === ' ') {
            window.alert('Can not create empty tags');
            return 'empty'
        }
        const id = createID().toString();
        this.tagList.push({id: id, name: name});
        this.saveTags();
        // window.alert('Success added tag');
        return 'success';

    },
    removeTag(id: string) {
        let index = -1;
        for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].id === id) {
                index = i;
                break;
            }
        }
        this.tagList.splice(index, 1);
        this.saveTags();
        return true;
    },
    updateTag (id: string, name: string) {
        const idList = this.tagList.map(item => item.id);
        if (idList.indexOf(id) >= 0) {
            const names = this.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.tagList.filter(item => item.id === id)[0];
                tag.name = name;
                // tag.id = name;
                this.saveTags();
                return 'success';
            }
        } else {
            return 'not found';
        }

    },
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    },

    saveTags() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
    }
};
tagStore.fetchTags()

export default tagStore;
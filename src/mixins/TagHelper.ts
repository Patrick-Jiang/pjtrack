import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class TagHelper extends Vue {
    createNewTag() {
        const name = window.prompt('Please enter new tag name');
        if (name) {
            this.$store.commit('createTag', name);
        }
    }
}

export default TagHelper;
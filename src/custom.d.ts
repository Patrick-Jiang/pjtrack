declare module "*.svg" {
    const content: any;
    export default content;
}
type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date;
}
type Tag = {
    id: string;
    name: string;
}
type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicated';
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
    save: () => void;
    remove: (id: string) => 'success';
}
interface Window{
    tagList: Tag[];
}
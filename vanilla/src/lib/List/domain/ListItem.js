export default class ListItem {
    constructor(id, value) {
        this.id = Number(id)
        this.value = String(value).trim()
    }
}
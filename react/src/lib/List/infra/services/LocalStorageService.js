import ListItem from "@/lib/List/domain/ListItem";

class LocalStorageListService {
    constructor(storageKey) {
        this.storageKey = storageKey;

        const storedData = JSON.parse(localStorage.getItem(this.storageKey));
        this.storage = new Map(
            Array.isArray(storedData)
                ? storedData
                    .filter(item => item && item.id !== undefined)
                    .map(item => [item.id, item])
                : []
        );

        this.currentId = this.storage.size > 0 ? Math.max(...Array.from(this.storage.keys())) + 1 : 1;
    }

    _updateLocalStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(Array.from(this.storage.values())));
    }

    async save(value) {
        if (typeof value !== 'string') {
            throw new Error("'value' must be a string");
        }

        const newItem = { id: this.currentId++, value };
        this.storage.set(newItem.id, newItem);
        this._updateLocalStorage();

        return new ListItem(newItem.id, newItem.value);
    }

    async get(id) {
        if (typeof id !== 'number') {
            throw new Error("'id' must be a number");
        }

        const item = this.storage.get(id);

        if (!item) {
            throw new Error('Item not found');
        }

        return new ListItem(item.id, item.value);
    }

    async getAll() {
        return Array.from(this.storage.values()).reduce((acc, item) => {
            if (item !== null) {
                acc.push(new ListItem(item.id, item.value))
            }

            return acc
        }, [])
    }

    async delete(id) {
        if (typeof id !== 'number') {
            throw new Error("'id' must be a number");
        }

        if (!this.storage.has(id)) {
            throw new Error('Item not found');
        }

        const to_be_deleted = await this.get(id)
        this.storage.set(id, null);
        this._updateLocalStorage();
        return to_be_deleted
    }

    async update(id, value) {
        if (typeof id !== 'number') {
            throw new Error("'id' must be a number");
        }
        if (typeof value !== 'string') {
            throw new Error("'value' must be a string");
        }

        const $item_to_edit = new ListItem(id, value);

        this.storage.set($item_to_edit.id, $item_to_edit);

        this._updateLocalStorage();

        return $item_to_edit;
    }
}

export default LocalStorageListService;

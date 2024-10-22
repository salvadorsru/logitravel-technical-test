import ListItem from "@/lib/List/domain/ListItem";
import { checkContract } from "@/utils/validator";

export default class ListRepository {
    __methods = ['save', 'delete', 'get', 'update', 'getAll'];

    constructor(service) {
        checkContract(service, this.__methods);
        this.service = service;
    }

    async save(value) {
        if (typeof value !== 'string') {
            throw new Error("'value' must be a string");
        }

        if (value.trim() === '') {
            throw new Error("Your 'value' cannot be empty")
        }

        const item = await this.service.save(value.trim());

        if (!(item instanceof ListItem)) {
            throw new Error("Error during LisItem saving");
        }

        return item
    }

    async get(id) {
        if (typeof id !== 'number') {
            throw new Error("'id' must be a string");
        }

        const item = await this.service.get(id);

        if (!(item instanceof ListItem)) {
            throw new Error('The retrieved item must be an instance of ListItem');
        }

        return item;
    }

    async getAll() {
        const items = await this.service.getAll();

        if (!Array.isArray(items) || !items.every(item => item instanceof ListItem)) {
            throw new Error('All retrieved items must be instances of ListItem');
        }

        return items;
    }

    async delete(id) {
        if (typeof id !== 'number') {
            throw new Error("'id' must be a number");
        }
        if (id === 0) {
            throw new Error("'id' must not be 0 or negative.")
        }
        return await this.service.delete(id);
    }

    async update(id, value) {
        if (typeof id !== 'number') {
            throw new Error("'id' must be a number");
        }
        if (typeof value !== 'string') {
            throw new Error("'value' must be a string");
        }

        await this.service.update(id, value);
    }
}

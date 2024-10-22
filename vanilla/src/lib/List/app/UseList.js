export default class UseList {
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Agrega un nuevo elemento a la lista.
     * @param {string} value - El valor del nuevo elemento.
     * @returns {Promise<ListItem>} - El elemento agregado.
     * @throws {Error} - Lanza un error si el valor no es una cadena.
     */
    async addItem(value) {
        return await this.repository.save(value);
    }

    /**
     * Obtiene un elemento por su ID.
     * @param {number} id - El ID del elemento a recuperar.
     * @returns {Promise<ListItem|null>} - El elemento recuperado o null si no se encuentra.
     * @throws {Error} - Lanza un error si el ID no es una cadena.
     */
    async getItem(id) {
        return await this.repository.get(id);
    }

    /**
     * Obtiene todos los elementos de la lista.
     * @returns {Promise<ListItem[]>} - Un arreglo de todos los elementos.
     */
    async getAllItems() {
        return await this.repository.getAll();
    }

    /**
     * Elimina un elemento de la lista por su ID.
     * @param {number} id - El ID del elemento a eliminar.
     * @returns {ListItem}
     * @throws {Error} - Lanza un error si el ID no es una cadena.
     */
    async deleteItem(id) {
        return await this.repository.delete(id);
    }

    /**
     * Elimina todos los elementos de la lista.
     * @returns {Promise<void>} - Promesa que se resuelve cuando todos los elementos son eliminados.
     */
    async clearList() {
        const allItems = await this.repository.getAll();
        const deletePromises = allItems.map(item => this.repository.delete(item.id));
        await Promise.all(deletePromises);
    }

    /**
     * Actualiza un elemento en la lista por su ID.
     * @param {number} id - El ID del elemento a actualizar.
     * @param {string} value - El nuevo valor del elemento.
     * @returns {Promise<ListItem>} - El elemento actualizado.
     * @throws {Error} - Lanza un error si el ID no es un número o el valor no es una cadena.
     */
    async updateItem(id, value) {
        return await this.repository.update(id, value);
    }
}

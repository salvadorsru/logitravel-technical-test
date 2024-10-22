import ListItem from "@/lib/List/domain/ListItem"
import Services from "@/lib/Shared/services"

/**
 * Obtiene todos los elementos de la lista. Si no hay elementos, agrega tres ejemplos.
 * @returns {Promise<void>}
 */
const items = await Services.List.getAllItems()

if (items.length < 1) {
    await Services.List.addItem('Example 1')
    await Services.List.addItem('Example 2')
    await Services.List.addItem('Example 3')
}

/**
 * @constant {Object} ACTION_TYPES
 * @property {string} DELETE - Acción para eliminar un elemento.
 * @property {string} ADD - Acción para agregar un elemento.
 */
const ACTION_TYPES = {
    DELETE: 'delete',
    ADD: 'add'
}

/** @type {HTMLFormElement} */
const $form = document.querySelector('form#list-form')
/** @type {DocumentFragment} */
const $item = document.querySelector('template#list-item-template').content
/** @type {HTMLElement} */
const $form_list = $form.querySelector('.list-form__results')


/**
 * Crea un elemento HTML para un ítem de la lista.
 * @param {ListItem} item - El elemento de la lista.
 * @returns {DocumentFragment} El elemento HTML del ítem.
 */
function createItemElement(item) {
    const $new_item = $item.cloneNode(true)
    $new_item.querySelector('.list__item').dataset.key = item.id
    $new_item.querySelector('.list__item-input').value = item.id
    $new_item.querySelector('.list__item-value').textContent = item.value
    return $new_item
}

/**
 * Historial de acciones realizadas en el formulario.
 * @type {Array<{type: string, item: ListItem}>}
 */
let historial = []

/**
 * Elimina un ítem del formulario y del servicio, y lo guarda en el historial.
 * @param {Array<number>} id_list - El ID del ítem a eliminar.
 * @returns {Promise<void>}
 */
export async function deleteFormItems(...id_list) {
    const deleted_items_promises = id_list.map(async id => {
        id = Number(id)
        const deleted_item = await Services.List.deleteItem(id)
        $form.querySelector(`[data-key="${id}"`).remove()
        return deleted_item
    })

    const deleted_items = await Promise.all(deleted_items_promises)

    historial.push({
        type: ACTION_TYPES.DELETE,
        value: deleted_items
    })
}

/**
 * Agrega un nuevo ítem al formulario y lo guarda en el servicio.
 * @param {string} value - El valor del nuevo ítem.
 * @returns {Promise<void>}
 */
export async function addFormItem(value) {
    const new_item = await Services.List.addItem(value)
    const $new_item = createItemElement(new_item)
    $form_list.appendChild($new_item)
}

/**
 * Actualiza un ítem en el formulario y en el servicio.
 * @param {ListItem} item_list - El ID del ítem a actualizar.
 * @param {string} value - El nuevo valor del ítem.
 * @returns {Promise<void>}
 */
export async function updateFormItems(...item_list) {
    const item_list_promises = item_list.map(item => {
        return Services.List.updateItem(item.id, item.value)
    })
    await Promise.all(item_list_promises)
    renderFormList()
}

/**
 * Renderiza la lista de ítems en el formulario.
 * @returns {Promise<void>}
 */
export async function renderFormList() {
    const items = await Services.List.getAllItems();
    const $new_items = items.map(item => createItemElement(item))
    $form_list.replaceChildren(...$new_items)
}

/**
 * Deshace la última acción realizada en el formulario.
 * @returns {Promise<void>}
 * @throws {Error} Si no hay acciones previas que deshacer.
 */
export async function undoLastFormListAction() {
    const { type = null, value } = historial.pop() ?? {}

    switch (type) {
        case ACTION_TYPES.DELETE:
            return updateFormItems(...(Array.isArray(value) ? value : [value]))
        default:
            throw new Error('There is no past action')
    }
}

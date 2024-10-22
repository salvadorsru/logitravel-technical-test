import { ListContext } from '@/providers/ListProvider'
import PropTypes from 'prop-types'
import { useContext } from 'react'

/**
 * Renderiza un componente de ítem de lista con un input de tipo radio y muestra el valor.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {number} props.id - El identificador único del ítem de la lista, usado como valor del input.
 * @param {string} props.value - El valor a mostrar para el ítem de la lista.
 * @returns {JSX.Element} - Un elemento JSX que representa el ítem de la lista.
 */
export default function ListItem({ id, value }) {
    const { deleteItems } = useContext(ListContext)

    /**
     * Maneja la acción de eliminar un ítem cuando se hace doble clic en él.
     * 
     * @param {MouseEvent} event - El evento de clic.
     */
    function handleDelete(event) {
        event.preventDefault()
        const input_value = event.currentTarget.querySelector('input').value
        deleteItems(input_value)
    }

    return (
        <label className="list__item" onDoubleClick={handleDelete}>
            <input className="list__item-input" value={id} type="checkbox" name="list-item" hidden />
            <span className="list__item-value">
                {value}
            </span>
        </label>
    );
}
ListItem.propTypes = {
    id: PropTypes.number.isRequired,  
    value: PropTypes.string.isRequired  
};

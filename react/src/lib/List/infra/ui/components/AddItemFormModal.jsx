import { ListContext } from '@/providers/ListProvider'; // Contexto para acceder a la lista
import PropTypes from 'prop-types'; // Validación de tipos de props
import { useContext } from 'react'; // Hook para usar contextos

/**
 * Componente modal `AddItemFormModal` para agregar un nuevo ítem a la lista.
 * Muestra un formulario dentro de un modal que permite al usuario agregar un nuevo ítem
 * a través de una entrada de texto.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.show - Controla si el modal es visible o no.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * 
 * @returns {JSX.Element} - Un formulario en un modal para agregar ítems a la lista.
 */
export default function AddItemFormModal({ show, onClose }) {
    // Obtener la función `addItem` del contexto de la lista
    const { addItem } = useContext(ListContext);

    /**
     * Función que maneja el envío del formulario.
     * Recoge el valor del nuevo ítem, lo agrega a la lista y cierra el modal.
     * 
     * @param {SubmitEvent} event.
     */
    function handleSubmit(event) {
        event.preventDefault()

        const form_data = new FormData(event.currentTarget)
        const value = form_data.get('new-item-value')

        addItem(value)
        onClose()
        event.currentTarget.reset()
    }

    return (
        // Modal para agregar ítems con el estado `show` para mostrar u ocultar
        <div id="add-modal" className={show ? "toggle-appear" : ""} role="dialog">
            <form className="container" onSubmit={handleSubmit}>
                <h2>Add item to list</h2>
                <input
                    type="text"
                    autoFocus
                    required
                    name="new-item-value"
                    id="new-item-value"
                    placeholder="Type the text here..."  
                />
                <div className="add-modal__controls">
                    <button type="submit" className="button button-primary">
                        ADD
                    </button>
                    <button
                        id="add-modal-close"
                        type="button"
                        className="button"
                        onClick={onClose}
                    >
                        CANCEL
                    </button>
                </div>
            </form>
        </div>
    );
}

AddItemFormModal.propTypes = {
    show: PropTypes.bool, 
    onClose: PropTypes.func 
};

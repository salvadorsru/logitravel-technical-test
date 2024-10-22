import useHistory from '@/hooks/useHistory';
import Services from '@/lib/Shared/services';
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook `useList` para manejar una lista de ítems, con las funcionalidades 
 * de obtener, agregar, actualizar y eliminar ítems, así como deshacer la última acción de eliminación.
 * 
 * @returns {Object} - Un objeto que contiene la lista de ítems, errores, y las funciones para manipular la lista.
 */
const useList = () => {
  // Estado para almacenar la lista de ítems
  const [list, setList] = useState([]);

  // Estado para manejar errores
  const [error, setError] = useState(null);

  // Servicio de la lista
  const LIST_SERVICE = Services.List;

  // Importar métodos del hook de historial
  const { history, addHistory, getLastHistory, popHistory } = useHistory();

  /**
   * Función para manejar y registrar errores.
   * 
   * @param {Error} err - El objeto de error que se manejará.
   */
  const handleError = (err) => {
    setError(err.message);
  };

  /**
   * Función para obtener todos los ítems de la lista.
   * Hace una solicitud al servicio y actualiza el estado de la lista.
   */
  const fetchListItems = useCallback(async () => {
    try {
      const items = await LIST_SERVICE.getAllItems(); // Obtener todos los ítems del servicio
      setList(items); // Actualizar la lista
    } catch (err) {
      handleError(err); // Manejar errores
    }
  }, [LIST_SERVICE]);

  /**
   * Función para agregar un nuevo ítem a la lista.
   * Hace una solicitud al servicio y agrega el ítem al estado.
   * 
   * @param {string} value - El valor del nuevo ítem.
   */
  const addItem = useCallback(async (value) => {
    try {
      const new_item = await LIST_SERVICE.addItem(value); // Agregar ítem a través del servicio
      setList((prevItems) => [...prevItems, new_item]); // Actualizar la lista con el nuevo ítem
    } catch (err) {
      handleError(err); // Manejar errores
    }
  }, [LIST_SERVICE]);

  /**
   * Función para eliminar uno o más ítems de la lista.
   * Hace una solicitud al servicio y actualiza el estado de la lista.
   * 
   * @param {...number} id_list - Lista de IDs de los ítems a eliminar.
   */
  const deleteItems = useCallback(async (...id_list) => {
    try {
      const deletedItemsPromises = id_list.map(async id => {
        id = Number(id); // Asegurar que el ID sea numérico
        const deleted_item = await LIST_SERVICE.deleteItem(id); // Eliminar ítem
        return deleted_item;
      });

      const deleted_items = await Promise.all(deletedItemsPromises); // Esperar la eliminación de todos los ítems
      addHistory('delete', deleted_items); // Registrar la acción en el historial

      // Actualizar la lista filtrando los ítems eliminados
      setList((prevItems) => prevItems.filter(item => !deleted_items.some(deleted => deleted.id === item.id)));
    } catch (err) {
      handleError(err); // Manejar errores
    }
  }, [LIST_SERVICE, addHistory]);

  /**
   * Función para actualizar un ítem en la lista.
   * Hace una solicitud al servicio y actualiza el estado de la lista.
   * 
   * @param {number} id - El ID del ítem a actualizar.
   * @param {any} value - El nuevo valor del ítem.
   */
  const updateItem = useCallback(async (id, value) => {
    try {
      const updated_item = await LIST_SERVICE.updateItem(id, value); // Actualizar ítem a través del servicio
      setList((prevItems) => prevItems.map(item => (item.id === updated_item.id ? updated_item : item))); // Actualizar el estado
    } catch (err) {
      handleError(err); // Manejar errores
    }
  }, [LIST_SERVICE]);

  /**
   * Función para deshacer la última acción de eliminación.
   * Usa el historial para restaurar los ítems eliminados.
   */
  const undoLastAction = useCallback(async () => {
    const latest_action = getLastHistory(); // Obtener la última acción del historial

    if (latest_action) {
      const { type, value } = latest_action;

      if (type === 'delete' && value) {
        const items = Array.isArray(value) ? value : [value]; // Manejar un ítem o una lista de ítems
        const to_update_items = items.map(({ id, value }) => LIST_SERVICE.updateItem(id, value)); // Restaurar los ítems eliminados
        await Promise.all(to_update_items); // Esperar la restauración de todos los ítems
        fetchListItems(); // Volver a cargar la lista
        popHistory(); // Eliminar la acción del historial
      } else {
        handleError(new Error('No delete operation to undo')); // Manejar error si no hay una eliminación para deshacer
      }
    }
  }, [getLastHistory, popHistory, LIST_SERVICE, fetchListItems]);

  // Efecto para cargar todos los ítems al montar el componente
  useEffect(() => {
    fetchListItems();
  }, [fetchListItems]);

  return {
    list,         
    error,         
    addItem, 
    deleteItems,
    updateItem,
    undoLastAction,
    history
  };
};

export default useList;

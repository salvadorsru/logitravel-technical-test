import{ useContext, useState } from 'react';
import { ListContext } from '@/providers/ListProvider';
import AddItemFormModal from '@/lib/List/infra/ui/components/AddItemFormModal';
import ListItem from '@/lib/List/infra/ui/components/ListItem';

export function ListForm  () {
  const { list, loading, deleteItems, error, undoLastAction } = useContext(ListContext);
  const [ modalStatus, setModalStatus ] = useState(false)
  const closeAddModal = () => setModalStatus(false)


  if (error) {
    console.log("%c" + error, 'color:red;font-weight:bold')
  }

  function handleFormAction(event) {
    event.preventDefault();
    const action = event.nativeEvent.submitter.value;
    const form_data = new FormData(event.currentTarget)

    switch (action) {
        case 'add':
            setModalStatus(true);
            break;
        case 'delete': {
            const to_delete_ids = form_data.getAll('list-item');
            deleteItems(...to_delete_ids)
            break;
        }
        case 'undo':
          undoLastAction()
          break;
        default:
            console.warn(`Unknown action: ${action}`);
    }
}
  return (
    <>
        <AddItemFormModal show={modalStatus} onClose={closeAddModal} />

        <form id="list-form" onSubmit={handleFormAction}>
          <div className="list-form__results">
            {loading ? (
              <div className="list-form__results-skeleton">Loading...</div>
            ) : (
              list.map(({ id, value }) => (
                <ListItem key={id} id={id} value={value}  />
              ))
            )}
          </div>
          <div className="list-form__controls">
            <button className="button" value="undo">
              Back
            </button>
            <button className="button" value="delete">
              Delete
            </button>
            <button className="button button-primary" value="add">
              Add
            </button>
          </div>
        </form>
    </>
  );
};

export default ListForm;

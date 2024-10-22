import { deleteFormItems, renderFormList, undoLastFormListAction } from "@/lib/List/infra/ui/js/hooks"

const $form = document.querySelector('form#list-form')

await renderFormList()

$form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const action = event.submitter.value
    const form_data = new FormData(event.currentTarget)

    switch (action) {
        case 'delete':
            const to_delete_ids = form_data.getAll("list-item");
            await deleteFormItems(...to_delete_ids)
            break;
        case 'add':
            const $add_modal = document.querySelector('#add-modal')
            $add_modal.querySelector('input').focus()
            $add_modal.classList.toggle('toggle-appear')
            break;
        case 'undo':
            await undoLastFormListAction()
            break;
        default:
            console.error('Undefined action')
    }
})

$form.addEventListener('dblclick', async (event) => {
    const $target = event.target.closest('label')
    const $input = $target.querySelector('input')
    const value = $input.value
    await deleteFormItems(value)
})
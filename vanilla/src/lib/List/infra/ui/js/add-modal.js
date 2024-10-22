import { addFormItem } from "@/lib/List/infra/ui/js/hooks"

const $add_modal = document.querySelector('#add-modal')
const $add_modal_close = document.querySelector('#add-modal #add-modal-close')

$add_modal.firstElementChild.addEventListener('submit', async (event) => {
    event.preventDefault()
    const action = event.submitter.value
    const form_data = new FormData(event.currentTarget)

    if (action === 'add') {
        const value = form_data.get('new-item-value')
        await addFormItem(value)
    }

    $add_modal.classList.toggle('toggle-appear')
    event.currentTarget.reset()
})

$add_modal.addEventListener('click', (event) => {
    if (event.target.tagName === 'DIALOG') {
        $add_modal.classList.remove('toggle-appear')
    }
})

$add_modal_close.addEventListener('click', () => $add_modal.classList.remove('toggle-appear'))
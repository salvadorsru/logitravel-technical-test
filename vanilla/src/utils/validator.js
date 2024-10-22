export function checkContract(instance, methods) {
    for (const method of methods) {
        if (!(method in instance)) {
            throw new Error(`Undefined method '${method}' in ${instance.constructor.name}`)
        }
    }
}
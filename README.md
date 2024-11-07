# Prueba técnica de LogiTravel

Dado que se me otorgó cierta libertad para elegir las tecnologías para esta prueba, decidí utilizar Vite.js tanto para la implementación del ejercicio en React como para el ejercicio en VanillaJS.

He cubierto todos los requerimientos que se especificaron:

En principio he cubierto todos los requerimientos
### Tareas Obligatorias:
- [✅] Realizar la implementación con React
- [✅] Crear una interfaz de usuario con los siguientes elementos:
  - [✅] Contenedor donde se añaden y borran cadenas de texto.
  - [✅] Caja de entrada de texto para que el usuario pueda escribir.
  - [✅] Botón para agregar nuevas entradas.
  - [✅] Botón para eliminar entradas de la lista.
- [✅] Implementar funcionalidad para añadir entradas de texto:
  - [✅] El usuario debe poder escribir y añadir textos al listado.
  - [✅] No se pueden añadir entradas vacías.
- [✅] Implementar funcionalidad para eliminar entradas de texto:
  - [✅] Los ítems de la lista deben ser seleccionables por el usuario.
  - [✅] No se pueden eliminar ítems sin haber sido seleccionados.

### Tareas Opcionales:
- [✅] Realizar la implementación en Vanilla JS.
- [✅] Permitir al usuario eliminar elementos de la lista haciendo doble clic sobre el ítem.
- [✅] Implementar funcionalidad para deshacer (al menos el último cambio realizado).
- [✅] Implementar funcionalidad de deshacer (múltiples cambios)

### Notas:
1. No optimicé al máximo la carga de CSS, ya que no era un requerimiento esencial. Normalmente, utilizaría librerías externas como Tailwind o CSS Modules, pero consideré que este no era el enfoque principal de la tarea.
2. No implementé pruebas, ya que no era un requisito; sin embargo, en un escenario real, probablemente utilizaría Vitest y Playwright.

### Iniciar paquetes

Dentro de este propio repositorio en el archivo package.json pueden desplegar ambas implementaciones en modo desarrollo utilizando los comandos:

```sh
npm run install:react
npm run start:react
```
```sh
npm run install:vanilla
npm run start:vanilla
```

---

# LogiTravel Technical Test
Since I was given some freedom to choose the technologies for this test, I decided to use Vite.js for both the React implementation and the VanillaJS exercise.

I have covered all specified requirements:

Mandatory Tasks:
- [✅] Implement using React
- [✅] Create a user interface with the following elements:
  - [✅] A container where text strings can be added and deleted.
  - [✅] A text input box for the user to type in.
  - [✅] A button to add new entries.
  - [✅] A button to delete entries from the list.
- [✅] Implement functionality to add text entries:
  - [✅] The user should be able to type and add texts to the list.
  - [✅] Empty entries cannot be added.
- [✅] Implement functionality to delete text entries:
  - [✅] List items must be selectable by the user.
  - [✅] Items cannot be deleted without being selected.
Optional Tasks:
- [✅] Implement in Vanilla JS.
- [✅] Allow the user to delete list items by double-clicking on them.
- [✅] Implement undo functionality (for at least the last change).
- [✅] Implement undo functionality (for multiple changes).

### Notes:
1. I didn’t fully optimize CSS loading as it wasn’t an essential requirement. Normally, I would use external libraries like Tailwind or CSS Modules, but I considered that this wasn’t the main focus of the task.
2. I didn’t implement tests, as it wasn’t required; however, in a real scenario, I would likely use Vitest and Playwright.

### Starting Packages
Within this repository in the package.json file, both implementations can be launched in development mode using the commands:

```sh
npm run install:react
npm run start:react
```
```sh
npm run install:vanilla
npm run start:vanilla
```

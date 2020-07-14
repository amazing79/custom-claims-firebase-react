**ApiCall con React y Firebase**

La siguiente App tiene como funcionalidad poner el práctica lo visto en el curso de Udemy. Esta consiste en separar nuestra aplicación siendo:

- Backend: hecho con funciones en Firebase. Estas solo estan para el manejo de roles de usuario. Pone en práctica el uso de Custom Claim (los cuales nos permite manejar los roles)
- Frontend: hecho con react y desde esta, se crearán los usuario usuarios y los libros.

Se presume manejo básico de firebase (configuración del proyecto) y React. Para ver como funciona [acceder aqui](https://api-functions-react.web.app/). Cuenta con 3 usuarios de prueba, los cuales se pueden elegir desde el login.

***Prerrequisitos para hacerlo andar.***

- Instalar firebase-tools (para crear tanto los funciones como hacer el deploy de nuestro sitio web).
- Tener creado un proyecto en firebase (es gratis).

Nota: Este repo se recomienda para la gente del curso, ya que ahí estan todos los pasos. El código de este proyecto puede servir como guía pero lo importante [esta en el curso](https://www.udemy.com/course/curso-react-js/)

Configurando firebase: instalar las herramientas (con -g, lo podremos usar en cualquier proyecto)

`npm install -g firebase-tools`

Crear una carpeta back-end , donde nos logueamos a firebase y luego inicializamos el entorno para desarrollar nuestras funciones

`firebase login`

`firebase init`

Seguir los pasos de del wizard, seleccionando solo la opción de funciones (esto nos creará un directorio functions donde pondremos en marcha nuestras funciones). Los pasos siguientes nos pedirá que lenguaje usar: Opción javascript (pero si manejan TypeScript, pueden adaptar el código) y habilitar el editor es-lint para controlar errores. Las funciones, junto con las reglas de firebase se encuentran en la carpeta anexos.

Finalmente, cuando tengamos las funciones listas, subirlas a Firebase

`firebase deploy`

Luego, ya podremos usar este proyecto. Crear una carpeta front-end y clonar el repositorio ahí. 
Para instalar el proyecto ejecutar el comando por npm:

`npm install`

Esto instalará también la librería de firebase para poder acceder a la base. El proyecto esta hecho sin otras librerías, el CSS es a lo "macho" y puede no gustar. No usa Route para mostrar las distintas páginas, pero al ser pocas, no fue necesario. Aclaro que no es la mejor opción pero cumple lo esperado (por lo menos por mi  😅) 

*Opcional*: desde nuestra carpeta del proyecto react, correr firebase init para configurar el proyecto y subirlo al hosting que nos brinda. En este caso, seleccionar la opción firestore más la opción de hosting.  Luego seguir con el wizard. 
Importante: cuando nos pregunte qué carpeta vamos a usar (sugiere public), indicar la carpeta del proyecto compilado, build. Para compilar el proyecto: 

`npm run build`


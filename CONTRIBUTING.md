# Contributing

A continuación se describen los puntos esenciales para empezar a contribuir en el proyecto. Toda colaboración es bienvenida, siempre y cuando se mantenga el respeto establecido en el código de conducta. Gracias 😉
Para más información sobre la aplicación acceder a la [wiki](https://github.com/jcarral/EHUApp/wiki).
## Tabla de contenidos

1. [Prerrequisitos](#prerequisitos)
2. [¿Cómo empezar?](#cómo-empezar)
3. [Reportar un error](#reportar-un-error)
4. [Propuesta de mejora](#propuesta-de-mejora)
5. [Añadir un idioma](#añadir-un-idioma)
6. [Versionado](#versionado)
7. [Estilo de código](#estilo-de-código)
8. [Etiquetas](#etiquetas)
9. [Contacto](#contacto)

## Prerrequisitos

* Cualquier propuesta de mejora, notificación de error o sugerencia de cambio se debe realizar a través de los canales de comunicación establecidos.
Para este proyecto se utilizan los _issues_ de GitHub.
* Se debe seguir el [código de conducta](codeofconduct), cualquier petición que incumpla este código se rechazará inmediatamente.

## ¿Cómo empezar?

<!-- En este apartado se deben listar los pasos que hay que seguir para realizar un pull request en el proyecto. -->

1. Crea un _fork_ del repositorio original.
2. Crea un _branch_ con un nombre descriptivo.
3. Añadir tests. (Si se requieren)
4. Impleméntalo !
5. Comprueba que pasa las pruebas.
6. Asegurate de seguir la guía de estilos.
7. Haz _commit_ de los cambios.
    - Para los commits utiliza uno de los siguientes prefijos en el mensaje.
    ```
    [FEATURE nombre_de_la_funcionalidad]
    [DOCS]
    [BUG]
    ```
8. Realiza un _pull request_
    - En este punto debes asegurarte de que la rama master está actualizada con el repositorio original.
    - Haz _PR_ desde tu rama a la rama master del proyecto original.
9. Manten actualizada tu _PR_
10. Fusionar el _PR_ (Solo responsables)
11. Actualizar la versión. (Solo responsables)
12. Lanzar una versión. (Solo responsables)

## Reportar un error

<!-- En este apartado se debe describir como reportar un error y qué hacer en casos específicos -->
Si has encontrado alguna vulnerabilidad de la seguridad, por favor, no la publiques. Ponte en contacto a través del correo electrónico: <jcarraldc@gmail.com>

Si se trata de un bug que no pone en riesgo la seguridad sigue los siguientes pasos:

1. Comprueba que ese error no ha sido notificado antes.
2. Abre un nuevo _issue_ utilizando la plantilla que se te propone.
3. Responde a las siguientes preguntas:
    - ¿ Cual es el comportamiento ?
    - ¿ Qué debería hacer realmente ?
    - ¿ Qué pasos he seguido para llegar a ese punto ?
    - ¿ Sobre que SO o máquina he realizado la prueba ?
4. Añade cualquier tipo de prueba para facilitar la búsqueda de una solución.

## Propuesta de mejora

1. Comprobar que no es una propuesta de mejora ya realizada.
2. Abrir un nuevo _issue_ utilizando la plantilla para mejoras que se proporciona.
3. Responder a las siguientes preguntas:
    - ¿ Qué debe hacer la mejora ?
    - ¿ Por que debería implementarse ?
    - ¿ Cómo debería hacerse ?
4. Añade cualquier tipo de material que ayude a entender la propuesta. (Imagenes o enlaces a recursos).

## Añadir un idioma

Para poder añadir un idioma a la aplicación se deben seguir los siguientes pasos.

1. Comprobar si el idioma está implementado o hay un _issue_ abierto.

2. Abrir un _issue_ para discutir el tema.

3. Si no hay inconveniente en ello, descargar proyecto y empezar a desarrollar.

4. Ir a `app/locale/languages/` y crear un fichero con el código [ISO 639](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) correspondiente.

```
eu.js // Para euskera
en.js // Para inglés
fr.js // Para francés.
```

5. Copiar el contenido del fichero `app/locale/languages/en.js` y traducir los strings.

6. Importar el fichero traducido en `app/locale/languages/index.js`.

7. Importar el fichero y añadir a la lista de traducciones en `app/locale/index.js``

```
import {
  es,
  en,
  // <==  Importar aqui
} from './languages';

I18n.fallbacks = true;
I18n.defaultLocale = common.defaultLocale;

I18n.translations = {
  es,
  en,
  // <== Añadir aqui 
};
```

8. Añadir el nuevo idioma a la lista para poder modificarlo. Para ello hay que añadir un objeto en el _array_ que hay en `app/settings/language-settings.js`. Este objeto debe tener la siguiente estructura:

```
 {
    code: 'es', 
    emojiCode: ':flag-es:',
    name: 'Español',
  },
```
* code: Código ISO 639
* emojiCode: Código de la bandera que se va a mostrar. Se puede consultar [aquí](), si no esta disponible usar `:waving-flag:`.
* name: Nombre del idioma que se va a mostrar en la configuración.

9. Comprobar que funciona todo correctamente.

10. Abrir un pull request para añadir el idioma referenciando al _issue_ que se ha abierto.

## Versionado

En este proyecto se sigue el módelo de versiones [semver](https://semver.org/).

## Estilo de código

<!-- Aquí el estándar escogido: -->
Estándar de código: [**AirBnB**](https://github.com/airbnb/javascript)

Reglas modificadas:

```javascript
"rules": {
		"react/jsx-filename-extension": 0,
    "func-names": 0,
    "import/prefer-default-export": 0,
    "react/prop-types": 0,
    "global-require": 0,
    "no-unused-vars": 0,
    "no-useless-escape": 0,
    "dot-notation": 0,
    "jsx-quotes": 0,
    "no-restricted-syntax": 0,
    "no-param-reassign": 0,
    "no-case-declarations": 0,
    "no-await-in-loop": 0,
    "no-plusplus": 0,
    "react/no-array-index-key": 0
	}
```
## Etiquetas

Cuando se abre una nueva _issue_ se le añaden una serie de etiquetas en función del contenido. En la siguiente tabla se pueden ver todas junto a su descripción.

| Nombre | Descripción |
| ------ | ------------|
| 🐛 bug | Notificación de error |
| ❌ duplicate | Issue repetida |
| 🙋🏼‍♀️ feature | Nueva funcionalidad |
| 👶🏼 good first issue | Ejemplo de una buena _issue_ |
| 🏳️ Translation | Traducción de la aplicación |
| 🙏🏼 help wanted | Petición de ayuda |
| ⚠️ invalid | _Issue_ incorrecta |
| 🧐 question | Pregunta sobre el proyecto |


## Contacto

* [Joseba Carral](https://github.com/jcarral) - <jcarraldc@gmail.com>

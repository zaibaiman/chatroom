![ChatRoom](https://raw.githubusercontent.com/zaibaiman/chatroom/main/chatroom.png)

# ChatRoom App

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **Este workspace a sido generado por [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Introducción

¡Bienvenido al repositorio de ChatRoom! Esta aplicación forma parte de un emocionante desafío propuesto por la empresa Sellia. En este repositorio, encontrarás una solución de Monorepo generada utilizando NxDev que consta de dos aplicaciones principales: **webapp** y **webserver**.

- **webapp**: Este es el componente de frontend de la aplicación, creado con Vue.js. Proporciona la interfaz de usuario atractiva y amigable que permite a los usuarios interactuar y comunicarse en tiempo real en un entorno de chat.

- **webserver**: El backend de la aplicación está basado en Nest.js. Maneja la lógica empresarial, gestiona las conexiones de los usuarios y garantiza una comunicación fluida entre los clientes en tiempo real.

## Características

ChatRoom es una aplicación de chat en tiempo real diseñada para proporcionar una experiencia interactiva y atractiva. A continuación, se detallan algunas de sus características principales:

1. **Sala Multiusuario:** ChatRoom permite a múltiples usuarios unirse a una sala de chat simultáneamente. Esto facilita la comunicación en tiempo real entre usuarios, ya que todos pueden interactuar en el mismo espacio de chat.

2. **Sesiones de Usuario Separadas:** Cada pestaña o instancia del navegador que inicia ChatRoom representa a un nuevo usuario. Esto crea una experiencia auténtica de chat, donde cada usuario se identifica como una entidad independiente en la sala de chat.

3. **Enviar Texto:** Los usuarios pueden enviar mensajes de texto en tiempo real a la sala de chat. Esto permite conversaciones fluidas y la posibilidad de intercambiar mensajes escritos.

4. **Enviar Imágenes:** Además de los mensajes de texto, ChatRoom permite a los usuarios compartir imágenes en la sala de chat. Esto enriquece la experiencia de comunicación al permitir la visualización de contenido multimedia.

5. **Búsqueda de Texto:** ChatRoom cuenta con una función de búsqueda que permite a los usuarios buscar mensajes específicos dentro de la sala de chat. Esta característica facilita la recuperación de conversaciones anteriores y la ubicación de información importante.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu entorno local:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [docker](https://www.docker.com/)

## Configuración de la Base de Datos

La aplicación ChatRoom utiliza MongoDB como sistema de gestión de bases de datos. Para configurar y ejecutar una instancia de MongoDB en tu entorno de desarrollo, sigue estos pasos:

1. Asegúrate de tener [Docker](https://www.docker.com/get-started) instalado en tu sistema.

2. En la raíz del repositorio, encontrarás un archivo llamado `docker-compose.yml`. Este archivo contiene la configuración necesaria para crear una instancia de MongoDB de forma sencilla.

3. Abre una terminal y navega hasta la ubicación del archivo `docker-compose.yml`.

4. Ejecuta el siguiente comando para crear y ejecutar una instancia de MongoDB:

   ```bash
   docker-compose up -d
## Ejecutar Apps

Para poner en marcha las aplicaciones de ChatRoom en tu entorno de desarrollo, sigue estos pasos:

1. En el directorio raíz del repositorio, abre una terminal.

2. Ejecuta el siguiente comando para instalar las dependencias necesarias en ambos proyectos (webapp y webserver):

   ```bash
   npm install
3. Para iniciar el servidor, utiliza el siguiente comando:

   ```bash
   npx nx run webserver:serve
4. A continuación, para ejecutar el frontend de la aplicación de chat, utiliza el siguiente comando:

   ```bash
   npx nx run webapp:serve
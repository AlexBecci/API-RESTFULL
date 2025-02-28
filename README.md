
# Proyecto API con Swagger y SQL

Este proyecto contiene una API que permite gestionar registros a través de diferentes endpoints. Utiliza JWT para autenticación y una base de datos SQL para el almacenamiento de los datos.

## Requisitos previos

Antes de comenzar, asegúrate de tener los siguientes requisitos instalados en tu sistema:

- **Node.js** 
- **MySQL** o **MariaDB** para la base de datos
- **Insomnia** (o Postman, aunque Insomnia es el recomendado para este proyecto)

## Instalación

1. **Instalar dependencias**  
   En primer lugar, debes instalar todas las dependencias necesarias para el proyecto:

   ```bash
   npm install
   ```

2. **Configurar la base de datos**  
   Dirígete a la carpeta `database` del proyecto y ejecuta los archivos `.sql` que contiene para crear las tablas necesarias. Asegúrate de tener una base de datos en MySQL/MariaDB configurada para este fin.

   ```sql
   -- Archivo de ejemplo: database/registros.sql
   -- Ejecuta los comandos SQL en tu cliente de base de datos
   ```

   Asegúrate de que las tablas estén correctamente creadas para que el proyecto pueda funcionar sin problemas.

## Ejecutar el proyecto

Una vez que las dependencias estén instaladas y la base de datos esté configurada, puedes iniciar el proyecto en modo de desarrollo:

```bash
npm run dev
```

El servidor debería estar corriendo en `http://localhost:3000`. A partir de ahí, podrás probar las diferentes rutas de la API.

## Probando la API

Recomiendo utilizar **Insomnia** para probar los endpoints de la API, ya que es el que utilicé para este proyecto. A continuación te dejo las instrucciones para usar Insomnia, pero también puedes usar Postman si lo prefieres.

### Instrucciones para Insomnia

1. **Descargar la colección de Insomnia**:  
   [Descargar colección de Insomnia](./mi-coleccion.json)

2. Abre **Insomnia**.
3. Haz clic en **"Import"** y selecciona el archivo descargado para cargar la colección.

### Instrucciones para Postman

1. **Descargar la colección de Postman**:  
   [Descargar colección de Postman](./mi-coleccion.json)

2. Abre **Postman**.
3. Haz clic en **"Import"** y selecciona el archivo descargado para cargar la colección.

### Endpoints disponibles

El proyecto está documentado mediante Swagger en la ruta `/api/docs`. Ahí podrás ver todas las rutas disponibles, junto con la descripción de cada una y cómo hacer pruebas directamente desde Swagger.

## Autenticación

El proyecto utiliza JWT para la autenticación. Asegúrate de obtener un token válido desde el endpoint de login y luego pásalo como `Authorization: Bearer <token>` en los headers de tus peticiones.

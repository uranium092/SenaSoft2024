# SenaSoft2024 - Frontend (frontSenaSoft)

Este repositorio contiene el frontend (React) para el proyecto SenaSoft2024.

**Tecnologías:** React, TS, MUI, Leaflet

## Estructura del repositorio

* `frontSenaSoft/`: Contiene el código fuente del frontend

## Primeros pasos

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/uranium092/SenaSoft2024
    ```

2.  **Navegar al directorio del frontend:**

    ```bash
    cd SenaSoft2024/frontSenaSoft
    ```

## Requisitos previos

1.  **Node.js:** Descarga e instala Node.js (versión >= 20.12.2) desde [NodeOrg](https://nodejs.org/en/download).
2.  **BackSenaSoft:** Asegúrate de que el backend esté en ejecución (ver instrucciones en el README del backend).

## Configuración

1.  **`.env`:** Crea un archivo `.env` en el directorio `frontSenaSoft/` con la siguiente información:

    ```properties
    VITE_SERVER_URL=http://localhost:8080
    ```

    * Este archivo guarda la URL del backend; si este no está en ejecución en el puerto `:8080`, ajusta la URL en el archivo `.env`.

## Ejecución

1.  **Instalar dependencias:**

    ```bash
    npm install
    ```

2.  **Ejecutar el frontend:**

    ```bash
    npm run dev
    ```

    * El frontend estará disponible en `http://localhost:5173`.

## Recomendaciones

* Asegúrate de que el backend se esté ejecutando en el puerto `:8080`, ya que el frontend está configurado para conectarse a esta URL por defecto.
* Si necesitas cambiar el puerto del backend, actualiza la variable `VITE_SERVER_URL` en el archivo `.env` del frontend.

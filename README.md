# SenaSoft2024

Este repositorio contiene el frontend (React) y el backend (Spring Boot) para el proyecto SenaSoft2024.

## Estructura del repositorio

* `BackSenaSoft/`: Contiene el código fuente del backend (Spring Boot).
* `frontSenaSoft/`: Contiene el código fuente del frontend (React).

## Requisitos previos

### Backend (BackSenaSoft)

1.  **Java 21:** Descarga e instala el JDK 21 desde [Oracle](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html).
2.  **MongoDB:**
    * Instala MongoDB Community Edition (versión >= 5.0.26) desde [MongoDB](https://www.mongodb.com/try/download/community).
    * Opcionalmente, puedes utilizar [MongoDB Atlas](https://www.mongodb.com/atlas/database) (servicio en la nube).

### Frontend (frontSenaSoft)

1.  **Node.js:** Descarga e instala Node.js (versión >= 20.12.2) desde [NodeOrg](https://nodejs.org/en/download).
2.  **BackSenaSoft:** Asegúrate de que el backend esté en ejecución (ver instrucciones abajo).

## Configuración

### Backend (BackSenaSoft)

1.  **MongoDB:** Asegúrate de que MongoDB esté en ejecución.
2.  **Base de datos:** Crea una base de datos llamada `SenaSoft` en tu instancia de MongoDB (local o Atlas).
3.  **`application.properties`:** El archivo `application.properties` se encuentra en `BackSenaSoft/src/main/resources/`. Por defecto, está configurado para conectar con MongoDB en localhost. Si estás utilizando MongoDB Atlas, debes modificar la cadena de conexión en este archivo.

    ```properties
    spring.application.name=BackSenaSoft
    spring.data.mongodb.uri=mongodb://localhost:27017/SenaSoft
    ```

    Si usas MongoDB Atlas, la cadena de conexión se verá similar a:

    ```properties
    spring.data.mongodb.uri=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/SenaSoft?retryWrites=true&w=majority
    ```

### Frontend (frontSenaSoft)

1.  **`.env`:** Crea un archivo `.env` en el directorio `frontSenaSoft/` con la siguiente información:

    ```properties
    VITE_SERVER_URL=http://localhost:8080
    ```

    * Este archivo guarda la URL del backend; si este no está en ejecución en el puerto `:8080`, ajusta la URL en el archivo `.env`.

## Ejecución

### Backend (BackSenaSoft)

1.  **Navegar al directorio del backend:**

    ```bash
    cd SenaSoft2024/BackSenaSoft
    ```

2.  **Ejecutar la aplicación:**

    * **Usando el Wrapper de Maven (mvnw):**

        ```bash
        mvnw spring-boot:run
        ```

    * **Usando Maven instalado localmente:**

        ```bash
        mvn spring-boot:run
        ```

    * **Ejecutando el JAR compilado:**

        * Compilar el proyecto:

            ```bash
            mvn clean package
            ```

        * Ejecutar el JAR:

            ```bash
            java -jar target/app.jar
            ```

### Frontend (frontSenaSoft)

1.  **Navegar al directorio del frontend:**

    ```bash
    cd SenaSoft2024/frontSenaSoft
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Ejecutar el frontend:**

    ```bash
    npm run dev
    ```

    * El frontend estará disponible en `http://localhost:5173`.

## Recomendaciones

* Asegúrate de que el backend se esté ejecutando en el puerto `:8080`, ya que el frontend está configurado para conectarse a esta URL por defecto.
* Si necesitas cambiar el puerto del backend, actualiza la variable `VITE_SERVER_URL` en el archivo `.env` del frontend.

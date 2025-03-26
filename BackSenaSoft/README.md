# SenaSoft2024 - Backend (BackSenaSoft)

Este repositorio contiene el backend (Spring Boot) para el proyecto SenaSoft2024.

**Tecnologías**: Java, Spring Boot, Spring Data, Maven, MongoDB

## Estructura del repositorio

* `BackSenaSoft/`: Contiene el código fuente del backend

## Primeros pasos

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/uranium092/SenaSoft2024
    ```

2.  **Navegar al directorio del backend:**

    ```bash
    cd SenaSoft2024/BackSenaSoft
    ```

## Requisitos previos

1.  **Java:** Descarga e instala el JDK (versión >= 17) desde [Oracle](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).
2.  **MongoDB:**
    * Instala MongoDB Community Edition (versión >= 5.0.26) desde [MongoDB](https://www.mongodb.com/try/download/community).
    * Opcionalmente, puedes utilizar [MongoDB Atlas](https://www.mongodb.com/atlas/database) (servicio en la nube).

## Configuración

1.  **MongoDB:** Asegúrate de que MongoDB esté en ejecución.
2.  **Base de datos:** Crea una base de datos llamada `SenaSoft` en tu instancia de MongoDB (local o Atlas).
3.  **`application.properties`:** El archivo `application.properties` se encuentra en `src/main/resources/`. Por defecto, está configurado para conectar con MongoDB en localhost. Si estás utilizando MongoDB Atlas, debes modificar la cadena de conexión en este archivo.

    ```properties
    spring.application.name=BackSenaSoft
    spring.data.mongodb.uri=mongodb://localhost:27017/SenaSoft
    ```

    Si usas MongoDB Atlas, la cadena de conexión se verá similar a:

    ```properties
    spring.data.mongodb.uri=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/SenaSoft?retryWrites=true&w=majority
    ```

## Ejecución

1.  **Ejecutar la aplicación:**

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
            * Reemplaza `app.jar` por el nombre del archivo .jar generado en `/target`

## Recomendaciones

* Asegúrate de que el backend se esté ejecutando en el puerto `:8080`, ya que el frontend está configurado para conectarse a esta URL por defecto.
* Si necesitas cambiar el puerto del backend, actualiza la variable `VITE_SERVER_URL` en el archivo `.env` del frontend.

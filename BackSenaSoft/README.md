# ¿Cómo ejecutarlo?

### Requisitos previos

Asegúrate de tener instalados los siguientes componentes:

1.  **Java 21:** Descarga e instala el JDK 21 desde [Oracle](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html).
2.  **MongoDB:**
    * Instala MongoDB Community Edition (versión >= 5.0.26) desde [MongoDB](https://www.mongodb.com/try/download/community).
    * Opcionalmente, puedes utilizar [MongoDB Atlas](https://www.mongodb.com/atlas/database) (servicio en la nube).

### Configuración

1.  **MongoDB:** Asegúrate de que MongoDB esté en ejecución.
2.  **Base de datos:** Crea una base de datos llamada `SenaSoft` en tu instancia de MongoDB (local o Atlas).
    
# Ejecutar BackSenaSoft

Sigue estos pasos para ejecutar BackSenaSoft:

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/uranium092/SenaSoft2024
    ```

2.  **Navegar al directorio del backend:**

    ```bash
    cd SenaSoft2024
    cd BackSenaSoft
    ```

3. **`application.properties`:** El archivo `application.properties` se encuentra en `src/main/resources/`. Por defecto, está configurado para conectar con MongoDB en localhost. Si estás utilizando MongoDB Atlas, debes modificar la cadena de conexión en este archivo. Reemplaza la cadena de conexión por la proporcionada por MongoDB Atlas.
    ```properties
    # src/main/resources/application.properties
    spring.application.name=BackSenaSoft
    spring.data.mongodb.uri=mongodb://localhost:27017/SenaSoft
    ```
    Si usas MongoDB Atlas, la cadena de conexion en `spring.data.mongodb.uri` se verá similar a esta. `spring.data.mongodb.uri=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/SenaSoft?retryWrites=true&w=majority`

4.  **Ejecutar la aplicación:**

    * **Usando el Wrapper de Maven (mvnw) - Sin instalación local de Maven:**
      
        * En la raíz del proyecto, ejecutar el siguiente comando:
      
        * ```bash
            mvnw spring-boot:run
            ```
        * Asegurese de tener los permisos necesarios para la ejecución de este tipo de script

    * **Usando Maven instalado localmente:**

        * Descargar [Apache Maven](https://maven.apache.org/download.cgi).
        * Asegurese de que la instalación de Maven esté configurada correctamente y que la variable de entorno `PATH` incluya el directorio `bin` de Maven.
  
        * En la raíz del proyecto, ejecutar el siguiente comando:
          
        * ```bash
            mvn spring-boot:run
            ```

    * **Ejecutando el JAR compilado:**
      
        * **Paso 1: Compilar el proyecto para generar el archivo JAR:**
            * ```bash
                mvn clean package
                ```
        * **Paso 2: Ejecutar el archivo JAR generado:**
            * Reemplazar `app.jar` con el nombre real del archivo JAR generado en el directorio `target`.
            * Este comando ejecuta la aplicación Java contenida en el JAR.
            * ```bash
                java -jar target/app.jar
                ```
## Recomendaciones:
* Asegurese que la ejecución ocurra en el puerto `:8080`, de lo contrario, tendrá que cambiar el puerto de comunicación hacia este Backend en el Frontend

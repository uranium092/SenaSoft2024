# ¿Cómo ejecutarlo?

### Requisitos previos

1.  **Node.js:** Descarga e instala Node.js (versión >= 20.12.2)  desde [NodeOrg](https://nodejs.org/en/download).
2.  **BackSenaSoft:** Asegurese de que el [Backend](https://github.com/uranium092/SenaSoft2024/tree/master/BackSenaSoft) esté en ejecución.
    
# Ejecutar frontSenaSoft

Sigue estos pasos para ejecutar frontSenaSoft:

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/uranium092/SenaSoft2024
    ```

2.  **Navegar al directorio del frontend:**

    ```bash
    cd SenaSoft2024
    cd frontSenaSoft
    ```

3. **`.env`:** Crear un archivo llamado `.env` con la siguiente información:
    ```bash
    # .env
    VITE_SERVER_URL=http://localhost:8080
    ```
    * Tiene la URL del [Backend](https://github.com/uranium092/SenaSoft2024/tree/master/BackSenaSoft); si este no está ejecución en el puerto `:8080`, asegurese de adaptarlo en el `.env` -> `VITE_SERVER_URL=http://localhost:<PORT>`

4. **Instalar dependencias:**
   * Corra el siguiente comando para instalar las dependencias necesarias:
   ```js
    npm install
    ```

5. **Finalmente arrancar el frontend**:
   * Ejecute el siguiente comando:
    ```js
    npm run dev
    ```
    * El frontend ahora corre en el puerto `:5173` en modo desarrollo.

# Usar la imagen oficial de Node como base
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm ci --only=production

# Copiar el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Exponer el puerto en el que el servidor de AdonisJS escucha (por defecto: 3333)
EXPOSE 3334

# Comando para iniciar el servidor de AdonisJS
CMD ["node", "ace", "serve"]

# Usamos la imagen oficial de Node.js como base
FROM node:latest

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos necesarios
COPY package.json package-lock.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de los archivos de la aplicación
COPY . .

# Puerto en el que escucha la aplicación
EXPOSE 9000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]

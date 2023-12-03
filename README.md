# Backend Medicina de Preción BIOS

Este proyecto es un ejemplo de cómo crear un archivo README utilizando el formato Markdown.

1. Clona el repositorio en tu máquina local.
```sh
git clone https://github.com/BIOS-PRECISION-MEDICINE/backend.git
```

2. Ingresar a la carpeta "backend".
```sh
cd backend
```

3. Instalar las dependencias
```sh
npm install
```

4. Configuración de la base de datos
4.1 Crear una base de datos. Ej: bios-precision-medicine
4.2 Crear un usuario para la base datos con todos los permisos requeridos y respectiva contraseña
4.3 Ejecutar las migraciones
```sh
node ace migration:run
```

4.4 Ejecutar migraciones basicas
```sh
node ace db:seed
```
5. Ejecutar proyecto
```sh
node ace serve
```

6. Documentación de las api se puede encontrar en el siguiente enlace http://127.0.0.1:3333/docs
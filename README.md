# APV - ADMINISTRADOR DE PACIENTES DE VETERINARIA

<p align="center">
    <img src="/public/login.PNG" height="300p">
</p>


Este es el resultado de mi proyecto final del curso "JavaScript Moderno", donde aplico los conocimientos adquiridos durante el curso.

Se trata de un Administrador de Citas para pacientes de una veterinaria, aplicando una arquitectura limpia llaamada MVC, asi como aplicando el STACK de MERN, seguridad por parte de JWT entre otras cosas mas.

## Funcionalidades Principales

En primera instancia, contamos con el inicio de sesion, el cual es representado por la primera imagen del repositorio.

### Olvide mi contraseña
<p align="center">
    <img src="/public/forgotMyPass.PNG" height="300p">
</p>


### Crear y Actualizar una cita
<p align="center">
    <img src="/public/update.PNG" height="300p">
</p>

El usuario introduce su correo electronico, de esta manera recibira un correo con las instrucciones

### Componente de email
<p align="center">
    <img src="/public/email.PNG" height="300p">
</p>

El usuario recibira un email con instrucciones para la recuperación de la contraseña, en el cual vendra un token unico de un solo uso

### Token de un solo uso
<p align="center">
    <img src="/public/tokenEmail.PNG" height="300p">
</p>

Una vez se ingrese a la web, ya no podra volver a ingresar, pues en la url se maneja el token de un solo uso cifrado e implemtado con seguridad

### Pagina de Inicio
<p align="center">
    <img src="/public/home.PNG" height="300p">
</p>

Una vez el usuario inicie sesion se despliega la pantalla de inicio, esta pantalla puede variar dependiendo del usuario, pues cada usuario mantendra sus citas generadas en tiempo real gracias a la conexion con la base de datos


### Crear y Actualizar una cita
<p align="center">
    <img src="/public/update.PNG" height="300p">
</p>

Y por ultimo tenemos la funcionalidad para editar y actualizar una cita ya existente


## Documentation

### COMMITS

* ADD
* CHANGE
* UPDATE
* DELETE

### BRANCHS

* DEV
* MAIN

  

## Tecnologias Utilizadas:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

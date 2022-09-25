# Awesome Project Build with TypeORM

## Puntos a considerar

Ya se que las variables de entorno no tendrían que estar subidas, se las subi
porque es un repo privado, no hay nada que se puedan robar y también por si
querian probar el proyecto de manera local.

El proyecto cuenta con validaciones básicas usando express-validator y después
tiene algún que otro paquete para más.

Si se usa docker también agregue [pgadmin4](https://www.pgadmin.org/) para poder
ver/manipular los datos con mayor facilidad, lo podes visualizar en [http://localhost/](http://localhost/)

Las claves de autenticación para pgadmin4 son (estan en el fichero `".env"`):  
**usuario**: arguelar@gmail.com  
**contraseña**: admin

### Importante si vas a usar docker

**TL;DR Si vas a probar, usa el script que quieras, pero si vas a usar `npm start`
vas a tener que cambiar las direcciones de forma manual.**

Yo creo que la más importante a mencionar es que docker usa un coneccion
distinta, al ser contenedores se tiene que usar el nombre del contenedor para
poder conectarse y no la dirección de tu maquina, es por eso que hice un
ambiente específico para docker, “producción” digamos, `npm start` es el script
que designe para correr los contenedores y así no hay conflictos, porque docker
necesita poder conectarse al servicio de “database” configurado en
[docker-compose.yml](https://github.com/enzoarguello512/node-typeorm-crud/blob/main/docker-compose.yml) 
y para que vos te puedas conectar desde tu máquina local necesitas entrar 
desde localhost.

Cambiando las direcciones de manera manual se podría lograr, por ejemplo,
levantas docker con las siguientes propiedades en 
[./src/config/default.ts](https://github.com/enzoarguello512/node-typeorm-crud/blob/main/src/config/default.ts).

```javascript
{
   host: process.env.POSTGRES_HOST || '0.0.0.0',
   // host: '0.0.0.0',
}
```

Y luego una vez que docker esta corriendo bien, cambias a localhost para que no
te tire error de coneccion `getaddrinfo EAI_AGAIN`

```javascript
{
   // host: process.env.POSTGRES_HOST || '0.0.0.0',
   host: '0.0.0.0',
}
```

No se me ocurre una forma “práctica” de solucionar esto jaja, capas cambiando
el dockerfile y teniendo dos `data-souce.ts` con diferentes direcciones.

**Cabe resaltar también que en el modo default el servidor arranca en el puerto
8081 y en “producción” arranca en el 8080, así que ojo al tejo 👀.**

## Pasos para arrancar el proyecto

1. Instalar las dependencias con `npm i`
2. En caso de querer levantar la imagen y contenedores con docker se puede usar `docker compose up`
   1. En caso de querer usar una instancia local de postgres habría que cambiar
      la variable de entorno `“POSTGRES_HOST”` en el fichero `“.env”`, el valor
      original hace referencia al contenedor que crea docker, con cambiar eso
      creo que ya estaría.
3. Arrancar el servidor con alguno de los siguientes comandos:
   1. `npm start` para iniciar en modo normal (leer primero [Importante si vas a usar docker](#importante-si-vas-a-usar-docker))
   2. `npm run development` para iniciar en modo desarrollo
4. En caso de querer correr migraciones se pueden ejecutar
   1. `npm run migration:generate --name=Nombre` para generar una nueva migración
      de manera automática, “Nombre” es una variable, la podes reemplazar con el
      nombre que le quieras dar a tu migracion, ejemplo
      `npm run migration:generate --name=initial`  
      Pd: No se que tan bien pueda a llegar las variables por línea de comandos
      en otros sistemas operativos.
   2. `npm run migration:run` para correr las migraciones en la ruta `“src/migrations/*”`
   3. `npm run migration:create --name=Nombre` para crear una plantilla y hacer la
      migración de manera manual, la variable de nombre es la misma que en el
      punto 2 (ii).
   4. `npm run migration:revert` para revertir las migraciones hechas.

## Colección de Postman

Una colección simple, tiene una variable local que la pueden cambiar
dependiendo de donde levanten la aplicación, en mi caso es
[http://localhost:8080](http://localhost:8080).

Creo que tendría que andar, si no me equivoco deje publico el link también
adjunto una captura.

[https://www.getpostman.com/collections/bfe775466e4f23159449](https://www.getpostman.com/collections/bfe775466e4f23159449)

<p align="center"><img src="https://user-images.githubusercontent.com/75096734/192121000-cb18c069-eb5f-4a60-9c9a-7a5548dd3991.png"></p>

## Algunos ejemplos

api/vehicle (POST)

```javascript
{
  "name": "Dodge GRAND CARAVAN",
  "year": 2010,
  "brandId": 1, // opcional, se puede dejar con valor null
  "model": "DODGE",
  "colorsId": [1] // opcional, si el id no existe deja el array vacio
}
```

api/brand(POST)

```javascript
{
  "name": "DODGE",
  "vehiclesId": [1] // opcional, si el id no existe deja el array vacio
}
```

api/color(POST)

```javascript
{
  "name": "Blue",
  "vehiclesId": [1] // opcional, si el id no existe deja el array vacio
}
```

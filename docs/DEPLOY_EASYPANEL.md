# Despliegue en EasyPanel

Esta guía usa un único repositorio de GitHub y varios servicios de EasyPanel. EasyPanel construye las aplicaciones desde sus respectivos `Dockerfile`.

## 1. Preparar el VPS

- Use una instalación reciente de Ubuntu con al menos 2 GB de RAM; 4 GB o más es recomendable para compilar ambos proyectos.
- Mantenga disponibles los puertos 80 y 443.
- Instale EasyPanel siguiendo su documentación oficial.
- Apunte los registros DNS del portal y de la API hacia la IP pública del VPS.

Ejemplo:

- `empleaterd.com` → IP del VPS.
- `api.empleaterd.com` → IP del VPS.

## 2. Crear el proyecto y los datos

En EasyPanel cree un proyecto llamado `empleaterd` y agregue:

1. Un servicio PostgreSQL llamado `postgres`.
2. Un servicio Redis llamado `redis`.
3. Un servicio App llamado `api`.
4. Un servicio App llamado `worker`.
5. Un servicio App llamado `frontend`.

Use contraseñas generadas por EasyPanel. No copie las credenciales locales incluidas en `compose.yaml`.

## 3. Servicio de API

Conecte el repositorio de GitHub y configure:

- Método de construcción: Dockerfile.
- Ruta relativa del Dockerfile: `docker/easypanel/backend.Dockerfile`.
- Puerto del proxy: `8000`.
- Dominio: `api.empleaterd.com`.
- Ruta de comprobación: `/up`.

Variables requeridas:

```dotenv
APP_NAME=EmpleateRD
APP_ENV=production
APP_KEY=base64:GENERAR_UNA_CLAVE_REAL
APP_DEBUG=false
APP_URL=https://api.empleaterd.com
FRONTEND_URL=https://empleaterd.com
APP_LOCALE=es
APP_FALLBACK_LOCALE=es
LOG_CHANNEL=stderr
LOG_LEVEL=warning
DB_CONNECTION=pgsql
DB_HOST=HOST_INTERNO_DE_EASYPANEL
DB_PORT=5432
DB_DATABASE=empleaterd
DB_USERNAME=USUARIO_GENERADO
DB_PASSWORD=CONTRASENA_GENERADA
REDIS_CLIENT=phpredis
REDIS_HOST=HOST_INTERNO_DE_REDIS
REDIS_PORT=6379
REDIS_PASSWORD=CONTRASENA_DE_REDIS_SI_APLICA
CACHE_STORE=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
MAIL_MAILER=smtp
MAIL_HOST=PROVEEDOR_SMTP
MAIL_PORT=587
MAIL_USERNAME=USUARIO_SMTP
MAIL_PASSWORD=CONTRASENA_SMTP
MAIL_SCHEME=tls
MAIL_FROM_ADDRESS=no-reply@empleaterd.com
MAIL_FROM_NAME=EmpleateRD
```

Genere `APP_KEY` una sola vez y consérvela. Puede obtenerla desde una consola temporal con `php artisan key:generate --show`.

Después del primer despliegue, abra la consola del servicio y ejecute:

```text
php artisan migrate --force
php artisan db:seed --force
```

El primer comando crea o actualiza las tablas. El segundo carga de forma idempotente las vacantes iniciales utilizadas por el portal.

### Almacenamiento privado

Mientras no se configure S3, agregue al servicio `api` un volumen persistente:

- Nombre: `private-documents`.
- Ruta de montaje: `/app/storage/app/private`.

Sin este volumen, los CV y documentos cargados se perderán cuando EasyPanel sustituya o reinicie el contenedor. Para producción definitiva se recomienda almacenamiento S3 compatible.

## 4. Worker

Use el mismo repositorio, `docker/easypanel/backend.Dockerfile` y variables de la API. No necesita dominio. En la configuración de ejecución sustituya el comando por:

```text
php artisan queue:work --sleep=3 --tries=3 --max-time=3600
```

Configure el reinicio automático del servicio. Las migraciones no deben ejecutarse desde el worker.

## 5. Frontend

Conecte el mismo repositorio y configure:

- Método de construcción: Dockerfile.
- Ruta relativa del Dockerfile: `docker/easypanel/frontend.Dockerfile`.
- Puerto del proxy: `3000`.
- Dominio principal: `empleaterd.com`.
- Variable de compilación y ejecución:

```dotenv
NEXT_PUBLIC_API_URL=https://api.empleaterd.com/api/v1
```

Las variables `NEXT_PUBLIC_*` quedan incorporadas en la compilación. Si cambia el dominio de la API, vuelva a desplegar el frontend.

## 6. Dominios y HTTPS

Marque cada dominio público como principal y active el certificado de Let's Encrypt. No publique directamente los puertos de PostgreSQL o Redis a internet.

## 7. Despliegues automáticos

Cuando el primer despliegue funcione:

1. Active Auto Deploy en `frontend`, `api` y `worker`.
2. Mantenga `main` como rama de producción.
3. Espere a que el workflow `Quality` de GitHub termine correctamente antes de fusionar cambios.

## 8. Verificación posterior

- `https://api.empleaterd.com/up` responde correctamente.
- `https://api.empleaterd.com/api/v1/health` devuelve `status: ok`.
- El portal carga por HTTPS.
- La API conecta con PostgreSQL y Redis.
- El worker aparece activo y procesa una tarea de prueba.
- Un CV de prueba continúa disponible después de reiniciar el servicio `api`.
- El correo transaccional llega al proveedor configurado.
- Los servicios recuperan su estado después de reiniciar el VPS.

## 9. Copias de seguridad

Active copias automáticas de PostgreSQL fuera del mismo VPS. Pruebe una restauración antes del lanzamiento y documente la frecuencia y retención elegidas.

# EmpleateRD

Plataforma de empleos orientada inicialmente a República Dominicana. Conecta candidatos y empresas mediante publicación de vacantes, seguimiento de postulaciones y una cotización dinámica que sustituye los planes rígidos.

## Estado

El proyecto está en fase de definición técnica. La visión del producto está documentada en `PromptMaestro.txt` y el alcance funcional completo en `Prompt Ultra Detallado.md`. El avance se registra en `checklist.md`.

## Alcance inicial

El primer lanzamiento cubrirá el recorrido completo mínimo:

1. Una empresa calcula una cotización, se registra, crea una vacante, paga y la envía a revisión.
2. Un administrador revisa y publica la vacante.
3. Un candidato encuentra la vacante, crea su perfil y se postula.
4. La empresa revisa la postulación y gestiona las etapas básicas del proceso.

## Arquitectura acordada

- Frontend: Next.js, React, TypeScript y Tailwind CSS.
- Backend: Laravel 12, PHP 8.4 y API REST versionada.
- Datos: PostgreSQL; Redis para caché y trabajos en segundo plano.
- Archivos: almacenamiento privado compatible con S3.
- Operación: Docker, proxy inverso, integración continua y despliegue en VPS.

La primera implementación será un monolito modular con frontend separado. Esto conserva límites claros sin introducir la complejidad operativa de microservicios antes de tener tráfico real.

## Desarrollo local

Con Docker instalado, copie los valores de ejemplo si necesita personalizarlos y ejecute:

```text
docker compose up --build
```

Servicios disponibles:

- Portal: `http://localhost:3000`
- API: `http://localhost:8000/api/v1/health`
- Correo local: `http://localhost:8025`
- PostgreSQL: puerto `5432`
- Redis: puerto `6379`

En este equipo el frontend también puede ejecutarse directamente desde `frontend` con `npm run dev`. El backend requiere PHP 8.4 y Composer o, preferiblemente, Docker.

## Documentación de trabajo

- `docs/PLAN_MVP.md`: alcance, orden de ejecución y criterios de salida del MVP.
- `docs/ARCHITECTURE.md`: decisiones técnicas y límites iniciales.
- `docs/DEPLOY_EASYPANEL.md`: configuración de GitHub y despliegue en EasyPanel.
- `checklist.md`: seguimiento de tareas terminadas y pendientes.

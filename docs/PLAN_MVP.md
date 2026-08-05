# Plan de ejecución del MVP

## Objetivo

Validar el ciclo comercial y de contratación completo sin intentar construir los 39 módulos a la vez. El MVP debe permitir publicar una vacante pagada, recibir postulaciones y gestionarlas con trazabilidad.

## Principios de alcance

- Construir primero recorridos completos, no paneles aislados.
- Mantener decisiones de IA como asistencia explicable; nunca como rechazo automático.
- Tratar la cantidad de postulaciones como límite habilitado u objetivo, no como garantía.
- Mantener separados precio, orden, pago, publicación y duración de la vacante.
- Guardar el estado histórico usado en cada postulación, cotización y pago.
- Diseñar para República Dominicana, dejando país y moneda configurables sin implementar todavía la operación multi-país.

## Incremento 1 — cimientos

Entregables:

- Proyectos Next.js y Laravel con desarrollo local reproducible.
- PostgreSQL, Redis, almacenamiento local compatible con la interfaz S3 y correo de pruebas.
- API `/api/v1`, formato uniforme de errores, paginación y control de acceso.
- Usuarios, perfiles separados, roles, permisos, verificación de correo y auditoría inicial.
- Catálogos mínimos: provincias, municipios, categorías, modalidades, contratos, jornadas y niveles educativos.

Criterio de salida: candidato, propietario de empresa y administrador pueden registrarse e iniciar sesión con los permisos correctos.

## Incremento 2 — mercado público

Entregables:

- Inicio, buscador, resultados, filtros y detalle de vacante.
- Perfil público de empresa.
- Estados visibles y estados vacíos útiles.
- Metadatos SEO y datos estructurados de vacantes.

Criterio de salida: un visitante puede encontrar una vacante activa desde móvil y llegar al inicio de la postulación.

## Incremento 3 — empresa y cotización

Entregables:

- Perfil empresarial y verificación básica.
- Cuestionario dinámico, versión de precios y cotización con vencimiento.
- Creación guiada de vacantes y puntuación básica de calidad.
- Orden, pago inicial y revisión administrativa.

Criterio de salida: una empresa puede pagar una configuración reproducible y enviar su vacante a revisión sin inconsistencias de precio.

## Incremento 4 — candidato y postulaciones

Entregables:

- Perfil profesional progresivo, preferencias y carga privada de CV.
- Aplicación rápida con preguntas excluyentes explícitas.
- Instantánea del CV y de las respuestas enviadas.
- Estados de postulación y notificaciones por correo.

Criterio de salida: una aplicación permanece íntegra aunque el candidato edite después su perfil o CV.

## Incremento 5 — ATS básico

Entregables:

- Lista de candidatos por vacante, filtros, notas y etiquetas.
- Pipeline configurable en su versión mínima.
- Mensajes simples y entrevistas básicas.
- Historial visible de cambios de estado.

Criterio de salida: la empresa puede llevar una postulación desde recibida hasta contratada o rechazada, y el candidato recibe los cambios relevantes.

## Incremento 6 — operación y lanzamiento

Entregables:

- Panel administrativo, moderación, soporte y reportes básicos.
- Blog, SEO técnico, publicidad propia sencilla y analítica esencial.
- Protección de archivos, límites de solicitudes, respaldos y recuperación probada.
- Pruebas de los recorridos críticos, accesibilidad y rendimiento móvil.

Criterio de salida: el equipo puede operar, cobrar, moderar, medir y recuperar el servicio con procedimientos documentados.

## Riesgos a resolver temprano

1. La fórmula de precios aún no tiene valores ni límites comerciales aprobados.
2. El proveedor de pago local condicionará confirmaciones, reembolsos y conciliación.
3. El manejo de CV y datos personales exige política de acceso, retención y eliminación antes del lanzamiento.
4. OpenSearch añade costo operativo; PostgreSQL puede cubrir la búsqueda inicial hasta medir volumen y calidad.
5. La especificación incluye demasiado para un primer lanzamiento; aceptar extras dentro del MVP pondrá en riesgo el ciclo principal.

# Arquitectura inicial

## Enfoque

La solución comenzará como un monolito modular en Laravel detrás de una API REST versionada, consumida por una aplicación Next.js. Cada módulo conservará sus propias reglas y servicios, pero compartirá despliegue y base de datos durante el MVP.

Este enfoque facilita transacciones importantes —por ejemplo, convertir una cotización en orden y activar una publicación— y permite extraer servicios más adelante solo cuando exista una razón medible.

## Límites funcionales

- **Identidad y acceso:** usuarios, perfiles, sesiones, roles y permisos.
- **Candidatos:** perfil, experiencia, educación, habilidades, preferencias y documentos.
- **Empresas:** organización, miembros, permisos y verificación.
- **Vacantes:** contenido, preguntas, revisión, publicación y vigencia.
- **Postulaciones:** instantáneas enviadas, estados, notas y evaluaciones.
- **Comercial:** precios versionados, cotizaciones, órdenes, pagos, créditos y comprobantes.
- **Comunicación:** mensajes, entrevistas, plantillas y notificaciones.
- **Contenido:** blog, SEO y publicidad.
- **Operación:** moderación, soporte, reportes, configuración y auditoría.

Los módulos se comunican mediante servicios internos y eventos de dominio. Correos, procesamiento de documentos, indexación y tareas similares se ejecutan de manera asíncrona mediante colas.

## Datos y aislamiento empresarial

La primera versión usará una base PostgreSQL compartida. Las entidades empresariales incluirán `company_id`, y las consultas privadas estarán sujetas a políticas de autorización y alcance empresarial. No se confiará en filtros enviados por el navegador para aislar datos.

Las cotizaciones, reglas de precio y postulaciones conservarán instantáneas inmutables de los datos relevantes. Los catálogos utilizados históricamente se desactivarán, no se eliminarán.

## API

- Prefijo inicial: `/api/v1`.
- Recursos y acciones protegidos mediante políticas por rol y pertenencia empresarial.
- Paginación y errores con un formato uniforme.
- Idempotencia en pagos, webhooks y operaciones que puedan repetirse.
- Fechas en UTC; presentación según la zona horaria configurada.
- Importes almacenados en unidades mínimas de moneda, sin números decimales flotantes.

## Archivos y privacidad

Los CV, documentos de verificación y adjuntos sensibles serán privados. La descarga requerirá autorización y utilizará enlaces temporales. Se validarán tipo, tamaño y contenido, y cada acceso importante quedará auditado.

## Búsqueda

El MVP comenzará con PostgreSQL, índices adecuados y búsqueda textual. OpenSearch se incorporará cuando las métricas demuestren que se necesita mejor relevancia, sinónimos complejos o una escala que justifique su operación. La interfaz de búsqueda debe aislar esta decisión del resto del producto.

## Integraciones

Pagos, correo, almacenamiento y mensajería se consumirán mediante contratos internos (`PaymentProvider`, `EmailProvider`, `StorageProvider`, `MessagingProvider`). Los webhooks se verificarán, registrarán e implementarán de forma idempotente.

## Entornos y operación

- Desarrollo local con contenedores.
- Pruebas automatizadas en integración continua.
- Entorno de pruebas separado de producción.
- Secretos fuera del repositorio y del panel visible.
- Registros estructurados, métricas, alertas y copias de seguridad con restauración ensayada.

## Decisiones que requieren confirmación comercial

- Marca, dominio, identidad visual y tono.
- Procesador de pagos y reglas de reembolso.
- Tabla inicial de precios, impuestos y promociones.
- Política legal de privacidad, retención y moderación.
- Proveedores definitivos de correo, archivos y mensajería.

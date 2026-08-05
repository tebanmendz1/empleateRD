# ESPECIFICACIÓN FUNCIONAL DEL PORTAL NACIONAL DE EMPLEOS

## 1. Concepto general del sistema

La plataforma será un portal nacional de empleos orientado inicialmente a República Dominicana, diseñado para conectar candidatos y empresas mediante un proceso de contratación sencillo, económico, medible y parcialmente automatizado.

El sistema tendrá cuatro áreas principales:

1. **Portal público de empleos y contenido.**
2. **Área privada de candidatos.**
3. **Área privada de empresas y reclutadores.**
4. **Panel central de administración.**

La empresa no tendrá que seleccionar planes tradicionales. En su lugar, completará un cuestionario donde indicará:

* Cantidad de vacantes que desea publicar.
* Tiempo de publicación.
* Límite u objetivo de postulaciones.
* Nivel de urgencia.
* Necesidad de visibilidad adicional.
* Servicios adicionales.

Con estas respuestas, el sistema generará una recomendación y calculará el precio.

La cantidad seleccionada debe presentarse como **límite de postulaciones habilitadas u objetivo estimado**, no como una garantía de que la plataforma conseguirá exactamente esa cantidad de candidatos.

---

# 2. Roles del sistema

## 2.1 Visitante

Puede:

* Consultar empleos.
* Buscar empresas.
* Leer artículos.
* Guardar búsquedas temporalmente.
* Calcular el precio de una publicación.
* Iniciar el registro como candidato o empresa.

No puede aplicar a empleos ni consultar información privada.

## 2.2 Candidato

Puede:

* Crear su perfil profesional.
* Construir o subir su currículum.
* Buscar vacantes.
* Aplicar a empleos.
* Seguir sus postulaciones.
* Recibir mensajes e invitaciones.
* Configurar alertas.
* Participar en entrevistas.
* Administrar la visibilidad de sus datos.

## 2.3 Empresa propietaria

Es el usuario principal de una cuenta empresarial.

Puede:

* Completar y verificar la empresa.
* Comprar publicaciones.
* Crear vacantes.
* Administrar usuarios internos.
* Revisar candidatos.
* Gestionar entrevistas.
* Consultar pagos y estadísticas.
* Configurar la cuenta empresarial.

## 2.4 Reclutador empresarial

Puede gestionar vacantes y candidatos según los permisos concedidos por el propietario.

## 2.5 Evaluador o entrevistador

Tiene acceso únicamente a:

* Vacantes asignadas.
* Candidatos asignados.
* Entrevistas.
* Evaluaciones y comentarios internos.

No puede comprar publicaciones ni modificar la configuración de la empresa.

## 2.6 Editor de contenido

Puede:

* Crear artículos.
* Editar categorías.
* Programar publicaciones.
* Gestionar SEO.
* Moderar comentarios.

## 2.7 Moderador

Puede revisar:

* Empresas.
* Vacantes.
* Reportes.
* Perfiles denunciados.
* Contenido sospechoso.

## 2.8 Administrador financiero

Puede:

* Consultar pagos.
* Confirmar transferencias.
* Emitir recibos.
* Gestionar reembolsos.
* Revisar ingresos y balances.

## 2.9 Superadministrador

Tiene acceso completo a todos los módulos, configuraciones, auditoría, precios, usuarios, empresas, publicaciones, publicidad y reportes.

---

# 3. Módulo de portal público

## Objetivo

Presentar la plataforma, captar candidatos, atraer empresas y facilitar el descubrimiento de vacantes.

## Secciones principales

* Página de inicio.
* Buscador de empleos.
* Listado de vacantes.
* Detalle de vacante.
* Directorio de empresas.
* Perfil público de empresa.
* Categorías laborales.
* Empleos por provincia.
* Empleos remotos.
* Primer empleo.
* Empleos urgentes.
* Blog.
* Preguntas frecuentes.
* Tarifas dinámicas.
* Centro de ayuda.
* Términos y políticas.

## Página de inicio

Debe incluir:

* Buscador principal por cargo, palabra clave y ubicación.
* Vacantes recientes.
* Vacantes urgentes.
* Vacantes destacadas.
* Categorías más buscadas.
* Provincias con más oportunidades.
* Empresas destacadas.
* Contenido del blog.
* Botones para candidatos y empresas.
* Indicadores reales de la plataforma.
* Espacios de publicidad controlados.

## Flujo ideal

1. El visitante entra al portal.
2. Introduce un cargo, habilidad o palabra clave.
3. Selecciona una ubicación o modalidad.
4. El sistema muestra resultados ordenados por relevancia.
5. El visitante aplica filtros.
6. Abre una vacante.
7. Revisa requisitos, salario, ubicación y empresa.
8. Selecciona “Aplicar”.
9. El sistema solicita iniciar sesión o registrarse.
10. Después del registro, regresa automáticamente a la vacante.

## Reglas

* Las vacantes vencidas no aparecen en resultados.
* Las vacantes pausadas no aceptan postulaciones.
* Las publicaciones destacadas deben identificarse como patrocinadas.
* El posicionamiento pagado no debe ocultar totalmente los resultados orgánicos.
* No se deben mostrar datos personales de candidatos públicamente.

---

# 4. Módulo de búsqueda y filtros

## Objetivo

Permitir que los candidatos encuentren oportunidades relevantes con la menor cantidad de pasos posible.

## Filtros

* Palabra clave.
* Cargo.
* Categoría.
* Provincia.
* Municipio.
* Modalidad presencial, remota o híbrida.
* Tipo de contrato.
* Jornada.
* Nivel académico.
* Años de experiencia.
* Rango salarial.
* Idiomas.
* Disponibilidad.
* Fecha de publicación.
* Empresa.
* Nivel de urgencia.
* Vacantes para primer empleo.
* Vacantes inclusivas.
* Vacantes con salario publicado.

## Ordenamiento

* Más relevantes.
* Más recientes.
* Mejor salario.
* Cercanía.
* Contratación urgente.
* Mayor compatibilidad con el perfil.

## Flujo ideal

1. El candidato realiza una búsqueda.
2. El sistema interpreta sinónimos y cargos relacionados.
3. Se muestran filtros compatibles con los resultados.
4. El candidato puede guardar la búsqueda.
5. El sistema pregunta con qué frecuencia desea recibir alertas.
6. Se generan recomendaciones basadas en su actividad y preferencias.

## Estado vacío

Cuando no existan resultados, el sistema debe:

* Sugerir términos similares.
* Ampliar la ubicación.
* Recomendar eliminar filtros.
* Permitir crear una alerta.
* Mostrar vacantes relacionadas.

---

# 5. Módulo de autenticación y registro

## Objetivo

Controlar el acceso al sistema sin complicar la experiencia inicial.

## Métodos

* Correo y contraseña.
* Inicio con Google.
* Inicio con Microsoft.
* Verificación de correo.
* Recuperación de contraseña.
* Autenticación de dos pasos opcional.
* Sesiones y dispositivos activos.

## Registro de candidato

Datos iniciales:

* Nombres.
* Apellidos.
* Correo.
* Contraseña.
* Teléfono.
* Provincia.
* Aceptación de términos.

El registro inicial debe ser corto. Los datos profesionales se completarán posteriormente.

## Registro de empresa

Datos iniciales:

* Nombre del responsable.
* Correo corporativo.
* Teléfono.
* Nombre comercial.
* Contraseña.
* Tipo de empresa.
* Aceptación de términos.

El RNC puede ser opcional durante la etapa inicial, pero debe existir el campo para la futura verificación empresarial.

## Flujo ideal

1. El usuario selecciona su tipo de cuenta.
2. Completa los datos esenciales.
3. Recibe un código o enlace de verificación.
4. Confirma su cuenta.
5. El sistema inicia el proceso de bienvenida correspondiente.
6. Se registra la aceptación de términos, fecha, IP y versión del documento.

## Reglas

* Un correo no puede pertenecer simultáneamente a una cuenta candidata y empresarial sin un mecanismo de perfiles separados.
* Las empresas deben usar una cuenta empresarial para publicar vacantes.
* Los intentos fallidos deben activar controles de seguridad.
* Las sesiones pueden cerrarse desde el panel del usuario.

---

# 6. Módulo de incorporación del candidato

## Objetivo

Guiar al candidato para construir un perfil completo sin presentar un formulario excesivamente largo.

## Flujo por pasos

### Paso 1: Información básica

* Nombre.
* Ubicación.
* Teléfono.
* Foto opcional.
* Titular profesional.
* Descripción profesional.

### Paso 2: Preferencias laborales

* Áreas de interés.
* Cargos deseados.
* Modalidad.
* Provincias donde puede trabajar.
* Salario esperado.
* Disponibilidad.
* Tipo de jornada.
* Disposición para trasladarse.

### Paso 3: Experiencia

* Empresa.
* Cargo.
* Fecha de inicio.
* Fecha de finalización.
* Funciones.
* Logros.
* Empleo actual.

### Paso 4: Educación

* Institución.
* Carrera.
* Nivel.
* Fecha.
* Estado.
* Título obtenido.

### Paso 5: Habilidades

* Habilidades técnicas.
* Habilidades blandas.
* Nivel de dominio.
* Años de experiencia.

### Paso 6: Idiomas

* Idioma.
* Comprensión.
* Escritura.
* Conversación.

### Paso 7: Documentos

* Currículum.
* Certificaciones.
* Portafolio.
* Carta de presentación.
* Licencias profesionales.

## Indicador de perfil

El sistema debe mostrar un porcentaje basado en campos relevantes, no únicamente en cantidad de datos.

Ejemplo:

* Información básica: 20 %.
* Experiencia: 25 %.
* Educación: 15 %.
* Habilidades: 20 %.
* Preferencias: 10 %.
* Currículum: 10 %.

## Reglas

* El candidato controla qué datos son visibles.
* La cédula no debe ser obligatoria para aplicar.
* Los documentos sensibles deben almacenarse de forma privada.
* Cada actualización importante debe registrarse.
* El sistema debe advertir cuando el perfil no cumple requisitos esenciales de una vacante, pero no impedir la aplicación salvo preguntas excluyentes autorizadas.

---

# 7. Módulo de currículum

## Objetivo

Permitir utilizar un CV subido o construir uno dentro de la plataforma.

## Funciones

* Subir PDF o documento compatible.
* Extraer información del archivo.
* Confirmar los datos detectados.
* Crear CV desde cero.
* Seleccionar plantilla.
* Cambiar orden de secciones.
* Generar PDF.
* Crear enlace público configurable.
* Mantener varias versiones.
* Elegir un CV diferente para cada postulación.

## Flujo ideal

1. El candidato sube su CV.
2. El sistema analiza el documento.
3. Presenta los campos detectados.
4. El candidato corrige o confirma.
5. El sistema actualiza su perfil.
6. Se genera una versión estructurada.
7. Antes de aplicar, puede elegir qué versión enviar.

## Reglas

* El archivo original debe conservarse.
* No se debe sobrescribir información sin confirmación.
* La empresa verá únicamente el CV enviado en la postulación.
* Las versiones anteriores deben quedar asociadas a las postulaciones ya realizadas.

---

# 8. Módulo de perfil y verificación de empresa

## Objetivo

Crear perfiles empresariales confiables y reducir publicaciones fraudulentas.

## Datos

* Nombre comercial.
* Razón social opcional.
* RNC opcional inicialmente.
* Logo.
* Portada.
* Sector.
* Tamaño.
* Descripción.
* Sitio web.
* Redes sociales.
* Teléfono.
* Correo.
* Dirección.
* Provincias donde opera.
* Beneficios.
* Cultura empresarial.
* Fotografías.
* Responsable principal.

## Niveles de verificación

* Correo verificado.
* Teléfono verificado.
* Dominio corporativo verificado.
* Documentación revisada.
* Empresa verificada.

## Estados

* Incompleta.
* Pendiente de verificación.
* Verificada.
* Observada.
* Suspendida.
* Rechazada.

## Flujo ideal

1. La empresa crea su cuenta.
2. Completa los datos esenciales.
3. Verifica correo y teléfono.
4. Puede solicitar verificación adicional.
5. El administrador revisa documentos.
6. Aprueba, observa o rechaza.
7. Se asigna una insignia visible.

## Reglas

* Una empresa puede publicar sin verificación completa durante el lanzamiento, pero puede requerir revisión manual.
* Sectores de riesgo pueden requerir validación obligatoria.
* Los cambios de nombre, dominio o documentación pueden reabrir la verificación.
* La insignia no debe poder asignarse manualmente por usuarios empresariales.

---

# 9. Módulo de equipos y permisos empresariales

## Objetivo

Permitir que varias personas participen en el reclutamiento sin compartir contraseñas.

## Funciones

* Invitar usuarios.
* Crear roles.
* Asignar permisos.
* Asignar vacantes.
* Limitar acceso a candidatos.
* Desactivar miembros.
* Transferir propiedad.

## Permisos configurables

* Crear vacantes.
* Editar vacantes.
* Publicar vacantes.
* Ver candidatos.
* Descargar CV.
* Cambiar estados.
* Enviar mensajes.
* Programar entrevistas.
* Ver estadísticas.
* Gestionar pagos.
* Administrar equipo.

## Flujo ideal

1. El propietario introduce el correo del colaborador.
2. Selecciona un rol.
3. Asigna vacantes o acceso general.
4. El colaborador recibe la invitación.
5. Acepta y configura su contraseña.
6. El sistema registra sus acciones individualmente.

---

# 10. Módulo de cuestionario inteligente y cotización

## Objetivo

Recomendar la configuración más conveniente y calcular un precio personalizado.

## Paso 1: Cantidad de vacantes

Opciones sugeridas:

* 1.
* 2 a 3.
* 4 a 5.
* 6 a 10.
* Más de 10.

Cuando son varias, la empresa puede seleccionar:

* Misma configuración para todas.
* Configuración individual por vacante.

## Paso 2: Duración

* 7 días.
* 15 días.
* 30 días.
* 60 días.

## Paso 3: Postulaciones habilitadas

* Hasta 20.
* Hasta 50.
* Hasta 100.
* Hasta 200.
* Ilimitadas.

Debe aclararse que esto representa el límite que el sistema permitirá recibir, no una garantía de resultados.

## Paso 4: Urgencia

* Normal.
* Necesito contratar en 15 días.
* Urgente.
* Contratación inmediata.

## Paso 5: Visibilidad

* Posición normal.
* Destacada en resultados.
* Destacada en inicio.
* Difusión prioritaria.
* Campaña personalizada.

## Paso 6: Clasificación

* Gestión manual.
* Filtros automáticos.
* Clasificación asistida.
* Resumen y ranking avanzado.

## Paso 7: Difusión

* Alertas dentro de la plataforma.
* Correo a perfiles compatibles.
* Notificación push.
* Publicación en redes.
* Difusión patrocinada.

## Paso 8: Presupuesto opcional

La empresa puede indicar un presupuesto máximo. El sistema ajusta la recomendación sin ocultar las limitaciones resultantes.

## Resultado

Debe mostrar:

* Configuración seleccionada.
* Precio por concepto.
* Descuento por volumen.
* Impuestos o cargos, cuando correspondan.
* Fecha estimada de vencimiento.
* Servicios incluidos.
* Límites aplicables.
* Condiciones.
* Precio total.

## Recomendaciones mostradas

El sistema puede presentar tres alternativas:

1. **Recomendación principal:** equilibrio entre costo y alcance.
2. **Opción económica:** menor duración o postulaciones.
3. **Mayor alcance:** más visibilidad o postulaciones.

La opción recomendada debe explicarse:

> “Esta configuración se recomienda porque desea contratar con urgencia, recibir hasta 100 postulaciones y mantener tres vacantes activas durante 30 días.”

## Fórmula conceptual

El cálculo debe considerar:

* Precio base por vacante.
* Factor de duración.
* Factor de postulaciones.
* Factor de urgencia.
* Visibilidad.
* Servicios adicionales.
* Descuento por cantidad.
* Cupón o promoción.
* Configuración fiscal aplicable.

Los valores deben ser administrables sin modificar código.

## Flujo ideal

1. La empresa inicia el cuestionario, incluso sin tener cuenta.
2. El sistema guarda temporalmente sus respuestas.
3. Se genera la recomendación.
4. La empresa modifica opciones y observa el precio en tiempo real.
5. Selecciona la propuesta.
6. Se registra o inicia sesión.
7. La cotización queda guardada.
8. Completa las vacantes.
9. Revisa el resumen.
10. Realiza el pago.
11. Las publicaciones pasan a revisión o programación.

---

# 11. Módulo de creación de vacantes

## Objetivo

Permitir crear ofertas laborales completas, claras y optimizadas.

## Datos principales

* Título.
* Cantidad de personas a contratar.
* Categoría.
* Área.
* Descripción.
* Responsabilidades.
* Requisitos.
* Habilidades.
* Nivel académico.
* Experiencia.
* Idiomas.
* Certificaciones.
* Ubicación.
* Modalidad.
* Jornada.
* Contrato.
* Salario mínimo y máximo.
* Moneda.
* Beneficios.
* Fecha de inicio.
* Preguntas de preselección.
* Responsable de la vacante.
* Fecha de cierre.
* Correo interno de notificación.

## Asistente de calidad

El sistema debe detectar:

* Título poco claro.
* Descripción demasiado corta.
* Requisitos contradictorios.
* Información discriminatoria.
* Salario inconsistente.
* Falta de ubicación.
* Campos esenciales incompletos.
* Exceso de requisitos para un cargo inicial.

## Preguntas de preselección

Tipos:

* Sí o no.
* Selección única.
* Selección múltiple.
* Número.
* Texto corto.
* Años de experiencia.
* Disponibilidad.
* Pretensión salarial.
* Pregunta excluyente.

## Flujo ideal

1. La empresa selecciona “Crear vacante”.
2. Elige crear desde cero, duplicar o utilizar una plantilla.
3. Completa los datos.
4. El sistema muestra una puntuación de calidad.
5. Configura preguntas.
6. Visualiza una vista previa.
7. Guarda borrador.
8. Asocia la publicación comprada.
9. Envía a revisión.
10. Recibe aprobación u observaciones.

## Estados

* Borrador.
* Pendiente de configuración.
* Pendiente de pago.
* Pendiente de revisión.
* Requiere corrección.
* Programada.
* Activa.
* Pausada.
* Límite alcanzado.
* Vencida.
* Cerrada.
* Rechazada.
* Archivada.

---

# 12. Módulo de revisión y publicación

## Objetivo

Evitar fraudes, ofertas incompletas, contenido prohibido o publicaciones engañosas.

## Revisión automática

* Palabras prohibidas.
* Información de contacto expuesta.
* Descripciones duplicadas.
* Enlaces sospechosos.
* Salario irreal.
* Contenido discriminatorio.
* Empresa suspendida.
* Posible estafa.
* Vacante repetida.

## Revisión manual

El moderador puede:

* Aprobar.
* Solicitar correcciones.
* Rechazar.
* Escalar.
* Suspender la empresa.
* Aprobar con seguimiento.

## Flujo ideal

1. La empresa envía la vacante.
2. El sistema ejecuta validaciones.
3. Las publicaciones de bajo riesgo pueden aprobarse automáticamente.
4. Las publicaciones dudosas pasan a moderación.
5. El moderador registra su decisión.
6. La empresa recibe una notificación.
7. Si requiere cambios, corrige y reenvía.
8. Al aprobarse, inicia la duración contratada.

## Regla importante

El tiempo comprado debe comenzar cuando la publicación queda activa, no cuando se realiza el pago.

---

# 13. Módulo de postulaciones

## Objetivo

Permitir una aplicación rápida, trazable y adaptada a cada vacante.

## Flujo del candidato

1. Abre la vacante.
2. Selecciona “Aplicar”.
3. Elige el CV.
4. Responde las preguntas.
5. Adjunta documentos opcionales.
6. Revisa la información.
7. Acepta compartir los datos con esa empresa.
8. Confirma la aplicación.
9. Recibe comprobante y estado inicial.

## Aplicación rápida

Cuando la vacante no tiene preguntas adicionales:

1. El candidato selecciona su CV.
2. Confirma.
3. La postulación se registra.

## Validaciones

* Vacante activa.
* Límite no alcanzado.
* Candidato no bloqueado.
* No existe una aplicación previa, salvo que se permita actualizar.
* Preguntas obligatorias respondidas.
* CV disponible.
* Términos aceptados.

## Límite de postulaciones

Cuando se alcance el límite comprado, la empresa puede configurar:

* Cerrar automáticamente.
* Permitir lista de espera.
* Comprar una ampliación.
* Mantener visible la vacante sin aceptar nuevas aplicaciones.

## Estados para el candidato

* Enviada.
* Vista por la empresa.
* En evaluación.
* Preseleccionada.
* Entrevista.
* Oferta.
* Contratado.
* No seleccionado.
* Retirada.

La empresa puede utilizar estados internos adicionales, pero el candidato debe ver estados claros y respetuosos.

---

# 14. Módulo ATS o gestión de candidatos

## Objetivo

Proporcionar a la empresa un sistema de seguimiento de candidatos dentro de cada proceso.

## Vista principal

Cada vacante debe tener un tablero con columnas:

* Nuevos.
* En revisión.
* Preseleccionados.
* Entrevista.
* Evaluación.
* Oferta.
* Contratados.
* No seleccionados.

## Funciones

* Mover candidatos entre etapas.
* Aplicar filtros.
* Ordenar por compatibilidad.
* Añadir etiquetas.
* Registrar notas privadas.
* Asignar responsables.
* Enviar mensajes.
* Programar entrevistas.
* Comparar candidatos.
* Descargar información.
* Rechazar individualmente o por lote.
* Crear etapas personalizadas.
* Mantener historial completo.

## Filtros empresariales

* Experiencia.
* Educación.
* Habilidades.
* Idioma.
* Ubicación.
* Salario esperado.
* Disponibilidad.
* Respuestas.
* Puntuación.
* Fecha de aplicación.
* Estado.
* Etiquetas.

## Flujo ideal

1. Llega una postulación.
2. Se coloca en “Nuevos”.
3. Se notifica al responsable.
4. El reclutador revisa el resumen y CV.
5. Cambia el estado.
6. Añade comentarios.
7. Invita a entrevista o descarta.
8. Cada cambio genera una entrada en el historial.
9. Cuando alguien es contratado, puede cerrarse la vacante.
10. Los demás candidatos reciben la comunicación configurada.

## Reglas

* Los comentarios internos nunca son visibles para el candidato.
* Toda descarga de CV debe registrarse.
* El candidato debe poder retirar su postulación.
* Eliminar un candidato de una vacante no debe borrar su cuenta.
* Las empresas solo pueden consultar candidatos autorizados.

---

# 15. Módulo de compatibilidad y clasificación asistida

## Objetivo

Ayudar al reclutador a ordenar candidatos sin sustituir la decisión humana.

## Información analizada

* Requisitos obligatorios.
* Experiencia.
* Habilidades.
* Educación.
* Idiomas.
* Ubicación.
* Disponibilidad.
* Pretensión salarial.
* Respuestas.
* Certificaciones.

## Resultado empresarial

* Porcentaje orientativo.
* Requisitos cumplidos.
* Requisitos no confirmados.
* Posibles incompatibilidades.
* Resumen profesional.
* Fortalezas relevantes.
* Preguntas sugeridas.
* Explicación de la puntuación.

## Resultado para el candidato

Antes de aplicar puede mostrarse:

* Compatibilidad alta, media o baja.
* Requisitos que cumple.
* Información faltante.
* Recomendaciones para completar el perfil.

## Reglas

* La puntuación no debe basarse en edad, género, fotografía, estado civil, religión u otras variables sensibles.
* No debe rechazar automáticamente, salvo preguntas objetivas configuradas como excluyentes.
* La empresa debe poder revisar por qué se asignó una puntuación.
* El administrador debe poder desactivar criterios.
* Toda recomendación debe identificarse como asistencia automatizada.
* Las decisiones finales deben mantenerse bajo control humano.

---

# 16. Módulo de entrevistas

## Objetivo

Centralizar la programación y seguimiento de entrevistas.

## Tipos

* Presencial.
* Telefónica.
* Videollamada.
* Técnica.
* Grupal.
* Segunda entrevista.
* Entrevista final.

## Datos

* Candidato.
* Vacante.
* Fecha.
* Hora.
* Zona horaria.
* Duración.
* Modalidad.
* Dirección o enlace.
* Entrevistadores.
* Instrucciones.
* Recordatorios.
* Estado.

## Estados

* Propuesta.
* Confirmada.
* Reprogramación solicitada.
* Reprogramada.
* Realizada.
* Cancelada.
* Candidato ausente.
* Empresa ausente.

## Flujo ideal

1. El reclutador selecciona un candidato.
2. Propone horarios o un horario específico.
3. El candidato recibe la invitación.
4. Confirma o solicita cambio.
5. Se actualizan calendarios y notificaciones.
6. Se envían recordatorios.
7. Después de la entrevista, los evaluadores califican.
8. El reclutador cambia la etapa del candidato.

## Evaluación

* Competencias.
* Experiencia.
* Comunicación.
* Conocimiento técnico.
* Ajuste al cargo.
* Recomendación.
* Comentarios privados.

---

# 17. Módulo de mensajería

## Objetivo

Permitir comunicación controlada sin exponer datos personales innecesariamente.

## Funciones

* Conversaciones por vacante.
* Plantillas de mensajes.
* Archivos adjuntos.
* Mensajes individuales.
* Mensajes por lote.
* Confirmación de lectura.
* Bloqueo y reporte.
* Filtros contra enlaces sospechosos.

## Flujo ideal

1. La empresa abre el perfil de una postulación.
2. Selecciona una plantilla o escribe un mensaje.
3. El candidato recibe una notificación.
4. Responde desde la plataforma.
5. Toda la conversación queda vinculada a la vacante.
6. Al cerrar el proceso, la conversación pasa a modo histórico.

## Reglas

* No permitir campañas masivas fuera de procesos válidos.
* Los archivos deben analizarse y limitarse por tipo.
* Las conversaciones denunciadas pasan a moderación.
* El administrador no debe leer mensajes privados rutinariamente; el acceso debe limitarse a investigaciones autorizadas y quedar auditado.

---

# 18. Módulo de notificaciones

## Canales

* Notificación interna.
* Correo.
* Push.
* WhatsApp, cuando exista integración y consentimiento.
* SMS opcional.

## Eventos

### Para candidatos

* Aplicación recibida.
* Aplicación vista.
* Cambio de estado.
* Mensaje nuevo.
* Invitación a entrevista.
* Recordatorio.
* Vacante recomendada.
* Vacante próxima a cerrar.
* Alerta de empleo.

### Para empresas

* Nueva postulación.
* Límite próximo.
* Límite alcanzado.
* Vacante próxima a vencer.
* Pago aprobado.
* Publicación aprobada.
* Publicación observada.
* Entrevista confirmada.
* Mensaje nuevo.

## Preferencias

Cada usuario debe elegir:

* Canal.
* Frecuencia.
* Tipo de eventos.
* Resumen diario o inmediato.
* Horario permitido.

## Reglas

* Los avisos críticos de seguridad no pueden desactivarse.
* Las campañas promocionales necesitan consentimiento separado.
* Los envíos fallidos deben reintentarse y registrarse.

---

# 19. Módulo de alertas y recomendaciones

## Objetivo

Incrementar el retorno de candidatos y mejorar la exposición de vacantes.

## Alertas configurables

* Cargo.
* Palabras clave.
* Categoría.
* Ubicación.
* Modalidad.
* Salario.
* Jornada.
* Frecuencia.

## Flujo ideal

1. El candidato guarda una búsqueda.
2. Define frecuencia.
3. El sistema identifica nuevas vacantes compatibles.
4. Evita enviar duplicados.
5. Envía un resumen.
6. El candidato abre directamente la vacante.
7. Puede pausar o eliminar la alerta.

## Reglas

* No enviar una vacante ya descartada.
* Limitar la frecuencia para evitar saturación.
* Priorizar relevancia sobre cantidad.
* Separar recomendaciones orgánicas de campañas patrocinadas.

---

# 20. Módulo de base de talentos

## Objetivo

Permitir que empresas autorizadas busquen candidatos que aceptaron ser visibles.

## Visibilidad del candidato

* Oculto.
* Visible únicamente al aplicar.
* Visible a empresas verificadas.
* Visible a empresas seleccionadas.
* Disponible para oportunidades.

## Funciones empresariales

* Buscar perfiles.
* Guardar candidatos.
* Crear listas.
* Invitar a aplicar.
* Consultar disponibilidad.
* Solicitar contacto.
* Añadir etiquetas.

## Flujo ideal

1. La empresa realiza una búsqueda.
2. Visualiza perfiles parcialmente anonimizados.
3. Selecciona un candidato.
4. Envía una invitación vinculada a una vacante.
5. El candidato acepta o rechaza.
6. Al aceptar, se habilita la información autorizada.

## Reglas

* No vender ni entregar bases de datos descargables.
* Solo mostrar perfiles con consentimiento.
* Limitar búsquedas y exportaciones.
* Registrar accesos.
* Permitir que el candidato bloquee empresas.

---

# 21. Módulo de pagos y contratación de servicios

## Objetivo

Procesar compras de publicaciones y servicios adicionales.

## Servicios cobrables

* Publicación de vacantes.
* Extensión de duración.
* Ampliación de postulaciones.
* Urgencia.
* Vacante destacada.
* Difusión.
* Clasificación asistida.
* Empresa destacada.
* Campañas.
* Servicios profesionales.

## Métodos

La arquitectura debe permitir integrar diferentes proveedores sin alterar la lógica central:

* Tarjeta.
* PayPal u otro procesador internacional.
* Transferencia bancaria.
* Créditos promocionales.
* Pago manual verificado.

## Flujo con pago automático

1. La empresa confirma el pedido.
2. Se crea una orden pendiente.
3. Es redirigida al proveedor.
4. El proveedor procesa el pago.
5. La plataforma recibe confirmación mediante webhook.
6. Se valida firma, monto, moneda y referencia.
7. La orden pasa a pagada.
8. Se habilitan los recursos.
9. Se emite comprobante interno.
10. Se notifica a la empresa.

## Flujo con transferencia

1. Se crea la orden.
2. Se muestran instrucciones.
3. La empresa sube el comprobante.
4. El pago queda en revisión.
5. Finanzas aprueba o rechaza.
6. Al aprobarse, se habilita la compra.

## Estados

* Pendiente.
* En proceso.
* Pagado.
* En revisión.
* Rechazado.
* Fallido.
* Cancelado.
* Reembolsado parcialmente.
* Reembolsado.

## Reglas

* Nunca habilitar servicios solo por regresar desde la página del proveedor.
* La confirmación debe realizarse en el servidor.
* Las operaciones deben ser idempotentes.
* El precio confirmado debe quedar congelado en la orden.
* Los cambios posteriores en tarifas no afectan órdenes pagadas.
* Los reembolsos requieren motivo y autorización.

---

# 22. Módulo de créditos, paquetes y promociones

## Objetivo

Permitir compras anticipadas y beneficios comerciales sin convertir el modelo en una suscripción mensual.

## Funciones

* Créditos de publicación.
* Créditos promocionales.
* Cupones.
* Paquetes por volumen.
* Fecha de vencimiento.
* Historial de consumo.
* Restricciones por servicio.
* Saldo empresarial.

## Flujo ideal

1. La empresa compra un paquete.
2. Los créditos quedan disponibles.
3. Al publicar, el sistema propone usar saldo.
4. Se descuenta al activar la vacante.
5. Si la vacante es rechazada definitivamente, el crédito puede devolverse.
6. Todo movimiento queda registrado.

---

# 23. Módulo de facturación y documentos comerciales

## Objetivo

Mantener un registro ordenado de órdenes, pagos, cargos y documentos.

## Funciones

* Historial de órdenes.
* Recibos.
* Facturas cuando aplique.
* Notas de crédito.
* Exportación.
* Datos de facturación.
* Moneda.
* Numeración configurable.
* Estado del documento.

## Datos de empresa

* Nombre o razón social.
* Identificación fiscal.
* Dirección.
* Correo.
* Teléfono.
* Persona de contacto.

El sistema debe quedar preparado para incorporar requisitos fiscales dominicanos cuando la operación se formalice.

---

# 24. Módulo de publicidad propia

## Objetivo

Vender espacios publicitarios directamente a instituciones y marcas.

## Tipos

* Banner principal.
* Banner en resultados.
* Banner en categorías.
* Banner en artículos.
* Empresa patrocinada.
* Contenido patrocinado.
* Campaña por correo.
* Patrocinio de boletines.
* Vacante patrocinada.

## Segmentación

* Provincia.
* Categoría profesional.
* Tipo de usuario.
* Dispositivo.
* Sección.
* Fecha.
* Hora.
* Perfil general.
* Fuente de tráfico.

## Flujo comercial

1. El anunciante solicita una campaña.
2. El administrador crea una propuesta.
3. Se definen ubicación, fechas e impresiones.
4. Se suben creatividades.
5. Se revisan.
6. Se confirma el pago.
7. Se programa la campaña.
8. Se registran impresiones y clics.
9. Se entrega reporte.

## Estados

* Borrador.
* Pendiente de aprobación.
* Pendiente de pago.
* Programada.
* Activa.
* Pausada.
* Finalizada.
* Rechazada.

## Reglas

* Identificar contenido patrocinado.
* Definir tamaños y peso máximo.
* Evitar anuncios engañosos.
* No utilizar datos sensibles para segmentación.
* Aplicar límites de frecuencia.

---

# 25. Módulo de Google Ads

## Objetivo

Monetizar tráfico informativo sin afectar el proceso de búsqueda y aplicación.

## Ubicaciones recomendadas

* Artículos del blog.
* Guías laborales.
* Páginas de categorías informativas.
* Noticias.
* Recursos de carrera.

## Ubicaciones no recomendadas

* Formulario de aplicación.
* Constructor de CV.
* Pago.
* Gestión de candidatos.
* Mensajes.
* Entrevistas.
* Pantallas privadas sensibles.

## Control administrativo

* Activar o desactivar anuncios por sección.
* Configurar códigos.
* Definir posiciones.
* Excluir determinadas páginas.
* Registrar pruebas.
* Controlar consentimiento de cookies.

La publicidad propia debe tener prioridad en los espacios vendidos directamente. Cuando no exista campaña propia, puede mostrarse publicidad programática.

---

# 26. Módulo de blog y CMS

## Objetivo

Generar tráfico orgánico y posicionar la marca como referencia laboral.

## Categorías

* Búsqueda de empleo.
* Currículum.
* Entrevistas.
* Salarios.
* Profesiones.
* Recursos Humanos.
* Empresas.
* Primer empleo.
* Trabajo remoto.
* Tecnología.
* Formación.
* Derecho laboral.
* Noticias.

## Funciones

* Crear artículos.
* Editor visual.
* Borradores.
* Revisión editorial.
* Programación.
* Categorías.
* Etiquetas.
* Autor.
* Imagen destacada.
* SEO.
* Enlaces relacionados.
* Artículos patrocinados.
* Comentarios opcionales.
* Historial de versiones.

## Estados

* Borrador.
* En revisión.
* Requiere cambios.
* Programado.
* Publicado.
* Despublicado.
* Archivado.

## Flujo ideal

1. El editor crea un borrador.
2. Completa estructura y SEO.
3. Envía a revisión.
4. Otro usuario aprueba o solicita cambios.
5. Se programa.
6. El sistema publica.
7. Se actualiza el mapa del sitio.
8. Se distribuye en redes y alertas.
9. Se analizan resultados.

## Automatización con IA

Puede utilizarse para:

* Proponer esquemas.
* Generar borradores.
* Sugerir títulos.
* Crear descripciones.
* Detectar contenido repetido.
* Sugerir enlaces internos.
* Corregir estilo.

Todo artículo debe pasar por revisión humana antes de publicarse.

---

# 27. Módulo SEO

## Objetivo

Posicionar vacantes, empresas, categorías y artículos en buscadores.

## Funciones

* URL amigable.
* Título SEO.
* Meta descripción.
* Canonical.
* Datos estructurados.
* Mapa del sitio.
* Control de indexación.
* Redirecciones.
* Páginas por provincia.
* Páginas por categoría.
* Páginas por combinación relevante.
* Enlaces internos.
* Control de contenido duplicado.

## Reglas para vacantes

* Al expirar, la página puede permanecer visible indicando que terminó.
* Debe recomendar vacantes similares.
* Las vacantes eliminadas por fraude no deben permanecer públicas.
* No crear miles de páginas vacías.
* Evitar indexar filtros sin valor.

---

# 28. Módulo de soporte y centro de ayuda

## Objetivo

Resolver problemas de candidatos, empresas y anunciantes.

## Canales

* Base de conocimientos.
* Formularios.
* Tickets.
* Chat.
* Correo.
* WhatsApp empresarial.
* Preguntas frecuentes.

## Categorías

* Acceso.
* Perfil.
* Vacantes.
* Postulaciones.
* Pagos.
* Reembolso.
* Empresa.
* Privacidad.
* Fraude.
* Publicidad.
* Problemas técnicos.

## Estados de ticket

* Nuevo.
* Asignado.
* En proceso.
* Esperando usuario.
* Escalado.
* Resuelto.
* Cerrado.
* Reabierto.

## Flujo ideal

1. El usuario busca una respuesta.
2. El sistema sugiere artículos.
3. Si no resuelve, crea un ticket.
4. Se asigna por categoría.
5. El agente responde.
6. Se registra cada interacción.
7. El usuario confirma o se cierra después del período configurado.
8. Se solicita valoración.

---

# 29. Módulo de reportes y denuncias

## Objetivo

Permitir reportar fraudes, discriminación, suplantación, acoso o contenido inadecuado.

## Elementos reportables

* Vacante.
* Empresa.
* Candidato.
* Mensaje.
* Artículo.
* Anuncio.
* Documento.

## Motivos

* Fraude.
* Solicitud de dinero.
* Empresa falsa.
* Información engañosa.
* Discriminación.
* Acoso.
* Contenido ilegal.
* Suplantación.
* Spam.
* Otro.

## Flujo ideal

1. El usuario selecciona “Reportar”.
2. Indica el motivo.
3. Añade descripción y evidencia.
4. El caso se registra.
5. El sistema calcula prioridad.
6. Un moderador investiga.
7. Puede ocultar preventivamente el contenido.
8. Se toma una decisión.
9. Se aplican sanciones.
10. Se notifica el resultado cuando corresponda.

---

# 30. Módulo administrativo

## Objetivo

Controlar completamente la operación de la plataforma.

## Menú principal

* Resumen.
* Usuarios.
* Candidatos.
* Empresas.
* Vacantes.
* Postulaciones.
* Pagos.
* Cotizaciones.
* Créditos.
* Publicidad.
* Blog.
* Soporte.
* Moderación.
* Reportes.
* Configuración.
* Auditoría.
* Integraciones.
* Analítica.

## Dashboard

Debe mostrar:

* Usuarios registrados.
* Usuarios activos.
* Empresas activas.
* Empresas verificadas.
* Vacantes activas.
* Postulaciones.
* Contrataciones reportadas.
* Ingresos.
* Pagos pendientes.
* Vacantes denunciadas.
* Tickets pendientes.
* Conversión.
* Fuentes de tráfico.
* Servicios más vendidos.

## Acciones administrativas

* Suspender cuentas.
* Restaurar cuentas.
* Aprobar empresas.
* Moderar vacantes.
* Confirmar pagos.
* Otorgar créditos.
* Gestionar precios.
* Configurar publicidad.
* Ver auditoría.
* Gestionar catálogos.
* Exportar reportes.

## Regla

Las acciones sensibles deben requerir permiso específico y confirmación adicional.

---

# 31. Módulo de precios dinámicos

## Objetivo

Permitir al negocio cambiar tarifas y reglas sin intervención técnica.

## Configuraciones

* Precio base.
* Duración.
* Rangos de postulaciones.
* Urgencia.
* Destacado.
* Difusión.
* Clasificación.
* Descuentos.
* Impuestos.
* Moneda.
* País.
* Temporadas.
* Promociones.
* Precio mínimo y máximo.

## Versionado

Cada cambio de precios debe crear una versión con:

* Fecha de inicio.
* Fecha de finalización.
* Usuario responsable.
* Motivo.
* Valores anteriores.
* Valores nuevos.

Las cotizaciones deben conservar la versión utilizada.

## Simulador

El administrador debe poder introducir variables y comprobar el precio antes de publicar cambios.

---

# 32. Módulo de catálogos

## Catálogos principales

* Países.
* Provincias.
* Municipios.
* Sectores.
* Categorías laborales.
* Cargos.
* Habilidades.
* Niveles educativos.
* Idiomas.
* Tipos de contrato.
* Jornadas.
* Modalidades.
* Monedas.
* Beneficios.
* Estados de proceso.
* Motivos de rechazo.
* Plantillas.

## Reglas

* Deben poder activarse o desactivarse.
* No borrar valores utilizados históricamente.
* Permitir sinónimos.
* Evitar duplicados.
* Registrar auditoría.

---

# 33. Módulo de analítica empresarial

## Objetivo

Mostrar a las empresas el rendimiento de sus publicaciones.

## Indicadores

* Visualizaciones.
* Aplicaciones.
* Tasa de conversión.
* Candidatos por día.
* Fuente de aplicaciones.
* Compatibilidad promedio.
* Tiempo de primera revisión.
* Tiempo por etapa.
* Entrevistas.
* Contrataciones.
* Costo por aplicación.
* Costo por contratación.
* Rendimiento de publicaciones destacadas.

## Flujo ideal

1. La empresa selecciona una vacante.
2. Elige el período.
3. Consulta indicadores.
4. Compara con otras vacantes.
5. Recibe recomendaciones.
6. Exporta un reporte.

---

# 34. Módulo de analítica de la plataforma

## Indicadores administrativos

* Crecimiento de usuarios.
* Candidatos activos.
* Empresas que pagan.
* Conversión de cotización a pago.
* Abandono del cuestionario.
* Ingreso por empresa.
* Ingreso por vacante.
* Servicios adicionales.
* Retención.
* Vacantes por categoría.
* Demanda por provincia.
* Aplicaciones por fuente.
* Ingresos publicitarios.
* Rendimiento del blog.
* Fraude y moderación.
* Soporte.

## Embudo empresarial

1. Visita la página.
2. Inicia cuestionario.
3. Obtiene cotización.
4. Se registra.
5. Completa empresa.
6. Crea vacante.
7. Inicia pago.
8. Paga.
9. Publica.
10. Recompra.

---

# 35. Módulo de configuraciones generales

## Configuraciones

* Nombre del portal.
* Logo.
* Colores.
* Contactos.
* País.
* Moneda.
* Zona horaria.
* Idioma.
* Formatos de fecha.
* Límites de archivos.
* Duraciones.
* Correos.
* Plantillas.
* Mantenimiento.
* Redes.
* Seguridad.
* Consentimientos.
* Textos legales.
* Integraciones.

## Configuración por entorno

* Desarrollo.
* Pruebas.
* Producción.

Las credenciales sensibles no deben administrarse como texto visible dentro del panel sin protección.

---

# 36. Módulo de auditoría

## Objetivo

Mantener trazabilidad de acciones críticas.

## Eventos

* Inicios de sesión.
* Cambios de contraseña.
* Cambios de correo.
* Descargas de CV.
* Acceso a perfiles.
* Publicación de vacantes.
* Cambios de estado.
* Pagos.
* Reembolsos.
* Créditos.
* Suspensiones.
* Cambios de precios.
* Cambios de permisos.
* Acceso administrativo.

## Datos registrados

* Usuario.
* Acción.
* Fecha.
* IP.
* Dispositivo.
* Registro afectado.
* Valor anterior.
* Valor nuevo.
* Resultado.

Los registros de auditoría no deben poder editarse desde el panel normal.

---

# 37. Módulo de seguridad y privacidad

## Controles

* Contraseñas seguras.
* Doble autenticación.
* Rate limiting.
* CAPTCHA adaptativo.
* Protección CSRF.
* Validación de archivos.
* Control de sesiones.
* Cifrado de datos sensibles.
* Copias de seguridad.
* Recuperación ante fallos.
* Registro de actividad.
* Permisos por rol.
* Políticas de conservación.
* Consentimiento.

## Derechos del usuario

* Descargar sus datos.
* Corregir información.
* Gestionar visibilidad.
* Retirar consentimientos.
* Solicitar eliminación.
* Cerrar cuenta.
* Bloquear empresas.
* Reportar abuso.

## Flujo de eliminación

1. El usuario solicita eliminar la cuenta.
2. Confirma identidad.
3. Se informa qué información debe conservarse por razones operativas o legales.
4. Se inicia período de seguridad configurable.
5. La cuenta se desactiva.
6. Los datos se eliminan o anonimizan según política.
7. Se registra el proceso.

---

# 38. Módulo de integraciones

## Integraciones previstas

* Procesadores de pago.
* Correo transaccional.
* WhatsApp.
* SMS.
* Notificaciones push.
* Almacenamiento.
* Calendarios.
* Videollamadas.
* Analítica.
* Sistemas empresariales.
* Redes sociales.
* Servicios de verificación.

## Arquitectura

Cada integración debe utilizar una capa independiente para poder cambiar de proveedor.

Ejemplo:

* `PaymentProvider`
* `EmailProvider`
* `StorageProvider`
* `MessagingProvider`
* `CalendarProvider`

## Reglas

* Registrar solicitudes y respuestas importantes.
* Ocultar credenciales.
* Reintentar fallos temporales.
* Implementar webhooks seguros.
* Evitar duplicar operaciones.
* Permitir desactivar proveedores.

---

# 39. Módulo API

## Objetivo

Preparar la plataforma para aplicación móvil e integraciones empresariales.

## Recursos

* Autenticación.
* Empresas.
* Vacantes.
* Búsquedas.
* Candidatos.
* Postulaciones.
* Entrevistas.
* Mensajes.
* Pagos.
* Reportes.

## Requisitos

* API versionada.
* Tokens.
* Límites de uso.
* Permisos.
* Documentación.
* Registro.
* Idempotencia.
* Paginación.
* Filtros.
* Respuestas estandarizadas.

El acceso empresarial externo debe ser un servicio controlado, no una exposición directa de la base de datos.

---

# 40. Flujo completo de una empresa

1. La empresa entra al portal.
2. Selecciona “Publicar una vacante”.
3. Completa el cuestionario.
4. Recibe una recomendación.
5. Ajusta duración, postulaciones y urgencia.
6. Se registra.
7. Verifica el correo.
8. Completa el perfil empresarial.
9. Crea una o varias vacantes.
10. Revisa la puntuación de calidad.
11. Confirma el pedido.
12. Realiza el pago.
13. El sistema valida el pago.
14. Las vacantes pasan a revisión.
15. Son aprobadas.
16. Inicia la duración contratada.
17. Comienzan a llegar postulaciones.
18. El equipo las clasifica.
19. Programa entrevistas.
20. Registra evaluaciones.
21. Envía una oferta.
22. Marca al candidato como contratado.
23. Cierra la vacante.
24. Consulta estadísticas.
25. Recibe una sugerencia para volver a publicar.

---

# 41. Flujo completo de un candidato

1. Encuentra una vacante desde el buscador o Google.
2. Revisa sus detalles.
3. Selecciona “Aplicar”.
4. Crea una cuenta.
5. Verifica su correo.
6. Completa los campos esenciales.
7. Sube o crea su CV.
8. Responde las preguntas.
9. Confirma la aplicación.
10. Recibe el estado inicial.
11. La empresa revisa la postulación.
12. El candidato recibe actualizaciones.
13. Participa en una entrevista.
14. Recibe una oferta o cierre del proceso.
15. Mantiene su perfil para futuras oportunidades.
16. Configura alertas personalizadas.

---

# 42. Flujo completo de administración

1. El administrador inicia sesión con doble autenticación.
2. Revisa el dashboard.
3. Atiende alertas críticas.
4. Modera vacantes pendientes.
5. Revisa empresas.
6. Gestiona pagos manuales.
7. Atiende reportes.
8. Supervisa soporte.
9. Consulta ingresos.
10. Revisa el embudo comercial.
11. Ajusta promociones.
12. Programa publicidad.
13. Analiza categorías con mayor demanda.
14. Exporta reportes.
15. Revisa auditoría.

---

# 43. Estados críticos del sistema

## Empresa

* Registro incompleto.
* Activa.
* Pendiente de verificación.
* Verificada.
* Observada.
* Suspendida.
* Cerrada.

## Vacante

* Borrador.
* Pendiente de pago.
* Pendiente de revisión.
* Requiere cambios.
* Programada.
* Activa.
* Pausada.
* Límite alcanzado.
* Vencida.
* Cerrada.
* Rechazada.
* Archivada.

## Postulación

* Enviada.
* Vista.
* En evaluación.
* Preseleccionada.
* Entrevista.
* Oferta.
* Contratada.
* Rechazada.
* Retirada.

## Orden

* Pendiente.
* Procesando.
* En revisión.
* Pagada.
* Rechazada.
* Fallida.
* Cancelada.
* Reembolsada.

---

# 44. Alcance recomendado para el MVP

## Incluir en la primera versión

* Portal público.
* Registro.
* Perfil candidato.
* Perfil empresa.
* Publicación de vacantes.
* Cuestionario y precios.
* Pago.
* Postulaciones.
* Gestión básica de candidatos.
* Mensajes simples.
* Entrevistas básicas.
* Notificaciones por correo.
* Blog.
* Publicidad propia básica.
* Panel administrativo.
* Moderación.
* Reportes básicos.
* Auditoría.

## Segunda etapa

* Constructor avanzado de CV.
* Ranking asistido.
* Base de talentos.
* WhatsApp.
* Notificaciones push.
* Calendarios externos.
* Campañas de publicidad avanzadas.
* Pruebas técnicas.
* Evaluaciones.
* Aplicación móvil.

## Tercera etapa

* Integraciones empresariales.
* API comercial.
* Multi-país.
* Analítica predictiva.
* Ferias de empleo.
* Reclutamiento masivo.
* Videollamadas.
* Automatizaciones avanzadas.

---

# 45. Criterios generales de calidad

El sistema debe:

* Ser completamente adaptable a móviles.
* Permitir completar los procesos con pocos pasos.
* Mostrar estados claros.
* Mantener trazabilidad.
* Evitar formularios excesivamente largos.
* Utilizar permisos granulares.
* Separar lógica de pagos, precios y publicaciones.
* Mantener historial de cambios.
* Proteger datos personales.
* No realizar decisiones sensibles exclusivamente mediante IA.
* Permitir cambiar proveedores externos.
* Estar preparado para crecer sin reconstruir los módulos principales.
* Mantener la misma funcionalidad principal para todas las empresas, variando precio, duración, cantidad de vacantes, límite de postulaciones, urgencia y servicios adicionales.

# Resultado esperado

La plataforma funcionará como un portal de empleos, un sistema básico de seguimiento de candidatos, un motor inteligente de cotización, un medio de publicidad y un canal de contenido especializado.

Su principal diferenciador será que la empresa no tendrá que escoger entre planes rígidos. El sistema comprenderá su necesidad de contratación, recomendará una configuración, calculará el precio y acompañará todo el proceso desde la publicación hasta la selección del candidato.

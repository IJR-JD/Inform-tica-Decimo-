# Módulo 0 — Evaluación diagnóstica de Tecnología e Informática 10.º

**Instituto Jorge Robledo · instrumento formativo preliminar**

## Propósito y alcance

Identificar conocimientos previos para organizar apoyos diferenciados en la transición hacia el trabajo de **requisitos y CAD (periodo I), programación web y organización de información (periodo II), y preparación documental y pruebas para agentes (periodo III)**. Este instrumento no mide inteligencia, talento innato, empleabilidad, personalidad ni aptitud permanente; no es un instrumento psicométrico estandarizado ni sustituye observación docente, desempeño práctico o ajustes individuales.

**No se emplea para admisión, promoción, decisiones disciplinarias, exclusión de equipos ni calificación sumativa.** Los perfiles son puntos de partida pedagógicos revisables.

## Tabla de especificaciones

| Competencia | Ítems | Habilidad observada | Ruta posterior |
| --- | --- | --- | --- |
| Competencia digital | D01–D04 | Archivos editables, CSV, diagnóstico de fallos y versiones | Módulos 3 y 5 |
| Seguridad y ciudadanía | D05–D08 | Phishing, autenticación multifactor, minimización de datos, verificación | Módulo 9 y transversal |
| Pensamiento computacional | D09–D12 | Comparación >=, algoritmo, validación y casos de prueba | Módulos 5 y 6 |
| Datos e información | D13–D16 | Tablas, JSON, procedencia y duplicados | Módulos 7 y 8 |
| Diseño y representación | D17–D20 | Áreas, cotas, escala y funcionalidad | Módulos 1–4 |
| IA y evaluación crítica | D21–D24 | Verificación, alcance, pruebas independientes y gravedad de errores | Módulos 9–12 |

Son **24 situaciones de selección única**, cuatro por área, con cuatro alternativas y una opción adicional **«Aún no lo sé»**. Se recomienda trabajo individual sin asistencia de modelos generativos para conocer conocimientos previos, con un tiempo orientativo de 20–30 minutos **sin tiempo límite obligatorio**. Pueden otorgarse ajustes razonables de lectura, acompañamiento o tiempo sin penalizar.

## Puntuación orientativa

- Cada acierto suma 1, una respuesta incorrecta o «Aún no lo sé» suma 0; el sistema distingue explícitamente cuántas respuestas fueron «Aún no lo sé».
- Por área: `aciertos / 4 × 100`. Global: `aciertos / 24 × 100`. Se redondea al entero más cercano.
- Menos de 50 %: **Ruta A — Fundamentos esenciales** (apoyo inicial).
- Desde 50 % hasta menos de 75 %: **Ruta B — Consolidación guiada**.
- Desde 75 %: **Ruta C — Profundización y retos**.

**Advertencia metodológica:** cuatro reactivos por competencia proporcionan poca resolución y no sustentan decisiones individuales de alto impacto. Por ejemplo, un solo error modifica la puntuación del área en **25 puntos porcentuales**. Las bandas son criterios **propuestos para orientar la diferenciación**, no puntos de corte normativos, diagnósticos psicométricos ni baremos de población escolar. Para decisiones pedagógicas relevantes, combinar con una actividad práctica corta, autoevaluación del estudiante y revisión del docente. No se requiere «aprobar» para ingresar a las 12 unidades.

## Aplicación y retroalimentación

1. Abrir el Learning Hub y seleccionar **Módulo 0 → Realizar diagnóstico inicial**.
2. Leer la información de privacidad y, si se utiliza, ingresar exclusivamente el correo institucional individual del estudiante (`@ijr.edu.co`) y completar la verificación enviada por Supabase.
3. Completar las 24 preguntas. Puede usarse «Aún no lo sé» sin sanción adicional.
4. Revisar respuestas pendientes y editar cualquier selección antes de finalizar.
5. Consultar el resultado global, el mapa de seis dominios y las recomendaciones.
6. Descargar **CSV o JSON local** de forma voluntaria o imprimir el informe. El archivo CSV contiene una fila por estudiante y los porcentajes de las áreas; **no contiene respuestas individuales**, nombre ni correo.
7. El docente recopila los archivos únicamente por el canal institucional autorizado, aplica el tratamiento de datos pertinente y propone actividades complementarias; **la página no recibe ni sincroniza estos datos**.

No es adecuado pedir a estudiantes que publiquen resultados, códigos o informes individuales en repositorios públicos.

## Propuestas de apoyo pedagógico

| Dominio a fortalecer | Actividad corta de verificación (10–20 min) |
| --- | --- |
| Competencia digital | Crear una carpeta organizada y producir dos versiones recuperables de un archivo |
| Seguridad y ciudadanía | Analizar un correo ficticio de phishing, identificar indicadores y proponer comprobación oficial |
| Lógica | Diseñar pseudocódigo con una condición y probar entrada válida, inválida y de frontera |
| Datos | Convertir cinco registros de una tabla a JSON y registrar una fuente verificable |
| Diseño CAD | Representar un rectángulo con cotas, calcular área y detectar una interferencia |
| IA crítica | Contrastar una respuesta simulada con su documento y diseñar tres casos de evaluación |

Después de la actividad, comparar el desempeño observable con las bandas del diagnóstico y permitir cambios de ruta. Si todas las áreas son sólidas, ofrecer tareas más profundas, no retirar apoyos automáticamente.

## Protección de datos, limitaciones técnicas y transparencia

- Sitio estático, sin autenticación, base de datos, analítica de diagnóstico, peticiones de red con respuestas, ni envíos automáticos.
- Respuestas y código viven solo en memoria de la pestaña durante la sesión; **se pierden al recargar o cerrar**.
- Los archivos exportados **sí pueden contener un código pseudónimo**. Aunque no sea un nombre, el código puede ser reidentificable si un docente conserva una tabla de correspondencia y debe tratarse confidencialmente.
- El banco de preguntas y sus respuestas se encuentran en el código del sitio público. Por ello no es un examen seguro contra consulta de respuestas ni apto como examen supervisado de alta importancia.
- Las explicaciones se muestran **al finalizar** para no interferir con otras preguntas.
- No se calcula percentil, coeficiente de fiabilidad, evidencia de validez ni riesgo estadístico de manera certificada. Una revisión académica deberá evaluar dificultad, pertinencia, sesgo de contenido y funcionamiento diferencial con estudiantes reales.
- Toda categoría usada en la interfaz se refiere al nivel de conocimientos evidenciado **en esta actividad**, nunca a capacidades personales permanentes.

## Aseguramiento de calidad

- Pruebas Playwright sobre Chromium de escritorio y móvil: acceso, 24 preguntas, navegación, respuesta «no sé», bloqueo de entrega incompleta, puntuación por seis dominios, descarga CSV/JSON, reset y ausencia de almacenamiento o tráfico de respuestas.
- Auditoría automática con axe-core de las vistas inicial, pregunta y resultados.
- Pruebas de regresión de las 12 unidades, laboratorios, diagramas SVG/TikZ y diseño responsivo.
- La validación manual con docente y estudiantes sigue siendo necesaria antes de usar el diagnóstico como insumo curricular institucional formal.

**Nota institucional:** La estructura del Módulo 0 y la matriz de competencias constituyen una **propuesta de diseño pedagógico** basada en los módulos existentes del Learning Hub de décimo y su articulación prevista con undécimo, no una afirmación de que este instrumento haya sido previamente aprobado por el colegio.

## Actualización de identificación institucional (Supabase)

El acceso ya no utiliza código de estudiante. Requiere **correo `@ijr.edu.co` confirmado mediante Supabase Auth**. El formulario ofrece enlace por correo; la verificación de código solo funciona si la plantilla configurada envía un token numérico. La cuenta autenticada vincula el resumen con `auth_user_id` y `institutional_email`. Las políticas RLS permiten al estudiante consultar y actualizar únicamente su propio registro; no hay políticas de acceso anónimo. La tabla está separada de las evaluaciones previas.

La aplicación guarda en Supabase **únicamente seis puntuaciones por competencia y datos globales**, no las 24 respuestas. El correo es dato personal: los docentes deben garantizar información y medidas de tratamiento adecuadas para menores, condiciones institucionales de acceso y un procedimiento de eliminación/retención autorizado. El cliente guarda temporalmente el token de acceso en `sessionStorage`; no almacena respuestas del examen en el navegador. La interfaz avisa de errores de guardado y ofrece reintento.

**Antes de aplicar en una clase:** autorizar el origen `https://ijr-jd.github.io/Inform-tica-Decimo-?module0=auth` en Supabase Auth → URL Configuration, verificar SMTP y probar un enlace real en un correo institucional de prueba. El examen no permite empezar sin correo verificado. No confundir pruebas automatizadas con pruebas reales del correo. La seguridad de filas por RLS no garantiza integridad certificada de la nota, porque la corrección se realiza en el navegador; usar solamente para orientación formativa.

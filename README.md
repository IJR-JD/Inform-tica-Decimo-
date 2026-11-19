# Informática 10.º · Bases para Tecnología e Informática 11.º

**Propuesta preliminar de articulación vertical | Instituto Jorge Robledo**

Portal: https://ijr-jd.github.io/Inform-tica-Decimo-/

## Continuidad curricular con 11.º (fuente institucional)

La *Planeación Undécimo Finalizada* define durante el periodo I un proyecto de **agente especializado en Microsoft Copilot**: reflexión sobre IA, propuesta de necesidad y usuarios, instrucciones, fuentes de conocimiento, conversaciones y pruebas, mejoras, documentación y presentación (semanas 1–13). El curso de 10.º **no implementa ese agente**. Desarrolla los prerrequisitos para que undécimo los aplique.

| 10.º | Preparación para 11.º |
|---|---|
| Problema y design brief | Definir propósito y público del agente |
| Modelos CAD, criterios y documentación | Pensamiento de diseño, evidencia y revisión |
| HTML/JS y lógica if/else | Comprender flujos e interacciones |
| CSV/JSON y buscador de FAQs con fuentes | Crear documento y base de conocimiento |
| Instrucciones y límites simulados | Configurar el agente Copilot |
| Diez casos de prueba y gestión de errores | Validar, optimizar y presentar el agente |

El documento de undécimo incluye la nota **«PENDIENTE DE PROFUNDIZACIÓN»** en semana 6 y una anotación sobre dificultades con imágenes de entrenamiento. No se debe interpretar el texto como aprobación de una malla de décimo ni asumir que el entrenamiento de imágenes continúa como proyecto principal de undécimo.

## Secuencia por periodo

1. **Human-Centered Design & CAD:** requisitos, dimensionamiento, versiones y validación; entrega de modelo y design brief.
2. **Knowledge Organizer Web App:** HTML, CSS, JavaScript, funciones, condiciones, estructuras CSV/JSON y buscador local con fuentes; entrega de aplicación y pruebas.
3. **Agent Readiness Portfolio:** fuentes autorizadas, especificación de comportamiento, diálogos simulados, diez casos de evaluación, límites y privacidad; entrega de portafolio transferible a undécimo.

El ritmo exacto depende de intensidad horaria y calendario aprobado. Las etapas de esta propuesta no fijan fechas institucionales.

## Evidencias y evaluación

En las doce unidades hay: objetivo, vocabulario, cuatro pasos, desafío, evidencia, checklist y errores comunes. Los cuestionarios binarios son formativos; la evaluación de producto exige revisión del docente. Rúbrica sugerida: problema 15 %, diseño 20 %, implementación 30 %, pruebas 20 %, documentación 15 %.

## Tecnología y seguridad

El portal conserva `styles.css` y `split-layout.css`. Los contenidos se mantienen en `learning-content.js`, y su extensión de estilo en `learning-content.css`. El registro del estudiante se guarda solo en su navegador, no se entrega ni califica automáticamente. El laboratorio de preparación documental simula consultas exactas sobre datos ficticios: no utiliza modelos reales, no consulta Copilot y no solicita información personal ni tokens API.

## Criterios de aceptación

- Tres proyectos distintos en décimo, sin duplicar el proyecto agente de undécimo.
- Doce unidades conectadas con competencias progresivas.
- Interfaz Theory / Assessment y laboratorios anteriores preservados.
- Ensayo local de consultas con fuentes y abstención si no hay respuesta.
- Controles de privacidad, mensaje explícito de que las notas son locales y guía para trabajo docente.
- Pruebas del código y verificación visual E2E antes de certificar despliegue.

## Referencia principal

Documento institucional suministrado por el docente: *Planeación Undécimo Finalizada.docx*; curso Tecnología e Informática, grado undécimo, periodo I, proyecto de Microsoft Copilot Agente. Esta referencia no se incluye en el repositorio público para evitar redistribuir documentos institucionales.


## Teoría ampliada · Periodo I (módulos 1–4)

Se incorporaron cuatro capítulos extensos con definiciones técnicas, procedimientos explicados, cálculos y ejemplos resueltos sobre:

1. **Problemas tecnológicos:** necesidad, usuario, problema, alcance, restricciones, criterios y comparación de alternativas.
2. **Modelado CAD:** punto, línea, curva, superficie, sólido, unidades, escala, vistas ortogonales e isométricas, áreas y volumen.
3. **Documentación técnica:** estructura de archivos, versiones, trazabilidad, registro de cambios y trabajo colaborativo.
4. **Proyecto y validación:** design brief, prototipo editable, matriz requisito/prueba/evidencia, corrección y presentación.

Los contenidos aparecen al abrir **Theory** de cada uno de los primeros cuatro módulos, bajo la explicación breve original. Cada módulo enlaza su **diagrama vectorial SVG** y el código **LaTeX/TikZ** correspondiente. Las figuras están disponibles también como assets independientes, sin dependencia de bibliotecas web externas.

| Módulo | SVG (visualización web) | Fuente LaTeX |
|---|---|---|
| 1 | [Problema → requisito](assets/diagrams/modulo-01.svg) | [TikZ](assets/diagrams/modulo-01.tex) |
| 2 | [Modelo y vistas](assets/diagrams/modulo-02.svg) | [TikZ](assets/diagrams/modulo-02.tex) |
| 3 | [Versionado y trazabilidad](assets/diagrams/modulo-03.svg) | [TikZ](assets/diagrams/modulo-03.tex) |
| 4 | [Verificación del proyecto](assets/diagrams/modulo-04.svg) | [TikZ](assets/diagrams/modulo-04.tex) |
| Consolidado | [Secuencia del periodo](assets/diagrams/periodo-1-consolidado.svg) | [TikZ](assets/diagrams/periodo-1-consolidado.tex) |

El SVG y la fuente TikZ son **dos representaciones editables correspondientes del mismo esquema conceptual**; no deben tratarse como salidas bit a bit de una compilación automatizada. El material deja explícito cuándo un ejemplo es ilustrativo y no corresponde a aprobación de normas técnicas.

Archivos nuevos: `theory-foundations.js`, `theory-foundations.css` y `assets/diagrams/*.svg|*.tex`. El CSS base institucional permanece sin cambios.


## Módulo 0 · Diagnóstico inicial de competencias

Antes de las doce unidades del Learning Hub se presenta una actividad de entrada **voluntaria y formativa** con 24 situaciones, cuatro por competencia y seis ejes: competencia digital, seguridad y ciudadanía, lógica computacional, datos, diseño CAD e IA crítica. Incluye «Aún no lo sé», revisión antes de finalizar, mapa de fortalezas y áreas de apoyo, rutas A/B/C y exportación individual CSV/JSON sin nombres ni envío a un servidor.

**Precaución:** las rutas son orientativas, no diagnósticos psicométricos ni notas. No hay perfiles permanentes ni calificación institucional. El instrumento no se debe usar para admisión, segregación o decisiones de alto impacto. Los resultados no se almacenan automáticamente; descargar un reporte implica custodia responsable del archivo. Cuatro reactivos por dominio son una muestra pequeña, por lo que se debe contrastar con evidencias prácticas.

- Guía pedagógica y plan de aplicación: [docs/modulo-0-guia-docente.md](docs/modulo-0-guia-docente.md).
- Instrumento interactivo: `diagnostic-module.js`.
- Diseño responsivo/impresión: `diagnostic-module.css`.
- Pruebas automáticas: `tests/diagnostic-module.spec.mjs`.
- Se mantienen intactos los doce temas y su progreso previo.

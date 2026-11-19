/* IJR · Informática 10.º · Módulo 0 Diagnóstico
 * Evaluación formativa orientativa: 24 reactivos (4 por dominio), sin tiempo límite.
 * No emplear para admisión, calificaciones, capacidades innatas ni decisiones de alto impacto.
 * Acceso con correo institucional confirmado por Supabase Auth; envía solo resumen, no respuestas.
 */
"use strict";
(function(){
const DOMAINS=[{"id":"digital","name":"Competencia digital","short":"Herramientas","description":"Archivos, formatos, navegación y resolución de problemas","modules":"Módulos 3 y 5"},{"id":"safety","name":"Seguridad y ciudadanía","short":"Seguridad","description":"Privacidad, phishing, verificación y convivencia digital","modules":"Módulo 9 y ciudadanía digital transversal"},{"id":"logic","name":"Pensamiento computacional","short":"Lógica","description":"Secuencias, condiciones, depuración y algoritmos","modules":"Módulos 5 y 6"},{"id":"data","name":"Datos e información","short":"Datos","description":"Tablas, campos, fuentes y estructuras de datos","modules":"Módulos 7 y 8"},{"id":"design","name":"Diseño y representación","short":"Diseño","description":"Requisitos, escala, cotas y validación","modules":"Módulos 1–4"},{"id":"ai","name":"IA y evaluación crítica","short":"IA crítica","description":"Alcance, evidencia, sesgos y pruebas","modules":"Módulos 9–12"}];
const QUESTIONS=[{"id":"D01","domain":"digital","prompt":"Un compañero debe editar un informe dentro de dos semanas. ¿Qué conviene conservar?","options":["El archivo original editable","Solo una fotografía de la pantalla","Una captura de la portada","Un archivo sin extensión"],"answer":0,"explanation":"El archivo editable conserva estructura y permite corregir o mejorar el contenido."},{"id":"D02","domain":"digital","prompt":"Descargas un archivo llamado 'informe.csv'. ¿Qué tipo de información esperas encontrar?","options":["Una imagen de mapa de bits","Datos tabulares separados por delimitadores","Un video de alta resolución","Un modelo geométrico tridimensional"],"answer":1,"explanation":"CSV suele representar registros tabulares mediante líneas y separadores."},{"id":"D03","domain":"digital","prompt":"Una aplicación se queda sin responder. ¿Cuál es un primer paso de diagnóstico razonable?","options":["Borrar todos los documentos personales","Compartir la contraseña con un compañero","Registrar el problema y comprobar si ocurre de nuevo al reiniciar la aplicación","Desactivar permanentemente las actualizaciones"],"answer":2,"explanation":"Registrar síntomas y aislar el problema permite investigar sin causar pérdida de datos."},{"id":"D04","domain":"digital","prompt":"Dos integrantes trabajan en el mismo diseño. ¿Qué práctica ayuda a recuperar cambios?","options":["Poner siempre el nombre 'final' a todos los archivos","Sobrescribir cualquier versión anterior","Eliminar la carpeta original","Usar versiones identificables y registrar modificaciones"],"answer":3,"explanation":"Las versiones y su historial facilitan comparar, restaurar y justificar cambios."},{"id":"D05","domain":"safety","prompt":"Recibes un correo que pide tu contraseña para 'evitar el bloqueo inmediato'. ¿Qué haces?","options":["No ingresarla y comprobar el aviso por un canal oficial","Responder enviando la contraseña","Abrir el enlace porque el mensaje parece urgente","Reenviar tus datos a otras personas"],"answer":0,"explanation":"Los mensajes urgentes que solicitan credenciales pueden ser phishing; verifica por canales oficiales."},{"id":"D06","domain":"safety","prompt":"¿Cuál de estas prácticas protege mejor una cuenta?","options":["Reutilizar una contraseña fácil en todos los sitios","Usar una contraseña única y activar MFA cuando esté disponible","Enviar un código de verificación a terceros","Publicar la clave en un documento compartido"],"answer":1,"explanation":"Una credencial única y la autenticación multifactor reducen riesgos de acceso indebido."},{"id":"D07","domain":"safety","prompt":"Para una actividad necesitas mostrar el perfil de una persona. ¿Cuál alternativa minimiza datos personales?","options":["Publicar la dirección del estudiante","Pedir su documento de identidad","Utilizar un personaje ficticio o datos simulados","Solicitar la contraseña institucional"],"answer":2,"explanation":"Los datos ficticios permiten practicar sin exponer información personal de menores."},{"id":"D08","domain":"safety","prompt":"Una publicación afirma un dato sorprendente sin indicar ninguna fuente. ¿Cuál es la mejor reacción?","options":["Compartirla porque tiene muchas visitas","Aceptar el dato porque la imagen parece profesional","Ignorar todas las noticias en internet","Buscar su fuente original y contrastar la afirmación"],"answer":3,"explanation":"El número de reproducciones no valida una afirmación; se requiere procedencia y contraste."},{"id":"D09","domain":"logic","prompt":"Un algoritmo indica: 'Si la temperatura simulada es mayor o igual a 28, mostrar alerta'. Si vale 28, ¿qué muestra?","options":["Alerta","Sin alerta","Un dato sin procesar","No puede determinarse por la condición"],"answer":0,"explanation":"El operador >= incluye el valor 28, por lo que se activa la alerta."},{"id":"D10","domain":"logic","prompt":"¿Cuál secuencia representa correctamente un programa sencillo?","options":["Salida → presentación → entrada","Entrada → validación → procesamiento → salida","Diseño → borrar datos → finalizar","Copiar → publicar → no probar"],"answer":1,"explanation":"Los datos de entrada se validan y procesan antes de comunicar un resultado."},{"id":"D11","domain":"logic","prompt":"Una función calcula 12/0. ¿Qué debe hacer una implementación robusta?","options":["Mostrar infinito como resultado válido sin aviso","Continuar en silencio","Detectar un divisor igual a cero e informar que la entrada es inválida","Eliminar los datos de prueba"],"answer":2,"explanation":"Una validación evita resultados engañosos en operaciones no definidas."},{"id":"D12","domain":"logic","prompt":"Una calculadora entrega resultados correctos excepto cuando el campo está vacío. ¿Qué práctica detecta el defecto?","options":["Probar solamente valores grandes","Cambiar los colores del botón","Evitar documentar los errores","Añadir un caso de prueba con entrada vacía y resultado esperado"],"answer":3,"explanation":"Los casos de borde como una entrada vacía son esenciales para depurar una aplicación."},{"id":"D13","domain":"data","prompt":"Quieres ordenar cinco preguntas frecuentes para una futura aplicación. ¿Qué estructura facilita buscarlas?","options":["Una tabla con campos como tema, pregunta, respuesta y fuente","Cinco imágenes sin texto","Un dibujo sin etiquetas","Un único párrafo con todo mezclado"],"answer":0,"explanation":"Los registros con campos consistentes facilitan filtrado, edición y trazabilidad."},{"id":"D14","domain":"data","prompt":"¿Qué representa normalmente un objeto JSON?","options":["Una animación de fotogramas","Pares clave-valor que organizan información","Un archivo ejecutable del sistema operativo","Un circuito electrónico físico"],"answer":1,"explanation":"JSON permite describir datos estructurados mediante pares clave-valor y listas."},{"id":"D15","domain":"data","prompt":"Un registro tiene respuesta pero no indica su origen. ¿Qué conviene hacer?","options":["Inventar una fuente plausible","Afirmar que está validado","Marcar su procedencia como pendiente y verificar antes de usarlo","Eliminar todas las otras respuestas"],"answer":2,"explanation":"La ausencia de fuente disminuye trazabilidad; no debe completarse con información inventada."},{"id":"D16","domain":"data","prompt":"En un conjunto de datos, una fila duplica exactamente otra por error. ¿Qué paso es adecuado?","options":["Contarla dos veces sin revisar","Cambiar los datos al azar","Eliminar todos los registros","Investigar el duplicado y documentar la decisión de limpieza"],"answer":3,"explanation":"La limpieza responsable exige verificar por qué existe el duplicado antes de modificar datos."},{"id":"D17","domain":"design","prompt":"Una habitación mide 4 m por 3 m. ¿Cuál es su área?","options":["12 m²","7 m²","24 m²","12 m"],"answer":0,"explanation":"El área rectangular es largo × ancho: 4 × 3 = 12 metros cuadrados."},{"id":"D18","domain":"design","prompt":"¿Qué información permite comprobar el tamaño real de una puerta en CAD?","options":["Su color de relleno","Una cota acompañada de su unidad","El zoom de pantalla","La cantidad de vistas guardadas"],"answer":1,"explanation":"Una cota numérica y la unidad son verificables; el zoom no altera las dimensiones."},{"id":"D19","domain":"design","prompt":"Un plano se imprime a escala 1:50. Una línea de 2 cm en papel representa:","options":["2 cm en la realidad","50 cm en la realidad","100 cm en la realidad","500 cm en la realidad"],"answer":2,"explanation":"En escala 1:50, 2 cm del plano representan 2 × 50 = 100 cm reales."},{"id":"D20","domain":"design","prompt":"Un modelo parece atractivo, pero la puerta intersecta el escritorio. ¿Qué concluyes?","options":["El diseño cumple todos sus requisitos","El color de la puerta es incorrecto","No hace falta comprobar el recorrido","La interferencia constituye un requisito de uso no satisfecho"],"answer":3,"explanation":"El prototipo se valida con restricciones funcionales; una apariencia estética no basta."},{"id":"D21","domain":"ai","prompt":"Una herramienta genera una respuesta sin citar ninguna fuente. ¿Qué es lo más apropiado?","options":["Verificar las afirmaciones con fuentes confiables antes de utilizarlas","Suponer que toda respuesta generada es verdadera","Publicarla sin revisión por ser automática","Eliminar cualquier incertidumbre del reporte"],"answer":0,"explanation":"Los sistemas generativos pueden equivocarse; la verificación independiente es necesaria."},{"id":"D22","domain":"ai","prompt":"Un futuro asistente solo dispone de un documento sobre reciclaje. Le preguntan el horario escolar. ¿Qué debería hacer?","options":["Inventar un horario probable","Indicar que su fuente no permite responder con certeza","Responder sobre reciclaje aunque no corresponda","Pedir una contraseña para continuar"],"answer":1,"explanation":"Reconocer el alcance limitado evita atribuir al sistema información que no posee."},{"id":"D23","domain":"ai","prompt":"¿Cuál conjunto permite evaluar si una herramienta funciona fuera de ejemplos utilizados al diseñarla?","options":["Solo las preguntas que siempre responde","Únicamente ejemplos copiados del entrenamiento","Casos de prueba separados, que incluyan errores y situaciones fuera de alcance","Solo preguntas muy fáciles"],"answer":2,"explanation":"Las pruebas independientes y variadas revelan límites y posibles fallos de generalización."},{"id":"D24","domain":"ai","prompt":"Un modelo obtuvo 9 respuestas correctas de 10, pero falló en una indicación importante. ¿Cuál interpretación es adecuada?","options":["Ya no requiere ninguna revisión","La exactitud del 90 % garantiza ausencia de riesgos","Se debe ocultar el error para presentar buenos resultados","Es necesario analizar la gravedad del fallo además del porcentaje"],"answer":3,"explanation":"La tasa de aciertos no representa por sí sola el impacto o gravedad de errores específicos."}];
const OPTIONAL=-1;
const ANSWERS=new Map();
let index=0,finished=false,report=null,studentEmail="";
const root=document.getElementById("diagnostic");
const mount=document.getElementById("diagnosticEntry");
if(!root||!mount)return;
const element=(tag,klass,text)=>{const e=document.createElement(tag);if(klass)e.className=klass;if(text!==undefined)e.textContent=text;return e};
const add=(parent,tag,klass,text)=>{const e=element(tag,klass,text);parent.append(e);return e};
const btn=(parent,text,klass,action)=>{const e=add(parent,"button",klass,text);e.type="button";e.addEventListener("click",action);return e};
const escCsv=value=>'"'+String(value??"").replace(/"/g,'""').replace(/[\r\n]+/g," ")+'"';
const level=score=>score<50?"Fundamentos por fortalecer":score<75?"En consolidación":"Base demostrada";
function scoreResponses(answers){
 const result=DOMAINS.map(d=>{const items=QUESTIONS.filter(q=>q.domain===d.id);const correct=items.filter(q=>answers[q.id]===q.answer).length;const uncertain=items.filter(q=>answers[q.id]===OPTIONAL).length;return {...d,correct,total:items.length,uncertain,pct:Math.round(correct/items.length*100),level:level(correct/items.length*100)}});
 const correct=result.reduce((n,d)=>n+d.correct,0),unsure=result.reduce((n,d)=>n+d.uncertain,0);
 const percentage=Math.round(correct/QUESTIONS.length*100);
 const readiness=percentage<50?"Ruta A · Fundamentos esenciales":percentage<75?"Ruta B · Consolidación guiada":"Ruta C · Profundización y retos";
 return {correct,total:QUESTIONS.length,unsure,percentage,readiness,domains:result};
}
Object.defineProperty(window,"TI10Diagnostic",{value:Object.freeze({get itemCount(){return QUESTIONS.length},get domainCount(){return DOMAINS.length},score:(answers)=>scoreResponses(answers)}),writable:false,configurable:false});
function showDiagnostic(){for(const id of ["overview","theory","workshop","lab","diagnostic"]){const node=document.getElementById(id);if(node)node.classList.toggle("app-hidden",id!=="diagnostic")}window.scrollTo({top:0,behavior:"instant"})}
function goHome(){if(!finished&&ANSWERS.size>0&&!window.confirm("¿Salir del diagnóstico? Las respuestas de esta sesión se perderán."))return;for(const id of ["overview","theory","workshop","lab","diagnostic"]){const node=document.getElementById(id);if(node)node.classList.toggle("app-hidden",id!=="overview")}window.scrollTo({top:0,behavior:"instant"})}
function download(filename,type,body){const blob=new Blob([body],{type});const url=URL.createObjectURL(blob);const a=element("a");a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function renderIntro(){
 root.replaceChildren();
 add(root,"p","eyebrow","MÓDULO 0 · PUNTO DE PARTIDA");
 add(root,"h1","","Diagnóstico de competencias digitales");
 add(root,"p","diag-lead","Conoce tu punto de partida antes de Informática 10.º. No es una calificación, una medición de inteligencia ni una etiqueta permanente. Sirve para recomendar actividades según tus respuestas.");
 const stats=add(root,"div","diag-stats");
 for(const [a,b] of [["24","situaciones aplicadas"],["6","competencias"],["20–30 min","tiempo orientativo · sin límite"]]){const card=add(stats,"div","diag-stat");add(card,"strong","",a);add(card,"span","",b)}
 const topics=add(root,"div","diag-domains");DOMAINS.forEach(d=>{const c=add(topics,"article","diag-domain");add(c,"strong","",d.name);add(c,"p","",d.description)});
 const note=add(root,"div","diag-notice");
 add(note,"strong","","Privacidad y uso responsable");
 add(note,"p","","El ingreso utiliza tu correo institucional @ijr.edu.co y un enlace de verificación enviado a esa cuenta. Al finalizar se guarda en Supabase únicamente el correo y el resumen de seis competencias, no las respuestas individuales. El acceso está protegido por políticas RLS. Es un perfil formativo, no una nota.");
 add(note,"p","","Todas las preguntas tienen la opción «Aún no lo sé». Puedes cambiar respuestas antes de finalizar. Para obtener el perfil debes responder las 24 situaciones, incluida esa opción cuando corresponda.");
 const verified=window.TI10Auth?.current();
 const label=add(root,"label","diag-code-label","Correo institucional del estudiante");
 const input=add(label,"input","diag-code-input");
 input.type="email";input.id="diagEmail";input.required=true;input.maxLength=254;input.autocomplete="email";input.inputMode="email";input.placeholder="estudiante@ijr.edu.co";
 input.setAttribute("aria-describedby","diagCodeInfo");
 const info=add(root,"p","diag-small","Escribe exclusivamente tu correo del dominio @ijr.edu.co. Recibirás un enlace de acceso en esa dirección; si tu correo institucional no usa ese dominio, informa al docente.");info.id="diagCodeInfo";
 const status=add(root,"p","diag-small");status.id="diagAuthStatus";status.setAttribute("role","status");status.setAttribute("aria-live","polite");
 const actions=add(root,"div","diag-actions");
 if(verified){
   studentEmail=verified.email;input.value=verified.email;input.readOnly=true;
   status.textContent="Correo institucional verificado: "+verified.email+". Tu resultado quedará asociado a esta cuenta.";
   btn(actions,"Comenzar diagnóstico →","button button-dark",()=>{if(!window.TI10Auth.current()){status.textContent="La sesión expiró; verifica nuevamente tu correo.";return}index=0;finished=false;ANSWERS.clear();renderQuestion()});
   btn(actions,"Cambiar de cuenta","button button-light",()=>{window.TI10Auth.signOut();studentEmail="";renderIntro()});
 }else{
   btn(actions,"Enviar enlace al correo institucional","button button-dark",async()=>{
     const email=input.value.trim().toLowerCase();
     if(!window.TI10Auth.validEmail(email)){status.textContent="Ingresa una dirección válida terminada en @ijr.edu.co.";input.focus();return}
     const button=actions.querySelector(".button-dark");button.disabled=true;status.textContent="Solicitando enlace de acceso…";
     try{await window.TI10Auth.sendMagicLink(email);status.textContent="Si el correo está habilitado, recibirás un enlace de verificación. Ábrelo y regresa a la plataforma. Revisa también spam."}
     catch(e){status.textContent="No se pudo enviar el enlace. "+e.message}
     finally{button.disabled=false}
   });
   const otpLabel=add(root,"label","diag-code-label","¿Recibiste un código de un solo uso? (opcional)");
   const otp=add(otpLabel,"input","diag-code-input");otp.type="text";otp.inputMode="numeric";otp.autocomplete="one-time-code";otp.maxLength=8;otp.placeholder="Código recibido por correo";
   btn(actions,"Verificar código","button button-light",async()=>{
     const email=input.value.trim().toLowerCase();
     if(!window.TI10Auth.validEmail(email)){status.textContent="Primero escribe tu correo @ijr.edu.co.";return}
     try{await window.TI10Auth.verifyCode(email,otp.value.trim());studentEmail=email;renderIntro()}
     catch(e){status.textContent="Código no verificado. "+e.message}
   });
 }
 btn(actions,"Volver al Learning Hub","button button-light",goHome);
}
function renderQuestion(){
 showDiagnostic();root.replaceChildren();
 const q=QUESTIONS[index],d=DOMAINS.find(x=>x.id===q.domain);
 const progress=add(root,"div","diag-progress-head");
 add(progress,"span","","Pregunta "+(index+1)+" de "+QUESTIONS.length);
 add(progress,"strong","","Respondidas: "+ANSWERS.size+" / "+QUESTIONS.length);
 const track=add(root,"div","diag-progress-track");track.setAttribute("role","progressbar");track.setAttribute("aria-label","Preguntas respondidas");track.setAttribute("aria-valuemin","0");track.setAttribute("aria-valuemax",String(QUESTIONS.length));track.setAttribute("aria-valuenow",String(ANSWERS.size));add(track,"span","").style.width=ANSWERS.size/QUESTIONS.length*100+"%";
 add(root,"p","eyebrow","ÁREA · "+d.name);
 const form=add(root,"form","diag-form");
 const field=add(form,"fieldset","diag-fieldset");
 add(field,"legend","",q.prompt);
 q.options.forEach((option,k)=>optionRow(field,q,k,option,false));
 optionRow(field,q,OPTIONAL,"Aún no lo sé",true);
 const actions=add(form,"div","diag-actions");
 btn(actions,"← Anterior","button button-light",()=>{index=Math.max(0,index-1);renderQuestion()}).disabled=index===0;
 btn(actions,index===QUESTIONS.length-1?"Revisar respuestas →":"Siguiente →","button button-dark",()=>{index===QUESTIONS.length-1?renderReview():(index++,renderQuestion())});
 btn(actions,"Ir al resumen de respuestas","button button-light",renderReview);
 add(root,"p","diag-small","Selecciona una respuesta o «Aún no lo sé». Si no estás seguro, puedes regresar sin perder las respuestas de esta sesión.");
}
function optionRow(field,q,value,text,unsure){
 const label=add(field,"label","diag-option"+(unsure?" diag-unsure":""));
 const input=element("input");input.type="radio";input.name="diagAnswer";input.value=String(value);input.checked=ANSWERS.has(q.id)&&ANSWERS.get(q.id)===value;
 input.addEventListener("change",()=>{ANSWERS.set(q.id,value);const counter=root.querySelector(".diag-progress-head strong");if(counter)counter.textContent="Respondidas: "+ANSWERS.size+" / "+QUESTIONS.length;const bar=root.querySelector(".diag-progress-track");if(bar){bar.setAttribute("aria-valuenow",String(ANSWERS.size));bar.firstElementChild.style.width=ANSWERS.size/QUESTIONS.length*100+"%"}});
 label.append(input,document.createTextNode(text));
}
function renderReview(){
 showDiagnostic();root.replaceChildren();
 add(root,"p","eyebrow","MÓDULO 0 · VERIFICACIÓN");
 add(root,"h1","","Revisa antes de finalizar");
 const missing=QUESTIONS.filter(q=>!ANSWERS.has(q.id));
 add(root,"p","diag-lead",missing.length?"Faltan "+missing.length+" respuestas. Puedes abrir cada pregunta y seleccionar una opción o «Aún no lo sé».":"Las 24 respuestas están registradas. Puedes corregir cualquiera antes de obtener tu perfil.");
 const list=add(root,"div","diag-review-grid");
 DOMAINS.forEach(d=>{const items=QUESTIONS.filter(q=>q.domain===d.id);const answered=items.filter(q=>ANSWERS.has(q.id)).length;const section=add(list,"section","diag-review-group");add(section,"h2","",d.name+" · "+answered+"/4");items.forEach(q=>{const i=QUESTIONS.findIndex(x=>x.id===q.id);const status=ANSWERS.has(q.id)?(ANSWERS.get(q.id)===OPTIONAL?"Aún no lo sé":"Respondida"):"Pendiente";btn(section,String(i+1).padStart(2,"0")+" · "+status,"diag-review-button",()=>{index=i;renderQuestion()})})});
 const actions=add(root,"div","diag-actions");
 btn(actions,"Volver a la pregunta "+(index+1),"button button-light",renderQuestion);
 const submit=btn(actions,"Finalizar y ver perfil →","button button-dark",()=>{if(QUESTIONS.some(q=>!ANSWERS.has(q.id)))return;if(!window.TI10Auth?.current()){alert("Tu sesión institucional expiró; verifica nuevamente tu correo.");return}finished=true;report=scoreResponses(Object.fromEntries(ANSWERS));renderReport()});
 submit.disabled=missing.length>0;
}
function renderReport(){
 showDiagnostic();root.replaceChildren();
 add(root,"p","eyebrow","MÓDULO 0 · INFORME FORMATIVO");
 add(root,"h1","","Tu perfil de competencias");
 add(root,"p","diag-lead","Este perfil describe solo las respuestas de esta actividad. No mide capacidades permanentes, no es un diagnóstico psicológico y no debe emplearse para decisiones de admisión, exclusión ni notas.");
 const hero=add(root,"section","diag-report-hero");
 const big=add(hero,"div","diag-big-score");add(big,"strong","",String(report.percentage)+" %");add(big,"span","","Aciertos: "+report.correct+" / "+report.total);
 const description=add(hero,"div","");add(description,"h2","",report.readiness);add(description,"p","","Respuestas «Aún no lo sé»: "+report.unsure+". Banda orientativa para decidir por dónde empezar, no para clasificar tu potencial.");add(description,"p","","Umbrales de apoyo pedagógico: menos del 50 % → fundamentos; 50–74 % → consolidación; desde 75 % → profundización. No son escalas estandarizadas.");
 add(root,"h2","diag-section-title","Mapa de las seis competencias");
 const grid=add(root,"div","diag-score-grid");
 report.domains.forEach(d=>{const card=add(grid,"section","diag-score-card");const head=add(card,"div","diag-score-heading");add(head,"strong","",d.name);add(head,"span","",d.correct+" / "+d.total+" · "+d.pct+" %");const track=add(card,"div","diag-score-track");track.setAttribute("role","img");track.setAttribute("aria-label",d.name+": "+d.pct+" por ciento");add(track,"span","").style.width=d.pct+"%";add(card,"p","",d.level);add(card,"small","","Ruta sugerida: "+d.modules)});
 const ordered=[...report.domains].sort((a,b)=>a.pct-b.pct);
 const priorities=ordered.filter(x=>x.pct<75).slice(0,3);
 const recs=add(root,"section","diag-recommendations");
 add(recs,"h2","","Plan personal de inicio");
 if(priorities.length===0){add(recs,"p","","Tu desempeño en las seis áreas fue sólido para esta muestra. Avanza hacia desafíos de diseño, programación y evaluación de fuentes; confirma los resultados con tareas prácticas.")}else{
  add(recs,"p","","Empieza por estas áreas y verifica tus avances con una actividad práctica. Una puntuación de cuatro preguntas por área no basta para afirmar dominio definitivo.");
  const ol=add(recs,"ol","");
  priorities.forEach(d=>{const li=add(ol,"li","");add(li,"strong","",d.name+" · "+d.pct+" %");add(li,"p","","Repasa "+d.modules+". "+d.description+". Después desarrolla un ejercicio real y vuelve a comprobar tus avances.")});
 }
 const feedback=add(root,"details","diag-feedback");
 add(feedback,"summary","","Ver explicaciones y respuestas de las 24 preguntas");
 QUESTIONS.forEach((q,i)=>{const row=add(feedback,"article","diag-answer-review");const chosen=ANSWERS.get(q.id);add(row,"h3","",(i+1)+". "+q.prompt);add(row,"p","","Tu selección: "+(chosen===OPTIONAL?"Aún no lo sé":q.options[chosen]));add(row,"p","","Respuesta esperada: "+q.options[q.answer]);add(row,"p","",q.explanation)});
 const notice=add(root,"p","diag-small","El resultado formativo se guarda de forma protegida en Supabase asociado a tu correo institucional verificado. Solo se almacena el resumen por competencias, no las respuestas individuales. No compartas el informe públicamente.");
 const saveState=add(root,"p","diag-small","Guardando resumen en Supabase…");saveState.id="diagSaveStatus";saveState.setAttribute("role","status");saveState.setAttribute("aria-live","polite");
 const saveNow=async()=>{try{await window.TI10Auth.saveProfile(report);saveState.textContent="Resumen guardado en Supabase para "+studentEmail+"."}catch(e){saveState.textContent="No se pudo guardar el resumen: "+e.message+". Puedes reintentar o descargar tu informe."}};
 saveNow();

 const actions=add(root,"div","diag-actions");
 btn(actions,"Volver a guardar en Supabase","button button-light",saveNow);
 btn(actions,"Descargar informe CSV","button button-dark",downloadCSV);
 btn(actions,"Descargar informe JSON","button button-light",downloadJSON);
 btn(actions,"Imprimir / Guardar PDF","button button-light",()=>window.print());
 btn(actions,"Repetir diagnóstico","button button-light",()=>{if(window.confirm("¿Repetir? Se borrarán las respuestas de esta sesión.")){ANSWERS.clear();report=null;finished=false;index=0;renderIntro()}});
 btn(actions,"Volver a Informática 10.º","button button-light",()=>{finished=true;goHome()});
}
function exportObject(){return {version:"1.0",instrument:"IJR-TI10-M0",date:new Date().toISOString().slice(0,10),studentEmail:studentEmail||null,score:report.percentage,correct:report.correct,total:report.total,unsure:report.unsure,readiness:report.readiness,domains:report.domains.map(d=>({id:d.id,name:d.name,correct:d.correct,total:d.total,percentage:d.pct,uncertain:d.uncertain,learningPath:d.modules})),interpretation:"Formativo, no estandarizado, sin validez diagnóstica individual certificada."}}
function downloadCSV(){if(!finished||!report)return;const o=exportObject();const columns=["instrument","date","studentEmail","correct","total","score","unsure","readiness",...o.domains.map(d=>d.id+"_pct")];const vals=[o.instrument,o.date,o.studentEmail,o.correct,o.total,o.score,o.unsure,o.readiness,...o.domains.map(d=>d.percentage)];download("ti10-modulo0-reporte.csv","text/csv;charset=utf-8","\uFEFF"+columns.map(escCsv).join(",")+"\r\n"+vals.map(escCsv).join(",")+"\r\n")}
function downloadJSON(){if(!finished||!report)return;download("ti10-modulo0-reporte.json","application/json;charset=utf-8",JSON.stringify(exportObject(),null,2))}
btn(mount,"Realizar diagnóstico inicial →","button button-dark diag-start",()=>{showDiagnostic();renderIntro()});
const authCallback=location.hash.includes("access_token=")||new URLSearchParams(location.search).get("module0")==="auth";
window.TI10Auth.restore().then(user=>{
 if(user){studentEmail=user.email;if(authCallback){showDiagnostic();renderIntro()}}
 else if(authCallback){showDiagnostic();renderIntro();const msg=document.getElementById("diagAuthStatus");if(msg)msg.textContent="No se pudo recuperar la sesión. Solicita nuevamente un enlace institucional."}
}).catch(error=>{if(authCallback){showDiagnostic();renderIntro();const msg=document.getElementById("diagAuthStatus");if(msg)msg.textContent=error.message}});
root.addEventListener("keydown",e=>{if(e.key==="Escape"&&!finished){/* Escape does not exit: avoids accidental loss */}});
})();

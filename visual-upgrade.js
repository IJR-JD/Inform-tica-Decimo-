/* IJR · Interactive explanatory diagrams v2.
   Static SVG + progressive visualization, keyboard-operable controls,
   automatic narration without audio, respects prefers-reduced-motion. */
"use strict";
(function(){
 const SVG_NS="http://www.w3.org/2000/svg";
 const REDUCED=window.matchMedia("(prefers-reduced-motion: reduce)");
 const DATA=[
  {title:"Del problema a una solución verificable",label:"Proceso de diseño",nodes:[
   ["OBSERVAR","Situación", "La puerta se cruza con un escritorio. Registramos el problema sin escoger todavía una herramienta."],
   ["DEFINIR","Necesidad", "El usuario necesita circular sin obstáculos. Escribimos un requisito observable."],
   ["PROPONER","Alternativas", "Comparamos desplazar el mobiliario con cambiar la apertura, siempre según el contexto."],
   ["VERIFICAR","Evidencia", "Simulamos el recorrido y comprobamos si cumple el criterio previamente establecido."]
  ]},
  {title:"Una geometría, varias representaciones",label:"Representación CAD",nodes:[
   ["UNIDADES","Medidas","Configuramos el modelo en metros antes de introducir dimensiones reales."],
   ["GEOMETRÍA","Sólido","Construimos largo, ancho y altura; distinguimos objeto editable de imagen."],
   ["PROYECCIÓN","Vistas","Comparamos vistas superior y frontal con la representación isométrica."],
   ["COMPROBAR","Cotas","Calculamos área y volumen de forma independiente y contrastamos las medidas."]
  ]},
  {title:"Una modificación debe dejar evidencia",label:"Control de versiones",nodes:[
   ["V01","Estado inicial","Se registra un modelo original con una puerta de 0,70 m."],
   ["REQUISITO","Hallazgo","Se identifica una condición del ejercicio que pide un ancho mayor."],
   ["V02","Modificación","Se crea una versión recuperable con una puerta de 0,85 m."],
   ["HISTORIAL","Trazabilidad","Relacionamos requisito, cambio, plano acotado y prueba final."]
  ]},
  {title:"Validación antes de declarar éxito",label:"Pruebas del proyecto",nodes:[
   ["REQUISITO","Qué lograr","Definimos el resultado esperado con medidas y condiciones."],
   ["MODELO","Construcción","Entregamos un CAD editable y un plano que permita inspección."],
   ["PRUEBA","Verificar","Medimos dimensiones y evaluamos colisiones en el recorrido."],
   ["RESULTADO","Decisión","Clasificamos cumple, revisar o pendiente y documentamos mejoras."]
  ]}
 ];
 const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
 function graphic(m){
  const nodes=m.nodes.map((n,i)=>{
   const x=26+i*226, color=i===3?"#153f5b":"#fff", fg=i===3?"#fff":"#1c3446";
   return '<g class="ti10-motion-node'+(i===0?' active':'')+'" data-step="'+i+'">'
    +'<rect x="'+x+'" y="87" width="204" height="141" rx="17" fill="'+color+'" stroke="#8ca6b8" stroke-width="2"/>'
    +'<text x="'+(x+18)+'" y="120" font-size="16" font-weight="800" fill="'+fg+'">0'+(i+1)+'</text>'
    +'<text x="'+(x+18)+'" y="154" font-size="19" font-weight="800" fill="'+fg+'">'+esc(n[0])+'</text>'
    +'<text x="'+(x+18)+'" y="183" font-size="16" fill="'+fg+'">'+esc(n[1])+'</text>'
    +'<path d="M'+(x+18)+' 204 H'+(x+184)+'" stroke="'+(i===3?'#80b3cd':'#bbcbd5')+'" stroke-width="1"/>'
    +'</g>'
  }).join("");
  const links=[0,1,2].map(i=>'<path class="ti10-motion-path" d="M'+(230+i*226)+' 157 H'+(248+i*226)+'" fill="none" stroke="#3f708e" stroke-width="3" marker-end="url(#ti10arrow)"/>').join("");
  const graphic=m.label==="Representación CAD"
  ?'<g stroke="#245b7a" stroke-width="2.5" fill="none"><path d="M380 290l66 -32 66 32 -66 32z M380 290v35l66 32v-35 M446 322l66 -32v35l-66 32"/></g><text x="525" y="324" font-size="17" fill="#335568">X · Y · Z</text>'
  :m.label==="Control de versiones"
  ?'<path d="M370 298H552" stroke="#678ca6" stroke-width="2.8" marker-end="url(#ti10arrow)"/><text x="462" y="282" text-anchor="middle" font-size="18" fill="#335568">cambio rastreable</text>'
  :m.label==="Pruebas del proyecto"
  ?'<path d="M662 263Q655 356 438 343Q329 335 308 258" fill="none" stroke="#678ca6" stroke-width="2.8" stroke-dasharray="9 7" marker-end="url(#ti10arrow)"/><text x="500" y="366" text-anchor="middle" font-size="17" fill="#335568">si falla, revisar</text>'
  :'<text x="480" y="316" text-anchor="middle" font-size="19" font-weight="700" fill="#325b76">Problema → evidencia → mejora</text>';
  return '<svg xmlns="'+SVG_NS+'" role="img" aria-label="'+esc(m.title)+'" viewBox="0 0 960 390"><title>'+esc(m.title)+'</title><desc>Esquema progresivo de cuatro etapas. Use los botones anteriores y siguientes para recorrerlas.</desc><defs><marker id="ti10arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#3f708e"/></marker></defs><path d="M24 58H934" stroke="#d3e0e9"/>'+nodes+links+graphic+'</svg>';
 }
 function element(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e}
 function createCard(m){
  const card=element("section","ti10-motion-stage paused");
  card.dataset.motion=REDUCED.matches?"reduced":"normal";
  card.setAttribute("aria-label","Diagrama interactivo: "+m.title);
  const header=element("div","ti10-motion-header");
  const title=element("div");
  title.append(element("p","eyebrow","VISUALIZACIÓN POR ETAPAS"),element("h3","",m.title));
  header.append(title,element("span","ti10-motion-legend",m.label));
  const visual=element("div","ti10-motion-visual");visual.innerHTML=graphic(m);
  const read=element("div","ti10-motion-readout");
  const heading=element("strong","",m.nodes[0][0]+" · "+m.nodes[0][1]);
  const detail=element("p","",m.nodes[0][2]);read.setAttribute("aria-live","polite");read.setAttribute("aria-atomic","true");read.append(heading,detail);
  const controls=element("div","ti10-motion-controls");
  const prev=element("button","button button-light","← Anterior");
  const next=element("button","button button-dark","Siguiente →");
  const play=element("button","button button-light","Reproducir");
  const count=element("span","ti10-motion-count","01 / 04");
  for(const b of [prev,next,play])b.type="button";
  controls.append(prev,next,play,count);
  card.append(header,visual,read,controls);
  let index=0,timer=null;
  function paint(){
   heading.textContent=m.nodes[index][0]+" · "+m.nodes[index][1];
   detail.textContent=m.nodes[index][2];
   count.textContent=String(index+1).padStart(2,"0")+" / 04";
   prev.disabled=index===0;
   next.disabled=index===m.nodes.length-1;
   card.querySelectorAll(".ti10-motion-node").forEach((node,i)=>node.classList.toggle("active",i===index));
  }
  function pause(){if(timer!==null){clearInterval(timer);timer=null}play.textContent="Reproducir";play.setAttribute("aria-pressed","false");card.classList.add("paused")}
  prev.addEventListener("click",()=>{pause();index=Math.max(0,index-1);paint()});
  next.addEventListener("click",()=>{pause();index=Math.min(m.nodes.length-1,index+1);paint()});
  play.addEventListener("click",()=>{
   if(timer!==null){pause();return}
   if(REDUCED.matches){index=(index+1)%m.nodes.length;paint();return}
   if(index===m.nodes.length-1)index=0;
   paint();card.classList.remove("paused");play.textContent="Pausar";play.setAttribute("aria-pressed","true");
   timer=setInterval(()=>{if(!card.isConnected||document.hidden){pause();return}index++;if(index>=m.nodes.length){index=m.nodes.length-1;paint();pause();return}paint()},2600);
  });
  card.addEventListener("keydown",ev=>{if(ev.target.tagName==="BUTTON")return;if(ev.key==="ArrowRight"){next.click()}if(ev.key==="ArrowLeft"){prev.click()}});
  paint();
  return {card,pause};
 }
 let current=null;
 function install(){
  if(current){current.pause();current=null}
  const panel=document.getElementById("ti10-foundations");
  const index=typeof active==="number"?active:-1;
  if(!panel||index<0||index>3||panel.hidden)return;
  const fig=panel.querySelector("figure.ti10-diagram");
  if(!fig)return;
  const gallery=element("div","ti10-diagram-gallery");
  const instance=createCard(DATA[index]);current=instance;
  fig.parentNode.insertBefore(gallery,fig);gallery.append(instance.card,fig);
 }
 if(typeof openTheory==="function"){
  const previous=openTheory;
  openTheory=function(i){previous(i);install()};
 }
 const mqEvent=()=>{if(current){current.pause();current.card.dataset.motion=REDUCED.matches?"reduced":"normal"}};
 if(typeof REDUCED.addEventListener==="function")REDUCED.addEventListener("change",mqEvent);
 document.addEventListener("visibilitychange",()=>{if(document.hidden&&current)current.pause()});
})();

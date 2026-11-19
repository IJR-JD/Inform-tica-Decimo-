/* TI10 verified institutional email login – Supabase Auth + RLS.
   Public publishable key only; no service-role key. No raw answers sent to server. */
"use strict";
window.TI10Auth=(()=>{
const URL_BASE="https://rlfxnjbqxbozjdzkbwlz.supabase.co";
const API_KEY="sb_publishable_rmVOQ3Orx49KpW_4uMqYew_c2HpcA87";
const EMAIL_PATTERN=/^[a-z0-9._%+\-]+@ijr\.edu\.co$/i;
const STORAGE_KEY="ti10.auth.session.v1";
let identity=null,accessToken=null,expiresAt=0;
const normalized=email=>String(email||"").trim().toLowerCase();
const validEmail=email=>EMAIL_PATTERN.test(normalized(email));
function clear(){identity=null;accessToken=null;expiresAt=0;try{sessionStorage.removeItem(STORAGE_KEY)}catch{}}
async function requestJson(path,options={}){
 const headers={"apikey":API_KEY,"Content-Type":"application/json",...(options.headers||{})};
 const response=await fetch(URL_BASE+path,{...options,headers,cache:"no-store",credentials:"omit"});
 let json={};try{json=await response.json()}catch{}
 if(!response.ok)throw Error(json.msg||json.error_description||json.message||"Error de comunicación con Supabase");
 return json;
}
async function confirmSession(token,ttl=3600){
 if(!token)throw Error("No se recibió una sesión válida.");
 const user=await requestJson("/auth/v1/user",{headers:{"Authorization":"Bearer "+token}});
 if(!validEmail(user.email)||(!user.email_confirmed_at&&!user.confirmed_at))throw Error("El acceso requiere un correo @ijr.edu.co confirmado.");
 const expiry=Date.now()+Math.max(60,Number(ttl)||3600)*1000;
 identity={id:user.id,email:normalized(user.email)};
 accessToken=token;expiresAt=expiry;
 try{sessionStorage.setItem(STORAGE_KEY,JSON.stringify({token,expiry}))}catch{}
 return identity;
}
async function restore(){
 const query=new URLSearchParams(location.hash.startsWith("#")?location.hash.slice(1):"");
 const incoming=query.get("access_token");
 if(incoming){
  // Scrub any token fragment before continuing; do not leave bearer token in browser history.
  history.replaceState({},document.title,location.pathname+location.search.replace(/[?&]module0=auth/g,"").replace(/^&/,"?"));
  try{return await confirmSession(incoming,query.get("expires_in")||3600)}catch(error){clear();throw error}
 }
 try{
  const saved=JSON.parse(sessionStorage.getItem(STORAGE_KEY)||"null");
  if(saved?.token&&saved.expiry>Date.now()+30000)return await confirmSession(saved.token,Math.floor((saved.expiry-Date.now())/1000));
 }catch{clear()}
 return null;
}
async function sendMagicLink(email){
 const normalizedEmail=normalized(email);
 if(!validEmail(normalizedEmail))throw Error("Utiliza tu correo institucional @ijr.edu.co.");
 const redirect=location.origin+location.pathname+"?module0=auth";
 // Supabase magic-link redirect must be authorized in Auth URL Configuration.
 await requestJson("/auth/v1/otp?redirect_to="+encodeURIComponent(redirect),{
  method:"POST",body:JSON.stringify({email:normalizedEmail,create_user:true})
 });
 return true;
}
async function verifyCode(email,token){
 const normalizedEmail=normalized(email);
 if(!validEmail(normalizedEmail)||!/^[0-9]{6,8}$/.test(String(token||"")))throw Error("Correo o código de verificación inválido.");
 const session=await requestJson("/auth/v1/verify",{method:"POST",body:JSON.stringify({email:normalizedEmail,token:String(token),type:"email"})});
 return confirmSession(session.access_token,session.expires_in);
}
function current(){
 if(!identity||!accessToken||expiresAt<=Date.now()+30000)return null;
 return {...identity};
}
async function saveProfile(report){
 const user=current();
 if(!user)throw Error("La sesión expiró. Verifica nuevamente tu correo.");
 const readiness=report.percentage<50?"A":report.percentage<75?"B":"C";
 const scores={};
 for(const d of report.domains)scores[d.id]={correct:d.correct,total:d.total,percentage:d.pct,unsure:d.uncertain};
 const payload={auth_user_id:user.id,institutional_email:user.email,assessment_key:"ti10_modulo0_v1",correct_count:report.correct,total_count:report.total,percentage:report.percentage,unsure_count:report.unsure,readiness,domain_scores:scores,completed_at:new Date().toISOString(),updated_at:new Date().toISOString()};
 await requestJson("/rest/v1/ti10_diagnostic_profiles_v1?on_conflict=auth_user_id",{
  method:"POST",headers:{Authorization:"Bearer "+accessToken,Prefer:"resolution=merge-duplicates,return=representation"},
  body:JSON.stringify(payload)
 });
 return true;
}
function signOut(){clear()}
return Object.freeze({restore,sendMagicLink,verifyCode,current,saveProfile,signOut,validEmail});
})();

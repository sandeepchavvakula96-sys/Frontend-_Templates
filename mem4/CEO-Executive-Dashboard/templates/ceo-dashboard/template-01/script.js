
(function(){
"use strict";
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
let live = true;

function toast(message){
  const el=$("#toast");
  if(!el) return;
  el.textContent=message;
  el.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>el.classList.remove("show"),2200);
}
function openPanel(id){
  const el=document.getElementById(id);
  if(el) el.classList.add("show");
}
function closePanel(id){
  const el=document.getElementById(id);
  if(el) el.classList.remove("show");
}

/* Reports — direct click handlers */
const reportsBtn=$("#reportsBtn");
if(reportsBtn) reportsBtn.onclick=function(e){
  e.preventDefault(); e.stopPropagation();
  openPanel("reportsPanel");
};

/* Settings — direct click handlers */
const settingsBtn=$("#settingsBtn");
if(settingsBtn) settingsBtn.onclick=function(e){
  e.preventDefault(); e.stopPropagation();
  openPanel("settingsPanel");
};

/* Close every overlay */
$$(".close-panel").forEach(btn=>{
  btn.onclick=function(e){
    e.preventDefault(); e.stopPropagation();
    closePanel(btn.dataset.close);
  };
});
$$(".overlay-panel").forEach(panel=>{
  panel.addEventListener("click",function(e){
    if(e.target===panel) panel.classList.remove("show");
  });
});

/* Report actions */
$$(".report-option").forEach(btn=>{
  btn.onclick=function(){
    const name=btn.dataset.report || "Executive Report";
    closePanel("reportsPanel");
    const modal=$("#modal");
    if(modal){
      const title=modal.querySelector("h2");
      const text=modal.querySelector("p");
      if(title) title.textContent=name;
      if(text) text.textContent="The "+name+" is ready with the latest executive dashboard information.";
      modal.classList.add("show");
    }
    toast(name+" opened");
  };
});
const generate=$("#generateReport");
if(generate) generate.onclick=function(){
  closePanel("reportsPanel");
  const modal=$("#modal");
  if(modal) modal.classList.add("show");
  toast("Executive report generated");
};

/* Settings */
const save=$("#saveSettings");
if(save) save.onclick=function(){
  live=$("#liveToggle") ? $("#liveToggle").checked : true;
  document.body.classList.toggle("no-motion", $("#motionToggle") ? !$("#motionToggle").checked : false);
  document.body.classList.toggle("compact", $("#compactToggle") ? $("#compactToggle").checked : false);
  if($("#alertToggle") && !$("#alertToggle").checked && $("#notifyBtn")) $("#notifyBtn i").style.display="none";
  closePanel("settingsPanel");
  toast("Settings saved successfully");
};

/* Existing controls */
const theme=$("#themeBtn");
if(theme) theme.onclick=function(){
  document.body.classList.toggle("light");
  toast(document.body.classList.contains("light")?"Light mode enabled":"Dark mode enabled");
};

const notify=$("#notifyBtn");
if(notify) notify.onclick=function(){openPanel("notificationsPanel");};

const profile=$("#profileBtn");
if(profile) profile.onclick=function(){openPanel("profilePanel");};

const copilot=$("#copilotBtn");
if(copilot) copilot.onclick=function(){$("#copilot")?.classList.add("open");};
$("#closeCopilot")?.addEventListener("click",()=>$("#copilot")?.classList.remove("open"));

function ask(){
  const input=$("#ask");
  const q=input ? input.value.trim().toLowerCase() : "";
  if(!q){toast("Type a question first");return;}
  let answer="Company health is 94/100 and performance is above expectations.";
  if(q.includes("revenue")) answer="Revenue is $48.2M, up 18.4% year over year.";
  else if(q.includes("profit")) answer="Net profit is $12.8M with a 26.6% margin.";
  else if(q.includes("risk")) answer="Overall risk exposure is 18%; operational risk is highest at 24%.";
  else if(q.includes("apac")) answer="APAC expansion is 82% complete and remains a major growth priority.";
  $("#copilotText").textContent=answer;
  input.value="";
}
$("#askBtn")?.addEventListener("click",ask);
$("#ask")?.addEventListener("keydown",e=>{if(e.key==="Enter")ask();});

/* Report modal */
$("#exportBtn")?.addEventListener("click",()=>$("#modal")?.classList.add("show"));
$("#modalClose")?.addEventListener("click",()=>$("#modal")?.classList.remove("show"));
$("#modalOk")?.addEventListener("click",()=>{$("#modal")?.classList.remove("show");toast("Report exported successfully");});
$("#modal")?.addEventListener("click",e=>{if(e.target===$("#modal")) $("#modal").classList.remove("show");});

/* Mobile navigation */
$("#openNav")?.addEventListener("click",()=>$(".sidebar")?.classList.add("open"));
$("#closeNav")?.addEventListener("click",()=>$(".sidebar")?.classList.remove("open"));
$$(".sidebar nav a").forEach(a=>a.addEventListener("click",()=>$(".sidebar")?.classList.remove("open")));

/* Other buttons */
$("#clearAlerts")?.addEventListener("click",()=>{
  $$(".alerts .alert").forEach(x=>x.remove());
  toast("All executive alerts cleared");
});
$("#addPriority")?.addEventListener("click",()=>{
  const name=window.prompt("Enter a strategic priority:","Launch enterprise AI");
  if(name) toast("Priority added: "+name);
});
$("#activityBtn")?.addEventListener("click",()=>toast("Full executive activity opened"));
$("#period")?.addEventListener("change",e=>toast("Chart changed to "+e.target.value));
$$("[data-toast]").forEach(b=>b.addEventListener("click",()=>toast(b.dataset.toast)));
$$(".quick-grid button").forEach(b=>b.addEventListener("click",()=>toast((b.querySelector("span")?.textContent||"Action")+" opened")));

/* Escape closes everything */
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    $$(".overlay-panel.show").forEach(x=>x.classList.remove("show"));
    $("#modal")?.classList.remove("show");
    $("#copilot")?.classList.remove("open");
  }
});

/* Cursor glow */
document.addEventListener("mousemove",e=>{
  const g=$(".cursor-glow");
  if(g){g.style.left=e.clientX+"px";g.style.top=e.clientY+"px";}
});

/* Simulated live clock/data */
setInterval(()=>{
  if(!live) return;
  const crumb=$(".crumb");
  if(crumb) crumb.title=new Date().toLocaleTimeString();
},1000);
})();

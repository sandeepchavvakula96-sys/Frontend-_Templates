const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const toastEl=$("#toast"); let toastTimer, timerSeconds=2520, timerRunning=false, timerHandle;

function toast(msg){toastEl.textContent=msg;toastEl.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove("show"),2200)}
function show(id){$("#"+id)?.classList.add("show")}
function hide(id){$("#"+id)?.classList.remove("show")}

const events={
"2026-10-05":[["Product standup","pill-blue"],["Design review","pill-purple"]],
"2026-10-06":[["Client strategy","pill-green"]],
"2026-10-08":[["AI roadmap","pill-purple"],["Deep work","pill-blue"]],
"2026-10-09":[["Northstar demo","pill-green"]],
"2026-10-12":[["Board prep","pill-purple"]],
"2026-10-15":[["Team retro","pill-blue"]],
"2026-10-20":[["Launch planning","pill-green"]],
"2026-10-23":[["Finance review","pill-purple"]],
"2026-10-28":[["Product demo","pill-blue"]]
};
let current=new Date(2026,9,5);

function renderCalendar(){
 const grid=$("#calendarGrid"), y=current.getFullYear(), m=current.getMonth();
 $("#monthTitle").textContent=current.toLocaleString("en-US",{month:"long",year:"numeric"});
 grid.innerHTML="";
 ["MON","TUE","WED","THU","FRI","SAT","SUN"].forEach(d=>{let h=document.createElement("div");h.className="day-head";h.textContent=d;grid.appendChild(h)});
 let first=new Date(y,m,1); let start=(first.getDay()+6)%7;
 let days=new Date(y,m+1,0).getDate(), prev=new Date(y,m,0).getDate();
 for(let i=0;i<42;i++){
   let n=i-start+1, date, muted=false;
   if(n<1){date=new Date(y,m-1,prev+n);muted=true}
   else if(n>days){date=new Date(y,m+1,n-days);muted=true}
   else date=new Date(y,m,n);
   let key=date.toISOString().slice(0,10), d=document.createElement("div");
   d.className="day"+(muted?" muted":"");
   if(key==="2026-10-05") d.classList.add("today");
   d.innerHTML='<span class="day-number">'+date.getDate()+'</span>';
   (events[key]||[]).forEach(ev=>{let p=document.createElement("span");p.className="event-pill "+ev[1];p.textContent=ev[0];d.appendChild(p)});
   d.onclick=()=>{ $("#eventDate").value=key; show("eventModal") };
   grid.appendChild(d);
 }
}
renderCalendar();

$("#prevMonth").onclick=()=>{current.setMonth(current.getMonth()-1);renderCalendar()};
$("#nextMonth").onclick=()=>{current.setMonth(current.getMonth()+1);renderCalendar()};
$("#todayBtn").onclick=()=>{current=new Date(2026,9,5);renderCalendar();toast("Returned to today")};

$("#createBtn").onclick=()=>show("eventModal");
$("#quickEvent").onclick=()=>show("eventModal");
$$("[data-close]").forEach(b=>b.onclick=()=>hide(b.dataset.close));

$("#saveEvent").onclick=()=>{
 const title=$("#eventTitle").value.trim()||"Untitled event";
 const date=$("#eventDate").value||"2026-10-05";
 if(!events[date])events[date]=[];
 events[date].push([title,"pill-blue"]);
 hide("eventModal");renderCalendar();toast("Event created: "+title);
};

$$(".view").forEach(b=>b.onclick=()=>{
 $$(".view").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 toast(b.dataset.view.charAt(0).toUpperCase()+b.dataset.view.slice(1)+" view selected");
});

$("#scheduleBest").onclick=()=>{
 $("#eventTitle").value="Smart scheduled meeting";
 $("#eventDate").value="2026-10-06";$("#eventTime").value="14:00";
 show("eventModal");toast("Best time selected: tomorrow at 2:00 PM");
};

$("#aiSide").onclick=()=>show("aiModal");
$("#aiAsk").onclick=()=>{
 const q=$("#aiInput").value.toLowerCase();
 let ans="I found tomorrow at 2:00 PM as the best 45-minute slot. Everyone is available.";
 if(q.includes("busy"))ans="Your busiest day is Thursday. You have 6 meetings and only 45 minutes of open time.";
 if(q.includes("today"))ans="Today has 6 meetings, with a protected 90-minute focus block at 3:30 PM.";
 $("#aiAnswer").textContent=ans;$("#aiInput").value="";
};
$("#aiInput").onkeydown=e=>{if(e.key==="Enter")$("#aiAsk").click()};

$("#settingsBtn").onclick=()=>show("settingsModal");
$("#saveSettings").onclick=()=>{hide("settingsModal");toast("Calendar settings saved")};
$("#notifyBtn").onclick=()=>show("notifyModal");
$("#markRead").onclick=()=>{hide("notifyModal");$("#notifyBtn i").style.display="none";toast("Notifications marked as read")};
$("#profileBtn").onclick=()=>show("profileModal");
$$(".panel-btn").forEach(b=>b.onclick=()=>toast(b.textContent.trim()+" selected"));

$("#agendaMore").onclick=()=>toast("Agenda options opened");
$("#fullAgenda").onclick=()=>toast("Full agenda opened");
$("#teamMore").onclick=()=>toast("Team availability options opened");

$("#themeBtn").onclick=()=>{document.body.classList.toggle("light");toast(document.body.classList.contains("light")?"Light theme enabled":"Dark theme enabled")};

function updateTimer(){
 let m=Math.floor(timerSeconds/60),s=timerSeconds%60;
 $("#timer").textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
}
$("#focusBtn").onclick=()=>{
 if(timerRunning){clearInterval(timerHandle);timerRunning=false;$("#focusBtn").textContent="Resume focus";toast("Focus session paused")}
 else{
   timerRunning=true;$("#focusBtn").textContent="Pause focus";toast("Focus session started");
   timerHandle=setInterval(()=>{timerSeconds--;updateTimer();if(timerSeconds<=0){clearInterval(timerHandle);timerRunning=false;$("#focusBtn").textContent="Start focus";toast("Focus session complete")}},1000);
 }
};

$("#searchOpen").onclick=()=>showCommand();
function showCommand(){ $("#command").classList.add("show");$("#commandInput").focus() }
$("#closeCommand").onclick=()=>$("#command").classList.remove("show");
$("#command").onclick=e=>{if(e.target===$("#command"))$("#command").classList.remove("show")};
$$("[data-cmd]").forEach(b=>b.onclick=()=>{
 const cmd=b.dataset.cmd;$("#command").classList.remove("show");
 if(cmd==="Create event")show("eventModal");
 else if(cmd==="Ask Calendar AI")show("aiModal");
 else if(cmd==="Open settings")show("settingsModal");
 else toast(cmd+" opened");
});
document.addEventListener("keydown",e=>{
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();showCommand()}
 if(e.key==="Escape"){$$(".modal-overlay.show").forEach(x=>x.classList.remove("show"));$("#command").classList.remove("show")}
});
$("#openNav").onclick=()=>$("#sidebar").classList.add("open");
$("#closeNav").onclick=()=>$("#sidebar").classList.remove("open");
$$("nav a").forEach(a=>a.onclick=()=>$("#sidebar").classList.remove("open"));

setInterval(()=>{
 const now=new Date();
 const india=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",hour12:true}).format(now);
 $("#indiaTime").textContent=india;
},1000);

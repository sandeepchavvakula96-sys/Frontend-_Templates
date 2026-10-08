window.jobs = [
 {id:1,title:"Product Designer",company:"Nova Labs",location:"Bengaluru • Hybrid",salary:"₹12–18 LPA",type:"Full-time",skills:["Figma","UX","Design Systems"],logo:"NL",featured:true},
 {id:2,title:"Frontend Engineer",company:"PixelStack",location:"Hyderabad • Remote",salary:"₹10–16 LPA",type:"Full-time",skills:["JavaScript","React","CSS"],logo:"PS",featured:true},
 {id:3,title:"Data Analyst",company:"Finverse",location:"Chennai • On-site",salary:"₹7–11 LPA",type:"Full-time",skills:["SQL","Python","Power BI"],logo:"FV"},
 {id:4,title:"AI Product Intern",company:"MindForge AI",location:"Remote • India",salary:"₹35k–50k / month",type:"Internship",skills:["AI","Research","Prompting"],logo:"MA"},
 {id:5,title:"Backend Developer",company:"CloudNest",location:"Pune • Hybrid",salary:"₹14–22 LPA",type:"Full-time",skills:["Node.js","PostgreSQL","AWS"],logo:"CN"},
 {id:6,title:"Marketing Designer",company:"Orbit Commerce",location:"Mumbai • Hybrid",salary:"₹8–13 LPA",type:"Full-time",skills:["Brand","Motion","Adobe"],logo:"OC"},
 {id:7,title:"ML Engineer",company:"VectorMind",location:"Bengaluru • Remote",salary:"₹18–28 LPA",type:"Full-time",skills:["Python","ML","MLOps"],logo:"VM"},
 {id:8,title:"UX Researcher",company:"Careloop",location:"Delhi • Hybrid",salary:"₹9–15 LPA",type:"Full-time",skills:["Research","Figma","Interviews"],logo:"CL"}
];

function jobCard(job){
 return `<article class="card job-card reveal">
   <div class="job-top"><div class="company-logo">${job.logo}</div><button class="icon-btn save-btn" data-id="${job.id}" aria-label="Save job">♡</button></div>
   <h3>${job.title}</h3><div class="company">${job.company}</div>
   <div class="meta" style="margin-top:8px">⌖ ${job.location}</div>
   <div class="tags">${job.skills.map(s=>`<span class="pill">${s}</span>`).join("")}</div>
   <div class="job-bottom"><span class="salary">${job.salary}</span><a class="btn btn-soft" href="job-details.html?id=${job.id}">View job →</a></div>
 </article>`;
}

function renderJobs(target, list=jobs){
 const el=document.querySelector(target); if(!el)return;
 el.innerHTML=list.map(jobCard).join("");
 bindSaveButtons(); reveal();
}

function bindSaveButtons(){
 document.querySelectorAll(".save-btn").forEach(btn=>{
   const savedNow=JSON.parse(localStorage.getItem("savedJobs")||"[]");
   if(savedNow.includes(Number(btn.dataset.id)))btn.textContent="♥";
   btn.addEventListener("click",()=>{
   const id=btn.dataset.id; const saved=JSON.parse(localStorage.getItem("savedJobs")||"[]");
   const n=Number(id);
   if(saved.includes(n)){localStorage.setItem("savedJobs",JSON.stringify(saved.filter(x=>x!==n)));btn.textContent="♡";toast("Removed from saved jobs")}
   else{saved.push(n);localStorage.setItem("savedJobs",JSON.stringify(saved));btn.textContent="♥";toast("Job saved")}
 });
 });
}

function toast(message){
 let t=document.querySelector(".toast"); if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t)}
 t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200);
}

function reveal(){
 document.querySelectorAll(".reveal:not(.visible)").forEach((el,i)=>{
   const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.disconnect()}}));
   obs.observe(el);
 });
}

document.addEventListener("DOMContentLoaded",()=>{
 const theme=localStorage.getItem("theme")||"light";document.documentElement.dataset.theme=theme;
 document.querySelectorAll("[data-theme-toggle]").forEach(b=>b.addEventListener("click",()=>{
   const next=document.documentElement.dataset.theme==="dark"?"light":"dark";
   document.documentElement.dataset.theme=next;localStorage.setItem("theme",next);toast(`${next==="dark"?"Dark":"Light"} mode enabled`);
 }));
 document.querySelectorAll("[data-demo]").forEach(b=>b.addEventListener("click",()=>toast("Demo interaction completed ✨")));
 reveal();
});
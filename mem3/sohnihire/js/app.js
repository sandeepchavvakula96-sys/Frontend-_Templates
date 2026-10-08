function filterJobs(){
  const q=(document.querySelector("#jobQuery")?.value||"").trim().toLowerCase();
  const loc=(document.querySelector("#jobLocation")?.value||"").trim().toLowerCase();
  const type=document.querySelector("#jobType")?.value||"";
  const list=(window.jobs||[]).filter(j=>{
    const hay=`${j.title} ${j.company} ${j.skills.join(" ")} ${j.location}`.toLowerCase();
    return (!q||hay.includes(q))&&(!loc||j.location.toLowerCase().includes(loc))&&(!type||j.type===type);
  });
  renderJobs("#jobResults",list);
  const count=document.querySelector("#resultCount");
  if(count)count.textContent=`${list.length} ${list.length===1?"job":"jobs"} found`;
  if(!list.length){
    const box=document.querySelector("#jobResults");
    if(box)box.innerHTML=`<div class="empty" style="grid-column:1/-1"><div style="font-size:42px">⌕</div><h3>No matching jobs</h3><p>Try another role, skill, company, or location.</p><button class="btn btn-soft" onclick="document.querySelector('#jobQuery').value='';document.querySelector('#jobLocation').value='';document.querySelector('#jobType').value='';filterJobs()">Clear filters</button></div>`;
  }
}
function openModal(id){
  const el=document.querySelector("#"+id); if(el){el.classList.add("show");document.body.style.overflow="hidden";}
}
function closeModal(id){
  const el=document.querySelector("#"+id); if(el){el.classList.remove("show");document.body.style.overflow="";}
}
function applyToJob(title="this role"){
  let modal=document.querySelector("#applyModal");
  if(!modal){
    modal=document.createElement("div");modal.id="applyModal";modal.className="modal-backdrop";
    modal.innerHTML=`<div class="modal">
      <div class="modal-head"><div><span class="eyebrow">Quick apply</span><h2>Apply to <span id="applyRole"></span></h2></div><button class="modal-close" onclick="closeModal('applyModal')">✕</button></div>
      <div class="application-progress"><i class="application-step active"></i><i class="application-step"></i><i class="application-step"></i><i class="application-step"></i></div>
      <div class="form-grid">
        <div class="field"><label>Full name</label><input id="applyName" value="Sohni Koppula"></div>
        <div class="field"><label>Email</label><input id="applyEmail" value="sohni@example.com"></div>
        <div class="field full"><label>Why are you a good fit?</label><textarea id="applyNote" placeholder="Share a short introduction..."></textarea></div>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:18px"><button class="btn btn-soft" onclick="closeModal('applyModal')">Cancel</button><button class="btn btn-primary" id="submitApplication">Submit application</button></div>
    </div>`;
    document.body.appendChild(modal);
    modal.addEventListener("click",e=>{if(e.target===modal)closeModal("applyModal")});
    modal.querySelector("#submitApplication").addEventListener("click",()=>{
      const name=modal.querySelector("#applyName").value.trim();
      const email=modal.querySelector("#applyEmail").value.trim();
      if(!name||!email){toast("Please complete your name and email");return}
      const apps=JSON.parse(localStorage.getItem("applications")||"[]");
      apps.push({role:modal.dataset.role||title,company:"SohniHire demo",date:new Date().toISOString()});
      localStorage.setItem("applications",JSON.stringify(apps));
      closeModal("applyModal");toast("Application submitted successfully ✨");
    });
  }
  modal.dataset.role=title;modal.querySelector("#applyRole").textContent=title;openModal("applyModal");
}
function toggleMobileNav(){
  const links=document.querySelector(".nav-links"); if(!links)return;
  const open=links.classList.toggle("mobile-open");
  links.style.display=open?"flex":"";
  if(open){links.style.position="absolute";links.style.left="4%";links.style.right="4%";links.style.top="65px";links.style.flexDirection="column";links.style.padding="18px";links.style.background="var(--surface)";links.style.border="1px solid var(--border)";links.style.borderRadius="18px";links.style.boxShadow="var(--shadow)"}
}
function setupCommandPalette(){
  if(document.querySelector("#commandPalette"))return;
  const cp=document.createElement("div");cp.id="commandPalette";cp.className="command-palette";
  cp.innerHTML=`<div class="command-box"><input id="commandInput" placeholder="Jump to a page… (Ctrl/⌘ K)"><div id="commandItems">
    <a class="command-item" href="jobs.html"><span>🔎 Find Jobs</span><small>Jobs</small></a>
    <a class="command-item" href="dashboard.html"><span>📊 Dashboard</span><small>Workspace</small></a>
    <a class="command-item" href="ai-career-assistant.html"><span>✦ AI Career</span><small>Copilot</small></a>
    <a class="command-item" href="resume-builder.html"><span>📄 Resume Builder</span><small>Career</small></a>
    <a class="command-item" href="applications.html"><span>▣ Applications</span><small>Tracker</small></a>
  </div></div>`;
  document.body.appendChild(cp);
  cp.addEventListener("click",e=>{if(e.target===cp)cp.classList.remove("show")});
  document.addEventListener("keydown",e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();cp.classList.add("show");cp.querySelector("input").focus()}
    if(e.key==="Escape")cp.classList.remove("show");
  });
  cp.querySelector("#commandInput").addEventListener("input",e=>{
    const q=e.target.value.toLowerCase();
    cp.querySelectorAll(".command-item").forEach(i=>i.style.display=i.textContent.toLowerCase().includes(q)?"flex":"none");
  });
}
document.addEventListener("DOMContentLoaded",()=>{
  const theme=localStorage.getItem("theme")||"light";
  document.documentElement.dataset.theme=theme;
  document.querySelectorAll("[data-theme-toggle]").forEach(b=>b.addEventListener("click",()=>{
    const next=document.documentElement.dataset.theme==="dark"?"light":"dark";
    document.documentElement.dataset.theme=next;localStorage.setItem("theme",next);
    toast(`${next==="dark"?"Dark":"Light"} mode enabled`);
  }));
  document.querySelectorAll(".mobile-menu").forEach(b=>b.addEventListener("click",toggleMobileNav));
  document.querySelectorAll("[data-demo]").forEach(b=>b.addEventListener("click",()=>toast("Demo interaction completed ✨")));
  document.querySelectorAll("[data-apply]").forEach(b=>b.addEventListener("click",()=>applyToJob(b.dataset.apply)));
  ["jobQuery","jobLocation","jobType"].forEach(id=>document.querySelector("#"+id)?.addEventListener("input",filterJobs));
  document.querySelector("#searchBtn")?.addEventListener("click",filterJobs);
  const savedIds=JSON.parse(localStorage.getItem("savedJobs")||"[]");
  const savedCount=document.querySelector("#savedCount");if(savedCount)savedCount.textContent=savedIds.length;
  setupCommandPalette();
  reveal();
});
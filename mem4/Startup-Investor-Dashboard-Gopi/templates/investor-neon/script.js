const toast=document.getElementById("toast");
function show(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>toast.classList.remove("show"),2200)}
function openModal(id){document.getElementById(id).classList.add("open")}
document.querySelectorAll("[data-toast]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.toast)));
document.querySelectorAll("[data-modal]").forEach(b=>b.addEventListener("click",()=>openModal(b.dataset.modal)));
document.querySelectorAll(".close").forEach(b=>b.addEventListener("click",()=>b.closest(".modal").classList.remove("open")));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("open")}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".modal.open").forEach(m=>m.classList.remove("open"))});
document.querySelectorAll(".save").forEach(b=>b.addEventListener("click",()=>{show("Settings saved");b.closest(".modal").classList.remove("open")}));
document.getElementById("export").addEventListener("click",()=>{const blob=new Blob(["GOPI INVESTOR REPORT\nPortfolio: 24\nInvested: $42.8M\nCurrent Value: $81.4M\nMOIC: 1.9x"],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="Gopi-Investor-Report.txt";a.click();show("Report downloaded")});
document.getElementById("search").addEventListener("keydown",e=>{if(e.key==="Enter")show(e.target.value?"Searching: "+e.target.value:"Enter a search term")});

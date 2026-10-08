document.addEventListener("DOMContentLoaded",()=>{
 document.querySelectorAll("[data-application-status]").forEach(btn=>btn.addEventListener("click",()=>{
   const row=btn.closest("tr"); if(!row)return;
   const status=row.querySelector(".badge");
   const values=[["Applied","yellow"],["Screening","yellow"],["Interview","green"],["Offer","green"]];
   const idx=Math.floor(Math.random()*values.length);status.textContent=values[idx][0];status.className="badge "+values[idx][1];
   toast("Application status updated");
 }));
});
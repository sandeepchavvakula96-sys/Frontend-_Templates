function updateResume(){
 const map={resumeName:"previewName",resumeRole:"previewRole",resumeEmail:"previewEmail",resumePhone:"previewPhone",resumeSummary:"previewSummary",resumeExperience:"previewExperience",resumeSkills:"previewSkills"};
 Object.entries(map).forEach(([a,b])=>{const v=document.querySelector("#"+a)?.value;if(v!==undefined && document.querySelector("#"+b))document.querySelector("#"+b).textContent=v});
}
document.addEventListener("DOMContentLoaded",()=>{
 document.querySelectorAll(".resume-input").forEach(i=>i.addEventListener("input",updateResume));
 document.querySelector("#downloadResume")?.addEventListener("click",()=>{
  const printWindow=window.open("","_blank","width=900,height=900");
  if(!printWindow){toast("Allow pop-ups to export the resume");return}
  const preview=document.querySelector("#resumePreview").outerHTML;
  printWindow.document.write(`<html><head><title>Sohni Koppula Resume</title><style>body{font-family:Arial,sans-serif;padding:40px;color:#222} .resume-preview{max-width:760px;margin:auto} h2{font-size:13px;text-transform:uppercase;border-bottom:1px solid #ddd;padding-bottom:6px;margin-top:26px}</style></head><body>${preview}<script>window.onload=()=>window.print()<\/script></body></html>`);
  printWindow.document.close();
});
document.querySelector("#printResume")?.addEventListener("click",()=>window.print());
});
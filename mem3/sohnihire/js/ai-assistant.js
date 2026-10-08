const responses={
 resume:"Your resume is strong in execution. I recommend adding measurable outcomes to your experience bullets and moving your strongest skills into the top third.",
 interview:"For a Product Designer interview, prepare one 5-minute case study, one failure story, and a clear explanation of how you validate design decisions.",
 skills:"Based on the sample profile, the highest-value skills to add are AI-assisted research, analytics instrumentation, accessibility, and design-system architecture.",
 jobs:"I found three strong matches: Product Designer at Nova Labs, UX Researcher at Careloop, and AI Product Intern at MindForge AI."
};
function aiReply(text){
 const key=text.toLowerCase().includes("resume")?"resume":text.toLowerCase().includes("interview")?"interview":text.toLowerCase().includes("skill")?"skills":text.toLowerCase().includes("job")?"jobs":"resume";
 return responses[key];
}
document.addEventListener("DOMContentLoaded",()=>{
 const input=document.querySelector("#aiInput"),body=document.querySelector("#chatBody");
 const send=()=>{
   const text=input.value.trim();if(!text)return;
   body.insertAdjacentHTML("beforeend",`<div class="msg user">${text}</div>`);
   input.value="";
   setTimeout(()=>{body.insertAdjacentHTML("beforeend",`<div class="msg ai">${aiReply(text)}</div>`);body.scrollTop=body.scrollHeight},450);
 };
 document.querySelector("#aiSend")?.addEventListener("click",send);
 input?.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}});
 document.querySelectorAll("[data-prompt]").forEach(b=>b.addEventListener("click",()=>{input.value=b.dataset.prompt;document.querySelector("#aiSend").click()}));
});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href').slice(1);const target=document.getElementById(id);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}}));

const input=document.getElementById('selfieInput');
const statusEl=document.getElementById('demoStatus');
const results=document.getElementById('demoResults');
const makeTile=(img)=>{const tile=document.createElement('div');tile.className='result-tile';const c=document.createElement('canvas');const cw=300,ch=200;c.width=cw;c.height=ch;const cx=c.getContext('2d');const scale=Math.max(cw/img.width,ch/img.height);const dw=img.width*scale;const dh=img.height*scale;const dx=(cw-dw)/2;const dy=(ch-dh)/2;cx.drawImage(img,dx,dy,dw,dh);cx.globalAlpha=0.35;cx.fillStyle='#000';cx.fillRect(0,ch-28,cw,28);cx.globalAlpha=1;cx.fillStyle='#fff';cx.font='600 12px Inter, sans-serif';cx.fillText('facesfind.app',10,ch-12);tile.appendChild(c);const wm=document.createElement('div');wm.className='wm';wm.textContent='Marca d’água';tile.appendChild(wm);return tile};
const modeSel=document.getElementById('demoMode');
const sendBtn=document.getElementById('sendBtn');
const WEBHOOK_URL=(window.FACESFIND_WEBHOOK_URL||'').trim();

async function callWebhook(payload){if(!WEBHOOK_URL){throw new Error('Webhook não configurado');}const res=await fetch(WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!res.ok){throw new Error('Webhook retornou status '+res.status);}return await res.json().catch(()=>({}))}

function renderWebhookResponse(data){results.innerHTML='';const imgs=(data&&data.images)||data||[];const arr=Array.isArray(imgs)?imgs:[imgs];if(!arr.length){statusEl.textContent='Nenhum resultado';return}arr.forEach(item=>{let src=item&&item.base64?item.base64:(item&&item.link?item.link:null);if(src){const img=new Image();img.onload=()=>{results.appendChild(makeTile(img))};img.src=src.startsWith('data:')?src:src}else{if(item&&item.image_base64){const img=new Image();img.onload=()=>{results.appendChild(makeTile(img))};img.src=item.image_base64}}})}

async function processFile(file){statusEl.textContent='Processando…';const reader=new FileReader();reader.onload=async()=>{try{const dataUrl=reader.result;const mode=(modeSel&&modeSel.value)||'recognition';if(!WEBHOOK_URL){const img=new Image();img.onload=()=>{results.innerHTML='';results.appendChild(makeTile(img));statusEl.textContent='Pré-visualização local'};img.src=dataUrl;return}const payload={mode,image_base64:dataUrl};const json=await callWebhook(payload);renderWebhookResponse(json);statusEl.textContent='Resultado do webhook aplicado'}catch(err){statusEl.textContent='Erro: '+err.message}};reader.readAsDataURL(file)}

if(input){input.addEventListener('change',()=>{const f=input.files&&input.files[0];if(!f)return;processFile(f)})}
if(sendBtn){sendBtn.addEventListener('click',()=>{if(!input||!input.files||!input.files[0]){statusEl.textContent='Selecione uma selfie antes de enviar';return}processFile(input.files[0])})}

const heroInput=document.getElementById('selfieHero');
const heroStatus=document.getElementById('heroStatus');
const heroResults=document.getElementById('heroResults');
if(heroInput){heroInput.addEventListener('change',()=>{const f=heroInput.files&&heroInput.files[0];if(!f)return;heroStatus.textContent='Reconhecendo participante…';const reader=new FileReader();reader.onload=()=>{const img=new Image();img.onload=()=>{heroResults.innerHTML='';const tiles=6;for(let i=0;i<tiles;i++){heroResults.appendChild(makeTile(img))}heroStatus.textContent='Pronto: encontramos '+tiles+' fotos para este participante'};img.src=reader.result};reader.readAsDataURL(f)})}

const cookieBar=document.getElementById('cookiebar');
const cookieAccept=document.getElementById('cookieAccept');
try{const ok=localStorage.getItem('cookie-ok');if(!ok&&cookieBar){cookieBar.classList.add('show')}if(cookieAccept){cookieAccept.addEventListener('click',()=>{localStorage.setItem('cookie-ok','1');cookieBar.classList.remove('show')})}}
catch(e){}

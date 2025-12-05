document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href').slice(1);const target=document.getElementById(id);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}}));

const makeTile=(img)=>{const tile=document.createElement('div');tile.className='result-tile';const c=document.createElement('canvas');const cw=300,ch=200;c.width=cw;c.height=ch;const cx=c.getContext('2d');const scale=Math.max(cw/img.width,ch/img.height);const dw=img.width*scale;const dh=img.height*scale;const dx=(cw-dw)/2;const dy=(ch-dh)/2;cx.drawImage(img,dx,dy,dw,dh);cx.globalAlpha=0.35;cx.fillStyle='#000';cx.fillRect(0,ch-28,cw,28);cx.globalAlpha=1;cx.fillStyle='#fff';cx.font='600 12px Inter, sans-serif';cx.fillText('facesfind.app',10,ch-12);tile.appendChild(c);const wm=document.createElement('div');wm.className='wm';wm.textContent='Marca d’água';tile.appendChild(wm);return tile};

// hero upload removed

const cookieBar=document.getElementById('cookiebar');
const cookieAccept=document.getElementById('cookieAccept');
try{const ok=localStorage.getItem('cookie-ok');if(!ok&&cookieBar){cookieBar.classList.add('show')}if(cookieAccept){cookieAccept.addEventListener('click',()=>{localStorage.setItem('cookie-ok','1');cookieBar.classList.remove('show')})}}
catch(e){}

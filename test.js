
const NS = 'http://www.w3.org/2000/svg';
const isMobile = window.innerWidth < 768;

/* ── 20 FRASES ROMÁNTICAS ── */
const FRASES = [
    "Que lleves ese botecito de Nutella en tu cartera es mi recordatorio favorito de que siempre me tienes presente.",
  "Nuestra caminata a la esquina por la sábila es la mejor rutina que he programado en mi vida.",
  "Me confesaste que antes no te gustaba la melosería. Ser tu única excepción es mi mayor orgullo.",
  "Cuando llegué no quise mezclar el corazón en la cooperativa, pero alteraste todo mi sistema.",
  "Cuando me dejaste tu celular hoy en la tarde, me regalaste el nivel más alto de paz y confianza que existe.",
  "A veces mi cerebro de ingeniero hace cortocircuito con un mensaje, pero mi corazón nunca duda de lo que somos.",
  "Prefiero el riesgo de salir a escondidas a las 5 AM de tu casa, si el premio es amanecer durmiendo a tu lado.",
  "Ningún ramo comprado en la calle se compara con las flores que te programé en nuestro propio servidor.",
  "Te juro que protegeré tus Nutellas de cualquier compañero, igual que siempre protegeré lo nuestro.",
  "Para el resto de la oficina somos simples compañeros, pero en privado eres mi mundo entero.",
  "No me importa quién intente llamar tu atención, hoy me demostraste con hechos que tu lugar seguro soy yo.",
  "El mejor parche para arreglar cualquier 'bug' o malentendido, siempre será verte sonreír en el parque.",
  "Eres mi confidente, mi cómplice y definitivamente la mejor parte de mis días en Sumak Kawsay.",
  "Gracias por dejarme entrar a tu casa, a tu intimidad y por confiarme tus espacios más personales.",
  "La verdad es que me moría por escuchar tu voz anoche, y me muero de ganas de escucharla todos los días.",
  "No necesito que sea una fecha comercial para sorprenderte; mi código siempre trabajará para verte sonreír.",
  "Esa barrera que el mundo ve en ti, se derrite cuando estamos a solas. Amo ser el único que conoce ese lado tuyo.",
  "Eres la mujer más práctica, hermosa y estructurada que conozco. Exactamente lo que mi lógica necesitaba.",
  "Que me dejes cuidarte, a tu manera y a la mía, es el mejor regalo de este 21 de septiembre.",
  "Como me escribiste aquella vez: yo también amo cómo eres, amo todo de ti, y te amo."
];

/* ── ESTRELLAS DE FONDO ── */
!function(){
    const c = document.getElementById('stars'), count = isMobile ? 32 : 55;
    for(let i = 0; i < count; i++){
        const s = document.createElement('div');
        s.className = 'star';
        s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;--d:${2+Math.random()*4}s;animation-delay:${Math.random()*3}s;width:${1+Math.random()*2}px;height:${1+Math.random()*2}px`;
        c.appendChild(s);
    }
}();

/* ── LLUVIA INFINITA DE PÉTALOS ── */
const RC = document.getElementById('rain');
let rI = null, rN = 0;
const MAX = isMobile ? 55 : 90, INT = isMobile ? 280 : 180, BURST = isMobile ? 12 : 22;
const COL = ['#FFE082','#FFD740','#FFCA28','#FFC107','#FFB300','#FFF176','#FFEE58','#FFF9C4'];
const SH = [
    c => `<svg width="22" height="26" viewBox="0 0 22 26"><path d="M11 0C11 0 22 6.5 22 14.5C22 20.6 17.1 26 11 26C4.9 26 0 20.6 0 14.5C0 6.5 11 0 11 0Z" fill="${c}"/></svg>`,
    c => `<svg width="14" height="28" viewBox="0 0 14 28"><path d="M7 0C7 0 14 8 14 17C14 22.5 10.9 28 7 28C3.1 28 0 22.5 0 17C0 8 7 0 7 0Z" fill="${c}"/></svg>`,
    c => `<svg width="16" height="18" viewBox="0 0 16 18"><ellipse cx="8" cy="9" rx="8" ry="9" fill="${c}"/></svg>`,
    c => `<svg width="20" height="12" viewBox="0 0 20 12"><path d="M10 0C10 0 20 3 20 7.5C20 10 15.5 12 10 12C4.5 12 0 10 0 7.5C0 3 10 0 10 0Z" fill="${c}"/></svg>`
];

function spawnPetal(){
    if(rN >= MAX) return;
    const e = document.createElement('div');
    e.className = 'fp';
    const c = COL[Math.floor(Math.random() * COL.length)];
    e.innerHTML = SH[Math.floor(Math.random() * SH.length)](c);
    const dur = 6 + Math.random() * 8, dly = Math.random() * 0.4;
    e.style.cssText = `left:${Math.random()*100}%;--t:${dur}s;--w:${dly}s;--s:${.35+Math.random()*.65};--dx:${(Math.random()-.5)*130}px;--r:${(Math.random()-.5)*720}deg;--o:${.25+Math.random()*.5}`;
    RC.appendChild(e);
    rN++;
    requestAnimationFrame(() => e.classList.add('go'));
    setTimeout(() => { e.remove(); rN--; }, (dur + dly) * 1000);
}

function startRain(){
    for(let i = 0; i < BURST; i++) setTimeout(spawnPetal, i * 130);
    rI = setInterval(spawnPetal, INT);
}
startRain();

document.addEventListener('visibilitychange', () => {
    if(document.hidden && rI) { clearInterval(rI); rI = null; }
    else if(!document.hidden && !rI) { rI = setInterval(spawnPetal, INT); }
});

/* ── GENERACIÓN DEL GIRASOL EN SVG (VISTA 2) ── */
!function(){
    const svg = document.getElementById('v2Sunflower');
    if(!svg) return;

    function petalPath(l, w){
        return `M 0 0 C ${-w*0.8} ${-l*0.22} ${-w*1.05} ${-l*0.62} ${-w*0.48} ${-l*0.92} C ${-w*0.16} ${-l*1.03} ${w*0.16} ${-l*1.03} ${w*0.48} ${-l*0.92} C ${w*1.05} ${-l*0.62} ${w*0.8} ${-l*0.22} 0 0`;
    }

    // Capa exterior de pétalos (28 pétalos)
    const n1 = 28, l1 = 205, w1 = 25;
    const p1D = petalPath(l1, w1);
    for(let i = 0; i < n1; i++){
        const a = (360 / n1) * i;
        const g = document.createElementNS(NS, 'g');
        g.setAttribute('transform', `rotate(${a})`);
        const p = document.createElementNS(NS, 'path');
        p.setAttribute('d', p1D);
        p.setAttribute('fill', 'url(#g-ogr)');
        p.setAttribute('stroke', 'rgba(230,126,0,0.25)');
        p.setAttribute('stroke-width', '0.6');
        g.appendChild(p);
        svg.appendChild(g);
    }

    // Capa media de pétalos (28 pétalos desfasados)
    const n2 = 28, l2 = 180, w2 = 22;
    const p2D = petalPath(l2, w2);
    const offset2 = (360 / n2) / 2;
    for(let i = 0; i < n2; i++){
        const a = (360 / n2) * i + offset2;
        const g = document.createElementNS(NS, 'g');
        g.setAttribute('transform', `rotate(${a})`);
        const p = document.createElementNS(NS, 'path');
        p.setAttribute('d', p2D);
        p.setAttribute('fill', 'url(#g-mgr)');
        p.setAttribute('stroke', 'rgba(239,108,0,0.2)');
        p.setAttribute('stroke-width', '0.5');
        g.appendChild(p);
        svg.appendChild(g);
    }

    // Capa interna de pétalos (22 pétalos)
    const n3 = 22, l3 = 145, w3 = 19;
    const p3D = petalPath(l3, w3);
    const offset3 = (360 / n3) / 3;
    for(let i = 0; i < n3; i++){
        const a = (360 / n3) * i + offset3;
        const g = document.createElementNS(NS, 'g');
        g.setAttribute('transform', `rotate(${a})`);
        const p = document.createElementNS(NS, 'path');
        p.setAttribute('d', p3D);
        p.setAttribute('fill', 'url(#g-igr)');
        g.appendChild(p);
        svg.appendChild(g);
    }

    // Disco central
    const disc = document.createElementNS(NS, 'circle');
    disc.setAttribute('cx', '0');
    disc.setAttribute('cy', '0');
    disc.setAttribute('r', '78');
    disc.setAttribute('fill', 'url(#g-disc)');
    disc.setAttribute('stroke', 'rgba(255,160,0,0.25)');
    disc.setAttribute('stroke-width', '1');
    svg.appendChild(disc);

    // Semillas en espiral de Fibonacci (100 semillas)
    const seedCount = 100, goldenAngle = 137.507764 * Math.PI / 180;
    const maxR = 64;
    for(let i = 0; i < seedCount; i++){
        const theta = i * goldenAngle;
        const r = 2 + Math.sqrt(i) * (maxR / Math.sqrt(seedCount));
        if(r > maxR) continue;

        const x = (r * Math.cos(theta)).toFixed(2);
        const y = (r * Math.sin(theta)).toFixed(2);
        const dot = document.createElementNS(NS, 'circle');
        dot.setAttribute('cx', x);
        dot.setAttribute('cy', y);
        dot.setAttribute('r', (0.8 + Math.sqrt(i / seedCount) * 1.1).toFixed(2));
        dot.setAttribute('fill', r > 40 ? 'rgba(255,193,7,0.7)' : (r > 20 ? 'rgba(215,140,20,0.75)' : 'rgba(62,39,35,0.9)'));
        svg.appendChild(dot);
    }

    // Clonar para girasoles pequeños alrededor
    const smallContainer = document.getElementById('smallSunflowers');
    if(smallContainer) {
        const positions = [
            { l: '4%',  t: '14%', s: 0.30, r: -16, d: 0.25 },
            { l: '18%', t: '22%', s: 0.38, r: 15,  d: 0.35 },
            { l: '32%', t: '6%',  s: 0.26, r: -10, d: 0.50 },
            { l: '68%', t: '7%',  s: 0.27, r: 12,  d: 0.45 },
            { l: '82%', t: '22%', s: 0.36, r: -18, d: 0.40 },
            { l: '96%', t: '12%', s: 0.29, r: 20,  d: 0.30 },
            { l: '2%',  t: '38%', s: 0.27, r: 8,   d: 0.60 },
            { l: '12%', t: '48%', s: 0.34, r: -12, d: 0.50 },
            { l: '88%', t: '50%', s: 0.35, r: 15,  d: 0.55 },
            { l: '98%', t: '36%', s: 0.25, r: -15, d: 0.65 },
            { l: '8%',  t: '72%', s: 0.40, r: 22,  d: 0.40 },
            { l: '0%',  t: '86%', s: 0.30, r: -8,  d: 0.70 },
            { l: '92%', t: '74%', s: 0.38, r: -18, d: 0.60 },
            { l: '100%',t: '88%', s: 0.31, r: 16,  d: 0.75 }
        ];
        positions.forEach(pos => {
            const wrap = document.createElement('div');
            wrap.className = 'small-sf-wrap';
            wrap.style.left = pos.l;
            wrap.style.top = pos.t;
            wrap.style.setProperty('--scale', pos.s);
            wrap.style.setProperty('--rot', pos.r + 'deg');
            wrap.style.animationDelay = pos.d + 's, ' + (pos.d + 1.2) + 's';

            // Clone flower
            const clone = svg.cloneNode(true);
            clone.removeAttribute('id');
            clone.setAttribute('class', 'small-sf-flower');
            
            // Stem (más largo, 320px de altura, con hojas orgánicas)
            const stem = document.createElementNS(NS, 'svg');
            stem.setAttribute('class', 'small-sf-stem');
            stem.setAttribute('viewBox', '0 0 50 320');
            stem.innerHTML = `
                <path d="M25,0 C18,100 32,210 25,320" stroke="url(#g-stem)" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-dasharray="350" stroke-dashoffset="350" style="animation:stemDraw 1.1s ${pos.d + 0.1}s ease-out forwards" />
                <path d="M25,65 C14,55 6,67 4,80 C14,85 22,79 25,71 Z" fill="url(#g-leaf)" class="v2-leaf" style="animation-delay:${pos.d + 0.35}s"/>
                <path d="M25,145 C36,135 44,147 46,160 C36,165 28,159 25,151 Z" fill="url(#g-leaf)" class="v2-leaf" style="animation-delay:${pos.d + 0.55}s"/>
                <path d="M25,225 C14,215 6,227 4,240 C14,245 22,239 25,231 Z" fill="url(#g-leaf)" class="v2-leaf" style="animation-delay:${pos.d + 0.75}s"/>
                <path d="M25,285 C36,275 44,287 46,300 C36,305 28,299 25,291 Z" fill="url(#g-leaf)" class="v2-leaf" style="animation-delay:${pos.d + 0.9}s"/>
            `;

            wrap.appendChild(stem);
            wrap.appendChild(clone);
            smallContainer.appendChild(wrap);
        });
    }
}();

/* ── LÓGICA DE TRANSICIÓN Y CICLO DE FRASES ── */
const view1 = document.getElementById('view1');
const view2 = document.getElementById('view2');
const btnDiscover = document.getElementById('btnDiscover');
const btnCycle = document.getElementById('btnCycle');
const btnBack = document.getElementById('btnBack');
const quoteText = document.getElementById('quoteText');

let lastPhraseIndex = -1;

function getRandomPhrase(){
    let idx;
    do {
        idx = Math.floor(Math.random() * FRASES.length);
    } while (idx === lastPhraseIndex && FRASES.length > 1);
    lastPhraseIndex = idx;
    return FRASES[idx];
}

function displayNewPhrase(){
    quoteText.classList.remove('fade-in-up');
    quoteText.classList.add('fade-out');

    setTimeout(() => {
        quoteText.textContent = getRandomPhrase();
        quoteText.classList.remove('fade-out');
        quoteText.classList.add('fade-in-up');
    }, 240);
}

// Transición Vista 1 -> Vista 2
btnDiscover.addEventListener('click', () => {
    view1.classList.add('hide');

    setTimeout(() => {
        view1.style.display = 'none';
        view2.style.display = 'flex';
        // Seleccionar frase inicial
        quoteText.textContent = getRandomPhrase();
        quoteText.classList.add('fade-in-up');

        requestAnimationFrame(() => {
            view2.classList.add('show');
        });
    }, 550);
});

// Toast Alert Logic
let phrasesRead = 0;
const toast = document.getElementById('toast');
let toastTimer;
function showToast() {
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// Ciclo de frases al tocar "Leer otra"
btnCycle.addEventListener('click', () => {
    btnCycle.style.pointerEvents = 'none';
    phrasesRead++;
    if(phrasesRead % 10 === 0) {
        showToast();
    }
    displayNewPhrase();
    setTimeout(() => {
        btnCycle.style.pointerEvents = 'auto';
    }, 450);
});

// Volver a Vista 1
btnBack.addEventListener('click', () => {
    view2.classList.remove('show');
    setTimeout(() => {
        view2.style.display = 'none';
        view1.style.display = 'flex';
        requestAnimationFrame(() => {
            view1.classList.remove('hide');
        });
    }, 550);
});

// 자체 제작 벡터: 바다·파도 모티브. 공식 로고·실제 행사 사진·배치도가 아니다.
const mark = '<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#E7F1F2"/><path d="M8 22c5-12 11-12 16-5 3 4 7 4 10 0-1 9-8 13-15 11-5-2-8-2-11-1Z" fill="#075B70"/><circle cx="12" cy="12" r="4" fill="#E7AE42"/></svg>';
export const logo = () => `${mark}<span class="brand"><strong>보령머드축제</strong><small>BORYEONG MUD FESTIVAL <em>DEMO</em></small></span>`;

export function scene(kind, id) {
  const night = kind === 'night';
  const sky = night ? '#172A46' : '#D7EFF0', sea = night ? '#284F69' : '#58AFBA';
  return `<svg class="coast-scene" viewBox="0 0 800 480" preserveAspectRatio="xMaxYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <defs><linearGradient id="sea-${id}" x2="0" y2="1"><stop stop-color="${sea}"/><stop offset="1" stop-color="${night?'#10283D':'#08798C'}"/></linearGradient></defs>
    <path fill="${sky}" d="M0 0h800v480H0z"/>
    <circle cx="650" cy="97" r="${night?36:49}" fill="${night?'#F6DDA0':'#F4BE7A'}"/>
    ${night?'<g fill="#E8E8D8"><circle cx="540" cy="34" r="2"/><circle cx="720" cy="47" r="3"/><circle cx="433" cy="104" r="2"/><circle cx="600" cy="18" r="2"/><circle cx="774" cy="116" r="2"/></g>':'<path d="M468 81h55m-24 12h36m166 56h63" stroke="#F5FCFC" stroke-width="5" stroke-linecap="round"/>'}
    <path d="M0 192c135-26 235 26 375 0s271-15 425 8v280H0Z" fill="url(#sea-${id})"/>
    <path d="M395 241c99-30 206-1 328 14M465 274c91-24 142 8 212 2M54 237c74-13 123-10 173 0M592 326l86 5" stroke="${night?'#94C0C6':'#CAF1E9'}" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round"/>
    <path d="M800 282c-144 12-124 117-274 111-119-4-201 13-284 87H800Z" fill="${night?'#8B827B':'#E9D6B4'}"/>
    <path d="M800 271c-147 17-119 116-277 113-105-4-184 9-276 78" stroke="${night?'#A1C5C4':'#ECFFF7'}" stroke-width="11" fill="none" opacity=".8"/>
    ${night?'<path d="M548 374v-63l12-44 12 44v63M725 328v-63l12-44 12 44v63" stroke="#E9C887" stroke-width="3" fill="none"/><circle cx="560" cy="290" r="12" fill="#F4CF8D"/><circle cx="737" cy="244" r="12" fill="#F4CF8D"/>':'<g transform="translate(648 361)"><ellipse cy="61" rx="59" ry="9" fill="#C6AD8E" opacity=".5"/><path d="M0 0v60" stroke="#816852" stroke-width="5"/><path d="M-58 0C-46-51 44-56 58 0Z" fill="#D85E42"/><path d="M-19 0C-18-49 17-48 19 0Z" fill="#FFF0CD"/><path d="M-53 71h32M21 71h32" stroke="#816852" stroke-width="4" stroke-linecap="round"/><path d="M-44 53l-13 18M44 53l13 18" stroke="#816852" stroke-width="4"/></g><g transform="translate(529 311) rotate(-12)"><ellipse rx="29" ry="12" fill="#FFDF8E"/><ellipse rx="13" ry="5" fill="#208B99"/></g>'}
    <path d="M0 370c75-34 154-14 239 9s170 42 253 25" stroke="${night?'#547E8D':'#93DDD4'}" stroke-width="2" fill="none" opacity=".6"/>
  </svg>`;
}

export function heroBanner(kind, f) {
  return `<div class="festival-hero">${scene('day','hero')}<div class="hero-copy"><p class="hero-eyebrow">THE 29TH · SUMMER ON THE BEACH</p><h1>보령<span>머드축제</span></h1><h2>${f.theme}</h2><div class="hero-meta"><strong>2026. 7. 24. — 8. 9.</strong><span>대천해수욕장 일원 · 종료 행사</span></div><span class="hero-link">축제 알아보기 <b>↗</b></span></div><small class="art-credit">바다 모티브 일러스트</small></div>`;
}

export const icon = k => {
  const [bg, c, g] = {
    program:['#F9E5DC','#B85435','<path d="M20 13v18M29 11v18M20 14l9-3M20 20l9-3"/><ellipse cx="16" cy="31" rx="4" ry="3"/><ellipse cx="25" cy="29" rx="4" ry="3"/>'],
    map:['#E1F0EB','#237A6E','<path d="m9 14 9-4 9 4 8-4v23l-8 4-9-4-9 4ZM18 10v23M27 14v23"/><circle cx="27" cy="16" r="4" fill="#237A6E" stroke="#FFF"/>'],
    bus:['#E3EDF8','#38689C','<rect x="10" y="11" width="24" height="22" rx="5"/><path d="M10 23h24M15 16h14M15 33v3M29 33v3"/><circle cx="15" cy="28" r="1"/><circle cx="29" cy="28" r="1"/>'],
    calendar:['#EDE8F8','#6D5894','<rect x="10" y="12" width="24" height="23" rx="4"/><path d="M10 20h24M16 8v8M28 8v8M16 26h3M25 26h3M16 31h3"/>'],
    saved:['#EDE8F8','#6D5894','<path d="M13 9h18v28l-9-6-9 6Z"/>'],
    family:['#F8EDD6','#917040','<circle cx="16" cy="15" r="5"/><circle cx="29" cy="19" r="4"/><path d="M7 35v-5c0-8 18-8 18 0v5M26 26c8-3 11 2 11 9"/>'],
    night:['#E4E9F2','#3C5476','<path d="M29 9a13 13 0 1 0 7 24A16 16 0 0 1 29 9Z"/><path d="m12 11 2-5 2 5 5 2-5 2-2 5-2-5-5-2Z" fill="#F5D282" stroke="#B89445"/>'],
    faq:['#E2EDF2','#38687C','<path d="M8 11h28v21H22l-8 6v-6H8Z"/><path d="M19 18c0-5 9-5 9 0 0 3-5 2-5 5M23 27h.1"/>'],
    parking:['#E5EDF1','#386378','<rect x="9" y="9" width="26" height="26" rx="7"/><path d="M19 29V15h6c7 0 7 9 0 9h-6"/>'],
    info:['#F7E8DD','#A26742','<circle cx="22" cy="22" r="14"/><path d="M22 20v10M22 14v1"/>'],
    lost:['#E8EEEB','#587667','<path d="M10 16h24v18H10ZM17 16v-5h10v5M10 23h24M20 21v5h4v-5"/>'],
    notice:['#F7E8DD','#A26742','<path d="m9 21 23-10v22L9 25ZM14 27l4 10h6l-5-12M35 15l4-3M36 23h5M35 31l4 3"/>'],
  }[k] || ['#E1F0EB','#237A6E','<circle cx="22" cy="22" r="13"/><path d="M22 20v10M22 14v1"/>'];
  return `<svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><rect width="44" height="44" rx="13" fill="${bg}"/><g fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${g}</g></svg>`;
};

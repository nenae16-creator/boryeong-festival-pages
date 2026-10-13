// 달앤코의 관심 공연·관람 안내 패턴을 공식 보령 데이터에 적용한다. 실제 위치·개인정보는 저장하지 않는다.
export const savedKey = 'boryeong-mud-29-2026:saved:v1';
export const entryKey = (p, day) => `${p.id}@${day}`;
export function readSaved(raw, programs) {
  if (!raw || raw.length > 100000) return [];
  try {
    const d = JSON.parse(raw);
    if (d?.version !== 1 || !Array.isArray(d.entries) || d.entries.length > 250 || !d.entries.every(x => typeof x === 'string' && x.length < 100)) return [];
    const valid = new Set(programs.flatMap(p => p.dates.map(day => entryKey(p, day))));
    return [...new Set(d.entries)].filter(id => valid.has(id));
  } catch { return []; }
}
export function filterPrograms(programs, day, category, query, saved, savedOnly) {
  const term = query.trim().toLocaleLowerCase('ko');
  return programs.filter(p => p.dates.includes(day) && (category === 'all' || p.cat === category)
    && (!savedOnly || saved.includes(entryKey(p, day)))
    && (!term || [p.title, p.venue, p.desc, p.note, ...p.performers].join(' ').toLocaleLowerCase('ko').includes(term)));
}
export const programTime = p => {
  const m = (p.time || '').match(/^(\d{1,2}):(\d{2})/);
  return m ? +m[1] * 60 + +m[2] : 1440;
};
export function planPrograms(programs, day, profile) {
  return programs.filter(p => p.dates.includes(day) && p.cat !== 'notice' && !p.time.includes('확인 필요')
    && (profile === 'family' ? p.title.includes('패밀리존') : profile === 'night' ? p.cat === 'show' && programTime(p) >= 18 * 60 && programTime(p) < 1440 : true))
    .sort((a,b) => programTime(a) - programTime(b) || a.title.localeCompare(b.title,'ko'));
}
export function savedCalendar(programs, entries, stamp) {
  const esc = s => String(s).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
  const events=[];
  for(const p of programs) for(const day of p.dates) {
    if(!entries.includes(entryKey(p,day))) continue;
    const time=p.time.match(/^(\d{2}:\d{2})(?:~(\d{2}:\d{2}))?$/);
    if(!time || p.cat==='notice') continue;
    const format=t=>day.replaceAll('-','')+'T'+t.replace(':','')+'00';
    const event=['BEGIN:VEVENT',`UID:${p.id}-${day}@boryeong-mud-demo.local`,`DTSTAMP:${stamp}`,`DTSTART;TZID=Asia/Seoul:${format(time[1])}`];
    if(time[2]) event.push(`DTEND;TZID=Asia/Seoul:${format(time[2])}`);
    event.push(`SUMMARY:${esc(p.title)}`,`LOCATION:${esc(p.venue)}`,`DESCRIPTION:${esc('2026 종료 행사 참고용. '+(p.note||'')+' / 출처: '+p.source)}`,`URL:${p.source}`,'END:VEVENT');
    events.push(...event);
  }
  const text=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Boryeong Mud Demo//KO','CALSCALE:GREGORIAN',
    'BEGIN:VTIMEZONE','TZID:Asia/Seoul','BEGIN:STANDARD','DTSTART:19700101T000000','TZOFFSETFROM:+0900','TZOFFSETTO:+0900','TZNAME:KST','END:STANDARD','END:VTIMEZONE',
    ...events,'END:VCALENDAR'].join('\r\n')+'\r\n';
  // RFC 5545: 줄은 UTF-8 75 octets 이하로 접고, continuation 첫 공백도 길이에 포함한다.
  const encoder=new TextEncoder();
  const folded=text.split('\r\n').map(line=>{let out='',part='';for(const c of line){if(encoder.encode(part+c).length>75){out+=part+'\r\n';part=' ';}part+=c;}return out+part;}).join('\r\n');
  return {text:folded,count:events.filter(x=>x==='BEGIN:VEVENT').length};
}

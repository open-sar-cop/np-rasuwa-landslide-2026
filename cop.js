const LANG_KEY='gyirong-lang';
let lang=localStorage.getItem(LANG_KEY)||((navigator.language||'zh').slice(0,2));
if(!(window.I18N&&I18N[lang])) lang='zh';
function loc(v){if(v==null)return '';if(typeof v==='string')return v;return v[lang]||v.en||v.zh||Object.values(v)[0]||'';}
const PT={port:{lng:85.377744,lat:28.279672,z:14.2,pitch:64,bear:22},lake:{lng:85.392,lat:28.293,z:14,pitch:62,bear:-8},town:{lng:85.325,lat:28.390,z:12.7,pitch:52,bear:165},source:{lng:85.488,lat:28.268,z:12.8,pitch:60,bear:-55},timure:{lng:85.356,lat:28.248,z:13.3,pitch:58,bear:8},wide:{lng:85.40,lat:28.31,z:11,pitch:50,bear:18}};
const demSource=new mlcontour.DemSource({url:'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',encoding:'terrarium',maxzoom:15,worker:true});
demSource.setupMaplibre(maplibregl);
const ops={type:'FeatureCollection',features:[
{type:'Feature',properties:{layer:'sector',id:'A',name:'A 绿区 吉隆镇CP',fill:'#1f7a4d'},geometry:{type:'Polygon',coordinates:[[[85.30,28.37],[85.35,28.37],[85.35,28.41],[85.30,28.41],[85.30,28.37]]]}},
{type:'Feature',properties:{layer:'sector',id:'B',name:'B 黄区',fill:'#8a6a18'},geometry:{type:'Polygon',coordinates:[[[85.34,28.30],[85.37,28.285],[85.385,28.30],[85.36,28.33],[85.34,28.30]]]}},
{type:'Feature',properties:{layer:'sector',id:'C',name:'C 红区 国门',fill:'#8a2020'},geometry:{type:'Polygon',coordinates:[[[85.368,28.272],[85.388,28.272],[85.390,28.286],[85.370,28.288],[85.368,28.272]]]}},
{type:'Feature',properties:{layer:'path',name:'Nepal Lhende -> Gyirong Port -> Timure'},geometry:{type:'LineString',coordinates:[[85.505,28.256],[85.488,28.268],[85.450,28.275],[85.410,28.278],[85.3777,28.2797],[85.356,28.248],[85.345,28.22]]}},
{type:'Feature',properties:{layer:'border',name:'CN-NP border'},geometry:{type:'LineString',coordinates:[[85.28,28.22],[85.36,28.268],[85.3777,28.2797],[85.43,28.31],[85.52,28.36]]}},
{type:'Feature',properties:{layer:'road',status:'open',name:'town road'},geometry:{type:'LineString',coordinates:[[85.318,28.392],[85.334,28.378]]}},
{type:'Feature',properties:{layer:'road',status:'limited',name:'G216 limited'},geometry:{type:'LineString',coordinates:[[85.334,28.378],[85.362,28.312]]}},
{type:'Feature',properties:{layer:'road',status:'cleared',name:'G216 800m'},geometry:{type:'LineString',coordinates:[[85.362,28.312],[85.372,28.292]]}},
{type:'Feature',properties:{layer:'road',status:'closed',name:'gate closed'},geometry:{type:'LineString',coordinates:[[85.372,28.292],[85.3777,28.2797]]}},
{type:'Feature',properties:{layer:'road',status:'closed',name:'bridge'},geometry:{type:'LineString',coordinates:[[85.3777,28.2797],[85.3770,28.2760]]}},
{type:'Feature',properties:{layer:'road',status:'closed',name:'Timure'},geometry:{type:'LineString',coordinates:[[85.3770,28.2760],[85.356,28.248],[85.348,28.230]]}},
{type:'Feature',properties:{layer:'heli'},geometry:{type:'LineString',coordinates:[[85.325,28.390],[85.36,28.31],[85.372,28.29]]}},
{type:'Feature',properties:{layer:'lake',name:'barrier lake',detail:'~2.5km upstream'},geometry:{type:'Polygon',coordinates:[[[85.386,28.289],[85.399,28.289],[85.401,28.299],[85.387,28.300],[85.386,28.289]]]}}
]};
const points={type:'FeatureCollection',features:[
{type:'Feature',properties:{kind:'force',name:'CP Gyirong town',detail:'fire 681'},geometry:{type:'Point',coordinates:[85.325,28.390]}},
{type:'Feature',properties:{kind:'force',name:'forward ~5km',detail:'team + UAV'},geometry:{type:'Point',coordinates:[85.360,28.318]}},
{type:'Feature',properties:{kind:'force',name:'gate',detail:'port police'},geometry:{type:'Point',coordinates:[85.376,28.283]}},
{type:'Feature',properties:{kind:'force',name:'lake team',detail:'survey'},geometry:{type:'Point',coordinates:[85.392,28.294]}},
{type:'Feature',properties:{kind:'rescue',name:'Resuo 2',detail:'rescued'},geometry:{type:'Point',coordinates:[85.374,28.282]}},
{type:'Feature',properties:{kind:'rescue',name:'Sale township',detail:'446-499'},geometry:{type:'Point',coordinates:[85.30,28.36]}},
{type:'Feature',properties:{kind:'rescue',name:'Timure airlift',detail:'100+'},geometry:{type:'Point',coordinates:[85.356,28.248]}},
{type:'Feature',properties:{kind:'obj',name:'Gyirong Port',detail:'red zone'},geometry:{type:'Point',coordinates:[85.377744,28.279672]}},
{type:'Feature',properties:{kind:'obj',name:'Source Nepal Lhende / Langtang',detail:'ice-rock avalanche, south of border'},geometry:{type:'Point',coordinates:[85.488,28.268]}}
]};
const map=new maplibregl.Map({container:'map',center:[PT.port.lng,PT.port.lat],zoom:13.05,pitch:58,bearing:16,maxPitch:80,style:{version:8,glyphs:'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',sources:{sat:{type:'raster',tiles:['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],tileSize:256,maxzoom:19},osm:{type:'raster',tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],tileSize:256,maxzoom:19},dem:{type:'raster-dem',tiles:[demSource.sharedDemProtocolUrl],encoding:'terrarium',tileSize:256,maxzoom:15},contours:{type:'vector',tiles:[demSource.contourProtocolUrl({multiplier:1,thresholds:{12:[100,500],13:[100,500],14:[50,200]},elevationKey:'ele',levelKey:'level',contourLayer:'contours'})],maxzoom:15},ops:{type:'geojson',data:ops},pts:{type:'geojson',data:points}},layers:[{id:'sat',type:'raster',source:'sat'},{id:'osm',type:'raster',source:'osm',layout:{visibility:'none'},paint:{'raster-opacity':0.55}},{id:'hs',type:'hillshade',source:'dem',paint:{'hillshade-exaggeration':0.48,'hillshade-shadow-color':'#00080c'}},{id:'sec',type:'fill',source:'ops',filter:['==',['get','layer'],'sector'],paint:{'fill-color':['get','fill'],'fill-opacity':0.18}},{id:'sec-ol',type:'line',source:'ops',filter:['==',['get','layer'],'sector'],paint:{'line-color':['get','fill'],'line-width':1.2}},{id:'lake',type:'fill',source:'ops',filter:['==',['get','layer'],'lake'],paint:{'fill-color':'#1a8aaa','fill-opacity':0.45}},{id:'lake-ol',type:'line',source:'ops',filter:['==',['get','layer'],'lake'],paint:{'line-color':'#7fe9ff','line-width':2}},{id:'path',type:'line',source:'ops',filter:['==',['get','layer'],'path'],paint:{'line-color':'#ff7a3d','line-width':3,'line-dasharray':[1.2,1]}},{id:'border',type:'line',source:'ops',filter:['==',['get','layer'],'border'],paint:{'line-color':'#e8eef5','line-width':2.4,'line-dasharray':[3,2]}},{id:'border-glow',type:'line',source:'ops',filter:['==',['get','layer'],'border'],paint:{'line-color':'#7aa0c8','line-width':6,'line-opacity':0.25}},{id:'rd-open',type:'line',source:'ops',filter:['all',['==',['get','layer'],'road'],['==',['get','status'],'open']],paint:{'line-color':'#3dbe7a','line-width':3.4}},{id:'rd-lim',type:'line',source:'ops',filter:['all',['==',['get','layer'],'road'],['any',['==',['get','status'],'limited'],['==',['get','status'],'cleared']]],paint:{'line-color':'#e0a14a','line-width':3.4}},{id:'rd-off',type:'line',source:'ops',filter:['all',['==',['get','layer'],'road'],['==',['get','status'],'closed']],paint:{'line-color':'#e25757','line-width':3.6}},{id:'heli',type:'line',source:'ops',filter:['==',['get','layer'],'heli'],paint:{'line-color':'#3ec2d6','line-width':2,'line-dasharray':[2,1]}},{id:'c-minor',type:'line',source:'contours','source-layer':'contours',filter:['==',['get','level'],0],paint:{'line-color':'rgba(255,230,160,.32)','line-width':0.5}},{id:'c-major',type:'line',source:'contours','source-layer':'contours',filter:['==',['get','level'],1],paint:{'line-color':'rgba(255,214,90,.88)','line-width':1.15}},{id:'pt-force',type:'circle',source:'pts',filter:['==',['get','kind'],'force'],paint:{'circle-radius':6,'circle-color':'#d7b15a','circle-stroke-width':1.5,'circle-stroke-color':'#111'}},{id:'pt-res',type:'circle',source:'pts',filter:['==',['get','kind'],'rescue'],paint:{'circle-radius':6,'circle-color':'#3dbe7a','circle-stroke-width':1.5,'circle-stroke-color':'#111'}},{id:'pt-obj',type:'circle',source:'pts',filter:['==',['get','kind'],'obj'],paint:{'circle-radius':7,'circle-color':'#e25757','circle-stroke-width':2,'circle-stroke-color':'#fff'}}],terrain:{source:'dem',exaggeration:1.3},sky:{'sky-color':'#101820','horizon-color':'#2a2218'}}});
map.addControl(new maplibregl.NavigationControl({visualizePitch:true}),'bottom-left');
map.addControl(new maplibregl.ScaleControl({unit:'metric'}),'bottom-left');
const logEl=document.getElementById('log');
function log(m){if(logEl) logEl.insertAdjacentHTML('afterbegin','<div>['+new Date().toTimeString().slice(0,8)+'] '+m+'</div>');}
function toast(m){const e=document.getElementById('toast'); if(!e) return; e.style.display='block'; e.textContent=m; setTimeout(()=>e.style.display='none',3400);}
map.on('click',e=>{const hit=map.queryRenderedFeatures(e.point,{layers:['rd-open','rd-lim','rd-off','lake','border','pt-force','pt-res','pt-obj','sec']}); if(!hit.length) return; const p=hit[0].properties; new maplibregl.Popup({maxWidth:'280px'}).setLngLat(e.lngLat).setHTML('<div class="popup"><h4>'+(p.name||p.id||'')+'</h4><p>'+(p.detail||p.status||'')+'</p></div>').addTo(map); log((p.name||p.id));});
const phaseMeta={recon:{name:'recon',auth:'no mass entry',tip:'UAV / lake check'},approach:{name:'forward',auth:'small team only',tip:'along cleared road'},search:{name:'SAR',auth:'red zone needs sign-off',tip:'abort if lake jumps'},withdraw:{name:'hold',auth:'clear red zone',tip:'pull back ~1km'}};
function setPhase(id){document.querySelectorAll('[data-ph]').forEach(b=>b.classList.toggle('on',b.dataset.ph===id)); const pack=(window.I18N&&I18N[lang])||{}; document.getElementById('phaseName').textContent=pack.reconMap||phaseMeta[id].name; document.getElementById('redAuth').textContent=pack.noMass||phaseMeta[id].auth; log(phaseMeta[id].name); toast(phaseMeta[id].name+': '+phaseMeta[id].tip);}
document.querySelectorAll('[data-ph]').forEach(b=>b.onclick=()=>setPhase(b.dataset.ph));
document.getElementById('btnBrief').onclick=()=>{log('brief'); map.flyTo({center:[PT.wide.lng,PT.wide.lat],zoom:PT.wide.z,pitch:50,bearing:18,duration:1400});};
document.getElementById('btnHold').onclick=()=>setPhase('recon');
document.getElementById('btnPush').onclick=()=>setPhase('approach');
document.getElementById('btnWithdraw').onclick=()=>setPhase('withdraw');
document.querySelectorAll('[data-fly]').forEach(b=>b.onclick=()=>{const p=PT[b.dataset.fly]; map.flyTo({center:[p.lng,p.lat],zoom:p.z,pitch:p.pitch,bearing:p.bear,duration:1400});});
const vis=(ids,on)=>ids.forEach(id=>{if(map.getLayer(id)) map.setLayoutProperty(id,'visibility',on?'visible':'none');});
document.getElementById('lSat').onchange=e=>vis(['sat'],e.target.checked);
document.getElementById('lOsm').onchange=e=>vis(['osm'],e.target.checked);
document.getElementById('lC').onchange=e=>vis(['c-minor','c-major'],e.target.checked);
document.getElementById('l3d').onchange=e=>{vis(['hs'],e.target.checked); map.setTerrain(e.target.checked?{source:'dem',exaggeration:1.3}:null);};
document.getElementById('lBd').onchange=e=>vis(['border','border-glow'],e.target.checked);
document.getElementById('lRd').onchange=e=>vis(['rd-open','rd-lim','rd-off'],e.target.checked);
document.getElementById('lSec').onchange=e=>vis(['sec','sec-ol'],e.target.checked);
document.getElementById('lUnit').onchange=e=>vis(['heli','pt-force'],e.target.checked);
document.getElementById('lRes').onchange=e=>vis(['pt-res'],e.target.checked);
document.getElementById('lLake').onchange=e=>vis(['lake','lake-ol'],e.target.checked);
document.getElementById('lPath').onchange=e=>vis(['path'],e.target.checked);
document.getElementById('tl').innerHTML=[['08-26 10:30','event'],['08-26 14:00','resp'],['08-27 08:00','kpi'],['08-27 16:00','3km'],['08-27 18:00','800m'],['08-28','lake']].map((n,i)=>'<div class="n '+(i<5?'done':'')+' '+(i===5?'now':'')+'">'+n[0]+'<br>'+n[1]+'</div>').join('');
setInterval(()=>{document.getElementById('clock').textContent=new Date().toISOString().slice(0,16).replace('T',' ')+' UTC';},1000);
log('COP loaded. Open-source plot, no live GNSS.');
(function(){
  const bar=document.getElementById('langBar');
  const langs=window.LANGS||[{id:'zh',label:'中文'},{id:'en',label:'EN'},{id:'ne',label:'NE'},{id:'hi',label:'HI'}];
  function applyChrome(){document.documentElement.lang=lang==='zh'?'zh-CN':lang;const pack=(window.I18N&&I18N[lang])||{};document.querySelectorAll('[data-i]').forEach(el=>{const k=el.getAttribute('data-i'); if(pack[k]) el.textContent=pack[k];});}
  if(bar){bar.innerHTML=langs.map(L=>'<button data-lang="'+L.id+'" class="'+(L.id===lang?'on':'')+'">'+L.label+'</button>').join(''); bar.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{lang=b.dataset.lang;window.lang=lang;localStorage.setItem(LANG_KEY,lang);bar.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));applyChrome();plotNews(); if(window.renderAll) window.renderAll();}); applyChrome();}
  const D=window.GYIRONG_DATA||{};
  window.newsMarks=[];
  window.plotNews=function(){(window.newsMarks||[]).forEach(m=>m.remove()); window.newsMarks=[]; (D.published||[]).concat((window.GYIRONG_DATA&&GYIRONG_DATA.published)||[]).forEach(p=>{if(p.lat==null||p.lng==null||p.geo==='unknown')return; const el=document.createElement('div'); el.style.cssText='width:9px;height:9px;border-radius:50%;background:#d7b15a;border:1px solid #111'; window.newsMarks.push(new maplibregl.Marker({element:el}).setLngLat([p.lng,p.lat]).setPopup(new maplibregl.Popup().setHTML('<div class="popup"><h4>'+loc(p.title)+'</h4><p>'+loc(p.body)+'</p></div>')).addTo(map));});};
  if(map.loaded()) plotNews(); else map.on('load', plotNews);
})();


// EDIT HERE: change category names, project titles, colors, and descriptions.
const categories=['POSTERS','LOGOS','ELEMENTS','CLOTHING','STICKERS','POCKETS'];
const palette=[['#e25046','#f5bf54'],['#f5bf54','#1e1e1e'],['#428fce','#fbf3b6'],['#33332d','#fbf3b6'],['#f9b7b7','#e25046'],['#f5bf54','#354c1c']];
const projectData={
POSTERS:[['WGMU General Body Meeting','01','Concert-style promotional poster for GMU’s student-led radio station.'],['WGMU Name That Song','02','Fun magician-themed event poster for WGMU’s music trivia night.'],['Sonny’s Silly Smarts','03','An example of the more themed flyers I’ve designed.'],['Graduation Stole Order Form','04','Lots and lots of clipping masks and paper textures.']],
LOGOS:[['cafe birthday party','CB','Cafe birthday party logo design.'],['longlong','LL','Longlong logo design.'],['WGMU fox','WF','WGMU fox logo design.']],
ELEMENTS:[['TYPE STUDY','Aa','Expressive lettering and type treatments.'],['LETTERFORMS','Bb','Custom lettering inspired by found signage.'],['PATTERN LAB','✳','Patterns, textures, and repeat elements.'],['VISUAL BITS','!?','Illustrations and graphic experiments.']],
CLOTHING:[['CLUB TEE','CT','A wearable identity, from graphics to mockups.'],['TOUR SHIRT','TS','A concert-inspired shirt with a bold back print.'],['PATCHWORK','PW','A playful wearable graphic.'],['CAPSULE 04','04','A limited-run apparel concept.']],
STICKERS:[['STAR POWER','✳','A die-cut star sticker.'],['LUCKY DAY','☺','A playful character sticker.'],['LOUD TYPE','HEY','A typographic sticker.'],['FLOWER CLUB','✿','A colorful illustrated sticker.'],['NICE TRY','!!','An experimental sticker design.'],['GOOD VIBES','♥','A small collectible graphic.']],
POCKETS:[['BOOK COVER 01','BK','Book cover design and real-world mockup placeholder.'],['BOOK COVER 02','02','Second book cover and mockup placeholder.'],['PIN COLLECTION','✳','Enamel pin concepts and product mockups.'],['MAGAZINE SPREAD','MG','Editorial magazine spread and page mockup.']]
};
// Extra information appears only inside the poster detail popups.
const posterDetails=[
  ['Canva','1080 × 1360 Instagram post','WGMU Graphic Design Director, 2025–2027','The collage style has been popular recently in social media design, with paper textures and drop shadows mimicking layered paper.'],
  ['Canva','1080 × 1360 Instagram post','WGMU Graphic Design Director, 2025–2027'],
  ['Canva','1080 × 1360 Instagram post','GMU VSA Graphic Design Chair, 2024–2026'],
  ['Adobe Illustrator & Canva','1080 × 1360 Instagram post','GMU VSA Graphic Design Chair, 2024–2026']
];
const posterImages=['poster-1-WGMU-GBM.png','poster-2-NTSSPRING.png','poster-3-SONNY-ANGEL.png','poster-4-grad-stole.png'];
let category='POSTERS',index=0,isInside=false,gridOpen=false,animating=false;
const $=id=>document.getElementById(id),card=$('idCard'),scene=$('idScene'),home=$('home'),workspace=$('workspace');
// Flip the real card edge-on, exchange SVG faces at the midpoint, then finish.
let flipTimer=null;
let flipEndTimer=null;
function setFlip(force){
 const next=force===undefined?!card.classList.contains('flipped'):Boolean(force);
 if(flipTimer!==null){clearTimeout(flipTimer);flipTimer=null;}
 if(flipEndTimer!==null){clearTimeout(flipEndTimer);flipEndTimer=null;}
 if(next===card.classList.contains('flipped'))return;
 card.classList.remove('is-flipping');
 void card.offsetWidth;
 card.classList.add('is-flipping');
 flipTimer=setTimeout(()=>{
  card.classList.toggle('flipped',next);
  card.setAttribute('aria-label',next?'Flip to portfolio front':'Flip to about card');
  $('flipHint').textContent=next?'CLICK TO RETURN TO FRONT ↻':'CLICK THE ID TO FLIP ↻';
  flipTimer=null;
 },190);
 flipEndTimer=setTimeout(()=>{card.classList.remove('is-flipping');flipEndTimer=null;},400);
}
card.addEventListener('click',e=>{if(!e.target.closest('[data-category], .about-links a'))setFlip()});card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('button')){e.preventDefault();setFlip()}});$('aboutNav').onclick=()=>{if(isInside)goHome(true);else setFlip(true)};$('homeNav').onclick=()=>goHome(false);
document.querySelectorAll('[data-category]').forEach(button => {
  button.addEventListener('click', event => { event.stopPropagation(); enterCategory(button.dataset.category); });
  button.addEventListener('pointerenter', () => card.dataset.categoryHover = button.dataset.category);
  button.addEventListener('pointerleave', () => { delete card.dataset.categoryHover; });
  button.addEventListener('focus', () => card.dataset.categoryHover = button.dataset.category);
  button.addEventListener('blur', () => { delete card.dataset.categoryHover; });
});
// Fast, composited transition: the actual ID fades into the wallet, without a giant placeholder clone.
// No layout-heavy width/height animation or blocking 900ms timeouts.
function enterCategory(next){
 if(animating)return;
 category=next;document.body.dataset.section=next.toLowerCase();index=0;bagOpened=false;setGalleryMode('stack');render();closeWallet();
 window.scrollTo({top:0,behavior:'instant'});
 if(isInside)return;
 animating=true;
 setFlip(false);
 scene.classList.add('id-departing');
 workspace.style.display='block';
 $('walletTrigger').style.display='flex';
 document.body.classList.remove('on-identity');
 $('brandLabel').textContent='tomobuds';
 isInside=true;
 requestAnimationFrame(()=>workspace.classList.add('visible'));
 setTimeout(()=>{home.style.display='none';scene.classList.remove('id-departing');animating=false},270);
}
function goHome(about){
 if(animating)return;
 closeWallet();setGalleryMode('stack');
 if(!isInside){setFlip(about);return}
 animating=true;
 window.scrollTo({top:0,behavior:'instant'});
 home.style.display='flex';
 scene.style.opacity='1';scene.style.transform='';
 setFlip(about);
 workspace.classList.remove('visible');
 $('walletTrigger').classList.add('wallet-departing');
 requestAnimationFrame(()=>home.classList.add('home-returning'));
 setTimeout(()=>{
  workspace.style.display='none';$('walletTrigger').style.display='flex';
  document.body.classList.add('on-identity');delete document.body.dataset.section;
  $('walletTrigger').classList.remove('wallet-departing');
  home.classList.remove('home-returning');
  $('brandLabel').textContent='tomobuds';
  $('currentLabel').textContent='IDENTITY CARD';
  isInside=false;animating=false;
 },220);
}
function render(){const projects=projectData[category];$('categoryTitle').textContent=category;$('categoryNumber').textContent=String(categories.indexOf(category)+1).padStart(2,'0');$('currentLabel').textContent=category+' / '+String(index+1).padStart(2,'0');$('projectCount').textContent=String(index+1).padStart(2,'0')+' / '+String(projects.length).padStart(2,'0');const p=projects[index];$('projectTitle').textContent=p[0];$('projectKind').textContent=category+' / '+String(index+1).padStart(3,'0');$('projectDescription').textContent=p[2];const stage=$('stackStage');stage.innerHTML='';for(let layer=3;layer>=0;layer--){let j=(index+layer)%projects.length,project=projects[j],colors=palette[(categories.indexOf(category)+j)%palette.length];let el=document.createElement('div');el.className='project-card'+(layer===0?' front':'');el.style.background=colors[0];el.style.color=colors[1];el.style.setProperty('--x',(layer*11)+'px');el.style.setProperty('--y',(-layer*11)+'px');el.style.setProperty('--r',(layer%2?layer*3:-layer*3)+'deg');el.style.setProperty('--s',1-layer*.045);el.classList.toggle('real-poster',category==='POSTERS');el.innerHTML=category==='POSTERS'?'<img class="poster-preview" src="assets/'+posterImages[j]+'" alt="'+project[0]+' poster">':'<div class="project-top"><span>'+category+'</span><span>0'+(j+1)+'</span></div><div class="big-type">'+project[1]+'</div><div class="project-foot"><span>'+project[0]+'</span><span>↗</span></div>';if(layer===0){el.tabIndex=0;el.setAttribute('role','button');el.setAttribute('aria-label','Open '+project[0]);el.onclick=openModal;el.onkeydown=e=>{if(e.key==='Enter')openModal()}}stage.appendChild(el)}renderGrid();renderLaundry();renderSpecial();$('workspace').classList.toggle('merch-active',category==='CLOTHING')}
function changeProject(delta){index=(index+delta+projectData[category].length)%projectData[category].length;render()}
$('prevBtn').onclick=()=>changeProject(-1);$('nextBtn').onclick=()=>changeProject(1);
function renderGrid(){const grid=$('gridView');grid.innerHTML='';(category==='LOGOS'?projectData.LOGOS.slice(0,3):projectData[category]).forEach((p,i)=>{const colors=palette[(categories.indexOf(category)+i)%palette.length];const b=document.createElement('button');b.className='grid-tile';b.innerHTML='<div class="grid-art" style="background:#fbf3b6;color:'+colors[1]+'">'+(category==='POSTERS'?'<img class="poster-grid-image" src="assets/'+posterImages[i]+'" alt="">':category==='LOGOS'?'<img class="logo-grid-image" src="assets/'+['cafe birthday.jpg','vsa logo guide.jpg','fox mascot.png'][i]+'" alt="">':p[1])+'</div><span>0'+(i+1)+' / '+p[0]+'</span>';b.onclick=()=>{index=i;render();openModal()};grid.appendChild(b)})}
function setGalleryMode(mode){
  gridOpen=mode==='grid';
  $('gridView').classList.toggle('show',gridOpen);
  $('gallery').classList.toggle('hidden',gridOpen);
  $('toggleGrid').textContent=gridOpen?'↶ RESTACK THE DECK':'VIEW ALL';
  $('toggleGrid').setAttribute('aria-label',gridOpen?'Return to stacked project view':'View all projects in a grid');
  $('workspace').classList.toggle('grid-active',gridOpen);
}
$('merchViewAll').onclick=()=>{setGalleryMode('grid');window.scrollTo({top:0,behavior:'smooth'})};
$('gridReturn').onclick=()=>{setGalleryMode('stack');$('workspace').scrollIntoView({behavior:'smooth',block:'start'})};
$('toggleGrid').onclick=()=>{setGalleryMode(gridOpen?'stack':'grid');if(!gridOpen)$('gallery').scrollIntoView({behavior:'smooth',block:'center'});};
function renderLaundry(){
  const line=$('clothesline');line.innerHTML='';
  projectData.CLOTHING.forEach((p,i)=>{
    const b=document.createElement('button');b.className='garment';
    b.style.setProperty('--shirt',['#f6e6c9','#272727','#f4a8b7','#6c88b5'][i]);
    b.style.setProperty('--print',['#e84c47','#f8d64a','#262626','#f8f2dd'][i]);
    b.style.setProperty('--swing',[-3,4,-2,3][i]+'deg');
    b.innerHTML='<span class="peg"></span><span class="tee"><span class="tee-print">'+p[1]+'</span></span><span class="garment-label">'+String(i+1).padStart(2,'0')+' / '+p[0]+' ↗</span>';
    b.setAttribute('aria-label','View '+p[0]);
    b.onclick=()=>{index=i;render();openModal()};line.appendChild(b);
  });
}

let bagOpened=false,shakeCount=0;
const stickerPositions=[[6,5,-19],[37,3,13],[72,12,21],[11,60,-11],[43,55,16],[77,62,-17]];
function placeStickers(animate=false){
 const nodes=[...$('stickerScatter').children];
 nodes.forEach((node,i)=>{
  const pos=stickerPositions[(i+shakeCount)%stickerPositions.length];
  node.style.setProperty('--left',pos[0]+'%');node.style.setProperty('--top',pos[1]+'%');node.style.setProperty('--rot',pos[2]+'deg');
  if(animate){node.classList.remove('shuffling');void node.offsetWidth;node.classList.add('shuffling');}
 });
}
function renderSpecial(){const active=['stickers','pockets','logos','elements'];active.forEach(x=>workspace.classList.toggle(x+'-active',category===x.toUpperCase()));
 const bag=$('bagWindow'),scatter=$('stickerScatter');
 // Preserve the same sticker elements while opening and shaking, so CSS can animate their movement.
 if(!bag.children.length){
  projectData.STICKERS.forEach((p,i)=>{const col=palette[i%palette.length];const mini=document.createElement('div');mini.className='mini-sticker';mini.style.cssText=`background:${col[0]};color:${col[1]};left:${[12,49,26,55,5,44][i]}%;top:${[5,8,33,45,61,65][i]}%;transform:rotate(${[-17,12,-5,20,-22,5][i]}deg);border-radius:${i%2?'50%':'24%'}`;mini.textContent=p[1];bag.appendChild(mini);
  const b=document.createElement('button');b.className='loose-sticker';b.style.background=col[0];b.style.color=col[1];b.style.setProperty('--shape',i%2?'50%':'22%');b.textContent=p[1];b.title=p[0];b.setAttribute('aria-label','Inspect '+p[0]);b.onclick=()=>{index=i;openModal()};scatter.appendChild(b);
  });
 }
 placeStickers();
 $('stickerBag').parentElement.classList.toggle('open',bagOpened);
 $('tearBag').textContent=bagOpened?'↶ RESEAL THE BAG':'✂ TEAR OPEN ↗';$('shakeBag').style.display=bagOpened?'inline-block':'none';
 const desk=$('pocketsDesk');desk.innerHTML='';projectData.POCKETS.forEach((p,i)=>{const b=document.createElement('button');b.className='desk-object '+(i===2?'pin':i===3?'magazine':'book');b.style.setProperty('--angle',[-10,7,11,-4][i]+'deg');b.style.setProperty('--left',[8,32,0,0][i]+'%');b.style.background=['#ed4c47','#4677c9','#ffdc45','#fff8e8'][i];b.style.color=i===2||i===3?'#20211e':'#fff8e8';b.innerHTML='<strong>'+p[1]+'</strong><small>'+p[0]+' ↗</small>';b.onclick=()=>{index=i;openModal()};desk.appendChild(b)});
 const charms=$('stampSheet');charms.innerHTML='';
 charms.classList.add('keychain-artboard');
 [2,3,4,1].forEach(i=>{
  const layer=document.createElement('img');
  layer.className='keychain-art-layer';layer.src='assets/keychain'+i+'.svg';
  layer.alt='';layer.setAttribute('aria-hidden','true');
  layer.dataset.charm=String(i);charms.appendChild(layer);
 });
 [2,3,4].forEach(i=>{
  const p=projectData.LOGOS[i-2];
  const b=document.createElement('button');b.type='button';
  b.className='keychain-hit keychain-hit-'+i;
  b.setAttribute('aria-label','Inspect '+p[0]);
  b.addEventListener('pointerenter',()=>charms.dataset.hoverCharm=String(i));
  b.addEventListener('pointerleave',()=>{delete charms.dataset.hoverCharm});
  b.addEventListener('focus',()=>charms.dataset.hoverCharm=String(i));
  b.addEventListener('blur',()=>{delete charms.dataset.hoverCharm});
  b.onclick=()=>{index=i-2;openModal()};charms.appendChild(b);
 });
 const specimens=$('specimenSheet');specimens.innerHTML='';projectData.ELEMENTS.forEach((p,i)=>{const b=document.createElement('button');b.className='specimen';b.style.background=palette[i][0];b.style.color=palette[i][1];b.innerHTML='<span>SPECIMEN / 00'+(i+1)+'</span><strong>'+p[1]+'</strong><span>'+p[0]+' ↗</span>';b.onclick=()=>{index=i;openModal()};specimens.appendChild(b)});
}
$('tearBag').onclick=()=>{bagOpened=!bagOpened;$('stickerBag').parentElement.classList.toggle('open',bagOpened);$('tearBag').textContent=bagOpened?'↶ RESEAL THE BAG':'✂ TEAR OPEN ↗';$('shakeBag').style.display=bagOpened?'inline-block':'none';};$('shakeBag').onclick=()=>{if(!bagOpened)return;shakeCount++;placeStickers(true);};
['sticker','pockets','logos','elements'].forEach(x=>$(x+'ViewAll').onclick=()=>{setGalleryMode('grid');window.scrollTo({top:0,behavior:'smooth'})});
function openModal(){const p=projectData[category][index],colors=palette[(categories.indexOf(category)+index)%palette.length];$('modalKind').textContent=category+' / PROJECT '+String(index+1).padStart(3,'0');$('modalTitle').textContent=p[0];$('modalArt').innerHTML=category==='POSTERS'?'<img class="poster-modal-image" src="assets/'+posterImages[index]+'" alt="'+p[0]+' poster">':category==='LOGOS'?'<img class="logo-modal-image" src="assets/'+['cafe birthday.jpg','vsa logo guide.jpg','fox mascot.png'][index]+'" alt="'+p[0]+' project artwork">':p[1];$('modalArt').style.background=colors[0];$('modalArt').style.color=colors[1];$('modalDescription').textContent=p[2];
 const details=$('modalDetails');
 details.replaceChildren();
 if(category==='POSTERS'){
   const labels=['Tools','Format','Role','Design notes'];
   posterDetails[index].forEach((value,i)=>{
     const row=document.createElement('p');row.className='modal-detail-row';
     const label=document.createElement('strong');label.textContent=labels[i]+': ';
     row.append(label,document.createTextNode(value));details.appendChild(row);
   });
 }
 $('projectModal').classList.add('open');document.body.style.overflow='hidden'}
function closeModal(){$('projectModal').classList.remove('open');document.body.style.overflow=''}$('closeModal').onclick=closeModal;$('projectModal').onclick=e=>{if(e.target===$('projectModal'))closeModal()};
function closeWallet(){$('walletPanel').classList.remove('open');$('walletPanel').setAttribute('aria-hidden','true');$('walletTrigger').setAttribute('aria-expanded','false')}
$('walletTrigger').onclick=()=>{const open=$('walletPanel').classList.toggle('open');$('walletPanel').setAttribute('aria-hidden',String(!open));$('walletTrigger').setAttribute('aria-expanded',String(open))};$('closeWallet').onclick=closeWallet;
// Each tab is an Illustrator SVG on the same 312 × 631 artboard.
const wallet=$('walletOptions');
const walletTabs=[
  ['POSTERS','posters_2.svg',84.61],
  ['LOGOS','logos_1.svg',160.17],
  ['ELEMENTS','elements_1.svg',236.54],
  ['CLOTHING','clothing_1.svg',312.90],
  ['STICKERS','stickers_1.svg',389.27],
  ['POCKETS','pockets_1.svg',465.63]
];
wallet.className='wallet-artboard';
wallet.innerHTML='<img class="wallet-menu-base" src="assets/wallet-menu.svg" alt="" aria-hidden="true">';
walletTabs.forEach(([name,file,y],layer)=>{
 const img=document.createElement('img');img.className='wallet-tab-art';img.dataset.walletArt=name;
 img.style.zIndex=String(layer+1);img.src='assets/'+file;img.alt='';img.setAttribute('aria-hidden','true');wallet.appendChild(img);
});
walletTabs.forEach(([name,file,y])=>{
 const b=document.createElement('button');b.type='button';b.className='wallet-tab-hit';
 b.setAttribute('aria-label','Open '+name.toLowerCase()+' projects');
 b.style.top=(y/631*100)+'%';b.style.left=(20.32/312*100)+'%';
 b.style.width=(271.36/312*100)+'%';b.style.height=(76/631*100)+'%';
 b.addEventListener('pointerenter',()=>wallet.dataset.activeTab=name);
 b.addEventListener('pointerleave',()=>{delete wallet.dataset.activeTab});
 b.addEventListener('focus',()=>wallet.dataset.activeTab=name);
 b.addEventListener('blur',()=>{delete wallet.dataset.activeTab});
 b.addEventListener('click',()=>enterCategory(name));wallet.appendChild(b);
});

document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeWallet()}else if(isInside&&!$('projectModal').classList.contains('open')&&!$('walletPanel').classList.contains('open')){if(e.key==='ArrowRight')changeProject(1);if(e.key==='ArrowLeft')changeProject(-1)}});render();

// Keep navbar artwork in sync with the active category.
(function(){
 const updateNavArt=()=>{
  const section=document.body.dataset.section;
  const prefix=(section==='logos'||section==='posters')?section+'-':'';
  [['aboutNav','about'],['homeNav','home']].forEach(([id,name])=>{
   const el=document.getElementById(id);if(!el)return;
   const normal=el.querySelector('.nav-normal'),hover=el.querySelector('.nav-hover');
   const base='assets/'+prefix+'nav-'+name;
   if(normal && normal.getAttribute('src')!==base+'.svg')normal.setAttribute('src',base+'.svg');
   if(hover && hover.getAttribute('src')!==base+'-hover.svg')hover.setAttribute('src',base+'-hover.svg');
  });
 };
 new MutationObserver(updateNavArt).observe(document.body,{attributes:true,attributeFilter:['data-section']});
 updateNavArt();
})();

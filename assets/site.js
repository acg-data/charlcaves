const palettes = {
  'The Club': { key:'club', image:'walnut-detail', alt:'Walnut joinery, honed stone and an aged brass footrail concept', description:'Walnut joinery, cognac leather and aged brass, with honed stone at the bar.', materials:['Walnut','Cognac leather','Aged brass'] },
  'The Library': { key:'library', image:'cabinet-detail', alt:'Walnut record storage with inset brass hardware, an illustrative material study', description:'Walnut shelving and fitted storage, tobacco leather and soft brass tones for a study or listening room.', materials:['Walnut','Tobacco leather','Soft brass'] },
  'The Screening Room': { key:'screening', image:'leather-detail', alt:'Espresso leather seating beside wool acoustic panels, an illustrative material study', description:'Espresso leather, charcoal acoustic fabric and dark timber. Soft surfaces and restrained light around the screen.', materials:['Dark timber','Espresso leather','Dark metal'] }
};
const form = document.querySelector('#inquiry-form');
const status = document.querySelector('#form-status');
const params = new URLSearchParams(location.search);
const remember = value => { try { sessionStorage.setItem('caves-finish',value); } catch {} };
const recalled = () => { try { return sessionStorage.getItem('caves-finish'); } catch { return null; } };
function choosePalette(name, save = true) {
  const palette=palettes[name];
  if(!palette) return;
  const materials=document.querySelector('#materials');
  if(materials) {
    materials.dataset.palette=palette.key;
    document.querySelector('#palette-image').src=`/assets/img/${palette.image}.webp`;
    document.querySelector('#palette-image').srcset=`/assets/img/${palette.image}-480.webp 480w, /assets/img/${palette.image}-960.webp 960w, /assets/img/${palette.image}.webp 1536w`;
    document.querySelector('#palette-image').alt=palette.alt;
    document.querySelector('#palette-image').width=1536;
    document.querySelector('#palette-image').height=1024;
    document.querySelector('#palette-description h3').textContent=name;
    document.querySelector('#palette-description p').textContent=palette.description;
    ['wood','leather','metal'].forEach((part,i)=>{document.querySelector(`#${part}-label`).textContent=palette.materials[i]});
    for(const radio of document.querySelectorAll('input[name=palette]')) radio.checked=radio.value===name;
  }
  if(form) form.elements.finish.value=name;
  if(save) remember(name);
}
for(const radio of document.querySelectorAll('input[name=palette]')) radio.addEventListener('change',()=>choosePalette(radio.value));
if(form) {
  const space=params.get('space');
  if([...form.elements.space.options].some(option=>option.value===space)) form.elements.space.value=space;
  const finish=params.get('palette') || recalled();
  if(finish) choosePalette(finish);
  form.elements.finish.addEventListener('change',()=>{ if(form.elements.finish.value) choosePalette(form.elements.finish.value); else remember(''); });
  document.querySelector('#use-palette')?.addEventListener('click',()=>{
    choosePalette(document.querySelector('input[name=palette]:checked').value);
    form.querySelector('.form-extras').open=true;
  });
  for(const link of document.querySelectorAll('[data-project-stage]')) {
    link.addEventListener('click',()=>{ form.elements.property_stage.value=link.dataset.projectStage; });
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button=form.querySelector('button');
    button.disabled=true;
    button.textContent='Sending…';
    status.textContent='';
    status.removeAttribute('data-state');
    form.setAttribute('aria-busy','true');
    try {
      const response=await fetch(form.action,{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});
      const result=await response.json();
      if(!response.ok) throw new Error(result.error || 'We couldn’t save your inquiry. Please try again.');
      status.textContent='Thank you. Your inquiry has been received.';
      status.dataset.state='success';
      form.reset();
      const savedFinish=recalled();
      if(savedFinish) form.elements.finish.value=savedFinish;
    } catch(error) {
      status.textContent=error instanceof TypeError ? 'Your connection was interrupted. Please try again when you’re back online.' : error.message;
      status.dataset.state='error';
    } finally {
      form.removeAttribute('aria-busy');
      button.disabled=false;
      button.innerHTML='Send your inquiry <span aria-hidden="true">↗</span>';
    }
  });
}

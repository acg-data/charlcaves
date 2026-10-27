const palettes = {
  'The Club': { key:'club', image:'panel', alt:'Warm mahogany paneling and bronze lighting in The Club finish direction', description:'Rich mahogany, cognac leather and warm bronze. A familiar welcome, with a little ceremony.', materials:['Mahogany','Cognac leather','Warm bronze'] },
  'The Library': { key:'library', image:'retreat', alt:'A leather listening chair and timber shelving in The Library finish direction', description:'Deep timber, tobacco leather and soft brass tones. A quieter palette for records, reading and late conversations.', materials:['Deep timber','Tobacco leather','Soft brass'] },
  'The Screening Room': { key:'screening', image:'theater', alt:'A dark theater with leather seats in The Screening Room finish direction', description:'Dark wood, espresso leather and understated metal. Low contrast around you; all the attention on the screen.', materials:['Dark wood','Espresso leather','Dark metal'] }
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
    document.querySelector('#palette-image').alt=palette.alt;
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
  document.querySelector('#use-palette')?.addEventListener('click',()=>choosePalette(document.querySelector('input[name=palette]:checked').value));
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

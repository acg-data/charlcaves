const finishes = {'The Club':'Warm wood & leather','The Library':'Dark wood & brass','The Screening Room':'Dark, low-glare finishes'};
const form = document.querySelector('#inquiry-form');
const status = document.querySelector('#form-status');
const params = new URLSearchParams(location.search);
const remember = value => { try { sessionStorage.setItem('caves-finish', value); } catch {} };
const recalled = () => { try { return sessionStorage.getItem('caves-finish'); } catch { return null; } };
function chooseFinish(value, save=true) {
  if (value && !Object.hasOwn(finishes,value)) return;
  document.querySelectorAll('input[name=palette]').forEach(radio => {radio.checked = radio.value === value;});
  if(form) form.elements.finish.value=value;
  const feedback=document.querySelector('.palette-feedback');
  if(feedback) feedback.textContent=value ? finishes[value]+' will be included in your inquiry.' : 'You can also leave this open for now.';
  if(save) remember(value);
}
document.querySelectorAll('input[name=palette]').forEach(radio=>radio.addEventListener('change',()=>chooseFinish(radio.value)));
if(form) {
  const space=params.get('space');
  if([...form.elements.space.options].some(option=>option.value===space)) form.elements.space.value=space;
  chooseFinish(params.get('palette') || recalled() || '');
  form.elements.finish.addEventListener('change',()=>chooseFinish(form.elements.finish.value));
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    const button=form.querySelector('button');
    button.disabled=true;button.textContent='Sending…';status.textContent='';status.removeAttribute('data-state');form.setAttribute('aria-busy','true');
    try {
      const response=await fetch(form.action,{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});
      const result=await response.json();
      if(!response.ok) throw new Error(result.error || 'We couldn’t save your inquiry. Please try again.');
      status.textContent='Your inquiry has been received. Thank you.';status.dataset.state='success';form.reset();chooseFinish(recalled() || '',false);
    } catch(error) {
      status.textContent=error instanceof TypeError ? 'The connection was interrupted. Please try again when you’re back online.' : error.message;status.dataset.state='error';
    } finally {
      form.removeAttribute('aria-busy');button.disabled=false;button.innerHTML='Send inquiry <span aria-hidden="true">↗</span>';
    }
  });
}

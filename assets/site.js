const form = document.querySelector('#inquiry-form');
const status = document.querySelector('#form-status');
for (const link of document.querySelectorAll('[data-space]')) {
  link.addEventListener('click', () => { form.elements.space.value = link.dataset.space; });
}
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true;
  button.textContent = 'Sending…';
  status.textContent = '';
  status.removeAttribute('data-state');
  form.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'We couldn’t save your inquiry. Please try again.');
    status.textContent = 'Thank you. Your inquiry has been received.';
    status.dataset.state = 'success';
    form.reset();
  } catch (error) {
    status.textContent = error instanceof TypeError ? 'Your connection was interrupted. Please try again when you’re back online.' : error.message;
    status.dataset.state = 'error';
  } finally {
    form.removeAttribute('aria-busy');
    button.disabled = false;
    button.innerHTML = 'Send your inquiry <span aria-hidden="true">↗</span>';
  }
});

const toggle = document.querySelector('[data-menu-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  mobileNav.hidden = open;
});

mobileNav?.addEventListener('click', (event) => {
  if (event.target.closest('a,button')) {
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.hidden = true;
  }
});

const dialog = document.querySelector('#lead-dialog');
const title = dialog?.querySelector('#lead-title');
const subject = dialog?.querySelector('[name="subject"]');
const intent = dialog?.querySelector('[name="intent"]');

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-lead]');
  if (!trigger || !dialog) return;
  const introduction = trigger.dataset.lead === 'introduction';
  title.textContent = introduction ? 'Make a considered introduction.' : 'Begin with the decision.';
  subject.value = introduction ? 'A considered introduction — Aabhishek Siloya' : 'A private conversation — Aabhishek Siloya';
  intent.value = trigger.dataset.lead;
  dialog.showModal();
});

document.querySelectorAll('[data-dialog-close]').forEach((button) => {
  button.addEventListener('click', () => dialog?.close());
});

dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const form = document.querySelector('#lead-form');
form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  const submit = form.querySelector('[type="submit"]');
  status.textContent = 'Sending privately…';
  submit.disabled = true;
  const payload = new FormData(form);
  payload.set('page_url', window.location.href);
  try {
    const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload });
    const result = await response.json();
    if (!result.success) throw new Error('Submission failed');
    form.reset();
    status.textContent = 'Message received. Aabhishek will review it personally.';
  } catch {
    status.textContent = 'The form could not send. Please try again shortly.';
  } finally {
    submit.disabled = false;
  }
});

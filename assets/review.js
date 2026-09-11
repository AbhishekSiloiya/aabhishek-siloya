import { leadCopy } from './lead-copy.mjs';

const toggle = document.querySelector('[data-menu-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');
const homePage = document.body.classList.contains('home-page');
const workPage = document.body.classList.contains('work-page');
const aboutPage = document.body.classList.contains('about-page');
const siteHeader = document.querySelector('.site-header');

if (homePage || workPage || aboutPage) {
  document.body.classList.add('js-ready');
  requestAnimationFrame(() => document.body.classList.add('loaded'));

  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add('visible'));
  }
}

if (homePage) {
  const syncHeader = () => siteHeader?.classList.toggle('scrolled', window.scrollY > 24);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
}

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
let currentIntent = 'conversation';

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-lead]');
  if (!trigger || !dialog) return;
  const copy = leadCopy(trigger.dataset.lead);
  currentIntent = copy.intent;
  title.textContent = copy.title;
  dialog.querySelector('.dialog-note').textContent = copy.note;
  dialog.querySelector('[data-message-label]').textContent = copy.label;
  dialog.querySelector('[type="submit"]').textContent = copy.action;
  dialog.querySelector('.form-status').textContent = '';
  subject.value = copy.subject;
  intent.value = copy.intent;
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
  const copy = leadCopy(currentIntent);
  payload.set('intent', copy.intent);
  payload.set('subject', copy.subject);
  payload.set('page_url', window.location.origin + window.location.pathname);
  try {
    const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error('Submission failed');
    form.reset();
    status.textContent = 'Thank you. Your message has been sent. I will be in touch personally.';
  } catch {
    status.textContent = 'The form could not send. Please try again shortly.';
  } finally {
    submit.disabled = false;
  }
});

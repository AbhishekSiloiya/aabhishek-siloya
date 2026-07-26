const MODES = {
  conversation: {
    kind: 'conversation',
    label: 'A private conversation',
    heading: 'Begin with the decision.',
    description: 'Share only the context needed to begin. No deck is required.',
    subject: 'A private conversation — Aabhishek Siloya',
  },
  introduction: {
    kind: 'introduction',
    label: 'A considered introduction',
    heading: 'Make a considered introduction.',
    description: 'Tell me who you have in mind and why the conversation may be valuable.',
    subject: 'A considered introduction — Aabhishek Siloya',
  },
};

const CONVERSATION_INTENTS = new Set(['hero', 'cgp', 'conversation']);

export function getLeadMode(intent) {
  return intent === 'introduction' ? MODES.introduction : MODES.conversation;
}

export function buildLeadPayload({ entries, intent, pageUrl }) {
  const mode = getLeadMode(intent);
  const url = new URL(pageUrl);
  const commonFields = ['access_key', 'subject', 'from_name', 'name', 'email', 'botcheck'];
  const modeFields = mode.kind === 'introduction'
    ? ['introduced_person', 'introduction_context']
    : ['organisation', 'phone', 'decision'];
  const payload = {};

  for (const field of [...commonFields, ...modeFields]) {
    const value = entries[field];
    if (value !== undefined && value !== '') payload[field] = value;
  }

  payload.intent = CONVERSATION_INTENTS.has(intent) ? intent : 'introduction';
  payload.page_url = pageUrl;
  payload.utm_source = url.searchParams.get('utm_source') || '';
  payload.utm_medium = url.searchParams.get('utm_medium') || '';
  payload.utm_campaign = url.searchParams.get('utm_campaign') || '';

  return payload;
}

if (typeof document !== 'undefined') {
  const dialog = document.querySelector('#lead-dialog');
  const form = document.querySelector('#lead-form');

  if (dialog && form) {
    const heading = dialog.querySelector('#lead-dialog-title');
    const label = dialog.querySelector('#lead-dialog-label');
    const description = dialog.querySelector('#lead-dialog-description');
    const closeButtons = [...dialog.querySelectorAll('[data-lead-close]')];
    const result = dialog.querySelector('#lead-form-result');
    const formBody = dialog.querySelector('.lead-form-body');
    const success = dialog.querySelector('.lead-success');
    const submitButton = form.querySelector('[type="submit"]');
    const intentInput = form.querySelector('[name="intent"]');
    const subjectInput = form.querySelector('[name="subject"]');
    const pageInput = form.querySelector('[name="page_url"]');
    const modeGroups = [...form.querySelectorAll('[data-lead-mode]')];
    let activeTrigger = null;
    let activeIntent = 'conversation';

    const setMode = (intent) => {
      const mode = getLeadMode(intent);
      activeIntent = intent;
      dialog.dataset.leadMode = mode.kind;
      label.textContent = mode.label;
      heading.textContent = mode.heading;
      description.textContent = mode.description;
      intentInput.value = intent;
      subjectInput.value = mode.subject;
      pageInput.value = window.location.href;

      for (const group of modeGroups) {
        const active = group.dataset.leadMode === mode.kind;
        group.hidden = !active;
        for (const field of group.querySelectorAll('input, textarea')) {
          field.disabled = !active;
        }
      }
    };

    const resetState = () => {
      form.reset();
      formBody.hidden = false;
      success.hidden = true;
      result.hidden = true;
      result.textContent = '';
      result.classList.remove('is-error');
      submitButton.disabled = false;
      submitButton.textContent = 'Send privately';
    };

    const openDialog = (trigger) => {
      activeTrigger = trigger;
      resetState();
      setMode(trigger.dataset.leadIntent);
      document.body.classList.add('lead-open');
      dialog.showModal();
      requestAnimationFrame(() => heading.focus());
    };

    const closeDialog = () => dialog.close();

    for (const trigger of document.querySelectorAll('[data-lead-intent]')) {
      trigger.addEventListener('click', () => openDialog(trigger));
    }

    for (const button of closeButtons) button.addEventListener('click', closeDialog);

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog();
    });

    dialog.addEventListener('close', () => {
      document.body.classList.remove('lead-open');
      activeTrigger?.focus();
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      submitButton.disabled = true;
      submitButton.textContent = 'Sending securely…';
      result.hidden = false;
      result.textContent = 'Sending securely…';
      result.classList.remove('is-error');

      try {
        const entries = Object.fromEntries(new FormData(form));
        const payload = buildLeadPayload({
          entries,
          intent: activeIntent,
          pageUrl: window.location.href,
        });
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
        const responseBody = await response.json();

        if (!response.ok || !responseBody.success) {
          throw new Error('Submission was not accepted.');
        }

        formBody.hidden = true;
        success.hidden = false;
        result.hidden = true;
        form.reset();
      } catch {
        result.hidden = false;
        result.classList.add('is-error');
        result.innerHTML = 'The form could not be sent. Please try again or <a href="mailto:aabhisheksiloiya708@gmail.com">email Aabhishek directly</a>.';
        submitButton.disabled = false;
        submitButton.textContent = 'Try again';
      }
    });
  }
}

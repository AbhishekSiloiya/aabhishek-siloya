export function leadCopy(intent) {
  if (intent === 'introduction') return {
    intent: 'introduction',
    title: 'Make an introduction.',
    note: 'Tell me how you know each other and why a conversation may help. Please get their permission before sharing contact details.',
    label: 'Who would you like to introduce, and why? *',
    subject: 'An introduction — Aabhishek Siloya',
    action: 'Send introduction',
  };
  return {
    intent: 'conversation',
    title: 'What is on your mind?',
    note: 'A short note is enough to begin. Please leave out sensitive financial, health or family information at this stage.',
    label: 'What would you like to discuss? *',
    subject: 'A private conversation — Aabhishek Siloya',
    action: 'Send enquiry',
  };
}

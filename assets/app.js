(() => {
  'use strict';
  const config = window.RHM_CONFIG || {};
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('#mobile-navigation');
  const setMenu = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    toggle.querySelector('span').textContent = open ? 'close' : 'menu';
  };
  toggle.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); }
  });
  document.addEventListener('click', (event) => {
    if (!menu.hidden && !event.target.closest('.site-navigation')) setMenu(false);
  });
  matchMedia('(min-width: 1024px)').addEventListener('change', () => setMenu(false));

  const dialog = document.querySelector('#content-dialog');
  const dialogTitle = dialog.querySelector('h2');
  const dialogBody = dialog.querySelector('p');
  document.querySelectorAll('[data-service]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      const card = link.closest('[data-service-card]');
      dialogTitle.textContent = card.querySelector('h3').textContent;
      dialogBody.textContent = card.querySelector('p').textContent;
      dialog.querySelector('.dialog-contact').hidden = false;
      dialog.showModal();
    });
  });
  document.querySelectorAll('[data-contents]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      dialogTitle.textContent = 'Conteúdos';
      dialogBody.textContent = 'Em breve, novos conteúdos da RHM estarão disponíveis por aqui.';
      dialog.querySelector('.dialog-contact').hidden = true;
      dialog.showModal();
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.dialog-contact').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });

  const validEmail = (value) => typeof value === 'string' && /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(value);
  document.querySelectorAll('[data-email]').forEach((link) => {
    const key = link.dataset.email;
    const address = key === 'office' ? config.email : config.partnerEmails?.[key];
    if (validEmail(address)) {
      link.href = `mailto:${address}`;
      link.removeAttribute('aria-disabled');
    } else {
      link.setAttribute('aria-disabled', 'true');
      link.addEventListener('click', (event) => event.preventDefault());
    }
  });
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#contact-status');
  const whatsapp = String(config.whatsapp || '').replace(/\D/g, '');
  const hasWhatsApp = /^\d{10,15}$/.test(whatsapp);
  const initialContactMessage = 'Olá! Vim pelo site da RHM Advogados e gostaria de falar com a equipe sobre uma possível assessoria jurídica para minha empresa.';
  const whatsappUrl = (message) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
  document.querySelectorAll('[data-whatsapp-cta]').forEach((link) => {
    if (!hasWhatsApp) return;
    link.href = whatsappUrl(initialContactMessage);
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.assign(whatsappUrl(initialContactMessage));
    });
  });
  if (hasWhatsApp || validEmail(config.email)) {
    document.querySelector('#form-notice').textContent = 'Ao enviar, uma mensagem com os dados preenchidos será aberta no WhatsApp para você confirmar o envio.';
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!hasWhatsApp && !validEmail(config.email)) {
      status.hidden = false;
      status.textContent = 'O envio de mensagens ainda não está disponível. Nenhum dado foi enviado.';
      return;
    }
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      'Olá! Vim pelo site da RHM Advogados e gostaria de solicitar um contato.',
      '',
      'Dados informados:',
      ...Array.from(data, ([key, value]) => `${key}: ${value || 'Não informado'}`)
    ].join('\n');
    status.hidden = false;
    status.textContent = 'Confirme o envio no aplicativo que será aberto. O site não armazena seus dados.';
    if (hasWhatsApp) {
      window.location.assign(whatsappUrl(message));
    } else {
      window.location.assign(`mailto:${config.email}?subject=${encodeURIComponent('Contato pelo site RHM')}&body=${encodeURIComponent(message)}`);
    }
  });
})();

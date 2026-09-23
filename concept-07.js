const binaryTargets = [...document.querySelectorAll('[data-binary-log]')];
const makeByte = () => Math.floor(Math.random() * 256).toString(2).padStart(8, '0');
const writeBinaryLog = (target) => {
  const width = target.classList.contains('hero-log') ? 5 : 4;
  const rows = Array.from({ length: 7 }, () => Array.from({ length: width }, makeByte).join(' '));
  target.textContent = rows.join('\n');
};
binaryTargets.forEach(writeBinaryLog);
let binaryTimer;
const startBinaryLogs = () => {
  window.clearInterval(binaryTimer);
  binaryTimer = window.setInterval(() => binaryTargets.forEach(writeBinaryLog), 520);
};
startBinaryLogs();

document.addEventListener('visibilitychange', () => {
  if (document.hidden) window.clearInterval(binaryTimer);
  else startBinaryLogs();
});

const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    mobileNav.hidden = expanded;
    mobileNav.classList.toggle('is-open', !expanded);
    menuButton.innerHTML = expanded ? 'МЕНЮ <span>+</span>' : 'ЗАКРЫТЬ <span>×</span>';
  });
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => menuButton.click()));
}

const feedToggle = document.querySelector('[data-feed-toggle]');
const heroVideo = document.querySelector('.hero-video');
if (feedToggle && heroVideo) {
  feedToggle.addEventListener('click', () => {
    const pause = !heroVideo.paused;
    if (pause) heroVideo.pause(); else heroVideo.play();
    feedToggle.setAttribute('aria-pressed', String(pause));
    feedToggle.innerHTML = pause ? '<span>▶</span> ВОЗОБНОВИТЬ ПЕРЕДАЧУ' : '<span>Ⅱ</span> ПРИОСТАНОВИТЬ ПЕРЕДАЧУ';
  });
}

const messages = [
  '«Шелли, не иди к главному лифту. Ты не знаешь, что он уже видел.»',
  '«Не верь карте на стене. В архиве есть ещё один проход.»',
  '«Они называют тебя прототипом, но ты помнишь слишком много для машины.»',
  '«Если свет погаснет — не отвечай на голос в соседнем кабинете.»',
];
let messageIndex = 0;
const messageButton = document.querySelector('[data-message-button]');
const terminalMessage = document.querySelector('[data-terminal-message]');
if (messageButton && terminalMessage) {
  messageButton.addEventListener('click', () => {
    messageIndex = (messageIndex + 1) % messages.length;
    terminalMessage.style.opacity = '0';
    window.setTimeout(() => {
      terminalMessage.textContent = messages[messageIndex];
      terminalMessage.style.opacity = '1';
    }, 150);
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => { if (isIntersecting) target.classList.add('is-visible'); });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sectionLinks = [...document.querySelectorAll('.section-nav a')];
const linkedSections = sectionLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    sectionLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
linkedSections.forEach((section) => navObserver.observe(section));

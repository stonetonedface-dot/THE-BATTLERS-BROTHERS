const binaryNodes = [...document.querySelectorAll('[data-binary-log]')];
const randomByte = () => Math.floor(Math.random() * 256).toString(2).padStart(8, '0');
const writeLog = (node) => {
  const labels = ['A.R.I. //', 'GR-08 //', 'SYS //', 'LINE //', 'MEM //'];
  node.textContent = Array.from({ length: 10 }, (_, index) => `${labels[index % labels.length]} ${randomByte()} ${randomByte()} ${randomByte()}`).join('\n');
};
binaryNodes.forEach(writeLog);
let logTimer;
const startLogs = () => {
  window.clearInterval(logTimer);
  logTimer = window.setInterval(() => binaryNodes.forEach(writeLog), 620);
};
startLogs();
document.addEventListener('visibilitychange', () => document.hidden ? window.clearInterval(logTimer) : startLogs());

const feedClock = document.querySelector('[data-feed-clock]');
if (feedClock) {
  const updateClock = () => feedClock.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date());
  updateClock();
  window.setInterval(updateClock, 1000);
}

const cameraFeed = document.querySelector('[data-camera-feed]');
const cameraToggle = document.querySelector('[data-camera-toggle]');
const cameraVideo = document.querySelector('.camera-video');
if (cameraFeed && cameraToggle) cameraToggle.addEventListener('click', () => {
  const active = cameraFeed.classList.toggle('is-alt');
  cameraToggle.setAttribute('aria-pressed', String(active));
  cameraToggle.textContent = active ? 'ВОССТАНОВИТЬ КАМЕРУ' : 'СМЕНИТЬ РЕЖИМ';
  if (cameraVideo) cameraVideo.style.filter = active ? 'grayscale(.35) contrast(1.65) saturate(1.75) hue-rotate(165deg)' : 'grayscale(1) contrast(1.5) saturate(.25) sepia(.25)';
});

const intercomMessages = [
  '«Шелли, вам нужно покинуть административный холл. Не пользуйтесь главным лифтом.»',
  '«Не обращайте внимания на таблички. Нижние этажи не отмечены в плане.»',
  '«Если услышите телефонный звонок, сначала проверьте, есть ли в комнате аппарат.»',
  '«Я не могу сказать, кто я. Но я видел ваши документы. Они старше, чем вы думаете.»',
];
let messageIndex = 0;
const messageNode = document.querySelector('[data-intercom-message]');
document.querySelector('[data-intercom-next]')?.addEventListener('click', () => {
  messageIndex = (messageIndex + 1) % intercomMessages.length;
  messageNode.style.opacity = '0';
  window.setTimeout(() => { messageNode.textContent = intercomMessages[messageIndex]; messageNode.style.opacity = '1'; }, 160);
});

const mobileButton = document.querySelector('.mobile-menu');
const mobileNav = document.querySelector('.mobile-nav');
if (mobileButton && mobileNav) {
  mobileButton.addEventListener('click', () => {
    const expanded = mobileButton.getAttribute('aria-expanded') === 'true';
    mobileButton.setAttribute('aria-expanded', String(!expanded));
    mobileButton.innerHTML = expanded ? 'МЕНЮ <span>+</span>' : 'ЗАКРЫТЬ <span>×</span>';
    mobileNav.hidden = expanded;
    mobileNav.classList.toggle('is-open', !expanded);
  });
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => mobileButton.click()));
}

const revealObserver = new IntersectionObserver((entries) => entries.forEach(({ isIntersecting, target }) => { if (isIntersecting) target.classList.add('is-visible'); }), { threshold: .13 });
document.querySelectorAll('.reveal').forEach((node) => revealObserver.observe(node));

const sectionLinks = [...document.querySelectorAll('.section-nav a')];
const targets = sectionLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const sectionObserver = new IntersectionObserver((entries) => entries.forEach(({ isIntersecting, target }) => {
  if (isIntersecting) sectionLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${target.id}`));
}), { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
targets.forEach((target) => sectionObserver.observe(target));

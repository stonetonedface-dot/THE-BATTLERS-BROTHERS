const realMenu = document.querySelector('.real-menu');
if (realMenu) realMenu.addEventListener('click', () => realMenu.previousElementSibling.classList.toggle('mobile-open'));

document.querySelectorAll('.real-dropdown > button').forEach((button) => {
  button.addEventListener('click', () => button.parentElement.classList.toggle('is-open'));
});

document.querySelectorAll('.games-item > a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    link.parentElement.classList.toggle('is-open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const transmissions = [
  '«ЕСЛИ ТЫ СЛЫШИШЬ МЕНЯ, НЕ ВЕРЬ ЧЕЛОВЕКУ В СИНЕМ КОСТЮМЕ.»',
  '«КАРТА НА СТЕНЕ НЕПОЛНАЯ. ИЩИ ЛИФТ ЗА АРХИВОМ.»',
  '«Я НЕ МОГУ ОТКРЫТЬ ДВЕРЬ. НО МОГУ ОТКЛЮЧИТЬ СВЕТ.»',
  '«ШЕЛЛИ, ТЫ БЫЛА ЗДЕСЬ РАНЬШЕ. ВСПОМНИ.»',
];
let transmissionIndex = 0;
const decodeButton = document.querySelector('[data-terminal]');
const terminalResult = document.querySelector('#terminal-result');
if (decodeButton && terminalResult) {
  decodeButton.addEventListener('click', () => {
    transmissionIndex = (transmissionIndex + 1) % transmissions.length;
    terminalResult.style.opacity = '0';
    window.setTimeout(() => {
      terminalResult.textContent = transmissions[transmissionIndex];
      terminalResult.style.opacity = '1';
    }, 160);
  });
}

const videoToggle = document.querySelector('[data-video-toggle]');
const hallwayVideo = document.querySelector('.hallway-video');
if (videoToggle && hallwayVideo) {
  videoToggle.addEventListener('click', () => {
    const paused = hallwayVideo.paused;
    if (paused) hallwayVideo.play(); else hallwayVideo.pause();
    videoToggle.setAttribute('aria-pressed', String(!paused));
    videoToggle.innerHTML = paused ? '<span>Ⅱ</span> ПРИОСТАНОВИТЬ КАМЕРУ' : '<span>▶</span> ВОЗОБНОВИТЬ КАМЕРУ';
  });
}

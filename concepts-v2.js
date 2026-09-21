document.querySelectorAll('.v2-menu').forEach((button) => {
  button.addEventListener('click', () => button.previousElementSibling.classList.toggle('mobile-open'));
});
const scene = document.querySelector('[data-parallax]');
if (scene && window.matchMedia('(pointer: fine)').matches) {
  scene.addEventListener('pointermove', ({ clientX, clientY }) => {
    const x = (clientX / innerWidth - .5) * 2, y = (clientY / innerHeight - .5) * 2;
    scene.querySelectorAll('.parallax').forEach((item) => {
      const level = Number(item.dataset.depth || 0);
      item.style.translate = `${x * level}px ${y * level}px`;
    });
  });
}

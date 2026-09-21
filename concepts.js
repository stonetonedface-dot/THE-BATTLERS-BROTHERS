document.querySelectorAll('.menu-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const nav = button.previousElementSibling;
    nav.classList.toggle('mobile-open');
  });
});

const scene = document.querySelector('[data-parallax]');
if (scene && window.matchMedia('(pointer: fine)').matches) {
  scene.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    scene.querySelectorAll('.parallax-layer').forEach((layer) => {
      const depth = Number(layer.dataset.depth || 0);
      layer.style.translate = `${x * depth}px ${y * depth}px`;
    });
  });
}

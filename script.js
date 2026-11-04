// Ano no rodapé
document.getElementById('ano').textContent = new Date().getFullYear();

// Menu mobile
const botaoMenu = document.querySelector('.menu__botao');
const listaMenu = document.getElementById('menu-lista');

botaoMenu.addEventListener('click', () => {
  const aberto = listaMenu.classList.toggle('is-aberto');
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  botaoMenu.textContent = aberto ? 'Fechar' : 'Menu';
});

listaMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    listaMenu.classList.remove('is-aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.textContent = 'Menu';
  });
});

// Hero: o site de exemplo sai do esboço e vai "ao ar"
const obra = document.querySelector('.obra');
const legenda = document.querySelector('.obra__legenda');
const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function montarSite() {
  obra.classList.add('is-pronto');
  legenda.textContent = 'Montando…';
  setTimeout(() => {
    obra.classList.add('is-no-ar');
    legenda.textContent = 'No ar';
  }, semAnimacao ? 0 : 1600);
}

if (semAnimacao) {
  montarSite();
} else {
  setTimeout(montarSite, 900);
}

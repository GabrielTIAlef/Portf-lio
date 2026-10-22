// Progressive enhancement: all routes, content and language links work without JS.
document.querySelectorAll('.mobile-menu').forEach(menu => {
  const summary = menu.querySelector('summary');
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      summary.focus();
    }
  });
  menu.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      menu.open = false;
    });
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target)) menu.open = false;
  });
});

// Without JavaScript, every project remains visible and linked.
const filterGroup = document.querySelector('.project-filters');
if (filterGroup) {
  const cards = [...document.querySelectorAll('.portfolio-grid [data-areas]')];
  const status = document.querySelector('.filter-status');
  filterGroup.hidden = false;
  filterGroup.querySelectorAll('button[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterGroup.querySelectorAll('button').forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      let visible = 0;
      cards.forEach(card => {
        card.hidden = filter !== 'all' && !card.dataset.areas.split(' ').includes(filter);
        if (!card.hidden) visible += 1;
      });
      status.textContent = status.dataset.language === 'pt'
        ? `${visible} projetos · ${button.textContent}`
        : `${visible} projects · ${button.textContent}`;
    });
  });
}

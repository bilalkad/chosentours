const WHATSAPP_NUMBER = '256704598459';
const dialog = document.querySelector('#planner');
const destination = document.querySelector('#destination');
const service = document.querySelector('#service');
function openPlanner(trigger) {
  if (trigger.dataset.destination) destination.value = trigger.dataset.destination;
  if (trigger.dataset.service) service.value = trigger.dataset.service;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}
document.querySelectorAll('[data-plan], [data-destination]').forEach(trigger => trigger.addEventListener('click', event => {
  event.preventDefault();
  openPlanner(trigger);
}));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
document.querySelector('#trip-form').addEventListener('submit', event => {
  event.preventDefault();
  const timing = document.querySelector('#timing').value.trim();
  const notes = document.querySelector('#notes').value.trim();
  const message = `Hello Chosen Tours & Travel! I would like help planning my next journey.\n\nDestination: ${destination.value}\nSupport: ${service.value}\nTravel timing: ${timing || 'Flexible / to be discussed'}${notes ? `\n\nMy travel idea: ${notes}` : ''}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
const slides = [
  { photo: 'photo-1523906834658-6e24ef2386f9', country: 'ITALY, AT YOUR PACE', caption: 'Lose yourself.<br>Find a little wonder.', location: 'Venice, Italy', alt: 'Gondolas and colourful historic buildings along a canal in Venice' },
  { photo: 'photo-1539037116277-4db20889f2d4', country: 'SPAIN, IN FULL COLOUR', caption: 'Follow the sunshine.<br>Stay for the rhythm.', location: 'Barcelona, Spain', alt: 'Barcelona city architecture and sunlit streets' },
  { photo: 'photo-1467269204594-9661b134dd2b', country: 'EUROPE, YOUR OWN WAY', caption: 'A different view.<br>A new perspective.', location: 'Explore the Schengen area', alt: 'Traditional European buildings lining a historic city square' }
];
document.querySelectorAll('[data-slide]').forEach(button => button.addEventListener('click', () => {
  const slide = slides[Number(button.dataset.slide)];
  const image = document.querySelector('#hero-image');
  image.src = `https://images.unsplash.com/${slide.photo}?auto=format&fit=crop&w=1400&q=85`;
  image.alt = slide.alt;
  document.querySelector('#hero-country').textContent = slide.country;
  document.querySelector('#hero-caption').innerHTML = slide.caption;
  document.querySelector('#hero-location').textContent = slide.location;
  document.querySelectorAll('[data-slide]').forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
}));
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.header nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

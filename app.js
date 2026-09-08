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
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const photo = document.querySelector('.hero-photo');
photo.setAttribute('role', 'region');
photo.setAttribute('aria-roledescription', 'carousel');
photo.setAttribute('aria-label', 'European destinations');
const image = document.querySelector('#hero-image');
const outgoingImage = image.cloneNode();
outgoingImage.removeAttribute('id');
outgoingImage.alt = '';
outgoingImage.setAttribute('aria-hidden', 'true');
outgoingImage.classList.add('outgoing-image');
photo.insertBefore(outgoingImage, image);
slides.forEach(slide => { const preload = new Image(); preload.src = `https://images.unsplash.com/${slide.photo}?auto=format&fit=crop&w=1400&q=85`; });
let currentSlide = 0;
let rotationTimer;
let requestVersion = 0;
let paused = motionPreference.matches;
let hovered = false;
const pauseButton = document.createElement('button');
pauseButton.className = 'carousel-pause';
document.querySelector('.slide-controls').prepend(pauseButton);
function updatePauseButton() {
  pauseButton.textContent = paused ? '▶' : 'Ⅱ';
  pauseButton.setAttribute('aria-label', paused ? 'Play destination carousel' : 'Pause destination carousel');
}
function scheduleRotation() {
  clearTimeout(rotationTimer);
  if (!paused && !hovered && !document.hidden) rotationTimer = setTimeout(() => showSlide((currentSlide + 1) % slides.length), 6000);
}
async function showSlide(index) {
  clearTimeout(rotationTimer);
  const version = ++requestVersion;
  const slide = slides[index];
  const nextImage = new Image();
  nextImage.src = `https://images.unsplash.com/${slide.photo}?auto=format&fit=crop&w=1400&q=85`;
  try { await nextImage.decode(); } catch { if (version === requestVersion) scheduleRotation(); return; }
  if (version !== requestVersion) return;
  outgoingImage.src = image.src;
  image.src = nextImage.src;
  image.alt = slide.alt;
  currentSlide = index;
  if (!motionPreference.matches) image.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, easing: 'ease-out' });
  document.querySelector('#hero-country').textContent = slide.country;
  document.querySelector('#hero-caption').innerHTML = slide.caption;
  document.querySelector('#hero-location').textContent = slide.location;
  document.querySelectorAll('[data-slide]').forEach(item => {
    const active = Number(item.dataset.slide) === index;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  scheduleRotation();
}
document.querySelectorAll('[data-slide]').forEach(button => button.addEventListener('click', () => showSlide(Number(button.dataset.slide))));
pauseButton.addEventListener('click', () => { paused = !paused; updatePauseButton(); scheduleRotation(); });
photo.addEventListener('mouseenter', () => { hovered = true; scheduleRotation(); });
photo.addEventListener('mouseleave', () => { hovered = false; scheduleRotation(); });
photo.addEventListener('focusin', event => { if (event.target !== pauseButton) { paused = true; updatePauseButton(); scheduleRotation(); } });
document.addEventListener('visibilitychange', scheduleRotation);
motionPreference.addEventListener('change', () => { paused = motionPreference.matches; updatePauseButton(); scheduleRotation(); });
updatePauseButton();
scheduleRotation();
const flightArtwork = document.createElement('div');
flightArtwork.className = 'flight-artwork';
flightArtwork.setAttribute('aria-hidden', 'true');
flightArtwork.innerHTML = `<svg viewBox="0 0 600 520" preserveAspectRatio="none"><path class="flight-route" d="M -60 430 C 40 500 170 430 200 330 S 220 170 330 130 S 520 145 650 15"/><circle class="flight-origin" cx="200" cy="330" r="7"/><circle class="flight-destination" cx="330" cy="130" r="5"/></svg><span class="flying-aircraft"><svg viewBox="0 0 64 64"><path d="M58 29 39 23 28 4 22 4 27 25 13 29 7 22 3 23 7 32 3 41 7 42 13 35 27 39 22 60 28 60 39 41 58 35 Q65 32 58 29Z"/></svg></span><span class="flight-cloud cloud-one"></span><span class="flight-cloud cloud-two"></span>`;
document.querySelector('.hero-copy').prepend(flightArtwork);
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

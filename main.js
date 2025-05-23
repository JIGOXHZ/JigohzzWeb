// === Menu Hamburger ===
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');

let animations = []; // array untuk menyimpan instance animasi lottie
let animPlaying = false; // status animasi

// === Lottie Animation dengan Intersection Observer ===
window.onload = function () {
  const animConfigs = [
    { id: 'lottie-icon', path: 'centang.json' },
    { id: 'lottie-iconjoo', path: 'centang.json' },
    { id: 'lottie-iconlulsec', path: 'centang.json' },
    { id: 'lottie-icon-2', path: 'OS.json' },
    { id: 'lottie-icon-lulsec', path: 'OS.json' },
    { id: 'lottie-icon-joo', path: 'OS.json' },
    { id: 'lottie-icon-bit', path: 'OS.json' },
    { id: 'lottie-icon-bitlulsec', path: 'OS.json' },
    { id: 'lottie-icon-joo2', path: 'OS.json' },
    { id: 'lottie-icon-other', path: 'switch.json' },
    { id: 'lulsec-icon-otherlul', path: 'switch.json' },
    { id: 'lottie-android-switchjoo1', path: 'switch.json' },
    { id: 'lottie-icon-telegram', path: 'telegram.json' },
    { id: 'telegramlulsec-icon-telegram', path: 'telegram.json' },
    { id: 'lottie-icon-telegramjoo', path: 'telegram.json' },
    { id: 'lottie-android', path: 'arrow.json' },
    { id: 'lottie-android-64lulsec', path: 'arrow.json' },
    { id: 'lulsec32-android-64lulsec', path: 'arrow.json' },
    { id: 'lulsecother1-android-64lulsec', path: 'arrow.json' },
    { id: 'lulsecother2-android-64lulsec', path: 'arrow.json' },
    { id: 'lulsecother3-android-64lulsec', path: 'arrow.json' },
    { id: 'lulsecother4-android-64lulsec', path: 'arrow.json' },
    { id: 'lulsecother5-android-64lulsec', path: 'arrow.json' },
    { id: 'lulsecother6-android-64lulsec', path: 'arrow.json' },
    { id: 'lulsecother7-android-64lulsec', path: 'arrow.json' },
    { id: 'lottie-android-2', path: 'arrow.json' },
    { id: '32jugoxhzz-android-bit', path: 'arrow.json' },
    { id: 'lottie-android-3', path: 'arrow.json' },
    { id: 'lottie-android-4', path: 'arrow.json' },
    { id: 'lottie-android-5', path: 'arrow.json' },
    { id: 'lottie-android-6', path: 'arrow.json' },
    { id: 'lottie-android-7', path: 'arrow.json' },
    { id: 'lottie-android-8', path: 'arrow.json' },
    { id: 'lottie-android-9', path: 'arrow.json' },
    { id: 'lottie-android-10', path: 'arrow.json' },
    { id: 'lottie-android-bit', path: 'arrow.json' },
    { id: 'lottie-android-other', path: 'arrow.json' },
    { id: 'lottie-android-otherjoo1', path: 'arrow.json' },
    { id: 'lottie-android-otherjoo2', path: 'arrow.json' },
    { id: 'lottie-android-otherjoo3', path: 'arrow.json' },
    { id: 'lottie-android-otherjoo4', path: 'arrow.json' },
    { id: 'lottie-android-otherjoo5', path: 'arrow.json' },
    { id: 'lottie-android-other1', path: 'arrow.json' },
    { id: 'lottie-android-other2', path: 'arrow.json' },
    { id: 'lottie-android-other3', path: 'arrow.json' },
    { id: 'lottie-joo', path: 'arrow.json' },
    { id: 'lottie-lulsec1', path: 'arrow.json' },
    { id: 'inone-android-other2', path: 'arrow.json' },
    { id: 'inone1-android-other4', path: 'arrow.json' },
    { id: 'inone2-android-other3', path: 'arrow.json' },
    { id: 'inone3-android-other4', path: 'arrow.json' },
    { id: 'inone5-android-other4', path: 'arrow.json' },
    { id: 'inone4-android-other4', path: 'arrow.json' },
    { id: 'lottie-lulsec2', path: 'arrow.json' },
    { id: 'lottie-lulsec3', path: 'arrow.json' },
    { id: 'lottie-lulsec4', path: 'arrow.json' },
    { id: 'lottie-lulsec5', path: 'arrow.json' },
    { id: 'lottie-lulsec6', path: 'arrow.json' },
    { id: 'lottie-lulsec7', path: 'arrow.json' },
    { id: 'lottie-lulsec8', path: 'arrow.json' },
    { id: 'lottie-joo2', path: 'arrow.json' },
    { id: 'lottie-joo3', path: 'arrow.json' },
    { id: 'lottie-joo4', path: 'arrow.json' },
    { id: 'lottie-joo5', path: 'arrow.json' },
    { id: 'lottie-joo6', path: 'arrow.json' },
    { id: 'lottie-joo7', path: 'arrow.json' },
    { id: 'lottie-joo8', path: 'arrow.json' },
    { id: 'lottie-joo9', path: 'arrow.json' },
    { id: 'lottie-joo10', path: 'arrow.json' },
    { id: 'lottie-android-joo3', path: 'arrow.json' },
    { id: 'notejigoxhzz-icon-other', path: 'note.json' },
    { id: 'lottie-android-other4', path: 'arrow.json' }
  ];

  animations = animConfigs.map(conf => {
    const container = document.getElementById(conf.id);
    if (container) {
      const anim = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: conf.path
      });
      return { element: container, anim };
    }
    return null;
  }).filter(a => a !== null);

  // Observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const match = animations.find(a => a.element === entry.target);
      if (match) {
        if (entry.isIntersecting && animPlaying) {
          match.anim.play();
        } else {
          match.anim.stop();
        }
      }
    });
  }, { threshold: 0.5 });

  animations.forEach(({ element }) => observer.observe(element));

  // Auto play saat awal load
  animPlaying = true;
  animations.forEach(({ anim }) => anim.play());
}

// Pause semua animasi
function pauseAllAnimations() {
  animPlaying = false;
  animations.forEach(({ anim }) => anim.pause());
}

// Play semua animasi
function playAllAnimations() {
  animPlaying = true;
  animations.forEach(({ anim }) => anim.play());
}

// Klik hamburger
hamburger.addEventListener('click', () => {
  pauseAllAnimations();

  sideMenu.classList.toggle('active');
  overlay.classList.toggle('active');
  hamburger.classList.toggle('active');

  setTimeout(() => {
    if (sideMenu.classList.contains('active')) {
      playAllAnimations();
    } else {
      pauseAllAnimations();
      setTimeout(() => {
        playAllAnimations();
      }, 100);
    }
  }, 300);
});

// Klik overlay
overlay.addEventListener('click', () => {
  pauseAllAnimations();

  sideMenu.classList.remove('active');
  overlay.classList.remove('active');
  hamburger.classList.remove('active');

  setTimeout(() => {
    playAllAnimations();
  }, 300);
});
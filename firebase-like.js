// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAX6687udrMdKKUmg2Te2I-eTZfNIbgVR8",
  authDomain: "like-jigoxhzz.firebaseapp.com",
  databaseURL: "https://like-jigoxhzz-default-rtdb.firebaseio.com",
  projectId: "like-jigoxhzz",
  storageBucket: "like-jigoxhzz.firebasestorage.app",
  messagingSenderId: "41549773226",
  appId: "1:41549773226:web:401335d35f410173f453d3"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// FUNGSI UMUM
function updateLike(appId, isThumb = false) {
  if (localStorage.getItem('liked-' + appId)) return;

  const likeRef = db.ref('likes/' + appId);
  likeRef.transaction(current => (current || 0) + 1)
    .then(() => {
      localStorage.setItem('liked-' + appId, 'true');
      animateLike(appId, isThumb);
      showLikeCount(appId);
    });
}

function showLikeCount(appId) {
  const likeRef = db.ref('likes/' + appId);
  likeRef.on('value', snapshot => {
    const count = snapshot.val() || 0;
    const countEl = document.getElementById('like-count-' + appId);
    if (countEl) countEl.textContent = count;
  });
}

function animateLike(appId, isThumb = false) {
  const countEl = document.getElementById('like-count-' + appId);
  const container = countEl?.closest(isThumb ? '.like-containerthumb' : '.like-container');

  if (countEl) countEl.classList.add('visible');
  if (container) container.classList.add('liked');
}

// SAAT HALAMAN DIMUAT
document.addEventListener('DOMContentLoaded', () => {
  // Versi BIASA
  document.querySelectorAll('.like-button').forEach(btn => {
    const appId = btn.dataset.appId;
    const countEl = document.getElementById('like-count-' + appId);

    btn.addEventListener('click', () => {
      updateLike(appId, false);
    });

    showLikeCount(appId);

    if (localStorage.getItem('liked-' + appId)) {
      animateLike(appId, false);
    }
  });

  // Versi THUMB
  document.querySelectorAll('.like-buttonthumb').forEach(btn => {
    const appId = btn.dataset.appId;
    const countEl = document.getElementById('like-count-' + appId);

    btn.addEventListener('click', () => {
      updateLike(appId, true);
    });

    showLikeCount(appId);

    if (localStorage.getItem('liked-' + appId)) {
      animateLike(appId, true);
    }
  });
});
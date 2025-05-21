// firebase-like.js

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

// Fungsi untuk menambahkan like
function updateLike(appId) {
  // Cek jika user sudah like sebelumnya
  if (localStorage.getItem('liked-' + appId)) return;

  const likeRef = db.ref('likes/' + appId);
  likeRef.transaction(current => (current || 0) + 1)
    .then(() => {
      localStorage.setItem('liked-' + appId, 'true');
      animateLike(appId);
      showLikeCount(appId);
    });
}

// Fungsi untuk menampilkan jumlah like
function showLikeCount(appId) {
  const likeRef = db.ref('likes/' + appId);
  likeRef.on('value', snapshot => {
    const count = snapshot.val() || 0;
    const countEl = document.getElementById('like-count-' + appId);
    if (countEl) {
      countEl.textContent = count;
    }
  });
}

// Fungsi untuk menambahkan animasi jika user sudah like
function animateLike(appId) {
  const countEl = document.getElementById('like-count-' + appId);
  const container = countEl?.closest('.like-container');

  if (countEl) countEl.classList.add('visible');
  if (container) container.classList.add('liked');
}

// Saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.like-button').forEach(btn => {
    const appId = btn.dataset.appId;
    const countEl = document.getElementById('like-count-' + appId);
    const container = countEl?.closest('.like-container');

    // Tambahkan event klik
    btn.addEventListener('click', () => {
      updateLike(appId);
    });

    // Tampilkan jumlah like dari database
    showLikeCount(appId);

    // Jika user sudah like, langsung animasikan
    if (localStorage.getItem('liked-' + appId)) {
      animateLike(appId);
    }
  });
});
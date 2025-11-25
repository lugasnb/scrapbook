/*************************************************
 * SWIPE (Geser kiri/kanan untuk flip halaman)
 *************************************************/
let swipeStartX = 0;
let swipeEndX = 0;
const swipeThreshold = 60; // minimal jarak swipe

document.addEventListener("touchstart", e => {
  swipeStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", e => {
  swipeEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const diff = swipeEndX - swipeStartX;

  if (Math.abs(diff) < swipeThreshold) return;

  if (diff < 0) flipNext();      // Geser kiri → halaman maju
  else flipPrev();               // Geser kanan → halaman mundur
}

function flipNext() {
  const checks = document.querySelectorAll("input[type='checkbox']");
  for (let i = 0; i < checks.length; i++) {
    if (!checks[i].checked) {
      checks[i].checked = true;
      playFlipSound();
      break;
    }
  }
}

function flipPrev() {
  const checks = document.querySelectorAll("input[type='checkbox']");
  for (let i = checks.length - 1; i >= 0; i--) {
    if (checks[i].checked) {
      checks[i].checked = false;
      playFlipSound();
      break;
    }
  }
}

/*************************************************
 * SOUND EFFECT — suara flip halaman
 *************************************************/
const flipSound = new Audio("sound/flip.mp3");
flipSound.volume = 0.6;

function playFlipSound() {
  flipSound.currentTime = 0;
  flipSound.play();
}

// Suara juga aktif saat pengguna klik label halaman
document.querySelectorAll("label").forEach(label => {
  label.addEventListener("click", playFlipSound);
});

/*************************************************
 * BACKGROUND MUSIC (autoplay setelah interaksi)
 *************************************************/
const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.4;

let musicStarted = false;

function startMusic() {
  if (!musicStarted) {
    bgMusic.play().catch(() => {});
    musicStarted = true;
  }
}

// Mulai musik pada interaksi pertama
document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);

// Tombol play/pause musik
document.getElementById("musicBtn").onclick = function () {
  if (bgMusic.paused) {
    bgMusic.play();
    this.textContent = "🔊";
  } else {
    bgMusic.pause();
    this.textContent = "🔇";
  }
};

/*************************************************
 * DRAGGING (geser posisi buku)
 *************************************************/
const book = document.getElementById("book");

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let initialLeft = 0;
let initialTop = 0;

// Mouse
book.addEventListener("mousedown", e => {
  isDragging = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  initialLeft = book.offsetLeft;
  initialTop = book.offsetTop;
  book.style.cursor = "grabbing";
});

document.addEventListener("mousemove", e => {
  if (!isDragging) return;
  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;
  book.style.left = `${initialLeft + dx}px`;
  book.style.top = `${initialTop + dy}px`;
  book.style.transform = "none"; // Hilangkan translate untuk posisi real
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  book.style.cursor = "move";
});

// TOUCH (HP)
book.addEventListener("touchstart", e => {
  const t = e.touches[0];
  isDragging = true;
  dragStartX = t.clientX;
  dragStartY = t.clientY;
  initialLeft = book.offsetLeft;
  initialTop = book.offsetTop;
});

book.addEventListener("touchmove", e => {
  if (!isDragging) return;
  const t = e.touches[0];
  const dx = t.clientX - dragStartX;
  const dy = t.clientY - dragStartY;
  book.style.left = `${initialLeft + dx}px`;
  book.style.top = `${initialTop + dy}px`;
  book.style.transform = "none";
});

book.addEventListener("touchend", () => {
  isDragging = false;
});

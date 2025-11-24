// Delay click interactions until page turn animation completes
document.getElementById('book').addEventListener('click', function () {
  const book = this;

  // Disable pointer events
  book.style.pointerEvents = 'none';

  // Re-enable after 2 seconds
  setTimeout(() => {
    book.style.pointerEvents = '';
  }, 2000);
});

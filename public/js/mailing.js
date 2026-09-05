(function () {
  const form = document.getElementById('mailing-email-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('mailing-email').value.trim();
    if (!email) return;

    // Clear any previous session so the user starts fresh
    if (window.__ResponseControls && window.__ResponseControls.clearSessionId) {
      window.__ResponseControls.clearSessionId();
    }

    const loading = document.getElementById('mailing-loading');
    const card = document.querySelector('.mailing-form');
    card.style.display = 'none';
    if (loading) loading.style.display = 'flex';

    const url = '/mailing/password?email=' + encodeURIComponent(email);
    setTimeout(() => { window.location.href = url; }, 900);
  });
})();

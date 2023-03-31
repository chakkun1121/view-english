// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);
});
finishedScriptNumber++;
function showInstallPromotion() {
  const div = document.createElement('div');
  div.id = 'installPromotion';
  div.classList.add('install-promotion');
  div.innerHTML = `<h1>このアプリはインストールできます。</h1><h2>インストールすることでより快適に利用できます</h2><button id="installButton" onclicl="installApp()">インストール</button>`;
  document.body.appendChild(div);
}

async function installApp() {
  hideInstallPromotion();
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  // Optionally, send analytics event with outcome of user choice
  console.log(`User response to the install prompt: ${outcome}`);
  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt = null;
}
window.addEventListener('appinstalled', () => {
  // Hide the app-provided install promotion
  hideInstallPromotion();
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
  // Optionally, send analytics event to indicate successful install
  console.log('PWA was installed');
});
function hideInstallPromotion() {
  document.getElementById('installPromotion').remove();
}

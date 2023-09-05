function resetApp() {
  localStorage.removeItem('tabInfo');
  localStorage.removeItem('cards');
  localStorage.removeItem('wayakuSettings');
  localStorage.removeItem('wayakuExtensions');
  updata();
}

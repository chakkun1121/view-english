cards = {
  start: function () {
    const wayakuArrary = viewHTMLtoArray(document.getElementById('file').innerHTML);
    localStorage.setItem('cards', JSON.stringify(wayakuArrary));
    window.open(
      '/view-english/app/cards/card.html',
      'window_name',
      `width=1000,height=800,scrollbars=yes`
    );
  },
};

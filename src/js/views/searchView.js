class SearchView {
  _parentEl = document.querySelector('.search');
  getQuery() {
    const query = document.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    document.querySelector('.search__field').value = '';
  }
  addHandelSearch(handel) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handel();
    });
  }
}

export default new SearchView();

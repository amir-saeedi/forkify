import view from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends view {
  _parentElement = document.querySelector('.pagination');
  addHandelClick(handel) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handel(gotoPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numberPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // page 1 ,and we have other page
    if (curPage === 1 && numberPage > 1) {
      return `
            <button data-goto="${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
                <span class:"pageRes">Page ${curPage + 1}</span>
                  <svg class="search__icon">
                   <use href="${icons}#icon-arrow-right"></use>
                 </svg>
            </button>
        `;
    }
    // page last
    if (curPage === numberPage && numberPage > 1) {
      return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span class:"pageRes">Page ${curPage - 1}</span>
          </button>
        `;
    }
    // other page
    if (curPage < numberPage) {
      return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span class:"pageRes">Page ${curPage - 1}</span>
          </button>
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
          <span class:"pageRes">Page ${curPage + 1}</span>
            <svg class="search__icon">
             <use href="${icons}#icon-arrow-right"></use>
           </svg>
            </button>
        `;
    }
    // just 1 page
    if (numberPage === 1) {
      return ``;
    }
  }
}
export default new paginationView();

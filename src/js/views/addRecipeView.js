import view from './View.js';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends view {
  _parentElement = document.querySelector('.upload');
  _message = 'Resipe was succesfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overly = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this._addHandelerShowWindow();
    this._addHandelerHideWindow();
  }
  toggleWindow() {
    this._overly.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandelerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandelerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overly.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandeleUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}
export default new addRecipeView();

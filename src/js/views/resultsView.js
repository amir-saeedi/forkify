import view from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';
class resultsView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new resultsView();

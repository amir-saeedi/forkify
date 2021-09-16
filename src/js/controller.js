import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const ControlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    // 0) Update the results View mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    // 1) load recipe
    await model.loadRecipe(id);
    // 2) Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) get query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) load serch results
    await model.loadSearchResults(query);
    // 3) render results
    // console.log(model.getSearchResultsPage());
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    // 4) render initial pagingation buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};
const controlPagination = function (gotoPage) {
  // 1) render New esults
  resultsView.render(model.getSearchResultsPage(gotoPage));
  // 2) render New initial pagingation buttons
  paginationView.render(model.state.search);
};
const controlServing = function (newServing) {
  // Update the recipe serving (in state)
  model.updateServing(newServing);
  // Update the recipe view
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //
  recipeView.update(model.state.recipe);
  //
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);

    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(ControlRecipes);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandelSearch(controlSearchResults);
  paginationView.addHandelClick(controlPagination);
  addRecipeView.addHandeleUpload(controlAddRecipe);
};
init();

// responsiv page
const form = document.querySelector('.search');
const results = document.querySelector('.results');
const serch = document.querySelector('.search-results');
const btnList = document.querySelector('.nav-bar');
const positonList = document.querySelector('.positonList');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  serch.style.display = 'block';
  positonList.textContent = 'Hidden List';
  serch.classList.remove('showList');
  serch.classList.remove('hidden');
});
btnList.addEventListener('click', function () {
  if (!serch.classList.contains('showList')) {
    serch.style.display = 'none';
    serch.classList.add('hidden');
    serch.classList.toggle('showList');
    positonList.textContent = 'Show List';
  } else {
    serch.style.display = 'block';
    setTimeout(function () {
      serch.classList.remove('hidden');
      serch.classList.toggle('showList');
      positonList.textContent = 'Hidden List';
    }, 10);
  }
});

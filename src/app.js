import './css/app.scss';

import Search from './js/models/Search';
import * as searchView from './js/views/searchView';
import * as autocompleteView from './js/views/autocompleteView';
import { elements, countries, displayError, hideError, displayLoader, removeLoader, disableElements, enableElements } from './js/base';

const state = {};

// Search Controller

const controlSearch = async () => {
	const abbr = searchView.getAbbr( countries );

	if ( abbr ) {
		state.search = new Search( abbr, 500, 'value', 'desc', 'pm25' );

		disableElements();
		hideError();
		displayLoader( elements.cityList );
		autocompleteView.clearAutocomplete();
		searchView.clearCities();

		try {
			await state.search.getPollutedCities();
			await state.search.getCities();

			searchView.displayCities( state.search.cities );
		} catch ( error ) {
			displayError( 'Something went wrong, please try again' );
		}

		enableElements();
		removeLoader();
	} else {
		autocompleteView.clearAutocomplete();
		displayError( 'Wrong country provided' );
	}
};

elements.form.addEventListener( 'keyup', ( e ) => {
	if ( e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 13 || e.keyCode === 27 ) {
		e.preventDefault();

		return;
	}

	if ( e.target.matches( '.btn-primary' ) ) {
		autocompleteView.clearAutocomplete();

		return;
	}

	autocompleteView.clearAutocomplete();
	autocompleteView.displayAutocomplete();
} );

elements.searchInput.addEventListener( 'keydown', ( e ) => {
	if ( e.keyCode === 40 ) {
		autocompleteView.highlightItemByKey( 'down' );
	} else if ( e.keyCode === 38 ) {
		e.preventDefault();
		autocompleteView.highlightItemByKey( 'up' );
	} else if ( e.keyCode === 13 ) {
		e.preventDefault();
		searchView.setInputValue();
		controlSearch();
	} else if ( e.keyCode === 27 ) {
		e.target.value = '';
		autocompleteView.clearAutocomplete();
	}
} );

elements.autocompleteList.addEventListener( 'mouseover', ( e ) => {
	autocompleteView.removeHighlight();

	if ( e.target.matches( '.list_autocomplete .list__item, .list_autocomplete .list__item *' ) ) {
		autocompleteView.highlightItemByMouse( e );
	}
} );

elements.autocompleteList.addEventListener( 'mouseleave', () => {
	autocompleteView.removeHighlight();
} );

window.addEventListener( 'click', ( e ) => {
	if ( e.target.matches( '.list_autocomplete .list__item, .list_autocomplete .list__item *, .btn-primary' ) ) {
		searchView.setInputValue();
		controlSearch();

		return;
	}

	autocompleteView.clearAutocomplete();

	if ( e.target.matches( '.form-control' ) ) {
		autocompleteView.displayAutocomplete();
	}
} );

window.addEventListener( 'load', () => {
	const value = localStorage.getItem( 'inputValue' );

	elements.searchInput.value = value;
} );

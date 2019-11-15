import { getInputValue } from './searchView';
import { countries, elements } from '../base';

export const getItems = () => elements.autocompleteList.querySelectorAll( '.list__item' );

export const removeHighlight = () => {
	const items = getItems();

	if ( items.length ) {
		items.forEach( ( item ) => {
			item.classList.remove( 'list__item_active' );
		} );
	}
};

export const filterArray = ( string ) => {
	const isEmpty = /^\s*$/.test( string );

	let arr = [];

	if ( !isEmpty ) {
		arr = countries.filter( ( item ) => item.slice( 0, string.length ) === string.toLowerCase() );
	}

	return arr;
};

export const clearAutocomplete = () => {
	const value = getInputValue();

	localStorage.setItem( 'inputValue', value );
	elements.autocompleteList.innerHTML = '';
};

export const displayAutocomplete = () => {
	const value = getInputValue();
	const items = filterArray( value );

	if ( items.length ) {
		const html = [];

		items.forEach( ( item ) => {
			html.push( `
				<li class="list__item">${ item.charAt( 0 ).toUpperCase() + item.slice( 1 ).toLowerCase() }</li>
			` );
		} );

		elements.autocompleteList.insertAdjacentHTML( 'beforeend', html.join( '' ) );
	}
};

export const highlightItemByMouse = ( e ) => {
	e.target.classList.add( 'list__item_active' );
};

export const highlightItemByKey = ( arrow ) => {
	const items = Array.from( getItems() );

	if ( items.length ) {
		let index = items.findIndex( ( item ) => item.classList.contains( 'list__item_active' ) );

		removeHighlight();

		if ( arrow === 'down' ) {
			index = index === items.length - 1 ? 0 : ++index;
		} else if ( arrow === 'up' ) {
			index = index <= 0 ? items.length - 1 : --index;
		}

		items[ index ].classList.add( 'list__item_active' );
	}
};

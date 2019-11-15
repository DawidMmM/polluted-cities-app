export const countries = [ 'poland', 'germany', 'spain', 'france' ];

export const abbr = [ 'PL', 'DE', 'ES', 'FR' ];

export const elements = {
	form: document.querySelector( '.form' ),
	searchInput: document.querySelector( '.form-control' ),
	searchButton: document.querySelector( '.btn-primary' ),
	autocompleteList: document.querySelector( '.list_autocomplete' ),
	cityList: document.querySelector( '.list_cities' ),
	error: document.querySelector( '.error' )
};

export const elementStrings = {
	loader: 'loader'
};

export const displayError = ( text ) => {
	elements.error.textContent = text;
};

export const hideError = () => {
	elements.error.textContent = '';
};

export const displayLoader = ( element ) => {
	const loader = `        
        <div class="${ elementStrings.loader }" aria-busy="true" role="progressbar">
		  	<span class="sr-only">Loading content...</span>
		</div>
    `;

	element.insertAdjacentHTML( 'beforebegin', loader );
};

export const removeLoader = () => {
	const loader = document.querySelector( `.${ elementStrings.loader }` );

	if ( loader ) {
		loader.parentNode.removeChild( loader );
	}
};

export const disableElements = () => {
	elements.searchButton.setAttribute( 'disabled', true );
	elements.searchInput.setAttribute( 'disabled', true );
};

export const enableElements = () => {
	elements.searchButton.removeAttribute( 'disabled' );
	elements.searchInput.removeAttribute( 'disabled' );
};

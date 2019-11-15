import axios from 'axios';
import 'regenerator-runtime/runtime';

const setDate = ( date ) => {
	const year = date.getUTCFullYear();
	const month = `0${ date.getUTCMonth() + 1 }`.slice( -2 );
	const day = `0${ date.getUTCDate() }`.slice( -2 );

	return `${ year }-${ month }-${ day }`;
};

const setTitles = ( items ) => {
	const str = items.map( ( item ) => item.city.split( '/' )[ 0 ] );

	return encodeURIComponent( str.join( '|' ) );
};

const removeDuplicates = ( items ) => {
	const arr = items.filter( ( item, index, array ) => {
		return index === array.findIndex( ( element ) => {
			return element.city === item.city;
		} );
	} );

	arr.splice( 10 );

	return arr;
};

export default class Search {
	constructor( abbr, limit, orderBy, sort, parameter, dateFrom ) {
		this.abbr = abbr;
		this.limit = limit;
		this.orderBy = orderBy;
		this.sort = sort;
		this.parameter = parameter;
		this.dateFrom = dateFrom ? new Date( dateFrom ) : new Date();
	}

	async getPollutedCities() {
		try {
			const response = await axios( `https://api.openaq.org/v1/measurements?country=${ this.abbr }&limit=${ this.limit }&order_by=${ this.orderBy }&sort=${ this.sort }&parameter=${ this.parameter }&date_from=${ setDate( this.dateFrom ) }` );

			this.pollutedCities = removeDuplicates( response.data.results );
		} catch ( error ) {
			console.log( error.message );
		}

	}

	async getCities() {
		try {
			const response = await axios( `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&explaintext&redirects=1&prop=extracts&exintro&exsentences=2&titles=${ setTitles( this.pollutedCities ) }` );

			this.cities = response.data.query.pages;
		} catch ( error ) {
			console.log( error.message );
		}
	}
}

/**
 * External dependencies
 */
import {
	AttributeObject,
	AttributeObjectForDisplay,
	AttributeQuery,
	AttributeTerm,
} from '@woocommerce/types';
import { sort } from 'fast-sort';

/**
 * Given a query object, removes an attribute filter by a single slug.
 *
 * @param {Array}    query     Current query object.
 * @param {Function} setQuery  Callback to update the current query object.
 * @param {Object}   attribute An attribute object.
 * @param {string}   slug      Term slug to remove.
 */
export const removeAttributeFilterBySlug = (
	query: AttributeQuery[] = [],
	setQuery: ( query: AttributeQuery[] ) => void,
	attribute: AttributeObject,
	slug = ''
) => {
	// Get current filter for provided attribute.
	const foundQuery = query.filter(
		( item ) => item.attribute === attribute.taxonomy
	);

	const currentQuery = foundQuery.length ? foundQuery[ 0 ] : null;

	if (
		! currentQuery ||
		! currentQuery.slug ||
		! Array.isArray( currentQuery.slug ) ||
		! currentQuery.slug.includes( slug )
	) {
		return;
	}

	const newSlugs = currentQuery.slug.filter( ( item ) => item !== slug );

	// Remove current attribute filter from query.
	const returnQuery = query.filter(
		( item ) => item.attribute !== attribute.taxonomy
	);

	// Add a new query for selected terms, if provided.
	if ( newSlugs.length > 0 ) {
		currentQuery.slug = newSlugs.sort();
		returnQuery.push( currentQuery );
	}

	setQuery( sort( returnQuery ).asc( 'attribute' ) );
};

/**
 * Given a query object, sets the query up to filter by a given attribute and attribute terms.
 *
 * @param {Array}    query          Current query object.
 * @param {Function} setQuery       Callback to update the current query object.
 * @param {Object}   attribute      An attribute object.
 * @param {Array}    attributeTerms Array of term objects.
 * @param {string}   operator       Operator for the filter. Valid values: in, and.
 *
 * @return {Object} An attribute object.
 */
export const updateAttributeFilter = (
	query: AttributeQuery[] = [],
	setQuery: ( query: AttributeQuery[] ) => void,
	attribute?: AttributeObjectForDisplay,
	attributeTerms: AttributeTerm[] = [],
	operator: 'in' | 'and' = 'in'
) => {
	if ( ! attribute || ! attribute.taxonomy ) {
		return [];
	}

	const returnQuery = query.filter(
		( item ) => item.attribute !== attribute.taxonomy
	);

	if ( attributeTerms.length === 0 ) {
		setQuery( returnQuery );
	} else {
		returnQuery.push( {
			attribute: attribute.taxonomy,
			operator,
			slug: attributeTerms.map( ( { slug } ) => slug ).sort(),
		} );
		setQuery( sort( returnQuery ).asc( 'attribute' ) );
	}

	return returnQuery;
};

/**
 * Internal dependencies
 */
import { Pattern } from '~/customize-store/types/pattern';
import { useInsertPattern } from './use-insert-pattern';
import { usePatterns } from './use-patterns';

export const useInsertPatternByName = () => {
	const { blockPatterns, isLoading } = usePatterns();
	const { insertPattern } = useInsertPattern();

	const insertPatternByName = ( name: string ) => {
		if ( isLoading ) {
			return;
		}

		const pattern = blockPatterns.find( ( p: Pattern ) => p.name === name );

		if ( ! pattern ) {
			return;
		}

		insertPattern( pattern );
	};

	return {
		insertPatternByName,
		isLoading,
	};
};

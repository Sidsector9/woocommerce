/**
 * Internal dependencies
 */
import './CardHeaderTitle.scss';

export const CardHeaderTitle: React.FC< React.PropsWithChildren > = ( {
	children,
} ) => {
	return (
		<div className="woocommerce-marketing-card-header-title">
			{ children }
		</div>
	);
};

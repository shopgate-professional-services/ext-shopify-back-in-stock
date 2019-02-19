import { connect } from 'react-redux';
import { getBaseProductId } from '@shopgate/pwa-common-commerce/product/selectors/product';
import { getVariantId, shouldShowInStockForm } from '../../selectors';
// import fetchProductsById from '@shopgate/pwa-common-commerce/product/actions/fetchProductsById';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} props Given component props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  productNumber: getBaseProductId(state, props),
  variantNumber: getVariantId(state, props),
  showForm: shouldShowInStockForm(state, props),
}
);

/**
 * Maps the contents of the state to the component props.
 * @param  {Function} dispatch The redux dispatch function.
 * @return {Object} The extended component props.
 */
// const mapDispatchToProps = dispatch => ({
//   getProducts: id => (
//     dispatch(fetchProductsById([id]))
//   ),
// });

export default connect(mapStateToProps);

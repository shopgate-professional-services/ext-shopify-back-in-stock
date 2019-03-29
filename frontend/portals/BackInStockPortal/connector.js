import { connect } from 'react-redux';
import { getBaseProductId } from '@shopgate/pwa-common-commerce/product/selectors/product';
import { getUserEmail } from '@shopgate/pwa-common/selectors/user';
import {
  getVariantId,
  getShouldShowInStockForm,
  getInStockNotificationConfirmationMessage,
  getInStockNotificationConfirmationisFetching,
  getInStockNotificationConfirmationStatus,
} from '../../selectors';
import { sendInStockNotificationRequest } from '../../actions';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} props Given component props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  productNumber: getBaseProductId(state, props),
  variantNumber: getVariantId(state, props),
  showForm: getShouldShowInStockForm(state, props),
  email: getUserEmail(state),
  confirmationMessage: getInStockNotificationConfirmationMessage(state, props),
  confirmationStatus: getInStockNotificationConfirmationStatus(state, props),
  confirmationIsFetching: getInStockNotificationConfirmationisFetching(state, props),
}
);

/**
 * Maps the contents of the state to the component props.
 * @param  {Function} dispatch The redux dispatch function.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  sendRequest: (productNumber, variantNumber, email) => (
    dispatch(sendInStockNotificationRequest(productNumber, variantNumber, email))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps);

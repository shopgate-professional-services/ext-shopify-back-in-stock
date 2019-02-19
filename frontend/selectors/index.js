import { createSelector } from 'reselect';
import {
  getProductId,
  hasProductVariants,
  isProductOrderable,
} from '@shopgate/pwa-common-commerce/product/selectors/product';
import { isProductPageLoading } from '@shopgate/pwa-common-commerce/product/selectors/page';
import { REDUX_NAMESPACE_IN_STOCK_NOTIFICATIONS_CONFIRMATIONS } from '../constants';

const getInStockNotificationConfirmationsState = state =>
  state.extensions[REDUX_NAMESPACE_IN_STOCK_NOTIFICATIONS_CONFIRMATIONS];

export const getVariantId = createSelector(
  getProductId,
  hasProductVariants,
  (productId, baseProductId, hasVariants) => {
    if (productId && !hasVariants) {
      return productId;
    }
    return null;
  }
);

export const getShouldShowInStockForm = createSelector(
  hasProductVariants,
  isProductOrderable,
  isProductPageLoading,
  (hasVariants, isOrderable, isLoading) => (!hasVariants && !isOrderable && !isLoading)
);

export const getInStockNotificationConfirmation = createSelector(
  getInStockNotificationConfirmationsState,
  (state, props) => props,
  (confirmations, { productId }) => confirmations[productId]
);

export const getInStockNotificationConfirmationMessage = createSelector(
  getInStockNotificationConfirmation,
  (confirmation) => {
    const { message } = confirmation || {};
    return message || null;
  }
);

export const getInStockNotificationConfirmationStatus = createSelector(
  getInStockNotificationConfirmation,
  (confirmation) => {
    const { status } = confirmation || {};
    return status || null;
  }
);

export const getInStockNotificationConfirmationisFetching = createSelector(
  getInStockNotificationConfirmation,
  (confirmation) => {
    const { isFetching } = confirmation || {};
    return !!isFetching;
  }
);

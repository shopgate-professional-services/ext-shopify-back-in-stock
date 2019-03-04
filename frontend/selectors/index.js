import { createSelector } from 'reselect';
import {
  getBaseProductId,
  getProductId,
  hasProductVariants,
  isProductOrderable,
  getProductById,
} from '@shopgate/pwa-common-commerce/product/selectors/product';
import { isProductPageLoading } from '@shopgate/pwa-common-commerce/product/selectors/page';
import { REDUX_NAMESPACE_IN_STOCK_NOTIFICATIONS_CONFIRMATIONS } from '../constants';
import parseJson from '../helpers/parseJson';

/**
 * Get shopify variant id from custom data
 * @param {Object} state Redux state,
 * @param {Object} props Component props
 * @return {string}
 */
export const getShopifyVariant = createSelector(
  getProductById,
  (product) => {
    const { productData } = product || {};
    const { customData } = productData || {};
    const customDataObject = parseJson(customData);
    const { variant_id: shopifyVariantId } = customDataObject || {};
    return shopifyVariantId ? `${shopifyVariantId}` : null;
  }
);

/**
 * Get Variant Id
 * @param {Object} state Redux state,
 * @param {Object} props Component props
 * @return {string}
 */
export const getVariantId = createSelector(
  getProductId,
  hasProductVariants,
  getShopifyVariant,
  (productId, hasVariants, shopifyVariant) => {
    if (shopifyVariant && !hasVariants) {
      return shopifyVariant;
    }
    return productId;
  }
);

/**
 * Get Notification Confirmation States
 * @param {Object} state Redux state
 * @return {Object|null}
 */
const getInStockNotificationConfirmationsState = state =>
  state.extensions[REDUX_NAMESPACE_IN_STOCK_NOTIFICATIONS_CONFIRMATIONS];

/**
 * Determine if request in stock notification form should be shown.
 * @param {Object} state Redux state,
 * @param {Object} props Component props
 * @return {boolean}
 */
export const getShouldShowInStockForm = createSelector(
  hasProductVariants,
  isProductOrderable,
  isProductPageLoading,
  (hasVariants, isOrderable, isLoading) => (!hasVariants && !isOrderable && !isLoading)
);

/**
 * Get In stock notification request notification for a specific product.
 * @param {Object} state Redux state,
 * @param {Object} props Component props
 * @return {Object|undefined}
 */
export const getInStockNotificationConfirmation = createSelector(
  getBaseProductId,
  getVariantId,
  getInStockNotificationConfirmationsState,
  (baseProductId, variantId, confirmations) =>
    (confirmations ? confirmations[`${baseProductId}_${variantId}`] : null)
);

/**
 * Get In stock notification request notification message for a specific product.
 * @param {Object} state Redux state,
 * @param {Object} props Component props
 * @return {string}
 */
export const getInStockNotificationConfirmationMessage = createSelector(
  getInStockNotificationConfirmation,
  (confirmation) => {
    const { message } = confirmation || {};
    return message || null;
  }
);

/**
 * Get In stock notification request notification status for a specific product.
 * @param {Object} state Redux state,
 * @param {Object} props Component props
 * @return {string}
 */
export const getInStockNotificationConfirmationStatus = createSelector(
  getInStockNotificationConfirmation,
  (confirmation) => {
    const { status } = confirmation || {};
    return status || null;
  }
);

/**
 * Is a stock notification request for a specific product request in process.
 * @param {Object} state Redux state,
 * @param {Object} props Component props
 * @return {boolean}
 */
export const getInStockNotificationConfirmationisFetching = createSelector(
  getInStockNotificationConfirmation,
  (confirmation) => {
    const { isFetching } = confirmation || {};
    return !!isFetching;
  }
);


import { createSelector } from 'reselect';
import {
  getProductId,
  hasProductVariants,
  isProductOrderable,
} from '@shopgate/pwa-common-commerce/product/selectors/product';
import { isProductPageLoading } from '@shopgate/pwa-common-commerce/product/selectors/page';

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

export const shouldShowInStockForm = createSelector(
  hasProductVariants,
  isProductOrderable,
  isProductPageLoading,
  (hasVariants, isOrderable, isLoading) => (!hasVariants && !isOrderable && !isLoading)
);

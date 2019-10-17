import {
  getShopifyVariant,
  getVariantId,
  getShouldShowInStockForm,
  getInStockNotificationConfirmationMessage,
  getInStockNotificationConfirmationStatus,
  getInStockNotificationConfirmationisFetching,
} from './index';

import { REDUX_NAMESPACE_IN_STOCK_NOTIFICATIONS_CONFIRMATIONS } from '../constants';

const BACK_IN_STOCK_MOCK_MESSAGE = 'mock message';
const BACK_IN_STOCK_MOCK_STATUS = 'mock status';
const MOCK_SHOPIFY_VARIANT_ID = 1176811539;
const MOCK_SHOPIFY_VARIANT_ID_STRING = MOCK_SHOPIFY_VARIANT_ID.toString();
const MOCK_PROUDCUT_ID = 'testProduct';
const GENERIC_CUSTOM_DATA = `{"variant_id": ${MOCK_SHOPIFY_VARIANT_ID}}`;
const MOCK_PROPS = {
  productId: MOCK_PROUDCUT_ID,
};

/**
 * Returns generic product state
 * @return {Object}
 */
const getGenericProductState = () => ({
  product: {
    productsById: {
      [MOCK_PROUDCUT_ID]: {
        productData: {
          id: MOCK_PROUDCUT_ID,
        },
      },
    },
  },
});

/**
 * Returns product state in which the product has the customData property
 * @return {{product}}
 */
const getProductStateWithCustomData = () => {
  const productState = getGenericProductState();
  productState.product.productsById[MOCK_PROUDCUT_ID].productData.customData = GENERIC_CUSTOM_DATA;
  return productState;
};

const MOCK_IN_STOCK_STATE = {
  extensions: {
    [REDUX_NAMESPACE_IN_STOCK_NOTIFICATIONS_CONFIRMATIONS]: {
      [`${MOCK_PROUDCUT_ID}_${MOCK_SHOPIFY_VARIANT_ID}`]: {
        message: BACK_IN_STOCK_MOCK_MESSAGE,
        status: BACK_IN_STOCK_MOCK_STATUS,
        isFetching: true,
      },
    },
  },
  ...getProductStateWithCustomData(),
};

const MOCK_EMPTY_IN_STOCK_STATE = {
  extensions: {},
  ...getProductStateWithCustomData(),
};

describe('Selectors', () => {
  describe('getShopifyVariant', () => {
    it('should return shopifyVariant', () => {
      const result = getShopifyVariant(getProductStateWithCustomData(), MOCK_PROPS);
      expect(result).toEqual(MOCK_SHOPIFY_VARIANT_ID_STRING);
    });

    it('should return null because there is not customData object', () => {
      const result = getShopifyVariant(getGenericProductState(), MOCK_PROPS);
      expect(result).toEqual(null);
    });
  });
  describe('getVariantId', () => {
    it('should return product id because product has no variants and no shopify variant', () => {
      const state = getGenericProductState();
      state.product.productsById[MOCK_PROUDCUT_ID].productData.customData = '{}';
      const result = getVariantId(state, MOCK_PROPS);
      expect(result).toEqual(MOCK_PROUDCUT_ID);
    });
    it('should return shopify variant because has variants is false and shopify variant exists', () => {
      const state = getProductStateWithCustomData();
      state.product.productsById[MOCK_PROUDCUT_ID].productData.flags = { hasVariants: false };
      const result = getVariantId(state, MOCK_PROPS);
      expect(result).toEqual(MOCK_SHOPIFY_VARIANT_ID_STRING);
    });

    it('should return product id because has variants is true despite shopify variant exists', () => {
      const state = getProductStateWithCustomData();
      state.product.productsById[MOCK_PROUDCUT_ID].productData.flags = { hasVariants: true };
      const result = getVariantId(state, MOCK_PROPS);
      expect(result).toEqual(MOCK_PROUDCUT_ID);
    });
  });
  describe('getShouldShowInStockForm', () => {
    it('should return true because product has no variants, is not orderable and the page is not loading', () => {
      const state = getProductStateWithCustomData();
      state.product.productsById[MOCK_PROUDCUT_ID].productData.flags = { hasVariants: false };
      state.product.productsById[MOCK_PROUDCUT_ID].productData.stock = { orderable: false };
      const result = getShouldShowInStockForm(state, MOCK_PROPS);
      expect(result).toEqual(true);
    });
    it('should return false because product has no variants, is orderable and the page is not loading', () => {
      const state = getGenericProductState();
      state.product.productsById[MOCK_PROUDCUT_ID].productData.flags = { hasVariants: false };
      state.product.productsById[MOCK_PROUDCUT_ID].productData.stock = { orderable: true };
      const result = getShouldShowInStockForm(state, MOCK_PROPS);
      expect(result).toEqual(false);
    });
  });
  describe('getInStockNotificationConfirmationMessage', () => {
    it('should get back in stock message', () => {
      const result = getInStockNotificationConfirmationMessage(MOCK_IN_STOCK_STATE, MOCK_PROPS);
      expect(result).toEqual(BACK_IN_STOCK_MOCK_MESSAGE);
    });

    it('should return null', () => {
      const result
        = getInStockNotificationConfirmationMessage(MOCK_EMPTY_IN_STOCK_STATE, MOCK_PROPS);
      expect(result).toEqual(null);
    });
  });
  describe('getInStockNotificationConfirmationStatus', () => {
    it('should get back in stock status', () => {
      const result = getInStockNotificationConfirmationStatus(MOCK_IN_STOCK_STATE, MOCK_PROPS);
      expect(result).toEqual(BACK_IN_STOCK_MOCK_STATUS);
    });

    it('should return null', () => {
      const result
        = getInStockNotificationConfirmationStatus(MOCK_EMPTY_IN_STOCK_STATE, MOCK_PROPS);
      expect(result).toEqual(null);
    });
  });
  describe('getInStockNotificationConfirmationStatus', () => {
    it('should get back in stock status', () => {
      const result = getInStockNotificationConfirmationisFetching(MOCK_IN_STOCK_STATE, MOCK_PROPS);
      expect(result).toEqual(true);
    });

    it('should return null', () => {
      const result
        = getInStockNotificationConfirmationisFetching(MOCK_EMPTY_IN_STOCK_STATE, MOCK_PROPS);
      expect(result).toEqual(false);
    });
  });
});

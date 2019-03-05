import backInStockNotificationReducer from './index';
import {
  RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION,
  REQUEST_IN_STOCK_NOTIFICATION,
  ERROR_IN_STOCK_NOTIFICATION,
} from '../constants';

const PRODUCT_NUMBER = 'testProduct';
const VARIANT_NUMBER = '123';

describe('In Stock Notification Reducer', () => {
  it('should return the initial state', () => {
    expect(backInStockNotificationReducer(undefined, {})).toEqual({});
  });
  it('should update state to include new confirmation in fetching state', () => {
    const EMAIL = 'someone@someplace.com';
    const MOCK_REQUEST_ACTION = {
      type: REQUEST_IN_STOCK_NOTIFICATION,
      email: EMAIL,
      productNumber: PRODUCT_NUMBER,
      variantNumber: VARIANT_NUMBER,
    };
    expect(backInStockNotificationReducer({}, MOCK_REQUEST_ACTION))
      .toEqual({
        [`${PRODUCT_NUMBER}_${VARIANT_NUMBER}`]: {
          isFetching: true,
          expires: 0,
        },
      });
  });
  it('should update state to reflect that a confirmation was received', () => {
    const MESSAGE = 'Some message';
    const STATUS = 'ok';
    const MOCK_RECEIVE_ACTION = {
      type: RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION,
      message: MESSAGE,
      status: STATUS,
      productNumber: PRODUCT_NUMBER,
      variantNumber: VARIANT_NUMBER,
    };
    const result = backInStockNotificationReducer({}, MOCK_RECEIVE_ACTION);
    const updatedState = result[`${PRODUCT_NUMBER}_${VARIANT_NUMBER}`];
    expect(updatedState).toHaveProperty('message', MESSAGE);
    expect(updatedState).toHaveProperty('status', STATUS);
    expect(updatedState).toHaveProperty('isFetching', false);
    expect(updatedState.expires > 0);
  });
  it('should product error state', () => {
    const MOCK_ERROR_ACTION = {
      type: ERROR_IN_STOCK_NOTIFICATION,
      productNumber: PRODUCT_NUMBER,
      variantNumber: VARIANT_NUMBER,
    };
    expect(backInStockNotificationReducer({}, MOCK_ERROR_ACTION))
      .toEqual({
        [`${PRODUCT_NUMBER}_${VARIANT_NUMBER}`]: {
          isFetching: false,
          expires: 0,
          status: 'error',
        },
      });
  });
});

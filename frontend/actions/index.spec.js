import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockedPipelineRequestFactory } from '@shopgate/pwa-core/classes/PipelineRequest/mock';
import { sendInStockNotificationRequest } from './index';
import {
  RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION,
  REQUEST_IN_STOCK_NOTIFICATION,
  ERROR_IN_STOCK_NOTIFICATION,
} from '../constants';

const EMAIL = 'someone@someplace.com';
const PRODUCT_NUMBER = 'testProduct';
const VARIANT_NUMBER = '123';
const MESSAGE = 'some fantastic message';
const STATUS = 'ok';
const GENERAL_REQUEST_ACTIION = {
  type: REQUEST_IN_STOCK_NOTIFICATION,
  productNumber: PRODUCT_NUMBER,
  variantNumber: VARIANT_NUMBER,
  email: EMAIL,
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let mockedResolver = () => {};

jest.mock('@shopgate/pwa-core/helpers', () => ({
  logger: {
    error: jest.fn(),
  },
}));

jest.mock('@shopgate/pwa-core/classes/PipelineRequest', () => (
  mockedPipelineRequestFactory((mockInstance, resolve, reject) => {
    mockedResolver(mockInstance, resolve, reject);
  })
));

describe('sendInStockNotificationRequest()', () => {
  it('should call dispatch and Pipeline', () => {
    const expectedActions = [
      GENERAL_REQUEST_ACTIION,
      {
        type: RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION,
        message: MESSAGE,
        status: STATUS,
        productNumber: PRODUCT_NUMBER,
        variantNumber: VARIANT_NUMBER,
      },
    ];
    mockedResolver = (mockInstance, resolve) => {
      resolve({
        message: MESSAGE,
        status: STATUS,
      });
    };
    const store = mockStore({});
    return store.dispatch(sendInStockNotificationRequest(PRODUCT_NUMBER, VARIANT_NUMBER, EMAIL))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should dispatch error action when there is a pipeline error', () => {
    const expectedActions = [
      GENERAL_REQUEST_ACTIION,
      {
        type: ERROR_IN_STOCK_NOTIFICATION,
        productNumber: PRODUCT_NUMBER,
        variantNumber: VARIANT_NUMBER,
      },
    ];
    mockedResolver = (mockInstance, resolve, reject) => {
      reject();
    };
    const store = mockStore({});
    return store.dispatch(sendInStockNotificationRequest(PRODUCT_NUMBER, VARIANT_NUMBER, EMAIL))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

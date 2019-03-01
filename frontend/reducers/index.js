import {
  ERROR_IN_STOCK_NOTIFICATION,
  RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION,
  REQUEST_IN_STOCK_NOTIFICATION,
} from '../constants';

/**
 * back In Stock Notification reducer.
 * @param {Object} state State.
 * @param {Object} action Action.
 * @returns {Object}
 */
const backInStockNotificationReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case REQUEST_IN_STOCK_NOTIFICATION:
      return {
        ...state,
        [`${action.productNumber}_${action.variantNumber}`]: {
          ...state[`${action.productNumber}_${action.variantNumber}`],
          isFetching: true,
          expires: 0,
        },
      };
    case RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION:
      return {
        ...state,
        [`${action.productNumber}_${action.variantNumber}`]: {
          ...state[`${action.productNumber}_${action.variantNumber}`],
          message: action.message,
          status: action.status,
          isFetching: false,
          expires: Date.now() + 3600000,
        },
      };
    case ERROR_IN_STOCK_NOTIFICATION:
      return {
        ...state,
        [`${action.productNumber}_${action.variantNumber}`]: {
          ...state[`${action.productNumber}_${action.variantNumber}`],
          isFetching: false,
          status: 'error',
          expires: 0,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default backInStockNotificationReducer;

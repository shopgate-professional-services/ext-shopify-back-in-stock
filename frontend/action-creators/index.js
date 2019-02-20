import {
  RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION,
  REQUEST_IN_STOCK_NOTIFICATION,
  ERROR_IN_STOCK_NOTIFICATION,
} from '../constants';

/**
 * RequestDummies action.
 * @param {string} productNumber Base Product id for which the notification is being requested.
 * @param {string} variantNumber Variant id for which the notification is being requested.
 * @param {string} email Email Address to which the notification will be sent.
 * @returns {Object}
 */
export const requestInStockNotification = (productNumber, variantNumber, email) => ({
  type: REQUEST_IN_STOCK_NOTIFICATION,
  productNumber,
  variantNumber,
  email,
});

/**
 * ReceiveDummies action.
 * @param {string} productId Product Id for which notification was confirmed.
 * @param {string} status Confirmation status.
 * @param {string} message Confirmation message.
 * @returns {Object}
 */
export const receiveInStockNotificationConfirmation = (productId, status, message) => ({
  type: RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION,
  productId,
  status,
  message,
});

/**
 * ErrorDummies action.
 * @param {string} productId dummyId.
 * @returns {Object}
 */
export const errorInStockNotification = productId => ({
  type: ERROR_IN_STOCK_NOTIFICATION,
  productId,
});

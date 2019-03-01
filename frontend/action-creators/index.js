import {
  RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION,
  REQUEST_IN_STOCK_NOTIFICATION,
  ERROR_IN_STOCK_NOTIFICATION,
} from '../constants';

/**
 * RequestInStockNotification action.
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
 * ReceiveInStockNotification action.
 * @param {string} productNumber Product Id for which notification was confirmed.
 * @param {string} variantNumber Variant Id for which notification was confirmed.
 * @param {string} status Confirmation status.
 * @param {string} message Confirmation message.
 * @returns {Object}
 */
export const receiveInStockNotificationConfirmation =
  (productNumber, variantNumber, status, message) => ({
    type: RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION,
    productNumber,
    variantNumber,
    status,
    message,
  });

/**
 * ErrorInStockNotifications action.
 * @param {string} productNumber Product Id.
 * @param {string} variantNumber Variant Id
 * @returns {Object}
 */
export const errorInStockNotification = (productNumber, variantNumber) => ({
  type: ERROR_IN_STOCK_NOTIFICATION,
  productNumber,
  variantNumber,
});

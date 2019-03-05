import { logger } from '@shopgate/pwa-core/helpers';
import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import {
  errorInStockNotification,
  receiveInStockNotificationConfirmation,
  requestInStockNotification,
} from '../action-creators';
import { IN_STOCK_NOTIFICATION_PIPELINE } from '../constants';

/**
 * Send In Stock Notification Request action.
 * @param {string} productNumber Base Product id for which the notification is being requested.
 * @param {string} variantNumber Variant id for which the notification is being requested.
 * @param {string} email Email Address to which the notification will be sent.
 * @returns {Function}
 */
export const sendInStockNotificationRequest =
  (productNumber, variantNumber, email) => (dispatch) => {
    dispatch(requestInStockNotification(productNumber, variantNumber, email));

    return new PipelineRequest(IN_STOCK_NOTIFICATION_PIPELINE)
      .setInput({
        productNumber,
        variantNumber,
        email,
      })
      .dispatch()
      .then((response) => {
        dispatch(receiveInStockNotificationConfirmation(productNumber, variantNumber, response.status, response.message));
      })
      .catch((err) => {
        logger.error(err);
        dispatch(errorInStockNotification(productNumber, variantNumber));
      });
  };

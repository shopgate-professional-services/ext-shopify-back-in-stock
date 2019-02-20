import { themeConfig } from '@shopgate/pwa-common/helpers/config/index';
import getConfig from './helpers/getConfig';

const { colors } = themeConfig;

const {
  backInStockOpenFormButtonText,
  backInStockFormSubmitButtonText,
  backInStockSubmissionConfirmationText,
  backInStockButtonColor,
  backInStockButtonTextColor,
} = getConfig();

export const RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION = 'RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION';
export const REQUEST_IN_STOCK_NOTIFICATION = 'REQUEST_IN_STOCK_NOTIFICATION';
export const ERROR_IN_STOCK_NOTIFICATION = 'ERROR_IN_STOCK_NOTIFICATION';

export const IN_STOCK_NOTIFICATION_PIPELINE = 'shopgate-project.shopify-back-in-stock.inStockRequestPipeline';

export const REDUX_NAMESPACE_IN_STOCK_NOTIFICATIONS_CONFIRMATIONS = '@shopgate-project/shopify-back-in-stock/inStockNotificationConfirmations';

export const IN_STOCK_NOTIFICATION_HEADER_TEXT = backInStockOpenFormButtonText || 'inStockNotification.header.before_submit';
export const IN_STOCK_NOTIFICATION_HEADER_TEXT_SENT = backInStockSubmissionConfirmationText || 'inStockNotification.header.after_submit';
export const IN_STOCK_NOTIFICATION_FORM_INPUT_LABEL = 'inStockNotification.form.input.label';
export const IN_STOCK_NOTIFICATION_FORM_SUBMIT_TEXT = backInStockFormSubmitButtonText || 'inStockNotification.form.submit';
export const IN_STOCK_NOTIFICATION_BUTTON_COLOR = backInStockButtonColor || colors.primary;
export const IN_STOCK_NOTIFICATION_BUTTON_TEXT_COLOR = backInStockButtonTextColor || colors.primaryContrast;

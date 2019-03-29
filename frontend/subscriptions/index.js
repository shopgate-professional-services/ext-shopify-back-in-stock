import { main$ } from '@shopgate/pwa-common/streams/main';
import showModal from '@shopgate/pwa-common/actions/modal/showModal';
import { RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION } from '../constants';

/**
 * Gets triggered when when back in stock request confirmation happens.
 * @type {Observable}
 */
export const backInStockNoticifcationReceived$ = main$.filter(({ action }) => (
  action.type === RECEIVE_IN_STOCK_NOTIFICATION_CONFIRMATION &&
  action.message !== null
));

/**
 * backInStockNotificationSubscriptions subscriptions.
 * @param {Function} subscribe Subscribe.
 */
const backInStockNotificationSubscriptions = (subscribe) => {
  subscribe(backInStockNoticifcationReceived$, ({ dispatch, action }) => {
    dispatch(showModal({
      message: action.message,
      dismiss: null,
      confirm: 'inStockNotification.modal.close',
    }));
  });
};

export default backInStockNotificationSubscriptions;

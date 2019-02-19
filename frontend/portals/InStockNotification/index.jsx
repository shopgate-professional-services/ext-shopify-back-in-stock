import React from 'react';
import { RouteContext } from '@shopgate/pwa-common/context';
import { hex2bin } from '@shopgate/pwa-common/helpers/data';
import connect from './connector';
import NotificationForm from './components/NotificationForm';

const InStockNotification = connect(({ productNumber, variantNumber, showForm}) => {
  return showForm && productNumber ? <NotificationForm /> : <div>hide form</div>;
});

export default props => (
  <RouteContext.Consumer>
    {({ params }) => (
      <div>
        <InStockNotification {...props} productId={hex2bin(params.productId)} />
      </div>
    )}
  </RouteContext.Consumer>
);

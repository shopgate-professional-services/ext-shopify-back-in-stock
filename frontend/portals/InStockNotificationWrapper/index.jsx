import React from 'react';
import { RouteContext } from '@shopgate/pwa-common/context';
import { hex2bin } from '@shopgate/pwa-common/helpers/data';
import connect from './connector';
import InStockNotification from '../../components/InStockNotification';

const InStockNotificationWrapper = connect(props => <InStockNotification {...props} />)

export default props => (
  <RouteContext.Consumer>
    {({ params }) => (
      <div>
        <InStockNotificationWrapper {...props} productId={hex2bin(params.productId)} />
      </div>
    )}
  </RouteContext.Consumer>
);

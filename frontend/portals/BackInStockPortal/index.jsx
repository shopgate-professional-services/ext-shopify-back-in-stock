import React from 'react';
import PropTypes from 'prop-types';
import { withProductContext } from '@shopgate-ps/pwa-extension-kit/connectors';
import connect from './connector';
import InStockNotification from '../../components/InStockNotification';

const InStockNotificationWrapper = connect(props => <InStockNotification {...props} />);

/**
 * InStockPortal component
 * @param {Object} productContext from ProductContext
 * @return {JSX}
 */
const BackInStockPortal = ({ productContext }) => {
  const { productId, variantId } = productContext || {};
  return (
    <div>
      <InStockNotificationWrapper productId={variantId || productId} />
    </div>
  );
};

BackInStockPortal.propTypes = {
  productContext: PropTypes.shape({
    productId: PropTypes.string,
    variantId: PropTypes.string,
  }),
};

BackInStockPortal.defaultProps = {
  productContext: {
    productId: null,
    variantId: null,
  },
};

export default withProductContext(BackInStockPortal);

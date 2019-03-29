import React from 'react';
import PropTypes from 'prop-types';
import NotificationForm from './components/NotificationForm';
import HeaderButton from './components/HeaderButton';
import { IN_STOCK_NOTIFICATION_HEADER_TEXT_SENT } from '../../constants';

/**
 * InStockNotification Component
 * @param {Object} props Component props
 * @return {JSX}
 */
const InStockNotification = (props) => {
  const {
    showForm,
    productNumber,
    variantNumber,
    email,
    confirmationIsFetching,
    confirmationMessage,
    sendRequest,
  } = props;
  if (confirmationMessage) {
    return <HeaderButton text={IN_STOCK_NOTIFICATION_HEADER_TEXT_SENT} />;
  }
  if (showForm && productNumber) {
    return (
      <NotificationForm
        productNumber={productNumber}
        variantNumber={variantNumber}
        email={email}
        isFetching={confirmationIsFetching}
        sendRequest={sendRequest}
      />);
  }

  return null;
};

InStockNotification.propTypes = {
  confirmationIsFetching: PropTypes.bool,
  confirmationMessage: PropTypes.string,
  email: PropTypes.string,
  productNumber: PropTypes.string,
  sendRequest: PropTypes.func,
  showForm: PropTypes.bool,
  variantNumber: PropTypes.string,
};

InStockNotification.defaultProps = {
  confirmationIsFetching: false,
  confirmationMessage: null,
  email: null,
  productNumber: null,
  sendRequest: () => {},
  showForm: false,
  variantNumber: null,
};

export default InStockNotification;

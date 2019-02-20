import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationForm from './components/NotificationForm';
import HeaderButton from './components/HeaderButton';
import { IN_STOCK_NOTIFICATION_HEADER_TEXT_SENT } from '../../constants';

/**
 * In stock notification component.
 */
class InStockNotification extends Component {
  /**
   * Prop types.
   * @returns {Object}
   */
  static propTypes = {
    confirmationIsFetching: PropTypes.bool,
    confirmationMessage: PropTypes.string,
    email: PropTypes.string,
    productNumber: PropTypes.string,
    sendRequest: PropTypes.func,
    showConfirmationModal: PropTypes.func,
    showForm: PropTypes.bool,
    variantNumber: PropTypes.string,
  };

  /**
   * Default props
   * @returns {Object}
   */
  static defaultProps = {
    confirmationIsFetching: false,
    confirmationMessage: null,
    email: null,
    productNumber: null,
    sendRequest: () => {},
    showConfirmationModal: () => {},
    showForm: false,
    variantNumber: null,
  };

  /**
   * Determine if confirmation modal should be shown.
   * @param {Object} nextProps New component properties
   */
  componentWillReceiveProps(nextProps) {
    const { confirmationMessage, showConfirmationModal } = this.props;
    if (nextProps.confirmationMessage && nextProps.confirmationMessage !== confirmationMessage) {
      showConfirmationModal({ message: nextProps.confirmationMessage });
    }
  }

  /**
   * Renders component.
   * @returns {JSX}
   */
  render() {
    const {
      showForm,
      productNumber,
      variantNumber,
      email,
      confirmationIsFetching,
      confirmationMessage,
      sendRequest,
    } = this.props;
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
  }
}

export default InStockNotification;

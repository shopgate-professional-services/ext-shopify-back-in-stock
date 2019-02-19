import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationForm from './components/NotificationForm';

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
      return <div>{confirmationMessage}</div>;
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

    return <div>hide form</div>;
  }
}

export default InStockNotification;

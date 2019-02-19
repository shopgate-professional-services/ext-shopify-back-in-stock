import React, { Component } from 'react';
import NotificationForm from './components/NotificationForm';

class InstockNotification extends Component {
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

export default InstockNotification;

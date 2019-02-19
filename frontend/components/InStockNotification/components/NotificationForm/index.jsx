import React, { Component } from 'react';
import TextField from '@shopgate/pwa-ui-shared/TextField';

/**
 * Render Notification Form
 */
class NotificationForm extends Component {
  state = {
    emailIsValid: true,
    email: '',
  };

  componentDidMount() {
    const { email } = this.props;
    if (email && !this.state.email) {
      this.updateEmailValue(email);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { email } = nextProps;
    if (email) {
      this.updateEmailValue(email);
    }
  }

  /**
   * Udpate email state
   * @param {string} email Entered email address
   */
  updateEmailValue = (email) => {
    this.setState({ email });
  };

  handelSubmit = (evemt) => {
    evemt.preventDefault();
    const emailIsValid = this.validateEmail(this.state.email);
    this.setState({ emailIsValid });

    if (!emailIsValid) {
      return;
    }
    const { productNumber, variantNumber, sendRequest } = this.props;
    sendRequest(productNumber, variantNumber, this.state.email);
  };

  validateEmail = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

  render() {
    const { isFetching } = this.props;
    return (
      <form onSubmit={this.handelSubmit}>
        <TextField
          name="notification-email"
          type="email"
          label="Email Address"
          onChange={this.updateEmailValue}
          value={this.state.email}
          errorText={this.state.emailIsValid ? '' : 'Please provide a valid email address'}
        />
        {!isFetching ?
          <button
            type="submit"
          >
          Submit
          </button> :
          <div>Fetching </div>
        }
      </form>
    );
  }
}

export default NotificationForm;

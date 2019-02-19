import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import Form from '@shopgate/pwa-ui-shared/Form';
import ActionButton from '@shopgate/pwa-ui-shared/ActionButton';
import Button from '@shopgate/pwa-ui-shared/Button';
import styles from './styles';

/**
 * Render Notification Form
 */
class NotificationForm extends Component {
  /**
   * Prop types.
   * @returns {Object}
   */
  static propTypes = {
    email: PropTypes.string,
    isFetching: PropTypes.bool,
    productNumber: PropTypes.string,
    sendRequest: PropTypes.func,
    variantNumber: PropTypes.string,
  };

  /**
   * Default props
   * @returns {Object}
   */
  static defaultProps = {
    email: null,
    isFetching: false,
    productNumber: null,
    sendRequest: () => {},
    variantNumber: null,
  };

  state = {
    emailIsValid: true,
    email: '',
    formOpen: false,
  };

  /**
   * If email prop is not null and email is not yet set in state update state
   * when the component mounts
   */
  componentDidMount() {
    const { email } = this.props;
    if (email && !this.state.email) {
      this.updateEmailValue(email);
    }
  }

  /**
   * Update state.email if it is not set but if nextProps.email is
   * @param {Object} nextProps Next set of properties
   */
  componentWillReceiveProps(nextProps) {
    const { email } = nextProps;
    if (email && !this.state.email) {
      this.updateEmailValue(email);
    }
  }

  /**
   * Update email state
   * @param {string} email Entered email address
   */
  updateEmailValue = (email) => {
    this.setState({ email });
  };

  /**
   * Handle Form submit
   */
  handelSubmit = () => {
    const emailIsValid = this.validateEmail(this.state.email);
    this.setState({ emailIsValid });

    if (!emailIsValid) {
      return;
    }
    const { productNumber, variantNumber, sendRequest } = this.props;
    sendRequest(productNumber, variantNumber, this.state.email);
  };

  handelOpenClose = () => {
    const { formOpen } = this.state;
    this.setState({ formOpen: !formOpen });
  };

  /**
   * Validate email address
   * @param {string} email Email address
   * @return {boolean}
   */
  validateEmail = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

  /**
   * Render component
   * @return {JSX}
   */
  render() {
    const { isFetching } = this.props;
    const { formOpen } = this.state;
    return (
      <div>
        <div className={formOpen ? styles.closedButtonWrapper : styles.openButtonWrapper}>
          <div className={styles.innerButtonWrapper}>
            <Button
              type="secondary"
              onClick={this.handelOpenClose}
            >
            EMAIL WHEN AVAILABLE
            </Button>
          </div>
        </div>
        <div className={formOpen ? styles.openFormWrapper : styles.closedFormWrapper}>
          <div>
            <button onClick={this.handelOpenClose}>X</button>
          </div>
          <Form onSubmit={this.handelSubmit}>
            <TextField
              name="notification-email"
              type="email"
              label="Email Address"
              onChange={this.updateEmailValue}
              value={this.state.email}
              errorText={this.state.emailIsValid ? '' : 'Please provide a valid email address'}
            />
            <ActionButton
              type="submit"
              loading={isFetching}
              onClick={() => {}}
            >
          Submit
            </ActionButton>
          </Form>
        </div>
      </div>
    );
  }
}

export default NotificationForm;

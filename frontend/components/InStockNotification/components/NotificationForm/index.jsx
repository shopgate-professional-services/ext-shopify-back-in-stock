import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@shopgate/pwa-ui-shared/TextField';
import Form from '@shopgate/pwa-ui-shared/Form';
import ActionButton from '@shopgate/pwa-ui-shared/ActionButton';
import I18n from '@shopgate/pwa-common/components/I18n';
import HeaderButton from '../HeaderButton';
import styles from './styles';
import {
  IN_STOCK_NOTIFICATION_HEADER_TEXT,
  IN_STOCK_NOTIFICATION_FORM_INPUT_LABEL,
  IN_STOCK_NOTIFICATION_FORM_SUBMIT_TEXT,
} from '../../../../constants';
import validateEmailAddress from '../../../../helpers/validateEmailAddress';
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
    const emailIsValid = validateEmailAddress(this.state.email);
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
   * Render component
   * @return {JSX}
   */
  render() {
    const { isFetching } = this.props;
    const { formOpen } = this.state;
    return (
      <div className={styles.overallWrapper}>
        <HeaderButton
          text={IN_STOCK_NOTIFICATION_HEADER_TEXT}
          onClick={this.handelOpenClose}
        />
        <div className={formOpen ? styles.openFormWrapper : styles.closedFormWrapper}>
          <Form onSubmit={this.handelSubmit}>
            <TextField
              name="notification-email"
              type="email"
              label={IN_STOCK_NOTIFICATION_FORM_INPUT_LABEL}
              onChange={this.updateEmailValue}
              value={this.state.email}
              errorText={this.state.emailIsValid ? '' : 'inStockNotification.form.input.error_text'}
            />
            <ActionButton
              type="secondary"
              loading={isFetching}
              onClick={() => {}}
              className={styles.submitButton}
            >
              <I18n.Text string={IN_STOCK_NOTIFICATION_FORM_SUBMIT_TEXT} />
            </ActionButton>
          </Form>
        </div>
      </div>
    );
  }
}

export default NotificationForm;

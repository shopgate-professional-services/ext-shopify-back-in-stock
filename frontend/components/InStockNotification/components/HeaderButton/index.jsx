import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import styles from './styles';

/**
 * Render HeaderButton
 * @param {string} text Button text
 * @param {Function} onClick Function to call when clicked
 * @return {JSX}
 */
const HeaderButton = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className={styles.headerButton}
  >
    <div>
      <I18n.Text string={text} />
    </div>
  </button>
);

HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

HeaderButton.defaultProps = {
  onClick: () => {},
};

export default HeaderButton;

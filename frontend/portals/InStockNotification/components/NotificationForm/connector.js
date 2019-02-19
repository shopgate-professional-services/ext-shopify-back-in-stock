import { connect } from 'react-redux';
import { getUserEmail } from '@shopgate/pwa-common/selectors/user';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  email: getUserEmail(state),
});

export default connect(mapStateToProps);

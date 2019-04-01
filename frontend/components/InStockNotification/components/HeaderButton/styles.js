import { css } from 'glamor';
import {
  IN_STOCK_NOTIFICATION_BUTTON_COLOR,
  IN_STOCK_NOTIFICATION_BUTTON_TEXT_COLOR,
} from '../../../../constants';

const headerButton = css({
  width: '100%',
  display: 'block',
  padding: 3,
  textAlign: 'center',
  backgroundColor: IN_STOCK_NOTIFICATION_BUTTON_COLOR,
  color: IN_STOCK_NOTIFICATION_BUTTON_TEXT_COLOR,
  '&:focus': { outline: 0 },
});

export default { headerButton };

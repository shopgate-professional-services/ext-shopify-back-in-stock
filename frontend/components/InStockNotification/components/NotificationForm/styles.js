import { css } from 'glamor';
import {
  IN_STOCK_NOTIFICATION_BUTTON_COLOR,
  IN_STOCK_NOTIFICATION_BUTTON_TEXT_COLOR,
} from '../../../../constants';

const overallWrapper = css({
  padding: 3,
});

const submitButton = css({
  backgroundColor: IN_STOCK_NOTIFICATION_BUTTON_COLOR,
  color: `${IN_STOCK_NOTIFICATION_BUTTON_TEXT_COLOR} !important`,
});

const formWrapperBase = {
  overflow: 'hidden',
  width: '100%',
  padding: 3,
  transition: 'height .3s',
};

const closedFormWrapper = css({
  ...formWrapperBase,
  height: 0,
});

const openFormWrapper = css({
  ...formWrapperBase,
  height: 150,
});

export default {
  closedFormWrapper,
  openFormWrapper,
  submitButton,
  overallWrapper,
};

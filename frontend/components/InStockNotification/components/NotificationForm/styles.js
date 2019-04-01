import { css } from 'glamor';
import {
  IN_STOCK_NOTIFICATION_BUTTON_COLOR,
  IN_STOCK_NOTIFICATION_BUTTON_TEXT_COLOR,
} from '../../../../constants';

const overallWrapper = css({
  padding: 3,
}).toString();

const submitButton = css({
  backgroundColor: IN_STOCK_NOTIFICATION_BUTTON_COLOR,
  color: `${IN_STOCK_NOTIFICATION_BUTTON_TEXT_COLOR} !important`,
}).toString();

const formWrapperBase = {
  overflow: 'hidden',
  width: '100%',
  padding: 3,
  transition: 'height .3s',
};

const closedFormWrapper = css({
  ...formWrapperBase,
  height: 0,
}).toString();

const openFormWrapper = css({
  ...formWrapperBase,
  height: 150,
}).toString();

export default {
  closedFormWrapper,
  openFormWrapper,
  submitButton,
  overallWrapper,
};

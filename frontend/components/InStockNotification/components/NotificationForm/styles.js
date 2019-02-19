import { css } from 'glamor';

const formWrapperBase = {
  overflow: 'hidden',
  padding: 3,
  transition: 'width .3s',
};

const buttonWrapperBase = {
  overflow: 'hidden',
  transition: 'width .3s',
};

const closedFormWrapper = css({
  ...formWrapperBase,
  width: 0,
  height: 0,
});

const openFormWrapper = css({
  ...formWrapperBase,
  width: '100%',
});

const closedButtonWrapper = css({
  ...buttonWrapperBase,
  width: 0,
  height: 0,
});

const openButtonWrapper = css({
  ...buttonWrapperBase,
  width: '100%',
});

const innerButtonWrapper = css({
  width: '100%',
});

export default {
  closedFormWrapper,
  openFormWrapper,
  closedButtonWrapper,
  openButtonWrapper,
  innerButtonWrapper,
};

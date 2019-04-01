import React from 'react';
import { mount } from 'enzyme';
import InStockNotification from './index';
import HeaderButton from './components/HeaderButton';
import NotificationForm from './components/NotificationForm';

const GENERAL_PROPS = {
  showForm: true,
  confirmationMessage: null,
  productNumber: 'testProductNumber',
  variantNumber: 'testVariantNumber',
  email: 'someone@someplace.com',
  isFetching: false,
  sendRequest: () => {},
};

describe('inStockNotification', () => {
  it('Should return null because showForm is false', () => {
    const props = {
      productNumber: 'testProduct',
      showForm: false,
    };
    const component = mount(<InStockNotification {...props} />);
    expect(component.html()).toBe(null);
  });
  it('Should return null because there is no productNumber', () => {
    const props = {
      productNumber: null,
      showForm: true,
    };
    const component = mount(<InStockNotification {...props} />);
    expect(component.html()).toBe(null);
  });
  it('should show only HeaderButton because there is a confirmation notice', () => {
    const component = mount(<InStockNotification confirmationMessage="some message" />);
    expect(component.find(HeaderButton).length).toBe(1);
    expect(component.find(NotificationForm).length).toBe(0);
    expect(component).toMatchSnapshot();
  });
  it('should show notification form because there is a productNumber, showForm is true, and confirmationMessage is null', () => {
    const component = mount(<InStockNotification {...GENERAL_PROPS} />);
    expect(component.find(HeaderButton).length).toBe(1);
    expect(component.find(NotificationForm).length).toBe(1);
    expect(component).toMatchSnapshot();
  });
  it('should show notification while fetching', () => {
    const props = {
      ...GENERAL_PROPS,
      isFetching: true,
    };
    const component = mount(<InStockNotification {...props} />);
    expect(component.find(HeaderButton).length).toBe(1);
    expect(component.find(NotificationForm).length).toBe(1);
    expect(component).toMatchSnapshot();
  });
});

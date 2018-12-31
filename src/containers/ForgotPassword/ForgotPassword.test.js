import React from 'react';
import { shallow } from 'enzyme';
import ForgotPassword from './ForgotPassword';

describe('<ForgotPassword />', () => {
    test('renders', () => {
        const wrapper = shallow(<ForgotPassword />);
        expect(wrapper).toMatchSnapshot();
    });
});

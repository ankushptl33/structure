import React from 'react';
import { shallow } from 'enzyme';
import ForgetPassword from './ForgetPassword';

describe('<ForgetPassword />', () => {
    test('renders', () => {
        const wrapper = shallow(<ForgetPassword />);
        expect(wrapper).toMatchSnapshot();
    });
});

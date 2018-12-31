import React from 'react';
import { shallow } from 'enzyme';
import Login from '@/components/LoginForm/LoginForm';

describe('<Login />', () => {
    test('renders', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper).toMatchSnapshot();
    });
});

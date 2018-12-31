import React from 'react';
import { shallow } from 'enzyme';
import PasswordInput from './PasswordInput';

describe('<PasswordInput />', () => {
    test('renders', () => {
        const wrapper = shallow(<PasswordInput />);
        expect(wrapper).toMatchSnapshot();
    });
});

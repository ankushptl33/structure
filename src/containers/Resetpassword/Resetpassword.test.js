import React from 'react';
import { shallow } from 'enzyme';
import Resetpassword from './Resetpassword';

describe('<Resetpassword />', () => {
    test('renders', () => {
        const wrapper = shallow(<Resetpassword />);
        expect(wrapper).toMatchSnapshot();
    });
});

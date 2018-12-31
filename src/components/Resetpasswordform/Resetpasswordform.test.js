import React from 'react';
import { shallow } from 'enzyme';
import Resetpasswordform from './Resetpasswordform';

describe('<Resetpasswordform />', () => {
    test('renders', () => {
        const wrapper = shallow(<Resetpasswordform />);
        expect(wrapper).toMatchSnapshot();
    });
});

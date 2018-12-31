import React from 'react';
import { shallow } from 'enzyme';
import RegexMatchDashboard from './RegexMatchDashboard';

describe('<RegexMatchDashboard />', () => {
    test('renders', () => {
        const wrapper = shallow(<RegexMatchDashboard />);
        expect(wrapper).toMatchSnapshot();
    });
});

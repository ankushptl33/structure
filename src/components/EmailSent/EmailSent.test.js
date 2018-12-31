import React from 'react';
import { shallow } from 'enzyme';
import EmailSent from './EmailSent';

describe('<EmailSent />', () => {
    test('renders', () => {
        const wrapper = shallow(<EmailSent />);
        expect(wrapper).toMatchSnapshot();
    });
});

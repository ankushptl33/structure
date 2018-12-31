import React from 'react';
import DateTimeLabel from './DateTimeLabel';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DateData from '../../json/DateTimeLabel.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<DateTimeLabel />', () => {
    it('renders 1 <DateTimeLabel /> component', () => {
        const component = shallow(<DateTimeLabel dates={[...DateData]} />);
        expect(component.exists()).toBe(true);
        expect(component).toHaveLength(1);
        expect(component).toMatchSnapshot();
    });

    it('will check props', () => {
        const component = shallow(<DateTimeLabel />).props();
        expect(component).toBeDefined();
    });
});

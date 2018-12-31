import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Performance from './Performance';
import Adapter from 'enzyme-adapter-react-16';
import PerformanceProps from '../../json/Performance.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<Performance />', () => {
    it('renders', () => {
        const wrapper = shallow(<Performance />);
        expect(wrapper.exists('Performance')).toBe(true);
        expect(wrapper).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('component with default props', () => {
        const wrapper = shallow(<Performance />);
        expect(wrapper.exists()).toBe(true);
    });

    it('will check props', () => {
        const wrapper = shallow(<Performance Performance={PerformanceProps} />).props();
        expect(wrapper).toBeDefined();
    });
});

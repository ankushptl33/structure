import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MeasurePerformanceStats from '../../components/MeasurePerformanceStats/MeasurePerformanceStats';
import MeasurePropsData from '../../json/MeasurePerformanceStats.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<MeasurePerformanceStats />', () => {
    test('renders', () => {
        const component = shallow(
            <MeasurePerformanceStats measureData={MeasurePropsData.measureData} />
        );
        expect(component).toHaveLength(1);
        expect(component).toMatchSnapshot();
    });

    it('will check props', () => {
        const component = shallow(
            <MeasurePerformanceStats measureData={MeasurePropsData.measureData} />
        ).props();
        expect(component).toBeDefined();
    });

    it('mount component with default props', () => {
        const component = shallow(<MeasurePerformanceStats />);
        expect(component.exists()).toBe(true);
    });
});

import React from 'react';
import LineChart from './LineChart';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LineChartData from '../../json/PracticeMeasureDetailsData.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<Line Chart />', () => {
    it('renders 1 <LineChart /> component', () => {
        const Line = shallow(<LineChart LineChartData={LineChartData} />);
        expect(Line.exists()).toBe(true);
        expect(Line).toHaveLength(1);
        expect(Line).toMatchSnapshot();
    });

    //   it('renders 1 <DateComponent /> component', () => {
    //     const Line = shallow(<LineChart LineChartData={LineChartData} />);
    //     expect(Line.exists()).toBe(true);
    //     expect(Line).toHaveLength(1);
    //     expect(Line).toMatchSnapshot();
    // });

    // it('Three Moment for Dates', () => {
    //     const Line = shallow(<DateComponent dates={DateData} />);
    //     expect(Line.find('ListItem').exists()).toBe(true);
    //     expect(Line.find('ListItem')).toHaveLength(3);

    // });
});

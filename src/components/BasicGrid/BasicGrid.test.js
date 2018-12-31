import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import BasicGrid from './BasicGrid';
import Adapter from 'enzyme-adapter-react-16';
import { columnDefs, tableData } from '../../json/DataTableSchema.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<BasicGrid />', () => {
    it('renders 1 <BasicGrid /> component', () => {
        const component = shallow(<BasicGrid columnDefs={columnDefs} data={tableData} />);
        expect(component.exists(BasicGrid)).toBe(true);
        expect(component).toHaveLength(1);
        expect(component).toMatchSnapshot();
    });

    it('mount component with default props', () => {
        const component = shallow(<BasicGrid />);
        expect(component.exists(BasicGrid)).toBe(true);
    });

    it('Checks for the props', () => {
        const component = shallow(<BasicGrid columnDefs={columnDefs} data={tableData} />).props();
        expect(component).toBeDefined();
    });
});

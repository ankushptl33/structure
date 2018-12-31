import React from 'react';
import Enzyme, { configure, enzyme, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BasicTable from './BasicTable';
import BasicTableDataProp from '../../json/BasicTable.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<BasicTable />', () => {
    it('renders 1 <BasicTable /> component', () => {
        const component = shallow(<BasicTable basicTableDataProp={BasicTableDataProp} />);
        expect(component.exists('BasicTable')).toBe(true);
        expect(component).toHaveLength(1);
        expect(component).toMatchSnapshot();
    });

    it('it should have Paper ', () => {
        const wrapper = shallow(<BasicTable basicTableDataProp={BasicTableDataProp} />);
        expect(wrapper.exists('Paper')).toEqual(true);
        expect(wrapper).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('it should have Table ', () => {
        const wrapper = shallow(<BasicTable basicTableDataProp={BasicTableDataProp} />);
        expect(wrapper.exists('Table')).toEqual(true);
        expect(wrapper).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('it will check props', () => {
        const component = shallow(<BasicTable basicTableDataProp={BasicTableDataProp} />).props();
        expect(component).toBeDefined();
    });

    it('mount component with default props', () => {
        const component = shallow(<BasicTable />);
        expect(component.exists('BasicTable')).toBe(true);
    });
});

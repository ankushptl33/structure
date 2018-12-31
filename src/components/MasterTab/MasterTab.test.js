import React from 'react';
import Enzyme, { configure, enzyme, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MasterTab from './MasterTab';
import MasterTabProp from '../../json/MasterTabProp.json';

Enzyme.configure({ adapter: new Adapter() });

const masterTabProp = MasterTabProp.masterTabProp;

describe('<MasterTab />', () => {
    it('renders 1 <MasterTab /> component', () => {
        const component = shallow(<MasterTab masterTabProp={masterTabProp} />);
        expect(component).toMatchSnapshot();
    });

    it('will check props', () => {
        const component = shallow(<MasterTab masterTabProp={masterTabProp} />).props();
        expect(component).toBeDefined();
    });

    it('will check state', () => {
        const component = shallow(<MasterTab masterTabProp={masterTabProp} />).state();
        expect(component).toBeDefined();
    });

    it('ontabchange method test case', () => {
        const handleChange = jest.fn();
        const component = shallow(<button onChange={handleChange} />);
        component.find('button').simulate('change');
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    // it('ontabchange method test case', () => {
    //     const handleChange = jest.fn();
    //     const event = {target: {value: 1}};
    //     const value = 1
    //     const component = shallow(<button onChange={handleChange} />);
    //     component.find('button').simulate('change', event, value);
    //     // expect(handleChange.calledOnce).to.equal(true);
    //     expect(handleChange).toHaveBeenCalledTimes(1)
    // });
});

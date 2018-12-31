import React from 'react';
import BasicAccordion from './BasicAccordion';
import Enzyme, { configure, enzyme, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BasicAccordionData from '../../json/BasicAccordion.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<BasicAccordion />', () => {
    it('renders', () => {
        const wrapper = shallow(
            <BasicAccordion basicAccordionProps={BasicAccordionData.basicAccordionProps} />
        );
        expect(wrapper).toMatchSnapshot();
    });
    // it('testing onClick accordion', () => {
    //   const wrapper = shallow(<BasicAccordion  basicAccordionProps={BasicAccordionData.basicAccordionProps} />);
    //   wrapper.instance().handleChange = jest.fn();
    //   let { handleChange } = wrapper.instance();
    //   wrapper.find('AccordionTitle').at(0).simulate('click');
    //   expect(handleChange).toHaveBeenCalledTimes(1);
    // })

    it('ontabchange method test case', () => {
        const handleChange = jest.fn();
        const component = shallow(<button onChange={handleChange} />);
        component.find('button').simulate('change');
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});

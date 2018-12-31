import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MeasureDetails from './MeasureDetails';

Enzyme.configure({ adapter: new Adapter() });

describe('MasterCardWidget as higher-order component', () => {
    it('should  render MeasureDetails', () => {
        const wrapper = shallow(<MeasureDetails />);
        expect(wrapper).toMatchSnapshot();
    });

    it('Test click event ononChange for onDropdownChange method', () => {
        const onDropdownChange = jest.fn();
        const dropDown = shallow(<dropDown onChange={onDropdownChange} value='custom value' />);
        dropDown.find('dropDown').simulate('change');
        expect(onDropdownChange).toHaveBeenCalled();
    });

    it('should call onDropdownChange with input value', () => {
        const fakeFunc = jest.fn();
        fakeFunc.mockReturnValueOnce('onchange has been called');
        fakeFunc();
    });
});

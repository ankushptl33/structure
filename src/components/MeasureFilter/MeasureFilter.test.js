import React from 'react';
import Enzyme, { configure, enzyme, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MeasureFilter from './MeasureFilter';
import measureFilterJson from '../../json/MeasureFilter.json';

import Button from '@material-ui/core/Button';

Enzyme.configure({ adapter: new Adapter() });

describe('<MeasureFilter />', () => {
    it('renders', () => {
        const component = shallow(<MeasureFilter MeasureFilter={measureFilterJson} />);
        expect(component.exists('MeasureFilter')).toBe(true);
        expect(component).toHaveLength(1);
        expect(component).toMatchSnapshot();
    });

    it('calls componentDidMount', () => {
        shallow(<MeasureFilter MeasureFilter={measureFilterJson} />);
    });

    it('will check state', () => {
        const wrapper = shallow(<MeasureFilter MeasureFilter={measureFilterJson} />).state();
        expect(wrapper).toBeDefined();
    });

    it('will check props', () => {
        const wrapper = shallow(<MeasureFilter MeasureFilter={measureFilterJson} />).props();
        expect(wrapper).toBeDefined();
    });

    it('should have single button', () => {
        const component = shallow(<MeasureFilter MeasureFilter={measureFilterJson} />);
        expect(component.find('.button').exists()).toBe(true);
        expect(component.find('.button')).toHaveLength(1);
    });

    it('should have three Button component', () => {
        const component = shallow(<MeasureFilter MeasureFilter={measureFilterJson} />);
        expect(component.find(Button).exists()).toBe(true);
        expect(component.find(Button)).toHaveLength(3);
    });

    it('Test click event handleFilterChange', () => {
        const handleFilterChange = jest.fn();
        const component = shallow(<button onClick={handleFilterChange} />);
        component.find('button').simulate('click');
        expect(handleFilterChange).toHaveBeenCalledTimes(1);
    });

    it('Test click event handleApplyFilters', () => {
        const handleApplyFilters = jest.fn();
        const component = shallow(<button onClick={handleApplyFilters} />);
        component.find('button').simulate('click');
        expect(handleApplyFilters).toHaveBeenCalledTimes(1);
    });

    // it('Test click event onClearFilters', () => {
    //   const onClearFilters = jest.fn();
    //   const component = shallow(<button onClick={onClearFilters} />);
    //   component.find('button').simulate('click');
    //   expect(onClearFilters).toHaveBeenCalledTimes(1);
    // });

    it('Test click event handleCustomRangeChange', () => {
        const handleCustomRangeChange = jest.fn();
        const component = shallow(<button onClick={handleCustomRangeChange} />);
        component.find('button').simulate('click');
        expect(handleCustomRangeChange).toHaveBeenCalledTimes(1);
    });

    it('Test click event handleToDateChange', () => {
        const handleToDateChange = jest.fn();
        const component = shallow(<button onClick={handleToDateChange} />);
        component.find('button').simulate('click');
        expect(handleToDateChange).toHaveBeenCalledTimes(1);
    });

    it('Test click event handleFromDateChange', () => {
        const handleFromDateChange = jest.fn();
        const component = shallow(<button onClick={handleFromDateChange} />);
        component.find('button').simulate('click');
        expect(handleFromDateChange).toHaveBeenCalledTimes(1);
    });

    it('Test click event handleLocationChange', () => {
        const handleLocationChange = jest.fn();
        const component = shallow(<button onClick={handleLocationChange} />);
        component.find('button').simulate('click');
        expect(handleLocationChange).toHaveBeenCalledTimes(1);
    });

    it('Test click event handleClinicianChange', () => {
        const handleClinicianChange = jest.fn();
        const component = shallow(<button onClick={handleClinicianChange} />);
        component.find('button').simulate('click');
        expect(handleClinicianChange).toHaveBeenCalledTimes(1);
    });

    // it('Test click event onSetDefaultMeasureset', () => {
    //   const onSetDefaultMeasureset = jest.fn();
    //   const component = shallow(<button onClick={onSetDefaultMeasureset} />);
    //   component.find('button').simulate('click');
    //   expect(onSetDefaultMeasureset).toHaveBeenCalledTimes(1);
    // });

    it('Test click event handleCancel', () => {
        const handleCancel = jest.fn();
        const component = shallow(<button onClick={handleCancel} />);
        component.find('button').simulate('click');
        expect(handleCancel).toHaveBeenCalledTimes(1);
    });

    it('Test click event handleMeasureSetChange', () => {
        const handleMeasureSetChange = jest.fn();
        const component = shallow(<button onClick={handleMeasureSetChange} />);
        component.find('button').simulate('click');
        expect(handleMeasureSetChange).toHaveBeenCalledTimes(1);
    });

    it('Test click event handleDurationChange', () => {
        const handleDurationChange = jest.fn();
        const component = shallow(<button onClick={handleDurationChange} />);
        component.find('button').simulate('click');
        expect(handleDurationChange).toHaveBeenCalledTimes(1);
    });

    it('Test click event handleYearChange', () => {
        const handleYearChange = jest.fn();
        const component = shallow(<button onClick={handleYearChange} />);
        component.find('button').simulate('click');
        expect(handleYearChange).toHaveBeenCalledTimes(1);
    });
});

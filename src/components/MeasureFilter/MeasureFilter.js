import React, { Component } from 'react';
import './MeasureFilter.less';
import PropTypes from 'prop-types';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography
} from '@material-ui/core';
import moment from 'moment';

import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

import { monthlyNonRollingFlag, monthlyRollingFlag } from './config'; // /default configuration file of component

let hasError = false;
class MeasureFilter extends Component {
    constructor(props) {
        super(props);
        // initial state for component
        this.state = {
            openDefaultModal: false,
            isFilterPanelVisible: false,
            maxFromDate: new Date(),
            minFromDate: moment(new Date())
                .add(-2, 'year')
                .format('MM-DD-YYYY'), // for restricting user to select date within last two year,
            maxToDate: new Date(),
            minToDate: moment(new Date())
                .add(-2, 'year')
                .format('MM-DD-YYYY'), // for restricting user to select date within last two year,
            temporaryState: {
                measureset: {
                    defaultItem: {},
                    selectedItem: {}
                },
                clinician: {},
                customrange: false,
                location: {},
                year: {},
                duration: {},
                fromdate: '',
                todate: '',
                measureSetOptions: []
            },
            permanentState: {
                measureset: {
                    defaultItem: {},
                    selectedItem: {}
                },
                clinician: {},
                customrange: false,
                location: {},
                year: {},
                duration: {},
                fromdate: '',
                todate: '',
                measureSetOptions: []
            }
        };

        this.defaultMeasureSet = {};
    }

    // component mount : setting default functionality and data to controls
    componentDidMount() {
        const { measureFilterProp } = this.props;
        this.updateComponentItemData(measureFilterProp, null);
    }

    // component will receive updated props as per state change in containers state
    componentWillReceiveProps(newProps) {
        if (newProps.measureFilterProp && this.props !== newProps) {
            const { permanentState } = this.state;
            this.updateComponentItemData(newProps.measureFilterProp, permanentState);
        }
    }

    // function assigning initial and updated props of coponent
    updateComponentItemData = (compProps, permanentState) => {
        const {
            containerName,
            measureSetProp,
            clinicianProp,
            locationProp,
            yearProp,
            durationProp
        } = compProps;

        if (!permanentState) {
            // component mount code
            const measureSetOptions =
                measureSetProp.data &&
                measureSetProp.data.map(item => ({
                    id: item.id,
                    name: item.name,
                    value: item.id,
                    text: item.name,
                    isdefault: item.isdefault,
                    icon: item.isdefault ? 'star right floated' : 'star outline right floated'
                }));
            const renderProps = { ...this.state };
            const measureSetData = { ...renderProps.measureset };
            measureSetData.selectedItem =
                measureSetProp.data &&
                measureSetProp.data.filter(item =>
                    item.id === measureSetProp.selectedId ? measureSetProp.selectedId : ''
                )[0];

            // for maitaining state of component as per props
            const toDate = compProps.customrange
                ? compProps.todate
                : moment(new Date()).format('MM-DD-YYYY');
            const fromDate = compProps.customrange
                ? compProps.fromdate
                : moment(new Date()).format('MM-DD-YYYY');

            const currentState = {
                year: this.getFilteredObject(yearProp.data, yearProp.selectedId),
                measureset: measureSetData,
                measureSetOptions: [...measureSetOptions],
                duration: this.getFilteredObject(
                    durationProp.data,
                    durationProp.selectedId ? durationProp.selectedId : durationProp.data[0].id
                ),
                clinician:
                    containerName === 'clinician'
                        ? this.getFilteredObject(clinicianProp.data, clinicianProp.selectedId)
                        : {},
                location:
                    containerName === 'location'
                        ? this.getFilteredObject(locationProp.data, locationProp.selectedId)
                        : {},
                customrange: compProps.customrange,
                fromdate: fromDate,
                todate: toDate
            };

            this.setState({
                temporaryState: currentState,
                permanentState: currentState
            });
        } else {
            // component receive props code
            const currentState = {
                year: this.getFilteredObject(yearProp.data, yearProp.selectedId),
                duration: this.getFilteredObject(
                    durationProp.data,
                    durationProp.selectedId ? durationProp.selectedId : durationProp.data[0].id
                )
            };
            const { temporaryState } = this.state;
            this.setState({
                temporaryState: { ...temporaryState, ...currentState }
            });
        }
    };

    // common function to get filterd object
    getFilteredObject = (data, id) => data.filter(item => item.id === id)[0];

    // function returning array in grouped object
    getGroupedObjectArray = (data, keyName) =>
        data &&
        data.reduce((rv, x) => {
            (rv[x[keyName]] = rv[x[keyName]] || []).push(x);
            return rv;
        }, {});

    // common function to set filtered property
    setStateDropdownSelectionObject = (name, value, controlData) => {
        const { temporaryState } = this.state;
        if (Object.prototype.hasOwnProperty.call(temporaryState, name)) {
            const selectedItem = this.getFilteredObject(controlData, value);
            const temp = {};
            if (name === 'measureset') {
                //  for the measure set contains to property like selected measure set and default measure set.
                temp[name] = { selectedItem: { ...selectedItem } };
                this.setState({
                    temporaryState: { ...temporaryState, ...temp }
                });
            } else {
                temp[name] = { ...selectedItem };
                this.setState({
                    temporaryState: { ...temporaryState, ...temp }
                });
            }
        }
    };

    // Year change event calling prop handler of year
    handleYearChange = event => {
        const { name, value } = event.target;
        const { measureFilterProp } = this.props;
        this.setStateDropdownSelectionObject(name, value, measureFilterProp.yearProp.data);
        if (measureFilterProp.yearProp.onchangeHandler)
            measureFilterProp.yearProp.onchangeHandler(value);
    };

    // duration change event setting state using filtered value
    handleDurationChange = event => {
        const { name, value } = event.target;
        const { measureFilterProp } = this.props;
        this.setStateDropdownSelectionObject(name, value, measureFilterProp.durationProp.data);
    };

    // measure set chnage event setting state using filtered value
    handleMeasureSetChange = event => {
        const { name, value } = event.target;
        const { temporaryState } = this.state;
        this.setStateDropdownSelectionObject(name, value, temporaryState.measureSetOptions);
    };

    // Cancel event of default popup
    handleCancel = () => {
        this.setState({ openDefaultModal: false });
        this.defaultMeasureSet = {};
    };

    // clinician change event setting state using filtered value
    handleClinicianChange = event => {
        const { name, value } = event.target;
        const { measureFilterProp } = this.props;
        this.setStateDropdownSelectionObject(name, value, measureFilterProp.clinicianProp.data);
    };

    // location change event setting state using filtered value
    handleLocationChange = event => {
        const { name, value } = event.target;
        const { measureFilterProp } = this.props;
        this.setStateDropdownSelectionObject(name, value, measureFilterProp.locationProp.data);
    };

    // fromdate change event setting state using filtered value and validation of date
    handleFromDateChange = event => {
        const temp = {};
        const { temporaryState } = this.state;
        if (Object.prototype.hasOwnProperty.call(temporaryState, 'fromdate')) {
            temp.fromdate = moment(event._d).format('MM-DD-YYYY');
            this.setState({
                temporaryState: { ...temporaryState, ...temp },
                minToDate: new Date(event._d)
            });
            hasError = false;
        }
    };

    // todate change event setting state using filtered value and validation of date
    handleToDateChange = event => {
        const temp = {};
        const { temporaryState } = this.state;
        if (Object.prototype.hasOwnProperty.call(temporaryState, 'todate')) {
            temp.todate = moment(event._d).format('MM-DD-YYYY');
            this.setState({
                temporaryState: { ...temporaryState, ...temp },
                maxFromDate: new Date(event._d) < new Date() ? new Date(event._d) : new Date()
            });
            hasError = false;
            if (new Date(event._d) < new Date(temporaryState.fromdate)) hasError = true;
        }
    };

    // change button event for show /hide of filter panel
    handleFilterChange = () => {
        const { isFilterPanelVisible } = this.state;
        this.setState({
            isFilterPanelVisible: !isFilterPanelVisible
        });
    };

    // custom range checked change event for show /hide of date panel
    handleCustomRangeChange = () => {
        const { temporaryState } = this.state;
        this.setState({
            temporaryState: {
                ...temporaryState,
                customrange: !temporaryState.customrange
            }
        });
    };

    // Final hook for applying filters on grid Data
    handleApplyFilters = () => {
        const { temporaryState } = this.state;
        if (hasError) return false;
        this.setState({ isFilterPanelVisible: false });
        this.setState(
            { isFilterPanelVisible: false, permanentState: { ...temporaryState } },
            () => {
                const { permanentState } = this.state;
                if (this.props.measureFilterProp.onApplyFilters != undefined) {
                    this.props.measureFilterProp.onApplyFilters(permanentState);
                }
            }
        );
        return true;
    };

    render() {
        const {
            measureFilterProp: {
                containerName,
                measureSetProp,
                clinicianProp,
                locationProp,
                yearProp,
                durationProp
            }
        } = this.props;
        const {
            permanentState,
            temporaryState,
            maxToDate,
            minToDate,
            minFromDate,
            maxFromDate,
            isFilterPanelVisible
        } = this.state;

        const clinicianData =
            containerName === 'clinician' && clinicianProp
                ? clinicianProp.data.map(item => ({
                      value: item.id,
                      text: item.firstname + ' ' + item.lastname
                  }))
                : [];

        const locationData =
            containerName === 'location' && locationProp
                ? locationProp.data.map(item => ({ value: item.id, text: item.name }))
                : [];

        const yearData =
            yearProp &&
            yearProp.data &&
            yearProp.data.map(item => ({ value: item.id, text: item.name }));

        const durationData =
            durationProp &&
            durationProp.data &&
            durationProp.data.map(item => ({
                value: item.id,
                text: item.name,
                key: item.key,
                disabled: !!item.disabled,
                flag:
                    item.flag === monthlyNonRollingFlag || item.flag === monthlyRollingFlag
                        ? 'Months'
                        : 'Quarters'
            }));

        const groupedDuration = this.getGroupedObjectArray(durationData, 'flag');

        const yearfiltered = !permanentState.customrange ? (
            <Grid item className='selected-year__container'>
                <Grid item xs className='selected-label__row'>
                    <Typography variant='body1' className='selected-label__title'>
                        {yearProp.selectedLabel}
                    </Typography>
                    <Typography variant='body2' className='selected-label__value'>
                        {permanentState.year.name !== undefined
                            ? permanentState.year.name
                            : 'Not selected'}
                    </Typography>
                </Grid>
            </Grid>
        ) : null;

        const durationfiltered = !permanentState.customrange ? (
            <Grid item className='selected-duration__container'>
                <Grid item xs className='selected-label__row'>
                    <Typography variant='body1' className='selected-label__title'>
                        {durationProp.selectedLabel}{' '}
                    </Typography>
                    <Typography variant='body2' className='selected-label__value'>
                        {permanentState.duration.name !== undefined
                            ? permanentState.duration.name
                            : 'Not selected'}
                    </Typography>
                </Grid>
            </Grid>
        ) : null;

        const datefromfiltered = permanentState.customrange ? (
            <Grid item className='selected-fromdate__container'>
                <Grid item xs className='selected-label__row'>
                    <Typography variant='body1' className='selected-label__title'>
                        From Date{' '}
                    </Typography>
                    <Typography variant='body2' className='selected-label__value'>
                        {permanentState.fromdate !== '' ? permanentState.fromdate : 'Not selected'}
                    </Typography>
                </Grid>
            </Grid>
        ) : null;

        const datetofiltered = permanentState.customrange ? (
            <Grid item className='selected-todate__container'>
                <Grid item xs className='selected-label__row'>
                    <Typography variant='body1' className='selected-label__title'>
                        To Date
                    </Typography>
                    <Typography variant='body2' className='selected-label__value'>
                        {permanentState.todate !== '' ? permanentState.todate : 'Not selected'}
                    </Typography>
                </Grid>
            </Grid>
        ) : null;

        const locationJsx =
            containerName === 'location' ? (
                <Grid item className='selected-location__container'>
                    <Grid item xs className='selected-label__row'>
                        <Typography variant='body1' className='selected-label__title'>
                            {locationProp.selectedLabel}
                        </Typography>
                        <Typography variant='body2' className='selected-label__value'>
                            {permanentState.location !== undefined &&
                            permanentState.location.name !== undefined
                                ? permanentState.location.name
                                : 'Not selected'}
                        </Typography>
                    </Grid>
                </Grid>
            ) : null;

        const filteredClinicianLocElement =
            containerName === 'clinician' ? (
                <Grid item className='selected-clinician__container'>
                    <Grid item xs className='selected-label__row'>
                        <Typography variant='body1' className='selected-label__title'>
                            {clinicianProp.selectedLabel}
                        </Typography>
                        <Typography variant='body2' className='selected-label__value'>
                            {permanentState.clinician !== undefined &&
                            permanentState.clinician.firstname !== undefined
                                ? permanentState.clinician.firstname +
                                  ' ' +
                                  permanentState.clinician.lastname
                                : 'Not selected'}
                        </Typography>
                    </Grid>
                </Grid>
            ) : (
                locationJsx
            );

        const datecolumns = temporaryState.customrange ? (
            <Grid item xs className='fig-formcontrol-group'>
                <Grid container spacing={24}>
                    <Grid item xs={6} className='fig-formcontrol-fromdate'>
                        <FormControl fullWidth className='fig-formcontrol'>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <InlineDatePicker
                                    keyboard
                                    disableFuture
                                    format='MM-DD-YYYY'
                                    mask={[
                                        /\d/,
                                        /\d/,
                                        '-',
                                        /\d/,
                                        /\d/,
                                        '-',
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        /\d/
                                    ]}
                                    minDate={minFromDate}
                                    minDateMessage='From date should be less than to date and less than or equal to present date.'
                                    maxDate={maxFromDate}
                                    maxDateMessage='From date should be less than to date and less than or equal to present date.'
                                    id='fromdate'
                                    name='fromdate'
                                    label='From Date'
                                    value={temporaryState.fromdate}
                                    onChange={this.handleFromDateChange}
                                    onError={() => {
                                        hasError = true;
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} className='fig-formcontrol-todate'>
                        <FormControl fullWidth className='fig-formcontrol'>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <InlineDatePicker
                                    keyboard
                                    disableFuture
                                    format='MM-DD-YYYY'
                                    mask={[
                                        /\d/,
                                        /\d/,
                                        '-',
                                        /\d/,
                                        /\d/,
                                        '-',
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        /\d/
                                    ]}
                                    minDate={minToDate}
                                    minDateMessage='To date should be greater than from date and less than or equal to present date.'
                                    maxDate={maxToDate}
                                    maxDateMessage='To date should be greater than from date and less than or equal to present date.'
                                    id='todate'
                                    name='todate'
                                    label='To Date'
                                    value={temporaryState.todate}
                                    onChange={this.handleToDateChange}
                                    onError={() => {
                                        hasError = true;
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        ) : null;

        const dependentElementLoc =
            containerName === 'location' ? (
                <Grid item xs={12}>
                    <FormControl fullWidth className='fig-formControl'>
                        <InputLabel htmlFor='location'>{locationProp.label}</InputLabel>
                        <Select
                            name='location'
                            value={
                                temporaryState.location && temporaryState.location.id
                                    ? temporaryState.location.id
                                    : ''
                            }
                            inputProps={{ name: 'location', id: 'location' }}
                            onChange={this.handleLocationChange}
                        >
                            {locationData.map(item => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.text}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            ) : null;

        const containerDependentElement =
            containerName === 'clinician' ? (
                <Grid item xs={12}>
                    <FormControl fullWidth className='fig-formControl'>
                        <InputLabel htmlFor='clinician'>{clinicianProp.label}</InputLabel>
                        <Select
                            name='clinician'
                            value={
                                temporaryState.clinician && temporaryState.clinician.id
                                    ? temporaryState.clinician.id
                                    : ''
                            }
                            inputProps={{ name: 'clinician', id: 'clinician' }}
                            onChange={this.handleClinicianChange}
                        >
                            {clinicianData.map(item => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.text}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            ) : (
                dependentElementLoc
            );

        const disableElement = !!temporaryState.customrange;

        // /Filter EDIT panel
        const filterPanel = isFilterPanelVisible ? (
            <Paper elevation={2} className='measure--filter__stackable'>
                <Grid container className='' spacing={24}>
                    <Grid item xs={12}>
                        <FormControl fullWidth className='fig-formControl'>
                            <InputLabel htmlFor='measureset'>{measureSetProp.label}</InputLabel>
                            <Select
                                name='measureset'
                                value={
                                    temporaryState.measureset.selectedItem.id !== undefined
                                        ? temporaryState.measureset.selectedItem.id
                                        : ''
                                }
                                inputProps={{ name: 'measureset', id: 'measureset' }}
                                onChange={this.handleMeasureSetChange}
                            >
                                {temporaryState.measureSetOptions.map(item => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.text}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {containerDependentElement}
                    <Grid item xs={4}>
                        <FormControl fullWidth className='fig-formControl'>
                            <InputLabel htmlFor='year'>{yearProp.label}</InputLabel>
                            <Select
                                name='year'
                                disabled={disableElement}
                                value={
                                    temporaryState.year.id !== undefined
                                        ? temporaryState.year.id
                                        : ''
                                }
                                inputProps={{ name: 'year', id: 'year' }}
                                onChange={this.handleYearChange}
                            >
                                {yearData.map(item => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.text}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth className='fig-formControl'>
                            <InputLabel htmlFor='duration'>{durationProp.label}</InputLabel>
                            <Select
                                native
                                name='duration'
                                disabled={disableElement}
                                value={
                                    temporaryState.duration.id !== undefined
                                        ? temporaryState.duration.id
                                        : ''
                                }
                                inputProps={{ name: 'duration', id: 'duration' }}
                                onChange={this.handleDurationChange}
                            >
                                <optgroup label='Quarters'>
                                    {' '}
                                    {groupedDuration.Quarters.map(item => (
                                        <option key={item.value} value={item.value}>
                                            {item.text}
                                        </option>
                                    ))}{' '}
                                </optgroup>
                                <optgroup label='Months'>
                                    {' '}
                                    {groupedDuration.Months.map(item => (
                                        <option key={item.value} value={item.value}>
                                            {item.text}
                                        </option>
                                    ))}{' '}
                                </optgroup>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name='customrange'
                                    checked={temporaryState.customrange}
                                    onChange={this.handleCustomRangeChange}
                                    value='customrange'
                                    color='default'
                                />
                            }
                            label='Custom Range'
                        />
                    </Grid>

                    {datecolumns}
                    <Grid item xs={12} className='filter-btn-group'>
                        <Button
                            variant='outlined'
                            className='filter--close__button'
                            content='Close'
                            onClick={this.handleFilterChange}
                        >
                            Close
                        </Button>
                        <Button
                            variant='outlined'
                            className='filter--apply__button'
                            onClick={this.handleApplyFilters}
                        >
                            Apply Filter
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        ) : null;

        // Final JSX for rendering component items
        // Final JSX for rendering component items
        return (
            <Grid container className='measure--filter__wrapper'>
                <Grid item className='measure--filter--row__wrapper'>
                    <Paper className='measure--filter--bg__wrapper' elevation={2}>
                        <Grid container spacing={24}>
                            <Grid item className='selected-label__container'>
                                <Grid item xs className='selected-label__row'>
                                    <Typography className='selected-label__title' variant='body1'>
                                        {measureSetProp.selectedLabel}
                                    </Typography>
                                    <Typography className='selected-label__value' variant='body2'>
                                        {' '}
                                        {permanentState.measureset.selectedItem.name
                                            ? permanentState.measureset.selectedItem.name
                                            : 'Not selected'}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {filteredClinicianLocElement}
                            {yearfiltered}
                            {durationfiltered}
                            {datefromfiltered}
                            {datetofiltered}

                            <Grid item className='filter-change-btn'>
                                <Button
                                    className='button'
                                    content='Change'
                                    onClick={this.handleFilterChange}
                                >
                                    Change
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                    {filterPanel}
                </Grid>
            </Grid>
        );
    }
}

// default props for the component
MeasureFilter.defaultProps = {
    measureFilterProp: {
        containerName: 'practice', //  practice , clinician or location
        measureSetProp: {
            data: [
                {
                    id: 1,
                    name: 'Measure Set 1',
                    inactive: false,
                    isdefault: false
                },
                {
                    id: 5,
                    name: 'Measure Set 5',
                    inactive: false,
                    isdefault: false
                },
                {
                    id: 6,
                    name: 'Measure Set 2',
                    inactive: false,
                    isdefault: true
                }
            ],
            label: 'Select Measure set',
            selectedLabel: 'Selected Measure Set',
            selectedId: 6,
            iconDefaultEmpty:
                'M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z',
            iconDefaultFilled:
                'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
            defaultDialogTitle: 'Default Measure Set',
            defaultDialogBody: 'Are you sure you want to change default measure set?',
            defaultDialogConfirm: 'Yes',
            defaultDialogCancel: 'Cancel',
            onDefaultMeasureSetConfirm() {
                // console.log('Default Measureset Set');
            }
        },
        clinicianProp: {
            data: [
                {
                    firstname: 'hemant',
                    lastname: 'patil',
                    id: 2,
                    istest: false,
                    tin: 123456,
                    country: 'sdffdg'
                },
                {
                    firstname: 'juber',
                    lastname: 'ahmd',
                    id: 3,
                    istest: false,
                    tin: null,
                    country: null
                }
            ],
            label: 'Select Clinician',
            selectedLabel: 'Selected Clinician',
            selectedId: 2
        },
        locationProp: {
            data: [
                {
                    name: 'hemant',
                    id: 2,
                    istest: false,
                    tin: 123456,
                    country: 'sdffdg'
                },
                {
                    name: 'juber',
                    id: 3,
                    istest: false,
                    tin: null,
                    country: null
                }
            ],
            label: 'Select Location',
            selectedLabel: 'Selected Location',
            selectedId: 2
        },
        yearProp: {
            data: [
                {
                    id: '1',
                    name: '2018',
                    value: '1'
                },
                {
                    id: '2',
                    name: '2017',
                    value: '2'
                },
                {
                    id: '3',
                    name: '2016',
                    value: '3'
                }
            ],
            label: 'Select Year',
            selectedLabel: 'Selected Year',
            selectedId: 1,
            onchangeHandler() {
                // console.log('Year DropDown selection change fire');
            }
        },
        durationProp: {
            data: [
                { name: 'Q4 2018', value: 1, id: 1, key: '1', flag: 'QNR' },
                { name: 'Q3 2018', value: 2, id: 2, key: '2', flag: 'QNR' },
                { name: 'Q2 2018', value: 3, id: 3, key: '3', flag: 'QNR' },
                { name: 'Q1 2018', value: 4, id: 4, key: '4', flag: 'QNR' },
                { name: 'Jan 2018', value: 5, id: 5, key: '5', flag: 'MNR' },
                { name: 'Feb 2018', value: 6, id: 6, key: '6', flag: 'MNR' },
                { name: 'Mar 2018', value: 7, id: 7, key: '7', flag: 'MNR' },
                { name: 'Apr 2018', value: 8, id: 8, key: '8', flag: 'MNR' },
                { name: 'May 2018', value: 9, id: 9, key: '9', flag: 'MNR' }
            ],
            label: 'Select Duration',
            selectedLabel: 'Selected Duration',
            selectedId: 1
        },
        onApplyFilters: () => {
            // console.log('Add Apply filter handling code here');
        },
        onCloseDialog: () => {
            // console.log('Closing of Grid');
        }
    }
};

// prop validation
MeasureFilter.propTypes = {
    measureFilterProp: PropTypes.shape({
        containerName: PropTypes.string,
        practiceProp: PropTypes.object,
        measureSetProp: PropTypes.object,
        clinicianProp: PropTypes.object,
        locationProp: PropTypes.object,
        yearProp: PropTypes.object,
        durationProp: PropTypes.object,
        onApplyFilters: PropTypes.func,
        onCloseDialog: PropTypes.func
    })
};
export default MeasureFilter;

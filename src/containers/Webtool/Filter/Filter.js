import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
// import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
// import { InlineDatePicker } from 'material-ui-pickers';
import _ from 'lodash';
import Tooltip from '@material-ui/core/Tooltip';

const INPUT_TYPES = {
    SINGLE_SELECT: 'select',
    DATE_RANGE: 'date-range'
};

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFilterPanelVisible: false,
            filteredData: _.cloneDeep(props.data),
            hideChangeButton: props.hideChangeButton | false,
            data: props.data
        };
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
        const isDataChanged = !_.isEqual(nextProps.data, this.props.data);
        if (isDataChanged) {
            this.setState({
                data: nextProps.data
            });
        }
    }

    onSelectChange = (event, item) => {
        const itemId = event.target.name;
        const selectedId = event.target.value;
        let newState = _.find(this.state.data, item => {
            return item.id === itemId;
        });
        newState.selectedId = selectedId;
        this.setState({ newState });
        this.props.onDropdownChange({ itemId, selectedId, selectedItem: item });
    };

    handleDateChange = (event, itemId, isFromDate) => {
        const formattedDate = moment(event._d).format('MM-DD-YYYY');
        const newState = _.find(this.state.data, item => {
            return item.id === itemId;
        });

        if (isFromDate) {
            newState.fromDate = formattedDate;
        } else {
            newState.toDate = formattedDate;
        }

        this.setState({ newState });
    };

    onFilterChange = () => {
        this.setState({ isFilterPanelVisible: !this.state.isFilterPanelVisible });
    };

    onClearFilters = () => {
        const { data } = this.state;
        _.map(data, item => {
            if (item.type === INPUT_TYPES.SINGLE_SELECT) {
                item.selectedId = null;
            }
        });

        this.setState({ data });
    };

    onApplyFilters = () => {
        const filteredData = _.cloneDeep(this.state.data);
        this.setState({
            filteredData,
            isFilterPanelVisible: !this.state.isFilterPanelVisible
        });
        this.props.onApplyFilter(filteredData);
    };

    getSelectedItems = selectedItem => {
        if (!this.state.filteredData.length) {
            return 'Not selected';
        }

        const item = _.find(this.state.filteredData, filteredItem => {
            return filteredItem.id === selectedItem.id;
        });

        let selectedId = item.selectedId;
        if (!selectedId) {
            return 'Not selected';
        }
        let combinedItems = '';
        if (item.type === INPUT_TYPES.DATE_RANGE) {
            combinedItems = `${item.fromDate} - ${item.toDate}`;
        } else {
            let selectedItems = _.filter(item.options, option => {
                return selectedId == option.id;
            });

            if (selectedItems.length) {
                _.each(selectedItems, (selectedItem, i) => {
                    combinedItems += selectedItem.text;
                    if (i < selectedItems.length - 1) {
                        combinedItems += ',';
                    }
                });
            } else {
                combinedItems = 'Not selected';
            }
        }

        return combinedItems;
    };

    render() {
        const filterPanel = this.state.isFilterPanelVisible ? (
            <Paper elevation={2} className='measure--filter__stackable'>
                <Grid container spacing={24}>
                    {this.state.data.map((item, key) => {
                        switch (item.type) {
                            case INPUT_TYPES.SINGLE_SELECT:
                                return this.getSelectTemplate(item);
                            case INPUT_TYPES.DATE_RANGE:
                                return this.getDateRangeTemplate(item);
                        }
                    })}
                    <Grid item xs={12} className='filter-btn-group'>
                        <br />
                        <Button className='button' onClick={this.onFilterChange}>
                            Cancel
                        </Button>
                        <Button className='button' onClick={this.onClearFilters}>
                            Clear
                        </Button>
                        <Button
                            variant='outlined'
                            color='primary'
                            className='button'
                            onClick={this.onApplyFilters}
                        >
                            Apply Filters
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        ) : null;

        return (
            <Grid container className='measure--filter__wrapper'>
                <Grid item>
                    <Paper className='measure--filter--bg__wrapper' elevation={2}>
                        <Grid container spacing={24}>
                            {this.state.data.map((item, key) => {
                                return (
                                    // eslint-disable-next-line react/jsx-key
                                    <Grid item className='selected-label__container'>
                                        <Grid item xs className='selected-label__row'>
                                            <Typography
                                                className='selected-label__title'
                                                variant='body1'
                                            >
                                                {item.selectedLabel}
                                            </Typography>
                                            <Typography
                                                className='selected-label__value'
                                                variant='body2'
                                            >
                                                {this.getSelectedItems(item)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                            {!this.state.hideChangeButton ? (
                                <Grid item className='filter-change-btn'>
                                    <Button
                                        className='button'
                                        content='Change'
                                        onClick={this.onFilterChange}
                                    >
                                        Change
                                    </Button>
                                </Grid>
                            ) : null}
                        </Grid>
                    </Paper>
                    {filterPanel}
                </Grid>
            </Grid>
        );
    }

    getDateRangeTemplate = item => {
        const datecolumns = (
            <Grid item xs={12} className='fig-formcontrol-group'>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={4} className='fig-formcontrol-fromdate'>
                        <FormControl fullWidth className='fig-formcontrol'>
                            <MuiPickersUtilsProvider utils={MomentUtils} label='With keyboard'>
                                <InlineDatePicker
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
                                    minDate={null}
                                    maxDate={null}
                                    label='From Date'
                                    id={item.id}
                                    name={item.id}
                                    value={item.fromDate}
                                    disableFuture={item.disableFutureFrom}
                                    disablePast={item.disablePastFrom}
                                    onChange={event => {
                                        this.handleDateChange(event, item.id, true);
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} className='fig-formcontrol-todate'>
                        <FormControl fullWidth className='fig-formcontrol'>
                            <MuiPickersUtilsProvider utils={MomentUtils} label='With keyboard'>
                                <InlineDatePicker
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
                                    minDate={null}
                                    maxDate={null}
                                    id={item.id}
                                    name={item.id}
                                    label='To Date'
                                    value={item.toDate}
                                    disableFuture={item.disableFutureTo}
                                    disablePast={item.disablePastTo}
                                    onChange={event => {
                                        this.handleDateChange(event, item.id, false);
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        );

        return datecolumns;
    };

    getSelectTemplate = item => {
        let tooltipText = '';
        item.options.map(value => (value.id === item.selectedId ? (tooltipText = value.text) : ''));

        return (
            <Grid item xs={12} sm={4} key={item.id}>
                <FormControl fullWidth className='fig-formcontrol'>
                    <InputLabel htmlFor={item.id}>{item.selectLabel}</InputLabel>
                    <Tooltip title={tooltipText}>
                        <Select
                            name={item.id}
                            value={item.selectedId}
                            inputProps={{ name: item.id, id: item.value }}
                            onChange={event => this.onSelectChange(event, item)}
                        >
                            {item.options.map((option, key) => {
                                return (
                                    <MenuItem
                                        key={key}
                                        value={option.id}
                                        disabled={option.disabled || false}
                                    >
                                        {option.text}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Tooltip>
                </FormControl>
            </Grid>
        );
    };
}

export default Filter;

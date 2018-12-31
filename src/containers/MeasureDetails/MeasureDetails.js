import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, MenuItem, Select, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import MasterTab from '../../components/MasterTab';
import MeasurePerformanceStats from '../../components/MeasurePerformanceStats/MeasurePerformanceStats';
import { getPerformanceData } from '@/redux/actions/MeasurePerformanceAction';
import Loader from '@/helper/loaders/ComponentLoader';
import { SetMeasureIdSelectionAction } from '@/redux/modules/registryMeasureList';
import PerformanceTrend from '@/containers/PerformanceTrend/PerformanceTrend';
import LocationsTrend from '@/containers/LocationsTrend/LocationsTrend';
import CliniciansTrend from '@/containers/CliniciansTrend/CliniciansTrend';
import AllTrends from '@/containers/AllTrends/AllTrends';
import { REGISTRY_UNIT_NAME } from '@/helper/constants';

let PerformanceTrendObj = null;
let param = null;
class MeasureDetails extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (
            this.props.SelectedMeasureIdData.id === null ||
            this.props.SelectedMeasureIdData.id === undefined
        ) {
            this.props.history.push('/dashboard');
        } else {
            param = this.props.SelectedMeasureIdData.id;
            PerformanceTrendObj = this.props.SelectedMeasureIdData.rowData.performance
                .performanceData;
            this.props.loadMeasurePerformance(PerformanceTrendObj);
        }
    }

    onMeasureChangeHandler = event => {
        event = event || window.event;
        if (this.props.selectedMeasureId != event.target.value) {
            let selectedMeasureData = this.props.PracticeMeasureList.filter(obj => {
                return obj.id === event.target.value;
            });

            selectedMeasureData[0].performance = this.props.SelectedMeasureIdData.rowData.performance;
            selectedMeasureData[0].performance.performanceData.MeasureId = event.target.value;

            const viewDetailsSelection = {
                id: event.target.value,
                rowData: selectedMeasureData[0]
            };

            this.props.SetMeasureIdSelectionAction(viewDetailsSelection);
            this.props.loadMeasurePerformance(selectedMeasureData[0].performance.performanceData);
        }
    };

    getmeasurePerformanceObj = () => {
        if (this.props.MeasurePerformanceData.length === 0) return [];
        return [
            {
                label: this.props.MeasurePerformanceData.performanceData.performanceText,
                data: this.props.MeasurePerformanceData.performanceData.performance
            },
            {
                label: this.props.MeasurePerformanceData.performanceData.benchMark[2].label,
                data: this.props.MeasurePerformanceData.performanceData.benchMark[2].data
            },
            {
                label: this.props.MeasurePerformanceData.performanceData.benchMark[0].label,
                data: this.props.MeasurePerformanceData.performanceData.benchMark[0].data
            }
        ];
    };

    render() {
        if (this.props.IsMeasurePerformanceLoading) {
            return <Loader />;
        } else {
            param = this.props.selectedMeasureId;
            masterTabProp[0].tabContentProps.performance = this.props.SelectedMeasureIdData.rowData.performance;
            masterTabProp[0].tabContentProps.measureName =
                this.props.SelectedMeasureIdData.rowData.displayname +
                ' ' +
                this.props.SelectedMeasureIdData.rowData.measure.measure.displayname;
            masterTabProp[3].tabContentProps.performance = this.props.SelectedMeasureIdData.rowData.performance;
            masterTabProp[3].tabContentProps.measureName =
                this.props.SelectedMeasureIdData.rowData.displayname +
                ' ' +
                this.props.SelectedMeasureIdData.rowData.measure.measure.displayname;
            masterTabProp[1].tabContentProps.measureName =
                this.props.SelectedMeasureIdData.rowData.displayname +
                ' ' +
                this.props.SelectedMeasureIdData.rowData.measure.measure.displayname;
            masterTabProp[2].tabContentProps.measureName =
                this.props.SelectedMeasureIdData.rowData.displayname +
                ' ' +
                this.props.SelectedMeasureIdData.rowData.measure.measure.displayname;

            let measuresDropDownData = [];
            this.props.PracticeMeasureList.map((obj, index) => {
                measuresDropDownData.push({
                    value: obj.measure.measure.measureno,
                    text: `${obj.displayname} ${obj.measure.measure.displayname}`
                });
            });

            const measurePerformance = this.getmeasurePerformanceObj();
            const isinverse =
                this.props.SelectedMeasureIdData.rowData.measure.measure.isinverse == null
                    ? false
                    : this.props.SelectedMeasureIdData.rowData.measure.measure.isinverse;

            const MeasurePerformanceStatsProp = {
                colorCode: this.props.MeasurePerformanceData.performanceData.colorcode,
                measurePerformance: measurePerformance,
                isinverse: isinverse,
                isleftfloated: isleftfloated,
                configuration: configuration
            };

            masterTabProp[1].menuItem = `CLINICIANS (${this.props.SelectedPractice.providerCnt})`;
            masterTabProp[2].menuItem = `LOCATIONS (${this.props.SelectedPractice.locationCnt})`;

            return (
                <Grid container className='measure-details--page__wrapper'>
                    <Grid item xs={12}>
                        <Grid container className='measure-details--page-header__wrapper'>
                            <Grid item className='back-link--page__container'>
                                <Link to='/dashboard' className='go-back--link'>
                                    <FontAwesomeIcon icon={['fal', 'angle-left']} />
                                </Link>
                            </Grid>
                            <Grid className='measure-details--header__container'>
                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                        md={12}
                                        lg={6}
                                        className='measure-details--right-header__container'
                                    >
                                        <Grid item className='practice-name-header__container'>
                                            <Typography variant='h5'>
                                                {this.props.SelectedPractice.externalID +
                                                    ' - ' +
                                                    this.props.SelectedPractice.name}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            className='practice-select-header__container'
                                        >
                                            <Select
                                                // name="location"
                                                fullWidth
                                                value={this.props.SelectedMeasureIdData.id}
                                                onChange={this.onMeasureChangeHandler}
                                            >
                                                {measuresDropDownData.map((item, key) => {
                                                    return (
                                                        <MenuItem key={key} value={item.value}>
                                                            {item.text}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        md={12}
                                        lg={6}
                                        className='measure-details--left-header__container'
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            className='practice-measure-performance--stats__container'
                                        >
                                            <MeasurePerformanceStats
                                                measureData={MeasurePerformanceStatsProp}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container className='practice-measure-performance__tab-container'>
                            <Grid item xs={12}>
                                <MasterTab masterTabProp={masterTabProp} />
                                {/* need to implement code inside this of chart and its information */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
    }
}

const MeasureDetailsData = {
    dropDownData: {
        options: [
            {
                value: 'all',
                text: 'All'
            },
            {
                value: 'articles',
                text: 'Articles'
            },
            {
                value: 'products',
                text: 'Products'
            }
        ]
    },
    headerLabelData: {
        name: '503709- Web demo Practice'
    }
};

const masterTabProp = [
    {
        menuItem: 'PERFORMANCE TREND',
        cssClass: '',
        activeIndex: 1,
        icon: 'users',
        defaultActiveIndex: true,
        router: PerformanceTrend,
        iconUrl: '../../assets/svg/practice.svg',
        tabContentProps: {
            layout: {
                linechartWidth: 12,
                tableWidth: 12
            },
            performance: null,
            measureName: null
        }
    },
    {
        menuItem: 'CLINICIANS',
        cssClass: '',
        activeIndex: 2,
        icon: 'users',
        defaultActiveIndex: false,
        router: CliniciansTrend,
        iconUrl: '../../assets/svg/clinician.svg',
        tabContentProps: {
            layout: {
                linechartWidth: 6,
                tableWidth: 6
            },
            measureName: null
        }
    },
    {
        menuItem: 'LOCATIONS(50)',
        cssClass: '',
        activeIndex: 3,
        icon: 'users',
        defaultActiveIndex: false,
        router: LocationsTrend,
        iconUrl: '../../assets/svg/location.svg',
        tabContentProps: {
            layout: {
                linechartWidth: 6,
                tableWidth: 6
            },
            measureName: null
        }
    },
    {
        menuItem: 'All',
        cssClass: '',
        activeIndex: 4,
        icon: 'users',
        defaultActiveIndex: false,
        router: AllTrends,
        iconUrl: '../../assets/svg/location.svg',
        tabContentProps: {
            layout: {
                linechartWidth: 12,
                tableWidth: 12
            },
            performance: null,
            measureName: null
        }
    }
];

const isleftfloated = true;
const configuration = {
    iconArrowUp: ['fal', 'arrow-up'],
    iconArrowDown: ['fal', 'arrow-down'],
    colorArrowUp: 'green',
    colorArrowDown: 'green',
    iconThumbsUp: ['fal', 'thumbs-up'],
    colorThumbsUp: 'green'
};

MeasureDetails.defaultProps = {
    PerformanceTrendProps: {
        EntityName: 'provider',
        EntityId: '1639',
        ParentEntityId: '23',
        ParentEntityName: 'practice',
        DurationFrom: '2018-01-01',
        DurationTo: '2018-03-31',
        Flag: 'QNR',
        MeasureId: 'M22cms',
        Unit: REGISTRY_UNIT_NAME,
        IsPatientSpecific: 1,
        layout: {
            linechartWidth: 12,
            tableWidth: 12
        }
    }
};

const mapStateToProps = state => {
    return {
        SelectedPractice: state.QualityDashboard.selectedPractice,
        PracticeMeasureList: state.RegistryMeasureList.registrymeasureList,
        SelectedMeasureIdData: state.RegistryMeasureList.viewDetailsSelection,
        MeasurePerformanceData: state.MeasurePeformanceData.MeasurePerformanceData,
        IsMeasurePerformanceLoading: state.MeasurePeformanceData.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        SetMeasureIdSelectionAction: params => {
            dispatch(SetMeasureIdSelectionAction(params));
        },
        loadMeasurePerformance: params => {
            dispatch(getPerformanceData(params));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MeasureDetails);

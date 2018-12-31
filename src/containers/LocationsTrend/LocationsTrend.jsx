import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import BasicAccordion from '../../components/BasicAccordion';
import PerformanceBarContainer from '@/containers/PerformanceBar/PerformanceBar';
import { getlocations } from '@/redux/modules/locationTrendPerformance';
import Loader from '@/helper/loaders/ComponentLoader';
import PerformanceTrend from '@/containers/PerformanceTrend/PerformanceTrend';
import { REGISTRY_UNIT_NAME } from '@/helper/constants';

class LocationTrend extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const formatDate = date => {
            const d = new Date(date);

            let month = '' + (d.getMonth() + 1);

            let day = '' + d.getDate();

            const year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        };
        const queryParams = {
            locations: {
                input: {
                    practiceid: this.props.SelectedPracticeId | 1,
                    inactive: false,
                    orderBy: 'name'
                }
            },
            measureComputations: {
                input: {
                    EntityName: 'location',
                    EntityId: '1639',
                    ParentEntityId: this.props.SelectedPracticeId | '1',
                    ParentEntityName: 'practice',
                    DurationFrom:
                        (this.props.SelectedDurationFrom &&
                            formatDate(this.props.SelectedDurationFrom)) ||
                        '2018-01-01',
                    DurationTo:
                        (this.props.SelectedDurationTo &&
                            formatDate(this.props.SelectedDurationTo)) ||
                        '2018-03-31',
                    Flag: this.props.SelectedDurationFlag || 'QNR',
                    MeasureId: this.props.selectedMeasureId || 'M22cms',
                    Unit: REGISTRY_UNIT_NAME,
                    IsPatientSpecific: 1
                }
            }
        };
        this.props.getlocations(queryParams);
    }

    onAccordionExpandClick = (e, singleAccordion) => {};

    onAccordionIconClick = (e, singleAccordion) => {};

    onApplyFilters = filter => {};

    render() {
        if (this.props.isLoading) return <Loader />;
        if (this.props.LocationData.length == 0) return <h5>No records found. </h5>;
        const accordions = {
            type,
            data: this.props.LocationData.map(m => {
                return {
                    ...m,
                    tabContentProps: {
                        ...this.props.tabContentProps,
                        layout: {
                            linechartWidth: 6,
                            tableWidth: 6
                        },
                        performance: null
                    }
                };
            }),
            content: PerformanceTrend,
            action: this.onAccordionExpandClick,
            iconAction: this.onAccordionIconClick
        };
        return (
            <Fragment>
                {' '}
                <BasicAccordion config={config} header={header} accordions={accordions} />
            </Fragment>
        );
    }
}

const config = {
    iconColumn: 0,
    numberColumn: 1,
    stringColumn: 2,
    componentColumn: 4
};

const header = {
    name: 'LOCATION NAME',
    Exclusion: 'DEN EXCL',
    Exception: 'DEN EXPT',
    Denominator: 'DEN',
    Numerator: 'NUM',
    performance: 'ACHIEVED PERFORMANCE'
};

const type = {
    name: 'string',
    Denominator: 'number',
    Numerator: 'number',
    Exclusion: 'number',
    Exception: 'number',
    performance: PerformanceBarContainer
};

const mapStateToProps = state => ({
    isLoading: state.LocationTrendPerformance.isLoading,
    SelectedPracticeId: state.QualityDashboard.selectedPractice.id,
    selectedMeasureId: state.RegistryMeasureList.viewDetailsSelection.id,
    SelectedDurationFlag: state.MeasureFilter.measureFilterData.selectedValues.durationFlag,
    SelectedDurationFrom: state.MeasureFilter.measureFilterData.selectedValues.durationFrom,
    SelectedDurationTo: state.MeasureFilter.measureFilterData.selectedValues.durationTo,
    LocationData: state.LocationTrendPerformance.Locations
});

const mapDispatchToProps = {
    getlocations
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationTrend);

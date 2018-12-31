import React, { Component, Fragment } from 'react';
import BasicAccordion from '../../components/BasicAccordion';
import { connect } from 'react-redux';
import PerformanceBarContainer from '@/containers/PerformanceBar/PerformanceBar';
import { getproviders } from '@/redux/modules/clinicianTrendPerformance';
import Loader from '@/helper/loaders/ComponentLoader';
import PerformanceTrend from '@/containers/PerformanceTrend/PerformanceTrend';
import { REGISTRY_UNIT_NAME } from '@/helper/constants';

class CliniciansTrend extends Component {
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
            clinician: {
                input: {
                    practiceid: this.props.SelectedPracticeId | 1,
                    inactive: false,
                    orderBy: 'firstname'
                }
            },
            measureComputations: {
                input: {
                    EntityName: 'provider',
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
        this.props.getproviders(queryParams);
    }

    onAccordionExpandClick = (e, singleAccordion) => {};

    onAccordionIconClick = (e, singleAccordion) => {};

    render() {
        if (this.props.isLoading) return <Loader />;
        if (this.props.ProviderData.length == 0) return <h5>No records found. </h5>;
        const accordions = {
            type,
            data: this.props.ProviderData.map(m => {
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
                <BasicAccordion config={config} header={header} accordions={accordions} />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.ClinicianTrendPerformance.isLoading,
    SelectedPracticeId: state.QualityDashboard.selectedPractice.id,
    selectedMeasureId: state.RegistryMeasureList.viewDetailsSelection.id,
    SelectedDurationFlag: state.MeasureFilter.measureFilterData.selectedValues.durationFlag,
    SelectedDurationFrom: state.MeasureFilter.measureFilterData.selectedValues.durationFrom,
    SelectedDurationTo: state.MeasureFilter.measureFilterData.selectedValues.durationTo,
    ProviderData: state.ClinicianTrendPerformance.Providers
});

const mapDispatchToProps = {
    getproviders
};

const config = {
    iconColumn: 0,
    numberColumn: 1,
    stringColumn: 2,
    componentColumn: 4
};

const header = {
    firstname: 'CLINICIAN NAME',
    Exclusion: 'DEN EXCL',
    Exception: 'DEN EXPT',
    Denominator: 'DEN',
    Numerator: 'NUM',
    performance: 'ACHIEVED PERFORMANCE'
};

// const header = {
//   firstname: 'CLINICIAN NAME',
//   Denominator: 'DENOMINATOR',
//   Numerator: 'NUMERATOR',
//   Exclusion: 'DEN EXCL',
//   Exception: 'DEN EXPT',
//   performance: 'ACHIEVE PERFORMANCE',
// };

const type = {
    firstname: 'string',
    Denominator: 'number',
    Numerator: 'number',
    Exclusion: 'number',
    Exception: 'number',
    performance: PerformanceBarContainer
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CliniciansTrend);

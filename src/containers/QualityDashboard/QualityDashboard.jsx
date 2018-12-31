import React, { Fragment } from 'react';
import { Grid, MenuItem, Select, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import MasterTab from '@/components/MasterTab';
import DateTimeLabel from '@/components/DateTimeLabel';
import Loader from '@/helper/loaders/ComponentLoader';
import { getPracticeListAction, onPracticeChangeAction } from '@/redux/modules/qualityDashboard';
import { getMeasureFilterDataAction } from '@/redux/modules/measureFilter';
import { getProviderAction } from '@/redux/modules/providerDashboard';
import { getLocationAction } from '@/redux/modules/locationDashboard';
import PracticePerformance from '@/containers/PracticePerformance/PracticePerformance';
import CliniciansPerformance from '@/containers/CliniciansPerformance/CliniciansPerformance';
import LocationPerformance from '@/containers/LocationPerformance/LocationPerformance';

const masterTabProp = [
    {
        menuItem: 'PRACTICE',
        defaultActiveIndex: true,
        iconUrl: '../../assets/svg/practice.svg',
        fontIcon: 'hospital',
        router: PracticePerformance,
        action: () => {}
    },
    {
        menuItem: 'CLINICIANS',
        defaultActiveIndex: false,
        fontIcon: 'stethoscope',
        iconUrl: '../../assets/svg/clinician.svg',
        router: CliniciansPerformance,
        action: () => {}
    },
    {
        menuItem: 'LOCATIONS',
        fontIcon: 'map-marker-alt',
        defaultActiveIndex: false,
        iconUrl: '../../assets/svg/ehr.svg',
        router: LocationPerformance,
        action: () => {}
    }
];

class QualityDashboard extends React.Component {
    componentDidMount() {
        if (this.props.Practices.length === 0) {
            this.props.getPracticeListAction();
            this.props.getMeasureFilterDataAction();
        }
    }

    onPracticeChangeHandler = event => {
        event = event || window.event;
        if (this.props.SelectedPractice.id !== event.target.value) {
            this.props.onPracticeChangeAction(parseInt(event.target.value));
            const locationqueryParams = {
                input: {
                    practiceid: event.target.value,
                    orderBy: 'name',
                    inactive: false
                }
            };
            const providerqueryParams = {
                input: {
                    practiceid: event.target.value,
                    orderBy: 'firstname',
                    inactive: false
                }
            };
            this.props.getProviderAction(providerqueryParams);
            this.props.getLocationAction(locationqueryParams);
        }
    };

    render() {
        const IsLoading = this.props.IsLoading;
        if (IsLoading) {
            return <Loader />;
        }

        const {
            id,
            name,
            externalID,
            providerCnt,
            locationCnt,
            refreshDateData
        } = this.props.SelectedPractice;

        const practiceList = this.props.Practices;

        const practiceData =
            practiceList != null
                ? practiceList.map(item => ({
                      value: item.id,
                      text: `${item.externalid} - ${item.name}`
                  }))
                : [];

        const disableElement = practiceData.length === 1;
        masterTabProp[1].menuItem = `CLINICIANS (${providerCnt || 0})`;
        masterTabProp[2].menuItem = `LOCATIONS (${locationCnt || 0})`;

        return (
            <Fragment>
                <Grid container className='quality-dashboard--page__wrapper'>
                    <Grid item xs={12} sm={12} md={4} lg={5} className='page-title__container'>
                        <Typography variant='h2' className='fi-subheader__title '>
                            Quality Dashboard
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={8}
                        lg={7}
                        className='page_head-top-right__container'
                    >
                        <Grid container className='select-practice__container'>
                            <Grid item className='select-practice--title__container'>
                                <Typography variant='body1'>Practice:</Typography>
                            </Grid>
                            <Grid item xs className='select-practice--dropdown__container'>
                                <Select
                                    fullWidth
                                    name='practice'
                                    disabled={disableElement}
                                    value={id !== undefined ? id : ''}
                                    onChange={this.onPracticeChangeHandler}
                                >
                                    {practiceData.map(item => (
                                        <MenuItem key={item.value} value={item.value}>
                                            {item.text}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <DateTimeLabel dates={refreshDateData} />
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12}>
                            <MasterTab masterTabProp={masterTabProp} />
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ QualityDashboard, MeasureFilter }) => ({
    IsLoading: QualityDashboard.isLoading,
    Practices: QualityDashboard.practiceList,
    SelectedPractice: QualityDashboard.selectedPractice,
    MeasureFilterData: MeasureFilter
});

const mapDispatchToProps = {
    getPracticeListAction,
    onPracticeChangeAction,
    getMeasureFilterDataAction,
    getProviderAction,
    getLocationAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QualityDashboard);

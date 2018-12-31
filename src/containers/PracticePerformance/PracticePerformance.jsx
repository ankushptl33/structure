import React, { Fragment } from 'react';
import MeasureFilter from '@/components/MeasureFilter';
import BasicGrid from '@/components/BasicGrid';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import PerformanceBarContainer from '@/containers/PerformanceBar/PerformanceBar';
import Measure from '@/components/Measure/Measure';
import ViewDetails from './ViewDetails';
import { PRACTICE, REGISTRY_UNIT_NAME, UNDEFINED } from '@/helper/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    fnSetUserFavoriteMeasure,
    fnUpdateFilterInStore,
    formateDate,
    generateDropDownObject,
    generateMeasurePerformanceParamObj
} from '@/helper/commonFunction';
import Loader from '@/helper/loaders/ComponentLoader';
import { measureFilterUpdateAction } from '@/redux/modules/measureFilter';
import {
    FilterRegistryMeasureAction,
    getMeasureListAction,
    SetUserFavoriteMeasureAction
} from '@/redux/modules/registryMeasureList';
import ExportPdf from './ExportPdf';

let filterValue = UNDEFINED;
class PracticePerformance extends React.Component {
    componentDidMount() {}

    generatePracticeGridOj = filter => {
        const params = generateMeasurePerformanceParamObj(
            filter,
            PRACTICE,
            this.props.MeasureFilterData.selectedValues,
            this.props.SelectedPractice.id,
            '',
            ''
        );
        let registryMeasureList = this.props.PracticeMeasureList;
        registryMeasureList = registryMeasureList.map(obj => ({
            ...obj,
            practiceid: params.EntityId,
            performance: {
                performanceData: {
                    EntityName: params.EntityName,
                    EntityId: params.EntityId,
                    ParentEntityId: params.ParentEntityId,
                    ParentEntityName: params.ParentEntityName,
                    DurationFrom: formateDate(new Date(params.DurationFrom), 'YYYY-MM-DD'),
                    DurationTo: formateDate(new Date(params.DurationTo), 'YYYY-MM-DD'),
                    Flag: params.Flag,
                    MeasureId: obj.id,
                    Unit: REGISTRY_UNIT_NAME,
                    IsPatientSpecific: 1
                },
                isStopPropagation: false,
                exportPdf: {}
            }
        }));
        return registryMeasureList;
    };

    onApplyFilters = filter => {
        const measureFilterReduxStore = {
            measureSet: filter.measureset.selectedItem.id,
            year: filter.year.id,
            duration: filter.duration.id,
            durationFlag: filter.duration.flag,
            durationFrom: filter.duration.startdate,
            durationTo: filter.duration.enddate,
            customrange: filter.customrange,
            fromdate: filter.fromdate,
            todate: filter.todate
        };
        this.props.measureFilterUpdateAction(measureFilterReduxStore);
        filterValue = filter;
        if (
            this.props.MeasureFilterData.selectedValues.measureSet !==
            filter.measureset.selectedItem.id
        ) {
            this.props.getMeasureListAction({
                MeasuresetId: filter.measureset.selectedItem.id
            });
        }
    };

    filterUserFavoriteMeasureHandler(isFavorite) {
        this.props.FilterRegistryMeasureAction(isFavorite);
    }

    setUserFavoriteMeasureHandler(e, props) {
        fnSetUserFavoriteMeasure(this, e, props);
    }

    onMeasureYearChangeHandler(year) {
        fnUpdateFilterInStore(this, year);
    }

    render() {
        /* COLUMN DEFINITION
         */
        const columnDefs = [
            {
                favourite: {
                    type: 'component',
                    header: 'FAVORITE',
                    cssClasses: ['measure-performance'],
                    style: {},
                    component: {
                        name: 'Icon',
                        props: ['icon'],
                        component: FontAwesomeIcon,
                        events: [
                            {
                                onClick: this.setUserFavoriteMeasureHandler.bind(this)
                            }
                        ]
                    }
                }
            },
            {
                displayname: {
                    type: 'string',
                    header: 'ID',
                    cssClasses: ['measure-id'],
                    style: {}
                }
            },
            {
                practiceid: {
                    type: 'string',
                    header: 'PRACTICEID',
                    cssClasses: ['hide'],
                    style: { display: 'none' }
                }
            },
            {
                measure: {
                    type: 'component',
                    header: 'MEASURE',
                    cssClasses: ['measure-name'],
                    style: {},
                    component: {
                        name: 'Measure',
                        props: ['measure'],
                        component: Measure
                    }
                }
            },
            {
                performance: {
                    type: 'component',
                    header: 'ACHIEVED PERFORMANCE',
                    cssClasses: ['measure-performance'],
                    style: {},
                    component: {
                        name: 'practice',
                        props: ['performanceData'],
                        component: PerformanceBarContainer
                    }
                }
            },
            {
                exportPdf: {
                    type: 'component',
                    header: ' ',
                    cssClasses: ['measure-performance'],
                    style: { cursor: 'pointer' },
                    cols: 0,
                    component: {
                        name: 'ExportPdf',
                        props: [],
                        component: ExportPdf
                    }
                }
            },
            {
                viewDetails: {
                    type: 'component',
                    header: ' ',
                    data: false,
                    cssClasses: [''],
                    style: {},
                    component: {
                        name: 'ViewDetails',
                        props: [],
                        component: ViewDetails
                    }
                }
            }
        ];

        const measureSetProp = generateDropDownObject(
            this.props.MeasureFilterData.measureSet,
            'Select Measure Set',
            'Measure Set',
            null,
            this.props.MeasureFilterData.selectedValues.measureSet
        );

        const Year = generateDropDownObject(
            this.props.MeasureFilterData.year,
            'Select Year',
            'Year',
            null,
            this.props.MeasureFilterData.selectedValues.year
        );

        Year.onchangeHandler = this.onMeasureYearChangeHandler.bind(this);

        const Duration = generateDropDownObject(
            this.props.MeasureFilterData.duration,
            'Select Duration',
            'Duration',
            null,
            this.props.MeasureFilterData.selectedValues.duration
        );

        Duration.data = this.props.MeasureFilterData.duration.filter(
            duration => duration.year === this.props.MeasureFilterData.selectedValues.year
        );

        const measureFilterProp = {
            ContainerName: PRACTICE,
            measureSetProp,
            yearProp: Year,
            durationProp: Duration,
            onApplyFilters: this.onApplyFilters,
            customrange: this.props.MeasureFilterData.selectedValues.customrange,
            fromdate: this.props.MeasureFilterData.selectedValues.fromdate,
            todate: this.props.MeasureFilterData.selectedValues.todate
        };

        if (this.props.IsMeasureFilterLoading || this.props.IsRegistryMeasureListLoading) {
            return <Loader />;
        }

        let basicGrid = null;

        basicGrid = (
            <Grid item xs className='practice-performance__grid-filter'>
                <a
                    href='javascript:'
                    onClick={this.filterUserFavoriteMeasureHandler.bind(this, false)}
                    className={`practice-performance__filter ${
                        this.props.Favoritefilter ? '' : 'active'
                    } all`}
                >
                    All
                </a>
                <a
                    href='javascript:'
                    onClick={this.filterUserFavoriteMeasureHandler.bind(this, true)}
                    className={`practice-performance__filter ${
                        this.props.Favoritefilter ? 'active' : ''
                    } favourites`}
                >
                    Favorites
                </a>
            </Grid>
        );

        {
            let gridData = this.generatePracticeGridOj(filterValue) || [];

            if (this.props.Favoritefilter) {
                gridData = gridData.filter(value => value.isFavourite);
            }

            if (gridData.length > 0) {
                basicGrid = (
                    <div>
                        {basicGrid}
                        <BasicGrid columnDefs={columnDefs} data={gridData} />
                    </div>
                );
            } else if (this.props.PracticeMeasureList.length > 0) {
                basicGrid = (
                    <div>
                        {basicGrid}
                        <BasicGrid columnDefs={columnDefs} data={gridData} />
                    </div>
                );
            } else {
                basicGrid = (
                    <div>
                        <BasicGrid columnDefs={columnDefs} data={gridData} />
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <MeasureFilter measureFilterProp={measureFilterProp} />
                {basicGrid}
            </Fragment>
        );
    }
}

const mapStateToProps = ({ QualityDashboard, MeasureFilter, RegistryMeasureList }) => ({
    SelectedPractice: QualityDashboard.selectedPractice,
    MeasureFilterData: MeasureFilter.measureFilterData,
    IsMeasureFilterLoading: MeasureFilter.isLoading,
    IsRegistryMeasureListLoading: RegistryMeasureList.isRegistryMeasureListLoading,
    Favoritefilter: RegistryMeasureList.favoritefilter,
    PracticeMeasureList: RegistryMeasureList.registrymeasureList
});

const mapDispatchToProps = {
    getMeasureListAction,
    measureFilterUpdateAction,
    FilterRegistryMeasureAction,
    SetUserFavoriteMeasureAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PracticePerformance);

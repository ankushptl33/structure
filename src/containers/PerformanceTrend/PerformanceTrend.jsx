import React from 'react';
import { Grid } from '@material-ui/core';
import Linechart from '../../components/LineChart/LineChart';
import BasicTable from '../../components/BasicTable/BasicTable';
import { getPerformanceInfo } from '@/redux/services/PerformanceTrendInfoApi';
import Loader from '@/helper/loaders/ComponentLoader';
import PatientDrillDown from '@/containers/PatientDrillDown/PatientDrillDown';
import './PerformanceTrend.less';

let performanceInput = null;
class PerformanceTrend extends React.Component {
    constructor(props) {
        super(props);

        /* SET INITIAL STATE:
   ===================================== */
        this.state = {
            inputModal: {},
            tableData: null,
            isMounted: false
        };
    }

    componentDidMount() {
        if (this.props.tabContentProps != undefined) {
            performanceInput =
                this.props.tabContentProps.performance != undefined
                    ? this.props.tabContentProps.performance.performanceData
                    : this.props.performance.performanceData;
        } else {
            performanceInput = this.props.performance.performanceData;
        }

        let params = {
            input: {
                EntityName: performanceInput.EntityName,
                EntityId: performanceInput.EntityId,
                ParentEntityId: performanceInput.ParentEntityId,
                ParentEntityName: performanceInput.ParentEntityName,
                DurationFrom: performanceInput.DurationFrom,
                DurationTo: performanceInput.DurationTo,
                Flag: performanceInput.Flag,
                MeasureId: performanceInput.MeasureId,
                Unit: performanceInput.Unit,
                IsPatientSpecific: performanceInput.IsPatientSpecific
            }
        };
        this.getPerformanceTrendInfoData(params);
    }

    /* PATIENT DRILLDOWN METHOD */
    openModalDrillDown = (e, data, columnKey) => {
        const inputModalProps = {
            PatientDrillDownProps: {
                InputFilterTrendInfo: {
                    EntityName: data.EntityName,
                    EntityId: data.EntityId,
                    ParentEntityId: data.ParentEntityId,
                    ParentEntityName: data.ParentEntityName,
                    DurationFrom: data.DurationFrom,
                    DurationTo: data.DurationTo,
                    Flag: performanceInput.Flag,
                    MeasureId: data.MeasureId,
                    Unit: performanceInput.Unit,
                    PageNumber: 1,
                    PageSize: 10,
                    DrilldownCategory: columnKey
                },
                quarterName: data.Quarter,
                selectedMeasure: {
                    name:
                        this.props.tabContentProps != undefined
                            ? this.props.tabContentProps.measureName
                            : this.props.displayname + ' ' + this.props.measure.measure.displayname
                },
                layout: {
                    filterDetailsWidth: 12,
                    exportWidth: 12,
                    filterEntityLabel: 6,
                    patientGridWidth: 12
                },
                open: true
            }
        };

        this.setState({ inputModal: inputModalProps });
    };

    getPerformanceTrendInfoData(params) {
        this.setState({
            isMounted: false
        });

        const viewTableData = {
            basicTableDataProp: {
                data: [],
                labels:
                    'DEN: Denominator, DEN EXCL: Denominator Exclusion, DEN EXPT: Denominator Exception, (+): MET, (-): NOT MET, PR: Performance Rate',
                cols: [
                    {
                        key: 'Quarter',
                        label: 'QUARTER'
                    },
                    {
                        key: 'Denominator',
                        label: 'DEN',
                        link: true,
                        onclick: this.openModalDrillDown
                    },
                    {
                        key: 'Exclusion',
                        label: 'DEN EXCL',
                        link: true,
                        onclick: this.openModalDrillDown
                    },
                    {
                        key: 'Exception',
                        label: 'DEN EXPT',
                        link: true,
                        onclick: this.openModalDrillDown
                    },
                    {
                        key: 'Numerator',
                        label: 'MET(+)',
                        link: true,
                        onclick: this.openModalDrillDown
                    },
                    {
                        key: 'NotMet',
                        label: 'NOT MET(-)',
                        link: true,
                        onclick: this.openModalDrillDown
                    },
                    {
                        key: 'Percentage',
                        label: 'PR'
                    }
                ]
            },

            LineChartData: {
                config: {
                    type: 'serial',
                    hideCredits: true,
                    theme: 'light',
                    legend: {
                        data: [
                            {
                                title: 'Performance',
                                color: 'green',
                                markerType: 'circle'
                            },
                            {
                                title: 'Registry Average',
                                color: 'black',
                                markerType: 'circle'
                            }
                        ],
                        position: 'top',
                        autoMargins: false,
                        align: 'right'
                    },

                    dataProvider: [
                        {
                            quarter: 'x-axis label',
                            MeasureAverage: 30,
                            RegistryAverage: 85
                        }
                    ],
                    graphs: [
                        {
                            id: 'performance',
                            lineColor: 'green',
                            bullet: 'round',
                            bulletBorderAlpha: 1,
                            bulletColor: 'green',
                            title: 'Performance',
                            valueField: 'MeasureAverage',
                            lineThickness: 1
                        },
                        {
                            id: 'registryaverage',
                            lineColor: 'black',
                            bullet: 'round',
                            bulletBorderAlpha: 1,
                            bulletColor: 'Black',
                            title: 'Registry Average',
                            valueField: 'RegistryAverage',
                            lineThickness: 1
                        }
                    ],
                    categoryField: 'DurationName',
                    AxisBase: {
                        autoGridCount: false
                    },
                    valueAxes: [
                        {
                            strictMinMax: true,
                            autoGridCount: false,
                            gridCount: 5,
                            axisThickness: 0.5,
                            gridAlpha: 0.2,
                            axisAlpha: 1,
                            position: 'left',
                            minimum: 0,
                            maximum: 100,
                            baseCoord: 0,
                            offset: 1,
                            tickLength: 0
                        }
                    ],
                    categoryAxis: {
                        lineAlpha: 1,
                        startOnAxis: true, // start quarter on vertical line.
                        axisColor: 'green',
                        minorGridEnabled: true
                    },
                    export: {
                        enabled: false
                    }
                },
                dataProvider: []
            }
        };

        getPerformanceInfo(params)
            .then(json => {
                if (json.data.getPerformanceTrendInfo != null) {
                    json.data.getPerformanceTrendInfo.map((obj, index) => {
                        viewTableData.basicTableDataProp.data.push({
                            Quarter: obj.DurationName,
                            Exclusion: obj.Exclusion,
                            Exception: obj.Exception,
                            Denominator: obj.Denominator,
                            Numerator: obj.Numerator,
                            NotMet: obj.NotMet,
                            Percentage: obj.MeasureAverage + ' %',
                            DurationFrom: obj.DurationFrom,
                            DurationTo: obj.DurationTo,
                            EntityName: obj.EntityName,
                            EntityId: obj.EntityId,
                            ParentEntityId: obj.ParentEntityId,
                            ParentEntityName: obj.ParentEntityName,
                            MeasureId: obj.MeasureId
                        });
                        viewTableData.LineChartData.dataProvider.push({
                            DurationName: obj.DurationName,
                            MeasureAverage: obj.MeasureAverage,
                            RegistryAverage: obj.RegistryAverage,
                            ListOrder: obj.ListOrder
                        });
                    });
                }

                /* SORTING FUNCTION FOR QUARTERS OF LINECHART  */
                viewTableData.LineChartData.dataProvider = viewTableData.LineChartData.dataProvider.sort(
                    (a, b) => parseFloat(b.ListOrder) - parseFloat(a.ListOrder)
                );
                this.setState({
                    tableData: viewTableData || [],
                    isMounted: true
                });
            })

            .catch(ex => {
                this.setState({
                    isMounted: true
                });
            });
    }

    render() {
        const layout = {
            linechartWidth: 6,
            tableWidth: 6
        };
        const layoutProps =
            this.props.tabContentProps != null ? this.props.tabContentProps.layout : layout;

        const tableData = this.state.tableData || [];

        if (!this.state.isMounted) {
            return <Loader />;
        }
        if (
            tableData.LineChartData.dataProvider.length === 0 &&
            tableData.basicTableDataProp.data.length === 0
        ) {
            return <h5>No records found. </h5>;
        }

        return (
            <Grid container spacing={24} className='performance-trends'>
                <Grid
                    item
                    xs={12}
                    md={12}
                    lg={layoutProps.linechartWidth}
                    className='performance-trends_linbchart'
                >
                    <Linechart {...tableData.LineChartData} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={12}
                    lg={layoutProps.tableWidth}
                    className='performance-trends_table'
                >
                    <Grid item xs className='performance-trends_table-parent'>
                        <PatientDrillDown
                            {...this.state.inputModal}
                            className='performance-trends__patient-drilldown'
                        />
                        <BasicTable
                            basicTableDataProp={tableData.basicTableDataProp}
                            className='performance-trends__basic-table'
                        />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default PerformanceTrend;

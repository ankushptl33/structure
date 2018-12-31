import { getPerformanceInfo } from '../services/PerformanceTrendInfoApi';

export const TRENDINFO_REQUEST = 'TRENDINFO_REQUEST';
export const TRENDINFO_RECEIVE = 'TRENDINFO_RECEIVE';
export const TRENDINFO_FAILURE = 'TRENDINFO_FAILURE';

const requestTrendInfo = () => ({
    type: TRENDINFO_REQUEST
});

const receiveTrendInfo = payload => ({
    type: TRENDINFO_RECEIVE,
    payload
});

const failureTrendInfo = () => ({
    type: TRENDINFO_FAILURE
});

export const getPerformanceTrendInfoData = params => {
    let viewTableData = {
        basicTableDataProp: {
            data: [],
            labels:
                'DEN EXCL: Denominator Exclusion, DEN EXPT: Denominator Exception, DEN: Denominator, NUM: Numerator, PR: Performance Rate'
        },

        LineChartData: {
            config: {
                type: 'serial',
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
                    startOnAxis: true, // start quarter on vertical line
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

    return dispatch => {
        dispatch(requestTrendInfo());
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
                            Percentage: obj.MeasureAverage,
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
                            RegistryAverage: obj.RegistryAverage
                        });
                    });
                }
                dispatch(receiveTrendInfo(viewTableData));
            })
            .catch(ex => {
                dispatch(failureTrendInfo());
                throw new Error(ex);
            });
    };
};

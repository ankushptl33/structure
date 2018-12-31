import React from 'react';
import AmCharts from '@amcharts/amcharts3-react';
import './LineChart.less';
import PropTypes from 'prop-types';

// this Line chart can be use anywhere just you need to pass to properties "config" & "dataProvider"
// "config" for graph styling and "dataProvider" for real time data to show graph

const LineChart = props => {
    const { config } = props;
    const Chart = { ...config, dataProvider: props.dataProvider };
    return <AmCharts.React className='lineChartDimention' options={Chart} />;
};

LineChart.defaultProps = {
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
            startOnAxis: true, // start quarter on vertical line
            axisColor: 'green',
            minorGridEnabled: true
        },
        export: {
            enabled: true
        }
    },
    dataProvider: [
        {
            DurationName: '2018Q1',
            MeasureAverage: 5.693950177935943,
            RegistryAverage: 1.7639200791410024
        },
        {
            DurationName: '2017Q4',
            MeasureAverage: 0,
            RegistryAverage: 0
        },
        {
            DurationName: '2017Q3',
            MeasureAverage: 0,
            RegistryAverage: 80
        },
        {
            DurationName: '2017Q2',
            MeasureAverage: 0,
            RegistryAverage: 10
        }
    ]
};

LineChart.propTypes = {
    config: PropTypes.object,
    dataProvider: PropTypes.array
};
export default LineChart;

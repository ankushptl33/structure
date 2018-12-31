import React from 'react';
import { Grid, Tooltip } from '@material-ui/core';
import './MeasurePerformanceStats.less';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MeasurePerformanceStats = props => {
    const {
        configuration,
        measurePerformance,
        isinverse,
        isleftfloated,
        colorCode
    } = props.measureData;

    let arrow, colorArrow, arrowTitle;
    let leftFloatedMeasures = null;
    let rightFloatedMeasures = null;

    if (isinverse) {
        arrow = configuration.iconArrowDown ? configuration.iconArrowDown : ['fal', 'arrow-up'];
        arrowTitle = 'Lower score for this measure is better';
    } else {
        arrow = configuration.iconArrowUp ? configuration.iconArrowUp : ['fal', 'arrow-down'];
        arrowTitle = 'Higher score for this measure is better';
    }

    if (isinverse) {
        colorArrow = configuration.colorArrowDown ? configuration.colorArrowDown : 'green';
    } else {
        colorArrow = configuration.colorArrowUp ? configuration.colorArrowUp : 'green';
    }

    const measures = measurePerformance.map((measuresData, index) => {
        return (
            <Grid key={index} item className='measures__data--grid'>
                <Typography variant='h6' className='measures__data--label'>
                    {measuresData.label}
                </Typography>
                <Typography variant='h4' className='measures__data--percent'>
                    {measuresData.data}%
                </Typography>
            </Grid>
        );
    });

    if (isleftfloated) {
        leftFloatedMeasures = measures;
    } else {
        rightFloatedMeasures = measures;
    }

    return (
        <Grid container spacing={16} className='measures__icons--grid'>
            {rightFloatedMeasures}
            <Grid item xs className='measures__data--icons'>
                <span className='measures__data--arrow-up'>
                    <Tooltip title={arrowTitle}>
                        {<FontAwesomeIcon icon={arrow} size='lg' color={colorArrow} />}
                    </Tooltip>
                </span>
                <span className={`measures__data--thumbs-up ${colorCode}`}>
                    {
                        <FontAwesomeIcon
                            icon={['fal', 'thumbs-up']}
                            size='lg'
                            color={configuration.colorThumbsUp}
                        />
                    }
                </span>
            </Grid>
            {leftFloatedMeasures}
        </Grid>
    );
};

MeasurePerformanceStats.defaultProps = {
    measureData: {
        measurePerformance: [
            {
                label: 'Achieved Performance',
                data: '88.08'
            },
            {
                label: 'CMS Benchmark',
                data: '45'
            },
            {
                label: 'Registry Average',
                data: '85'
            }
        ],
        isinverse: true,
        isleftfloated: false,
        configuration: {
            iconArrowUp: ['fal', 'arrow-up'],
            iconArrowDown: ['fal', 'arrow-down'],
            colorArrowUp: 'green',
            colorArrowDown: 'green',
            iconThumbsUp: ['fal', 'thumbs-up'],
            colorThumbsUp: 'green'
        }
    }
};
export default MeasurePerformanceStats;

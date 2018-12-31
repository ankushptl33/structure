import React from 'react';
import './Performance.less';
import PropTypes from 'prop-types';
import { Grid, LinearProgress, Paper, Tooltip, Typography } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Performance = props => {
    const { performanceData } = props;
    const benchmark = [...performanceData.benchMark];
    const filteredBenchMark = (_benchmark, position) =>
        _benchmark.filter(item => item.position && item.position.toLowerCase() === position);

    const belowPosBenchmark = filteredBenchMark(benchmark, 'below');
    const abovePosBenchmark = filteredBenchMark(benchmark, 'above');

    const belowPosBenchmarkJsx = belowPosBenchmark.map(posData =>
        posData.data ? (
            <Tooltip key={posData.label} title={posData.label}>
                <Grid
                    container
                    spacing={24}
                    className='mark-parent cms__benchmark below--detail'
                    key={posData.label}
                    style={{ left: `${posData.data}%` }}
                >
                    <Grid item className='mark-child mark-child__pointer'>
                        <FontAwesomeIcon icon={['fas', 'caret-up']} />
                    </Grid>
                    <Grid item className='mark-child mark-child__percent'>
                        {posData.data}
                        <span>%</span>{' '}
                    </Grid>
                </Grid>
            </Tooltip>
        ) : null
    );

    const abovePosBenchmarkJsx = abovePosBenchmark.map(posData =>
        posData.data ? (
            <Tooltip key={posData.label} title={posData.label}>
                <Grid
                    container
                    spacing={24}
                    className='mark-parent registry__benchmark above-detail'
                    key={posData.label}
                    style={{ left: `${posData.data}%` }}
                >
                    <Grid item className='mark-child mark-child__percent'>
                        <span>{posData.data}</span>
                        <span>%</span>{' '}
                    </Grid>
                    <Grid item className='mark-child mark-child__pointer'>
                        <FontAwesomeIcon icon={['fas', 'caret-down']} />
                    </Grid>
                </Grid>
            </Tooltip>
        ) : null
    );

    const progressColorCode = 'parent-progress progressbar ' + performanceData.colorcode;
    const performanceStatsBlock = (
        <Grid
            item
            xs={
                performanceData.configuration && performanceData.configuration.percentColumnSize
                    ? performanceData.configuration.percentColumnSize
                    : 2
            }
            className='performance__width--10'
        >
            <Tooltip title={performanceData.performanceText}>
                <Typography
                    aria-owns='mouse-over-popover'
                    aria-haspopup='true'
                    className={`percent ${progressColorCode}`}
                >
                    {performanceData.performance} %
                </Typography>
            </Tooltip>
        </Grid>
    );

    return (
        <Grid container className={progressColorCode}>
            {performanceData.performancePosition === 'left' ? performanceStatsBlock : null}
            <Grid
                item
                xs={
                    performanceData.configuration && performanceData.configuration.barColumnSize
                        ? performanceData.configuration.barColumnSize
                        : 10
                }
                className='performance__width--90 progress_bar_wrapper '
            >
                {abovePosBenchmarkJsx}
                <Paper className='progress-segment'>
                    <Paper
                        className={`measure-performance-bar percent ${performanceData.colorcode}`}
                        style={{ left: `${performanceData.performance}%` }}
                    >
                        |
                    </Paper>
                    <LinearProgress
                        variant='determinate'
                        className={`progress-bar percent ${progressColorCode}`}
                        value={performanceData.performance}
                        fitted='true'
                        size='tiny'
                    />
                </Paper>
                {belowPosBenchmarkJsx}
            </Grid>
            {performanceData.performancePosition !== 'left' ? performanceStatsBlock : null}
        </Grid>
    );
};
Performance.defaultProps = {
    performanceData: {
        performanceText: 'Achieved Performance',
        performance: 49.59,
        performancePosition: '',
        benchMark: [
            {
                label: 'Registry Average',
                data: 12,
                position: 'above',
                colorcode: ''
            },
            {
                label: 'Registry BenchMark',
                data: undefined,
                position: 'above',
                colorcode: ''
            },
            {
                label: 'CMS Average',
                data: 49,
                position: 'below',
                colorcode: ''
            }
        ],
        colorcode: 'progress-bar-success',
        configuration: {
            barColumnSize: 10,
            percentColumnSize: 2
        }
    }
};
Performance.propTypes = {
    performanceData: PropTypes.shape({
        performanceText: PropTypes.string,
        performance: PropTypes.number,
        performancePosition: PropTypes.string,
        benchMark: PropTypes.array,
        colorcode: PropTypes.string,
        configuration: PropTypes.object
    })
};
export default Performance;

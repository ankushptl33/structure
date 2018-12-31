import React from 'react';
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './BasicAccordion.less';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoResultFound from '@/layouts/ErrorLayout/NoResultFound';

const styles = () => ({
    expanded: {
        border: '1px solid #4194F2',
        backgroundColor: '#ffffff !important'
    }
});

const NotAvailable = () => (
    <div className='mastertab-outer'>
        <Typography variant='h4' gutterBottom>
            Need to add component/container here.
        </Typography>
    </div>
);

/**
 * This is a BasicAccordion Component
 */
class BasicAccordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: null
        };
    }

    /* On props change it will initialise state */
    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
        if (nextProps.expanded) {
            this.setState({ expanded: nextProps.expanded });
        } else {
            this.setState({ expanded: null });
        }
    }

    /**
     * This function is to handle click event for the Accordion- ExpansionPanel
     *
     * User can write his own function and pass it as action through props
     */
    handleChange = (panel, singleAccordion) => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
        if (expanded) {
            if (this.props.accordions.action) this.props.accordions.action(event, singleAccordion);
        }
    };

    addFavourite = (event, singleAccordion) => {
        event.stopPropagation();
        if (this.props.accordions.iconAction)
            this.props.accordions.iconAction(event, singleAccordion);
    };

    onComponentClicked = (event, componentProps) => {
        // console.log((componentProps);
        if (componentProps.isStopPropagation) event.stopPropagation();
    };

    render() {
        const { expanded } = this.state;
        const { config } = this.props;
        const { header, accordions } = this.props;
        const { classes } = this.props;

        if (
            header === undefined ||
            header === null ||
            !accordions ||
            !accordions.data ||
            accordions.data.length === 0
        ) {
            return <NoResultFound />;
        }

        const tempHeaderColumns = [];
        const columnSequence = [];
        Object.keys(header).forEach(key => {
            columnSequence.push(key);
            if (accordions.type[key] === 'string') {
                tempHeaderColumns.push(
                    <Grid item key={key} xs={config.stringColumn} className={'fig-ac_' + key}>
                        <Typography className='header-column-content'>{header[key]}</Typography>
                    </Grid>
                );
            } else if (accordions.type[key] === 'icon') {
                tempHeaderColumns.push(
                    <Grid item key={key} xs={config.iconColumn} className={'fig-ac_' + key}>
                        <Typography className='header-column-content'>{header[key]}</Typography>
                    </Grid>
                );
            } else if (accordions.type[key] === 'number') {
                tempHeaderColumns.push(
                    <Grid item key={key} xs={config.numberColumn} className={'fig-ac_' + key}>
                        <Typography className='header-column-content'>{header[key]}</Typography>
                    </Grid>
                );
            } else {
                tempHeaderColumns.push(
                    <Grid item key={key} xs={config.componentColumn} className={'fig-ac_' + key}>
                        <Typography className='header-column-content'>{header[key]}</Typography>
                    </Grid>
                );
            }
            return true;
        });
        // for (let key in header) {
        // }

        const headerColumns =
            tempHeaderColumns.length > 0 ? (
                <ExpansionPanel disabled className='expansionPanal-header'>
                    <ExpansionPanelSummary className='ExpansionPanelSummary-header'>
                        <Grid className='header-content' container>
                            {tempHeaderColumns}
                        </Grid>
                    </ExpansionPanelSummary>
                </ExpansionPanel>
            ) : null;

        const { data, type, content } = accordions;
        const accordionCollection = [];
        const row = [];

        data.forEach((singleData, index) => {
            const accordionTitle = [];
            columnSequence.forEach((value, key) => {
                if (type[value] === 'string') {
                    accordionTitle.push(
                        <Grid item xs={config.stringColumn} key={key} className={'fig-ac_' + value}>
                            <Typography>{singleData[value]}</Typography>
                        </Grid>
                    );
                } else if (accordions.type[value] === 'icon') {
                    const iconClassName = singleData[value].icon;

                    accordionTitle.push(
                        <Grid item xs={config.iconColumn} key={key} className={'fig-ac_' + value}>
                            <FontAwesomeIcon
                                aria-hidden='true'
                                icon={iconClassName}
                                onClick={e => this.addFavourite(e, singleData)}
                            />
                        </Grid>
                    );
                } else if (accordions.type[value] === 'number') {
                    accordionTitle.push(
                        <Grid item xs={config.numberColumn} key={key} className={'fig-ac_' + value}>
                            <Typography>{singleData[value]}</Typography>
                        </Grid>
                    );
                } else {
                    const ChildComp = accordions.type[value];
                    accordionTitle.push(
                        <Grid
                            item
                            key={key}
                            xs={config.componentColumn}
                            onClick={e => this.onComponentClicked(e, data[index][value])}
                            className={'fig-accordionTitle fig-ac_' + value}
                        >
                            <ChildComp {...data[index][value]} />
                        </Grid>
                    );
                }
            });

            const ChildComp = content;
            row.push(
                <ExpansionPanel
                    key={index}
                    expanded={expanded === index}
                    onChange={this.handleChange(index, singleData)}
                    classes={{ expanded: classes.expanded }}
                    className='ExpansionPanel-tablebody'
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        className='ExpansionPanelSummary-tablebody'
                    >
                        <Grid className='ExpansionPanelSummary-container' container>
                            {accordionTitle}
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={24}>
                            <Grid item xs className='ExpansionPanel__open'>
                                {expanded === index ? <ChildComp {...singleData} /> : null}
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            );
        });

        accordionCollection.push(row);

        return (
            <React.Fragment>
                <div className='fig-BasicAccordion'>
                    <Grid item xs className='expansion-group'>
                        {headerColumns}
                    </Grid>
                    <Grid item xs className='expansion-group-tablebody'>
                        {headerColumns !== null ||
                        headerColumns !== undefined ||
                        accordionCollection !== null ||
                        accordionCollection !== undefined ||
                        accordionCollection[0] !== null ||
                        accordionCollection[0] !== undefined ||
                        accordionCollection[0].length !== 0 ? (
                            accordionCollection
                        ) : (
                            <NoResultFound />
                        )}
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

BasicAccordion.defaultProps = {
    config: {
        iconColumn: 1,
        numberColumn: 1,
        stringColumn: 5,
        componentColumn: 5
    },
    header: {
        favourite: 'Favourite',
        id: 'ID',
        measure: 'MEASURE',
        achievePerformance: 'ACHIEVE PERFORMANCE'
    },
    accordions: {
        type: {
            favourite: 'icon',
            id: 'number',
            measure: 'string',
            achievePerformance: 'Performance'
        },
        data: [
            {
                favourite: {
                    icon: ['fas ', 'heart']
                },
                id: '224-1',
                measure: 'Melanoma: Overutilization of Imaging Studies in Melanoma',
                achievePerformance: {
                    performanceData: {
                        performanceText: 'Achieved Performance',
                        performance: 73.59,
                        performancePosition: 'right',
                        benchMark: [
                            {
                                label: 'Registry Average',
                                data: 25,
                                position: 'above',
                                colorcode: ''
                            },
                            {
                                label: 'Registry BenchMark',
                                data: 40,
                                position: 'above',
                                colorcode: ''
                            },
                            {
                                label: 'CMS Average',
                                data: 89,
                                position: 'below',
                                colorcode: ''
                            }
                        ],
                        colorcode: 'progress-bar-success'
                    }
                }
            },
            {
                favourite: {
                    icon: ['fal ', 'heart']
                },
                id: '224-2',
                measure: 'Melanoma: Overutilization of Imaging Studies in Melanoma',
                achievePerformance: {
                    performanceData: {
                        performanceText: 'Achieved Performance',
                        performance: 73.59,
                        performancePosition: 'right',
                        benchMark: [
                            {
                                label: 'Registry Average',
                                data: 25,
                                position: 'above',
                                colorcode: ''
                            },
                            {
                                label: 'Registry BenchMark',
                                data: 40,
                                position: 'above',
                                colorcode: ''
                            },
                            {
                                label: 'CMS Average',
                                data: 89,
                                position: 'below',
                                colorcode: ''
                            }
                        ],
                        colorcode: 'progress-bar-success'
                    }
                }
            }
        ],
        content: NotAvailable,
        action: (e, singleAccordion) => {
            // console.log(('Accordion Action--', e, singleAccordion);
        },
        iconAction: (e, singleAccordion) => {
            // console.log(('Clicked on Icon--', e, singleAccordion);
        }
    }
};

BasicAccordion.propTypes = {
    config: PropTypes.object,
    header: PropTypes.object,
    accordions: PropTypes.object
};

export default withStyles(styles)(BasicAccordion);

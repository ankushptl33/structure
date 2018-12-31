import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './MasterTab.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * As discussed with Abhijit Raut, we commented this hard-coded style
 *
 * UX team will implement css-styles in .less file.
 * They can use below commented style.
 *
 */

const styles = theme => ({
    tabContainerSpace: {
        padding: theme.spacing.unit * 3
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
 * This is a MasterTab component
 *
 * You can use this component to create Tab and its respective content layout
 * In this, there are two varients, one is simple Tab and sencond is Tab with icon
 * You can refer default props for the implementation of this component
 */
class MasterTab extends Component {
    constructor(props) {
        super(props);

        // console.log(('MasterTab===>', this);

        this.state = {
            value: 0
        };
    }

    /**
     * This lifecycle method will check, if there is default tab selection props
     * i.e activeIndex is passed,
     * if exists, it will render respective tab else default tab will be of 0 th index
     */
    componentDidMount() {
        const { activeIndex } = this.props;
        if (activeIndex) this.setState({ value: this.props.activeIndex });
    }

    /**
     * This funtion will call when click event occured on tab
     */
    handleChange = (event, value) => {
        this.setState({ value });
        const { action } = this.props;
        if (action) action(value);
    };

    /**
     * This is render funtion of the MasterTab Component
     */
    render() {
        const { value } = this.state;
        const { classes } = this.props;
        const tabProps = this.props.masterTabProp;
        const tabs = [];
        const tabIcons = [];
        const tabContentProps = [];
        let TabPane;

        if (tabProps !== undefined || tabProps !== null || tabProps.length !== 0) {
            tabProps.map((data, key) => {
                tabs.push(tabProps[key].menuItem);
                tabIcons.push(tabProps[key].fontIcon);
                tabContentProps.push(tabProps[key].tabContentProps);
                return true;
            });
            TabPane = tabProps[value].router;
        }

        // console.log(('tabProps[value].router===>', tabProps[value].router);
        // console.log(('AllComponents===>', AllComponents);
        // const TabPane = tabProps[value].router;

        return (
            <Paper square className='mastertab-outer'>
                <Tabs
                    className='mastertab__tab'
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    // scrollable
                    scrollButtons='auto'
                >
                    {tabs.map((tab, key) => {
                        if (tabIcons[key]) {
                            return (
                                <Tab
                                    className='mastertab__tab__tab-content'
                                    key={tab}
                                    label={tab}
                                    icon={
                                        <FontAwesomeIcon
                                            icon={['fal', tabIcons[key]]}
                                            className='tabgroup__iconimage'
                                        />
                                    }
                                />
                            );
                        }
                        return <Tab key={tab} label={tab} />;
                    })}
                </Tabs>
                {value >= 0 && (
                    <div className={classes.tabContainerSpace}>
                        <TabPane tabContentProps={tabContentProps[value]} />
                    </div>
                )}
            </Paper>
        );
    }
}

MasterTab.defaultProps = {
    masterTabProp: [
        {
            menuItem: 'PRACTICE',
            defaultActiveIndex: true,
            iconUrl: '../../assets/svg/practice.svg',
            fontIcon: 'hospital-alt',
            router: NotAvailable,
            tabContentProps: null
        },
        {
            menuItem: 'CLINICIANS',
            defaultActiveIndex: false,
            iconUrl: '../../assets/svg/clinician.svg',
            fontIcon: 'stethoscope',
            router: NotAvailable,
            tabContentProps: null
        },
        {
            menuItem: 'LOCATIONS',
            defaultActiveIndex: false,
            iconUrl: '../../assets/svg/ehr.svg',
            fontIcon: 'map-marker-alt',
            router: NotAvailable,
            tabContentProps: null
        }
    ],
    action: value => {
        // console.log(('Put Action here', value);
    },
    activeIndex: 0,
    config: {
        dataErrorMessage: `'No Data Available'`
    }
};

MasterTab.propTypes = {
    masterTabProp: PropTypes.array.isRequired,
    activeIndex: PropTypes.number,
    action: PropTypes.func,
    classes: PropTypes.object
};

export default withStyles(styles)(MasterTab);

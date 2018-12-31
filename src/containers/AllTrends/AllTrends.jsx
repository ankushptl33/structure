import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PerformanceTrend from '../PerformanceTrend/PerformanceTrend';
import CliniciansTrend from '../CliniciansTrend/CliniciansTrend';
import LocationsTrend from '../LocationsTrend/LocationsTrend';

class AllTrends extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <PerformanceTrend {...this.props} />
                </Grid>
                <Grid item xs={12}>
                    <CliniciansTrend {...this.props} />
                </Grid>
                <Grid item xs={12}>
                    <LocationsTrend {...this.props} />
                </Grid>
            </Grid>
        );
    }
}

export default AllTrends;

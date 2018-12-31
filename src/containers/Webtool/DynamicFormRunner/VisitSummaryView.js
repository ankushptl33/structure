import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Grid, Typography } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/Cake';

import * as strings from '../strings';
import { stylesVisitView } from './styles';

const insuranceTypes = {
    1: 'Medicare',
    2: 'Medicaid',
    3: 'Private Health Insurance',
    4: 'Other Payer',
    5: 'Medicare Part B'
};
const genderTypes = {
    MALE: 'Male',
    FEMALE: 'Female',
    UNIDENTIFIED: 'Unidentified'
};
class VisitSummaryView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Grid container spacing={24} className={classes.ProfileSummaryRow}>
                    {/* <Grid item>
                        <img className={classes.profilePlaceholder} src="" />
                    </Grid> */}
                    <Grid item direction='column'>
                        <Typography variant='subheading'>
                            {strings.mrnLabel}
                            <b>{this.props.mrn}</b>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='subheading'>{this.props.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            component='Grid'
                            variant='subheading'
                            className={classes.contentDob}
                        >
                            {/* <IconButton aria-label="Play/pause"> */}
                            <PlayArrowIcon style={{ verticalAlign: 'middle' }} />
                            {/* </IconButton> */}
                            {this.props.dob}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='subheading'>
                            {strings.genderLabel}
                            <b>{this.props.gender}</b>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='subheading'>
                            {strings.ageLabel} <b>{this.props.age}</b>
                        </Typography>
                    </Grid>

                    {this.props.dateofvisit && (
                        <Grid item>
                            <Typography variant='subheading'>
                                {strings.dateOfVisit}
                                <b> {this.props.dateofvisit} </b>
                            </Typography>
                        </Grid>
                    )}
                    {this.props.insurence && (
                        <Grid item>
                            <Typography variant='subheading'>
                                {strings.insuranceType}
                                <b> {insuranceTypes[this.props.insurence]} </b>
                            </Typography>
                        </Grid>
                    )}
                </Grid>
                <Divider />
            </Fragment>
        );
    }
}

VisitSummaryView.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};
export default withStyles(stylesVisitView, { withTheme: true })(VisitSummaryView);

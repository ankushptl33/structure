import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import ErrorOutline from '@material-ui/icons/ErrorOutline';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import * as strings from './strings';

const styles = theme => ({
    errorIcon: {
        position: 'absolute',
        top: '50vh',
        right: '46%',
        alignSelf: 'center',
        width: '100px',
        height: '100px'
    },
    alignCenter: {
        'text-align': 'center'
    },
    paragraph: {
        'text-align': 'center',
        'font-size': '1.5em',
        'vertical-align': 'middle'
    }
});

const ErrorPage = props => {
    const { classes } = props;
    return (
        // <div className={classes.alignCenter}>
        //     <ErrorOutline className={classes.errorIcon}/>
        //     <p className ={classes.paragraph} >{strings.somethingWentWrong}</p>
        // </div>

        <Grid container spacing={24}>
            <Grid item xs={12}>
                <p className={classes.paragraph}>{strings.somethingWentWrong}</p>
            </Grid>
        </Grid>
    );
};

ErrorPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ErrorPage);

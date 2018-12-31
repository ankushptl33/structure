import React from 'react';
import LoginBranding from '@/components/LoginBranding';
import Footer from '@/components/Footer';
import PropTypes from 'prop-types';
import { Grid, Hidden } from '@material-ui/core';

export const publicLayout = props => {
    const { children } = props;
    return (
        <Grid container className='login--signin  login--page'>
            <Grid container className='login--signin__row'>
                <Grid item xs={12} md>
                    <LoginBranding />
                </Grid>
                <Hidden only={['sm', 'xs']}>
                    <Grid item className='login--page--ver__divider' />
                </Hidden>
                <Grid item xs={12} md>
                    <Grid
                        container
                        justify='center'
                        alignItems='center'
                        className='login__wrapper-2'
                        id='home'
                    >
                        {children}
                    </Grid>
                </Grid>
            </Grid>{' '}
            <Grid container className='footer-copyright'>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        </Grid>
    );
};

/* PROPTYPES
  ================================================================ */
publicLayout.propTypes = {
    children: PropTypes.node
};

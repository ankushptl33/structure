import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import PropTypes from 'prop-types';

/* THIS IS EMAIL SENT COMPONENT USED FOR SUCCESS ACTION WITH EMAIL SENT:
  ================================================================ */
const EmailSent = props => {
    const { type } = props;
    const { heading, subheading, buttonLabel, link } = type;
    return (
        <Grid
            container
            justify='center'
            alignItems='center'
            className='login__contanier login-email__contanier'
        >
            <Grid item className='login__signin'>
                <Grid item className='login__head'>
                    <ThumbUp name='arrow left' size='large' />
                    <Typography variant='h5' component='h2' gutterBottom>
                        {heading}
                    </Typography>
                    <Typography variant='h5' className='login__subtitle'>
                        {subheading}
                    </Typography>
                </Grid>
                <Grid className='login__form  forgot-password__form'>
                    <Grid item className='login__form-action email-sent'>
                        <Button variant='contained' color='primary' href={'/' + link}>
                            {buttonLabel}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

/* ADDED DEFAULT PROPS SO COMPONENT WORK INDEPENDENTLY
  ================================================================ */
EmailSent.defaultProps = {
    type: {
        heading: 'Email sent.',
        subheading: 'Kindly check your email inbox.',
        buttonLabel: ' Back to Login',
        link: ''
    }
};

/* PROPTYPES
  ================================================================ */
EmailSent.propTypes = {
    type: PropTypes.shape({
        heading: PropTypes.string,
        subheading: PropTypes.string,
        buttonLabel: PropTypes.string,
        link: PropTypes.string
    })
};

export default EmailSent;

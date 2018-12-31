import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CircularProgress, Fab, FormHelperText, Grid, TextField, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

/* THIS IS FORGOT PASSWORD FORM COMPONENT USED TO GET RESET PASSWORD LINK USING USERNAME, EMAIL ADDRESS OR BOTH
  ================================================================ */

const ForgetPasswordForm = props => {
    const { type, Visibility } = props;
    const {
        heading,
        idlabel,
        idname,
        idplaceholder,
        subheading,
        emaillabel,
        emailname,
        emailplaceholder,
        buttonValue
    } = type;
    const { username, email } = Visibility;

    return (
        <React.Fragment>
            <Grid
                container
                justify='center'
                alignItems='center'
                className='login__contanier forgot-password__contanier '
            >
                <Grid item className='login__signin'>
                    <Grid item className='login__head'>
                        <Link to='/'>
                            <Typography variant='h3' className='login__title' component='h2'>
                                <ArrowBack name='arrow left' size='large' /> {heading}
                            </Typography>
                        </Link>

                        <Typography variant='h3' className='login__subtitle'>
                            {subheading}
                        </Typography>
                    </Grid>

                    <Grid className='login__form forgot-password__form'>
                        {username ? (
                            <TextField
                                fullWidth
                                error={props.errors.username}
                                label={idlabel}
                                name={idname}
                                placeholder={idplaceholder}
                                margin='normal'
                                onChange={event => {
                                    props.onChange(event.target.name, event.target.value);
                                }}
                                onKeyUp={event => {
                                    props.onKeyUp(event);
                                }}
                            />
                        ) : null}
                        {username ? (
                            <FormHelperText error='true'>{props.errors.username}</FormHelperText>
                        ) : null}

                        {email ? (
                            <TextField
                                fullWidth
                                error={props.errors.email}
                                label={emaillabel}
                                name={emailname}
                                placeholder={emailplaceholder}
                                margin='normal'
                                onChange={event => {
                                    props.onChange(event.target.name, event.target.value);
                                }}
                                onKeyUp={event => {
                                    props.onKeyUp(event);
                                }}
                            />
                        ) : null}
                        {email ? (
                            <FormHelperText error='true'>{props.errors.email}</FormHelperText>
                        ) : null}
                        {props.errors.error ? (
                            <FormHelperText error='true'>{props.errors.error}</FormHelperText>
                        ) : null}
                    </Grid>

                    <Grid item className='login__form-action'>
                        <React.Fragment>
                            <Fab
                                variant='extended'
                                color='primary'
                                onClick={props.onSubmit}
                                disabled={props.forgotPasswordbtnClicked}
                            >
                                {buttonValue}
                            </Fab>
                            {props.forgotPasswordbtnClicked && (
                                <CircularProgress
                                    className='CircularProgressBarLogin CircularIntegration-buttonProgress-587'
                                    size={28}
                                />
                            )}
                        </React.Fragment>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

/* DEFAULT PROPS
  ================================================================ */
ForgetPasswordForm.defaultProps = {
    type: {
        heading: 'Forgot Password',
        subheading: 'Recover your registry account',
        idname: 'username',
        idlabel: 'Username',
        idplaceholder: 'Enter your username',
        emailname: 'email',
        emaillabel: 'Email address',
        emailplaceholder: 'Enter your email address',
        buttonValue: 'Submit'
    },
    Visibility: {
        username: true,
        email: true
    },
    errors: {
        username: '',
        email: '',
        error: ''
    },
    onChange: () => {
        // console.log(('onchange:' + value);
    },
    onSubmit: e => {
        e.stopPropagation();
        // console.log('you', e.target.textContent);
    },
    onKeyUp: () => {
        // console.warn(value);
    }
};

/* PROP TYPES
  ================================================================ */
ForgetPasswordForm.propTypes = {
    type: PropTypes.shape({
        heading: PropTypes.string,
        subheading: PropTypes.string,
        idname: PropTypes.string,
        idlabel: PropTypes.string,
        idplaceholder: PropTypes.string,
        emailname: PropTypes.string,
        emaillabel: PropTypes.string,
        emailplaceholder: PropTypes.string,
        buttonValue: PropTypes.string
    }),
    Visibility: PropTypes.shape({
        username: PropTypes.bool,
        email: PropTypes.bool
    }),
    errors: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        error: PropTypes.string
    }),
    forgotPasswordbtnClicked: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onKeyUp: PropTypes.func
};

export default ForgetPasswordForm;

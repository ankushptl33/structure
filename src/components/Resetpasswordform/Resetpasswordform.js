import React from 'react';
import PropTypes from 'prop-types';
import { Fab, FormControl, FormHelperText, Grid, Typography } from '@material-ui/core';
import PasswordInput from '@/components/PasswordInput';
import RegexMatchDashboard from '@/components/RegexMatchDashboard';

const Resetpasswordform = props => {
    const { passwordInputProps, repasswordInputProps, type, errors, inputProps } = props;
    const { heading, subheading, buttonValue } = type;
    const { password, confirmpassword, error } = errors;
    const { value, custom } = inputProps;
    return (
        <React.Fragment>
            <Grid
                container
                justify='center'
                alignItems='center'
                className='login__contanier reset-password__wrapper'
            >
                <Grid item className='login__signin'>
                    <Grid item className='login__head'>
                        <Typography variant='h3' className='login__title' component='h2'>
                            {heading}
                        </Typography>
                        <Typography variant='h3' className='login__subtitle'>
                            {subheading}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} className='login__form reset-password__form'>
                        <FormControl fullWidth error={password}>
                            <PasswordInput
                                error={password}
                                inputProps={passwordInputProps}
                                onChange={event => {
                                    props.onChange(event.target.name, event.target.value);
                                }}
                                onKeyUp={event => {
                                    props.onKeyUp(event);
                                }}
                            />
                            {password ? <FormHelperText>{password}</FormHelperText> : null}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <RegexMatchDashboard value={value} custom={custom} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth error={confirmpassword}>
                            <PasswordInput
                                error={confirmpassword}
                                inputProps={repasswordInputProps}
                                onChange={event => {
                                    props.onChange(event.target.name, event.target.value);
                                }}
                                onKeyUp={event => {
                                    props.onKeyUp(event);
                                }}
                            />
                            {confirmpassword ? (
                                <FormHelperText>{confirmpassword}</FormHelperText>
                            ) : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {error ? <FormHelperText error={error}>{error}</FormHelperText> : null}
                    </Grid>
                    <Grid item className='login__form-action'>
                        <Fab color='primary' onClick={() => props.onSubmit()}>
                            {buttonValue}
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

Resetpasswordform.defaultProps = {
    type: {
        heading: 'Reset Password',
        subheading: 'Please enter your new password',
        buttonValue: ' Submit'
    },

    onChange: () => {
        // console.log(('onHandleChange:' + e + ' : ' + v);
    },
    onSubmit: e => {
        e.stopPropagation();
        // console.log(('Form submitted');
    },
    passwordInputProps: {
        name: 'password',
        placeholder: 'Enter new password here',
        label: 'New Password',
        minLength: 4,
        maxLength: 10,
        readOnly: false,
        disabled: false,
        required: false,
        showToggle: false
    },
    repasswordInputProps: {
        name: 'confirmpassword',
        placeholder: 'Enter confirm password here',
        label: 'Confirm Password',
        minLength: 4,
        maxLength: 10,
        readOnly: false,
        disabled: false,
        required: false,
        showToggle: false
    },
    errors: {
        error: '',
        password: '',
        confirmpassword: ''
    },
    inputProps: {
        value: '',
        custom: []
    }
};

Resetpasswordform.propTypes = {
    passwordInputProps: PropTypes.shape({
        name: PropTypes.string,
        placeholder: PropTypes.string,
        label: PropTypes.string,
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
        required: PropTypes.bool,
        showToggle: PropTypes.bool
    }),
    repasswordInputProps: PropTypes.shape({
        name: PropTypes.string,
        placeholder: PropTypes.string,
        label: PropTypes.string,
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
        required: PropTypes.bool,
        showToggle: PropTypes.bool
    }),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onKeyUp: PropTypes.func,
    type: PropTypes.shape({
        heading: PropTypes.string,
        subheading: PropTypes.string,
        buttonValue: PropTypes.string
    }),
    errors: PropTypes.shape({
        error: PropTypes.string,
        password: PropTypes.string,
        confirmpassword: PropTypes.string
    }),
    inputProps: PropTypes.shape({
        value: PropTypes.string,
        custom: PropTypes.array
    })
};
export default Resetpasswordform;

import React, { Fragment } from 'react';
import PasswordInput from '@/components/PasswordInput';
import './LoginForm.less';
import PropTypes from 'prop-types';
import {
    Button,
    Checkbox,
    CircularProgress,
    Fab,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    Typography
} from '@material-ui/core';

/* THIS IS LOGIN FORM COMPONENT USED TO LOGIN INTO SYSTEM. USERNAME AND PASSWORD ARE INPUT FIELD:
  ================================================================ */
const Login = props => {
    const { passwordProps, inputprops, errors, loginbtnClicked } = props;
    const {
        heading,
        Userid,
        loginButtonValue,
        RegisterLink,
        ForgotPasswordLink,
        Visibility,
        rememberMeLabelName
    } = inputprops;
    return (
        <Grid item className='login__contanier'>
            <Grid item className='login__signin'>
                <Grid item className='login__head'>
                    <Typography variant='h3' className='login__title' component='h2'>
                        {heading}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container className='login__form'>
                <Grid item xs={12} className='login-input--container'>
                    <FormControl fullWidth error={errors[Userid.name]}>
                        <InputLabel>{Userid.LabelName}</InputLabel>
                        <Input
                            id={Userid.id}
                            type={Userid.type}
                            placeholder={Userid.placeholder}
                            name={Userid.name}
                            onChange={event =>
                                props.onChange(event.target.name, event.target.value)
                            }
                            onKeyUp={event => {
                                props.onKeyUp(event);
                            }}
                        />
                        {errors[Userid.name] ? (
                            <FormHelperText>{errors[Userid.name]}</FormHelperText>
                        ) : null}
                    </FormControl>
                </Grid>

                <Grid item xs={12} className='login-input--container'>
                    <FormControl fullWidth error={errors[passwordProps.name]}>
                        <PasswordInput
                            error={errors[passwordProps.name]}
                            inputProps={passwordProps}
                            onChange={event => {
                                props.onChange(event.target.name, event.target.value);
                            }}
                            onKeyUp={event => {
                                props.onKeyUp(event);
                            }}
                        />
                        {errors[passwordProps.name] ? (
                            <FormHelperText>{errors[passwordProps.name]}</FormHelperText>
                        ) : null}
                        {errors.callback ? (
                            <FormHelperText error='true'>{errors.callback}</FormHelperText>
                        ) : null}
                    </FormControl>
                </Grid>

                <Grid container className='login__form-sub'>
                    {Visibility.rememberMe || Visibility.forgotPassword ? (
                        <Grid container>
                            {Visibility.rememberMe ? (
                                <Grid item xs>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={(event, value) =>
                                                        props.onChangeRememberMe(event, value)
                                                    }
                                                    color='primary'
                                                />
                                            }
                                            label={rememberMeLabelName}
                                        />
                                    </FormGroup>
                                </Grid>
                            ) : null}

                            {Visibility.forgotPassword ? (
                                <Grid item xs className='login__form-sub--forgotPassword'>
                                    <Button href={'/' + ForgotPasswordLink.link}>
                                        {ForgotPasswordLink.label}
                                    </Button>
                                </Grid>
                            ) : null}
                        </Grid>
                    ) : null}
                </Grid>

                <Grid item xs className='login__form-action'>
                    <Fragment>
                        <Fab
                            variant='extended'
                            color='primary'
                            disabled={loginbtnClicked}
                            onClick={event => props.onSubmit(event)}
                        >
                            {loginButtonValue}
                        </Fab>
                        {loginbtnClicked && (
                            <CircularProgress
                                className='CircularProgressBarLogin CircularIntegration-buttonProgress-587'
                                size={28}
                            />
                        )}
                    </Fragment>

                    {Visibility.registerLink ? (
                        <Button href={'/' + RegisterLink.link}>{RegisterLink.label}</Button>
                    ) : null}
                </Grid>
            </Grid>
        </Grid>
    );
};

/* DEFAULT PROPS
  ================================================================ */
Login.defaultProps = {
    inputprops: {
        heading: 'Login To Your Account',
        rememberMeLabelName: 'Remember Me',
        Userid: {
            id: 'UserName',
            type: 'text',
            labelName: 'Username',
            placeholder: 'Enter username'
        },
        Password: {
            LabelName: 'Password'
        },
        loginButtonValue: 'Login',
        RegisterLink: {
            label: 'Register',
            link: 'register'
        },
        ForgotPasswordLink: {
            label: 'Forgot Password',
            link: 'forgotpass'
        },
        Visibility: {
            rememberMe: true,
            forgotPassword: true,
            registerLink: true
        }
    },
    onKeyUp: () => {
        // console.log(("onHandleChnage is executed:" + event + " : " + value);
    },
    onChange: () => {
        // console.log(("onHandleChnage is executed:" + event + " : " + value);
    },
    onSubmit: e => {
        e.stopPropagation();
        // console.log(("onHandleFormSubmit is executed");
    },
    onChangeRememberMe: e => {
        e.stopPropagation();
        // console.log(("RememberMe checkbox checked : " + v);
    },

    passwordProps: {
        name: 'password',
        placeholder: 'Enter password',
        label: 'Password',
        minLength: 4,
        maxLength: 8,
        readOnly: false,
        disabled: false,
        required: false,
        showToggle: false
    },

    errors: {
        id: '',
        password: ''
    },
    loginbtnClicked: false
};

/* PROP TYPES
  ================================================================ */
Login.propTypes = {
    passwordProps: PropTypes.shape({
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
    inputprops: PropTypes.shape({
        heading: PropTypes.string,
        rememberMeLabelName: PropTypes.string,
        Userid: {
            id: PropTypes.string,
            type: PropTypes.string,
            labelName: PropTypes.string,
            placeholder: PropTypes.string
        },
        Password: {
            LabelName: PropTypes.string
        },
        loginButtonValue: PropTypes.string,
        RegisterLink: {
            label: PropTypes.string,
            link: PropTypes.string
        },
        ForgotPasswordLink: {
            label: PropTypes.string,
            link: PropTypes.string
        },
        Visibility: {
            rememberMe: PropTypes.bool,
            forgotPassword: PropTypes.bool,
            registerLink: PropTypes.bool
        }
    }),
    errors: PropTypes.shape({
        id: PropTypes.string,
        password: PropTypes.string,
        callback: PropTypes.string
    }),
    onSubmit: PropTypes.func,
    onKeyUp: PropTypes.func,
    onChange: PropTypes.func,
    onChangeRememberMe: PropTypes.func,
    loginbtnClicked: PropTypes.bool
};

export default Login;

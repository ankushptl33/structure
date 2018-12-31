import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import LoginForm from '@/components/LoginForm';
import { setJwt } from '@/utils/jwtUtils';
import './Login.less';
import APIHelper from '@/helper/apihelper';

const apiHelperInstance = new APIHelper();

class Login extends Component {
    constructor(props) {
        super(props);
        /* SET INITIAL STATE:
    ===================================== */
        this.state = {
            errors: {},
            loginbtnClicked: false
        };
    }

    /* HANDLE WHEN INPUT TEXT VALUE CHANGED (E.G. USERNAME OR PASSWORD):
  ================================================================ */
    handleChange(field, value) {
        if (
            this.state.errors[this.props.inputprops.Userid.name] ||
            this.state.errors[this.props.passwordProps.name]
        ) {
            const err = this.state.errors;
            err[field] = '';
            this.setState({ errors: err });
        }
        this.setState({ [field]: value });
    }

    /* HANDLE VALIDATION (USERNAME: REQUIRED, CORRECT FORMAT , PASSWORD:REQUIRED, COMPLEX):
  ================================================================ */
    validateForm() {
        const errors = {};
        let formIsValid = true;
        if (!this.state[this.props.passwordProps.name]) {
            formIsValid = false;
            errors[this.props.passwordProps.name] = this.props.passwordProps.name + ' is required';
        }

        if (!this.state[this.props.inputprops.Userid.name]) {
            formIsValid = false;
            errors[this.props.inputprops.Userid.name] =
                this.props.inputprops.Userid.name + ' is required';
        } else if (typeof this.state[this.props.inputprops.Userid.name] !== 'undefined') {
            let regex = /^.{4,}$/;
            let message = `${this.props.inputprops.Userid.name} is required`;
            if (this.props.inputprops.Userid.validationType === 'EMAIL') {
                regex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
                message = 'Enter correct Email';
            } else if (this.props.inputprops.Userid.validationType === 'ALPHANUMERIC') {
                regex = /^[a-zA-Z0-9._]{4,25}$/;
                message = '0-9,a-z,A-Z,.,_, are allowed';
            } else if (this.props.inputprops.Userid.validationType === 'NUMBERIC') {
                regex = /^[0-9]{4,25}$/;
                message = 'Enter only numbers';
            } else if (this.props.inputprops.Userid.validationType === 'CUSTOM') {
                regex = /^.{4,}$/;
                message = 'Enter correct ' + this.props.Userid.name;
            }
            if (!this.state[this.props.inputprops.Userid.name].match(regex)) {
                formIsValid = false;
                errors[this.props.inputprops.Userid.name] = message;
            }
        }

        this.setState({ errors });
        return formIsValid;
    }

    /* HANDLE WHEN AT INPUT TEXT ENTER BUTTON HIT
  ================================================================ */
    handleKeyUp(event) {
        if (event.keyCode === 13) this.handleSubmit(event);
    }

    /* HANDLE SUBMIT (LOGIN) AUTHENTICATE API:
  ================================================================ */
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (this.validateForm()) {
            this.setState({ loginbtnClicked: true });
            axios
                .post(apiHelperInstance.Resources.Authenticate, {
                    loginname: username,
                    password: btoa(password)
                })
                .then(res => {
                    if (res.data.statusCode === 1) {
                        setJwt(res.data.data.token, res.data.data.duration);
                        this.props.history.push('/layout');
                    } else if (res.data.statusCode === 0) {
                        const errors = {};
                        errors.callback = res.data.description;
                        this.props.passwordProps.isReset = true;
                        this.setState({ errors, password: '', loginbtnClicked: false });
                        this.props.passwordProps.isReset = false;
                    }
                })
                .catch(error => {
                    const errors = {};
                    errors.callback = error.message;
                    this.setState({ errors, loginbtnClicked: false });
                });
        }
    }

    /* HANDLE REMEMBER ME CHECKBOX CHANGED:
  ================================================================ */
    // handleRememberMe(field, obj) {}

    render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <LoginForm
                        {...this.props}
                        onChange={(field, value) => this.handleChange(field, value)}
                        errors={this.state.errors}
                        onSubmit={event => this.handleSubmit(event)}
                        onKeyUp={event => this.handleKeyUp(event)}
                        // onhandleRememberMe={(event, value) =>
                        //   this.handleRememberMe(event, value)
                        // }
                        loginbtnClicked={this.state.loginbtnClicked}
                    />
                </Grid>
            </Grid>
        );
    }
}
/* DEFAULT PROPS PASSED TO COMPONENT:
================================================================ */
Login.defaultProps = {
    inputprops: {
        heading: 'Login To Your Account',
        Userid: {
            id: 'username',
            name: 'username',
            type: 'text',
            validationType: 'ALPHANUMERIC',
            LabelName: 'Username',
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
            link: 'forgotpassword'
        },
        Visibility: {
            rememberMe: false,
            forgotPassword: true,
            registerLink: false
        }
    },
    onChange: () => {
        // console.log(('onHandleChnage is executed:' + event + ' : ' + value);
    },
    onSubmit: e => {
        e.stopPropagation();
        // console.log(('onHandleFormSubmit is executed');
    },
    onChangeRememberMe: e => {
        e.stopPropagation();
        // console.log(('RememberMe checkbox checked : ' + v.checked);
    },

    passwordProps: {
        name: 'password',
        placeholder: 'Enter password',
        label: 'Password',
        minLength: 4,
        maxLength: 10,
        readOnly: false,
        disabled: false,
        required: true,
        showToggle: true,
        isReset: false
    },

    errors: {
        id: '',
        password: ''
    }
};
export default Login;

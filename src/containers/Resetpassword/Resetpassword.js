import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Resetpasswordform from '@/components/Resetpasswordform';
import EmailSent from '@/components/EmailSent';
import APIHelper from '@/helper/apihelper';
import './Resetpassword.less';

const apiHelperInstance = new APIHelper();

class Resetpassword extends Component {
    constructor(props) {
        super(props);
        /* SET INITIAL STATE:
    ===================================== */
        this.state = {
            isFormSubmit: false,
            password: '',
            confirmpassword: '',
            location: props.location.search.substr(4, props.location.search.length),
            verified: undefined,
            errors: {}
        };
    }

    /* VALIDATE RESET TOKEN. VALID: RESET PASSWORD FORM. INVALID: EXPIRED LINK MESSAGE SHOWED:
  ===================================== */
    componentDidMount() {
        axios
            .get(apiHelperInstance.Resources.AuthenticateToken, {
                headers: {
                    Authorization: this.state.location,
                    'Content-Type': 'application/json'
                }
            })
            .then(data => {
                if (data.data.data.validate === false) {
                    this.setState({ verified: false });
                } else this.setState({ verified: true });
            })
            .catch(() => this.props.history.push('/forgotpassword'));
    }

    /* HANDLE WHEN INPUT TEXT VALUE CHANGED (E.G. PASSWORD OR CONFIRM PASSWORD):
  ================================================================ */
    onHandleChange = (field, value) => {
        if (
            this.state.errors.password ||
            this.state.errors.confirmpassword ||
            this.state.errors.error
        ) {
            const err = this.state.errors;
            err[field] = '';
            err.error = '';
            this.setState({ errors: err });
        }
        this.setState({ [field]: value });
    };

    /* WHEN FORM SUBMITED (API CALL):
  ================================================================ */
    onHandleSubmit = () => {
        if (this.handleValidation()) {
            axios
                .post(apiHelperInstance.Resources.ResetPassword, {
                    token: this.state.location,
                    password: btoa(this.state.password)
                })
                .then(res => {
                    if (res.data.statusCode === 1) {
                        this.setState({ isFormSubmit: true });
                    } else if (res.data.statusCode === 3) {
                        this.setState({ errors: res.data.description });
                    }
                })
                .catch(() => this.props.history.push('/'));
        }
    };

    /* HANDLE VALIDATION (PASSWORD: REQUIRED, COMPLEX , CONFIRM PASSWORD:REQUIRED, COMPLEX):
  ================================================================ */
    handleValidation() {
        const errors = {};
        let formIsValid = true;
        if (this.state.password === '') {
            formIsValid = false;
            errors.password = 'Password is required';
        } else if (typeof this.state.password !== 'undefined') {
            if (
                !this.state.password.match(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                )
            ) {
                formIsValid = false;
                errors.password = 'Password should be of complex';
            }
        }

        if (this.state.confirmpassword === '') {
            formIsValid = false;
            errors.confirmpassword = 'Confirm password is required';
        } else if (this.state.password !== this.state.confirmpassword) {
            formIsValid = false;
            errors.error = 'Password and confirm password should be same';
        }

        this.setState({ errors });
        return formIsValid;
    }

    /* HANDLE WHEN AT INPUT TEXT ENTER BUTTON HIT
  ================================================================ */
    handleKeyUp(event) {
        if (event.keyCode === 13) this.onHandleSubmit(event);
    }

    render() {
        const { verified } = this.state;
        const { custom } = this.props.inputProps;
        if (verified === undefined) {
            return <div>Loading...</div>;
        }

        if (verified === false) {
            return (
                <div>
                    Reset password link expired <Button href='/forgotpassword'>Click here</Button>{' '}
                    to regenerate
                </div>
            );
        }
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    {this.state.isFormSubmit ? (
                        <EmailSent {...this.props.emailSent} />
                    ) : (
                        <Resetpasswordform
                            errors={this.state.errors}
                            onChange={(field, value) => {
                                this.onHandleChange(field, value);
                            }}
                            onSubmit={() => {
                                this.onHandleSubmit();
                            }}
                            onKeyUp={event => this.handleKeyUp(event)}
                            inputProps={{ value: this.state.password, custom }}
                        />
                    )}
                </Grid>
            </Grid>
        );
    }
}

/* SOME DEFAULT PROPS (REST USED COMPONENT ITSELF):
================================================================ */
Resetpassword.defaultProps = {
    emailSent: {
        type: {
            heading: 'Password changed successfully',
            subheading: '',
            buttonLabel: 'Back to Login',
            link: ''
        }
    },
    inputProps: {
        value: '',
        custom: [{ regex: /^.{8,}$/, Message: 'Must be at least 8 characters in length' }]
    }
};

export default Resetpassword;

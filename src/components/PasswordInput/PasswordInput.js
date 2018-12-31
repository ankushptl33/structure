import React, { Component } from 'react';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import './PasswordInput.less';
import PropTypes from 'prop-types';

/* THIS IS PASSWORD INPUT FIELD TEXTBOX
  ================================================================ */
class PasswordInput extends Component {
    constructor(props) {
        super(props);
        /* INITILISE STATE
     ================================================================ */
        this.state = {
            passwordShown: false,
            value: ''
        };
    }

    /* HANDLE WHEN INPUT FIELD FLUSH/RESET
  ================================================================ */
    componentWillReceiveProps(pre) {
        if (pre.inputProps.isReset === true) this.setState({ value: '' });
    }

    /* USED FOR PASSWORD SHOW IN PLANE TEXT OR *** MARK
  ================================================================ */
    togglePasswordMask() {
        // this.setState({ passwordShown: !this.state.passwordShown });
        this.setState(prevState => ({ passwordShown: !prevState.passwordShown }));
    }

    /* HANDLE WHEN INPUT FIELD VALUE CHANE CHANGE
  ================================================================ */
    onHandleChange(event) {
        this.props.onChange(event);
        this.setState({ value: event.target.value });
    }

    render() {
        const { passwordShown, value } = this.state;
        const { inputProps, error } = this.props;
        const {
            id,
            name,
            label,
            placeholder,
            minLength,
            maxLength,
            readOnly,
            disabled,
            required,
            showToggle
        } = inputProps;

        return (
            <FormControl error={error}>
                <InputLabel htmlFor='adornment-password'>{label} </InputLabel>
                <Input
                    id={id}
                    name={name}
                    type={passwordShown ? 'text' : 'password'}
                    value={value}
                    onChange={event => this.onHandleChange(event)}
                    onKeyUp={event => this.props.onKeyUp(event)}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                    minLength={minLength}
                    maxLength={maxLength}
                    required={required}
                    endAdornment={
                        showToggle ? (
                            <InputAdornment hide='true' position='end'>
                                <IconButton
                                    aria-label='Toggle password visibility'
                                    onClick={() => this.togglePasswordMask()}
                                >
                                    {passwordShown ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ) : null
                    }
                />
            </FormControl>
        );
    }
}
/* DEFAULT PROPS
  ================================================================ */
PasswordInput.defaultProps = {
    inputProps: {
        name: 'password',
        id: 'password',
        label: 'Password',
        placeholder: 'Enter password here',
        minLength: 4,
        maxLength: 8,
        readOnly: false,
        disabled: false,
        required: false,
        showToggle: true,
        isReset: false
    },
    onChange: () => {
        // console.log(("password updated: " + e.target.value)
    },
    onKeyUp: () => {
        // console.log(('value', event.target.value);
        // put the login here
    }
};

/* PROP TYPES
  ================================================================ */
PasswordInput.propTypes = {
    inputProps: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
        required: PropTypes.bool,
        showToggle: PropTypes.bool,
        isReset: PropTypes.bool
    }),
    error: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func
};
export default PasswordInput;

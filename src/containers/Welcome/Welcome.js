import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { getJwt, removeJwt } from '@/utils/jwtUtils';
import APIHelper from '@/helper/apihelper';

const apiHelperInstance = new APIHelper();
class Welcome extends Component {
    handleLogout = () => {
        const jwt = getJwt();
        removeJwt();
        if (jwt) {
            axios
                .get(apiHelperInstance.Resources.TokenDeactivate, {
                    headers: {
                        authorization: jwt,
                        'Content-Type': 'application/json',
                        Action: 'delete'
                    }
                })
                .then(res => {
                    if (res.data.data.deactivated === true) {
                        removeJwt();
                        this.props.history.push('/login');
                    }
                })
                .catch(() => {
                    removeJwt();
                    this.props.history.push('/login');
                });
        } else {
            this.props.history.push('/login');
        }
    };

    render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    welcome
                </Grid>
                <Grid item xs={12} sm={6}>
                    <button
                        type='button'
                        onClick={() => {
                            this.handleLogout();
                        }}
                    >
                        Logout
                    </button>
                </Grid>
            </Grid>
        );
    }
}

export default Welcome;

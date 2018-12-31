import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import APIHelper from '@/helper/apihelper';
import { getJwt } from '@/utils/jwtUtils';

const apiHelper = new APIHelper();

class AuthorizationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: undefined
        };
        // console.log(('in authorization');
    }

    componentDidMount() {
        // const cookies = new Cookies();
        const jwt = getJwt(); // ;cookies.get('jwt-token');;
        if (!jwt) {
            this.props.history.push('/login');
        }
        this.getUser();
    }

    getUser() {
        // const cookies = new Cookies();
        const jwt = getJwt(); // cookies.get('jwt-token');
        if (!jwt) {
            this.setState({
                isLogged: null
            });
            return;
        }

        axios
            .get(apiHelper.Resources.ValidateToken, {
                headers: { Authorization: jwt, 'Content-Type': 'application/json' }
            })
            .then(data => {
                // // console.log((data.data.data.authentication);
                if (data.data.data.authentication === false) this.props.history.push('/login');
                else this.setState({ isLogged: true });
            })
            .catch(e => {
                this.props.history.push('/login');
            });
    }

    render() {
        const { isLogged } = this.state;
        if (isLogged === undefined) {
            return <div>Loading...</div>;
        }

        if (isLogged === null) {
            this.props.history.push('/login');
        }

        return this.props.children;
    }
}

export default withRouter(AuthorizationContainer);

import React from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import APIHelper from '@/helper/apihelper';
import { setJwt } from '@/utils/jwtUtils';
import TemporaryPage from '@/components/TemporaryPage/TemporaryPage';
import Loader from '@/helper/loaders/ComponentLoader';
import { VALIDATE_REGISTRY_TOKEN } from '@/graphql/query';
import queryString from 'query-string';

const apiHelperInstance = new APIHelper();

class SSORouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestValidating: null,
            IstokenInValid: true,
            queryString: queryString.parse(props.location.search)
        };
    }

    componentDidMount() {
        const { queryString } = this.state;
        if (queryString !== undefined) {
            this.setState({ requestValidating: true });
            axios
                .post(apiHelperInstance.Resources.ValidateRegistryDashboardToken, {
                    query: VALIDATE_REGISTRY_TOKEN,
                    variables: {
                        input: {
                            RegistryUid: queryString.unit,
                            Token: queryString.auth
                        }
                    }
                })
                .then(res => {
                    if (res.data.data.validateRegistryDashboardToken.statusCode === 1) {
                        setJwt(
                            res.data.data.validateRegistryDashboardToken.data.token,
                            res.data.data.validateRegistryDashboardToken.data.duration
                        );
                        this.props.history.push('/layout');
                    } else {
                        this.setState({
                            IstokenInValid: false,
                            requestValidating: false
                        });
                    }
                })
                .catch(ex => {
                    console.log(ex);
                    this.setState({
                        IstokenInValid: false,
                        requestValidating: false
                    });
                });
        }
    }

    render() {
        const { requestValidating, IstokenInValid, queryString } = this.state;
        if (queryString === undefined) {
            return <div>In valid request</div>;
        }
        if (requestValidating) {
            return (
                <React.Fragment>
                    {' '}
                    <Loader />
                    <Typography variant='subtitle1' gutterBottom>
                        Token validation process started
                    </Typography>
                </React.Fragment>
            );
        } else if (!IstokenInValid) {
            return (
                <TemporaryPage
                    children={
                        <Typography variant='subtitle1' gutterBottom>
                            Please contact registry admin.
                        </Typography>
                    }
                />
            );
        }
        return (
            <React.Fragment>
                <Loader />
                <Typography variant='subtitle1' gutterBottom>
                    Initiating token validation process
                </Typography>
            </React.Fragment>
        );
    }
}

export default SSORouter;

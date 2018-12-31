import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ThumbUp } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';

const BackToLogin = props => {
    return (
        <div>
            <Grid container wrap='nowrap' spacing={16}>
                <Grid item>
                    <ThumbUp name='arrow left' size='large' color='black' />
                    <Grid item xs>
                        <Typography gutterBottom>{props.type.Recover}</Typography>
                        <Typography gutterBottom>{props.type.checkmail}</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Fab
                variant='extended'
                color='primary'
                onClick={props.changeHandlers.submit}
                as={Link}
                to='/forgotpassword'
            >
                {props.type.button}
            </Fab>
        </div>
    );
};

BackToLogin.defaultProps = {
    type: {
        Recover: 'Email Sent to the Given Address.',
        checkmail: 'Please Check your Inbox',
        button: ' Back to Login'
    },
    changeHandlers: {
        textfield: e => {
            // console.log((e.target.value);
        },
        submit: e => {
            // console.log(('you', e.target.textContent);
        }
    }
};
export default BackToLogin;

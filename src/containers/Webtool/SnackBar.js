import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';

const styles = theme => ({
    error: {
        backgroundColor: theme.palette.error.dark,
        color: '#fff',
        fontSize: 14
    },
    success: {
        backgroundColor: '#43A047',
        color: '#fff',
        fontSize: 14
    },
    close: {
        padding: theme.spacing.unit / 2
    }
});

class SimpleSnackbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open
        };
    }

    handleClose = (event, reason) => {
        this.setState({open: false});
        if (this.props.closeSnackBar) {
            this.props.closeSnackBar();
        }
    };

    render() {
        const {classes, variant} = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={this.state.open}
                    autoHideDuration={3500}
                    onClose={this.handleClose}
                    ContentProps={{
                        classes: {
                            root: classNames(classes[variant])
                        },
                        'aria-describedby': 'message-id'
                    }}
                    message={<span id='message-id'>{this.props.message}</span>}
                    action={[
                        <IconButton
                            key='close'
                            aria-label='Close'
                            color='inherit'
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        );
    }
}

SimpleSnackbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSnackbar);

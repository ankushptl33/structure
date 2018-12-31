import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    actionBtn: {
        padding: '0 24px'
    }
});
class AlertDialogSlide extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { fullScreen, classes } = this.props;
        if (!this.props.open) {
            return null;
        }
        return (
            <div className='alertDialogBox'>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby='responsive-dialog-title'
                >
                    <DialogTitle id='responsive-dialog-title' className='dialogTitle'>
                        {this.props.modelTitle}
                    </DialogTitle>
                    <DialogContent className='dialog_Content'>
                        <DialogContentText>{this.props.modelContaint}</DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.actionBtn}>
                        <Button
                            className={classes.button}
                            onClick={this.props.onNoClose}
                            variant='outlined'
                        >
                            No
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={this.props.onYesClose}
                            color='primary'
                            autoFocus
                            variant='outlined'
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AlertDialogSlide.propTypes = {
    open: PropTypes.bool,
    onNoClose: PropTypes.func.isRequired,
    onYesClose: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(withStyles(styles)(AlertDialogSlide));

import React from 'react';
import PropTypes from 'prop-types';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class AlertDialogSlide extends React.Component {
    //   state = {
    //     open: false,
    //   };

    //   handleClickOpen = () => {
    //     this.setState({ open: true });
    //   };

    //   handleClose = () => {
    //     this.setState({ open: false });
    //   };

    render() {
        const { fullScreen } = this.props;

        return (
            <div>
                Hello World
                {/* <Button onClick={this.handleClickOpen}>Open responsive dialog</Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog> */}
            </div>
        );
    }
}

AlertDialogSlide.propTypes = {
    fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(AlertDialogSlide);

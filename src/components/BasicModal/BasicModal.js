import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button, Divider, Grid, Modal, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';
// import BasicTable from "../../components/BasicTable/BasicTable"
// import ModalContent from "../../components/ModalContent/ModalContent"
// import SearchAndExport from "../../components/SearchAndExport/SearchAndExport"

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    iconSmall: {
        fontSize: 20
    },
    modalWrapper: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50% , -50%)',
        border: 'solid 1px #ccc'
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 110,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: '16px',
        maxHeight: '90%',
        overflowY: 'auto'
    },
    modalCloseIcon: {
        width: '40px',
        height: '40px',
        float: 'right',
        cursor: 'pointer',
        borderRadius: '50%',
        minWidth: 'inherit',
        fontSize: '1.5rem',
        textAlign: 'center',
        overflow: 'visible',
        flex: '0 0 auto',
        top: '-9px'
    },
    modalTitle: {
        display: 'inline-block',
        verticalAlign: 'middle',
        paddingLeft: '5px'
    },
    modalDivider: {
        width: '100%',
        marginBottom: '15px',
        color: '#DFDFE0'
    },
    modalHeading: {
        fontSize: '16px'
    },
    practiceFormRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        width: '100%'
    },
    practiceFormCol: {
        flex: 1,
        margin: '0 0 15px 0'
    },
    modalBtnWrapper: {
        display: 'inherit'
    },
    modalRightBtn: {
        float: 'right',
        with: 'inherit'
    },
    inlinePracticeFormCol: {
        margin: '0 15px 15px 0',
        '&:last-Child': {
            marginRight: 0
        }
    },
    modalHeaderRow: {
        display: 'block',
        paddingBottom: theme.spacing.unit
    }
});

const BasicModal = props => {
    const { items } = props;

    let contents = props.children ? props.children : null;
    if (contents == null && items != null) {
        contents = items.map(item => <React.Fragment key={item}>{item.Content}</React.Fragment>);
    }

    const { classes, open } = props;

    return (
        <Modal
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            open={open}
        >
            <Grid container className={classNames(classes.paper, classes.modalWrapper)}>
                <Grid container className={classes.modalHeaderRow}>
                    <Typography
                        variant='h6'
                        id='modal-title'
                        className={classNames(classes.modalTitle, classes.modalHeading)}
                    >
                        <span className={classes.modalTitle}> Practice:</span>
                        <span className={classes.modalTitle}> {props.heading}</span>
                    </Typography>
                    <Button className={classes.modalCloseIcon} onClick={props.handleClose}>
                        <FontAwesomeIcon icon={['fal', 'times']} />
                    </Button>
                    <Divider className={classes.modalDivider} />
                </Grid>
                {contents}
            </Grid>
        </Modal>
    );
};

// Specifies the default values for props:
BasicModal.defaultProps = {
    heading: 'Web Demo Practice',
    handleClose: () => {
        // console.log(('Modal is closed');
    },
    open: false,
    items: ['array of component']
};

BasicModal.propTypes = {
    heading: PropTypes.string,
    open: PropTypes.bool,
    items: PropTypes.array,
    classes: PropTypes.object,
    handleClose: PropTypes.func,
    children: PropTypes.object
};

export default withStyles(styles)(BasicModal);

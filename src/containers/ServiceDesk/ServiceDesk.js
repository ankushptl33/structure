import React, { Fragment } from 'react';
// import ReactDOM from 'react-dom';
import { createIssueAPI, searchticketbycustomerAPI } from '@/redux/services/serviceDeskApi';
import Loader from '@/helper/loaders/ComponentLoader';

import { Button, Grid, MenuItem, Typography } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import BasicGrid from '@/components/BasicGrid';
import ViewTicket from './ViewTicket';

let id = 0;
function createData(requesttype, summary, description, status, issuekey) {
    id += 1;
    return { id, requesttype, summary, description, status, issuekey };
}

class ServiceDesk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: {},
            dialog: {
                open: false,
                title: 'Add New Issue',
                inputcontrols: {},
                errors: {},
                onChangePerformed: false,
                saveDisabled: true
            },
            data: [],
            messageInfo: {
                open: false,
                message: ''
            },
            isLoading: true
        };
    }

    componentDidMount() {
        /*Get All Ticket
        =================*/
        fnSearchTicketByCustomer(this);
    }

    handleSave() {
        /*Create Ticket
        ================*/
        const returnValue = fnCreateIssue(this);
        this.handleDialogClose();
    }

    handleDialogClose() {
        var newDialogState = Object.assign({}, this.state.dialog, {
            open: !this.state.dialog.open,
            inputcontrols: {},
            errors: {},
            saveDisabled: true
        });

        this.setState({
            dialog: newDialogState
        });
    }

    handleSnackbarClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState(state => {
            return Object.assign({}, state, {
                messageInfo: {
                    message: '',
                    open: false
                }
            });
        });
    }

    handleChange = name => event => {
        var newDialogState = Object.assign({}, this.state.dialog, {});
        newDialogState.inputcontrols[name] = event.target.value;
        newDialogState.errors[name] = !event.target.value;
        newDialogState.onChangePerformed = true;

        newDialogState.saveDisabled =
            Object.keys(this.refs.ServiceDeskDialog.refs)
                .map(ref => {
                    var inputControl = this.refs.ServiceDeskDialog.refs[ref].props;
                    return (
                        inputControl.required &&
                        (!newDialogState.inputcontrols[name] || !newDialogState.inputcontrols[ref])
                    );
                })
                .indexOf(true) > -1;

        this.setState({
            dialog: newDialogState
        });
    };

    render() {
        const { data, isLoading } = this.state;
        if (isLoading) {
            return <Loader />;
        }
        return (
            <div>
                <Fragment>
                    <Grid item xs={12} sm={12} md={4} lg={5} className='page-title__container'>
                        <Typography variant='h2' className='fi-subheader__title '>
                            Jira Integration
                        </Typography>
                    </Grid>
                    <Button
                        variant='outlined'
                        color='primary'
                        onClick={this.handleDialogClose.bind(this)}
                    >
                        <AddIcon />
                        Add New Request
                    </Button>
                    <BasicGrid
                        columnDefs={[
                            // {
                            //     requesttype: {
                            //         type: 'string',
                            //         header: 'REQUEST TYPE',
                            //         cssClasses: [],
                            //         style: {}
                            //     }
                            // },
                            {
                                summary: {
                                    type: 'string',
                                    header: 'SUMMARY',
                                    cssClasses: [],
                                    style: {}
                                }
                            },
                            {
                                description: {
                                    type: 'string',
                                    header: 'DESCRIPTION',
                                    cssClasses: [],
                                    style: {}
                                }
                            },
                            {
                                status: {
                                    type: 'string',
                                    header: 'STATUS',
                                    cssClasses: [],
                                    style: {}
                                }
                            },
                            {
                                action: {
                                    type: 'component',
                                    header: 'Action',
                                    data: false,
                                    cssClasses: [],
                                    style: {},
                                    component: {
                                        name: 'ViewTicket',
                                        props: [],
                                        component: ViewTicket,
                                        callback: function() {
                                            alert(1);
                                        }
                                    }
                                }
                            }
                        ]}
                        data={data}
                    />
                    <ServiceDeskDialog
                        ref='ServiceDeskDialog'
                        {...this.state.dialog}
                        handleDialogClose={this.handleDialogClose.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                        handleSave={this.handleSave.bind(this)}
                    />
                    <Snackbar
                        variant='success'
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={this.state.messageInfo.open}
                        autoHideDuration={3000}
                        onClose={this.handleSnackbarClose.bind(this)}
                        message={<span id='message-id'>{this.state.messageInfo.message}</span>}
                    />
                </Fragment>
            </div>
        );
    }
}

/*SERVICE DESK DIALOG BOX START
================================*/

const ServiceDeskDialog = props => {
    return (
        <Dialog open={props.open}>
            <DialogTitle>
                {props.title}
                <label style={{ color: 'red', fontSize: '60%', float: 'right' }}>
                    <strong>Please Note:</strong> '*' Indicates Required Field
                </label>
            </DialogTitle>
            <DialogContent>
                <TextField
                    error={props.errors.ddlrequesttype}
                    ref='ddlrequesttype'
                    select
                    required={true}
                    label='Request Type'
                    SelectProps={{
                        MenuProps: {}
                    }}
                    fullWidth
                    value={props.inputcontrols.ddlrequesttype}
                    onChange={props.handleChange('ddlrequesttype')}
                    margin='normal'
                    variant='outlined'
                >
                    {requestType.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    error={props.errors.txtsummary}
                    ref='txtsummary'
                    required={true}
                    label='Summary'
                    fullWidth
                    value={props.inputcontrols.txtsummary}
                    onChange={props.handleChange('txtsummary')}
                    margin='normal'
                    variant='outlined'
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    error={props.errors.txtdescription}
                    ref='txtdescription'
                    required={true}
                    label='Description'
                    multiline
                    rows='5'
                    fullWidth
                    value={props.inputcontrols.txtdescription}
                    onChange={props.handleChange('txtdescription')}
                    margin='normal'
                    variant='outlined'
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button disabled={props.saveDisabled} onClick={props.handleSave} color='primary'>
                    Create
                </Button>
                <Button onClick={props.handleDialogClose} color='primary' autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

/*SERVICE DESK DIALOG BOX END
================================*/

export default ServiceDesk;

/*FORM DROPDOWN VALUE START
============================*/

const requestType = [
    {
        value: 'Service Request',
        label: 'Service Request'
    },
    {
        value: 'Incident',
        label: 'Incident'
    }
];

/*FORM DROPDOWN VALUE END
============================*/

/*API CALLS START
==================*/
const fnSearchTicketByCustomer = async _this => {
    await searchticketbycustomerAPI().then(res => {
        const returnValue = res.issues.map(issue => {
            return createData(
                '',
                issue.fields.summary,
                issue.fields.status.description,
                issue.fields.status.name,
                issue.key
            );
        });
        _this.setState({
            data: returnValue,
            isLoading: false
        });
    });
};

const fnCreateIssue = async _this => {
    await createIssueAPI(_this.state.dialog.inputcontrols)
        .then(res => {
            _this.setState(state => {
                return Object.assign({}, state, {
                    messageInfo: {
                        message: 'Request Created Successfully!!!',
                        open: true
                    }
                });
            });

            fnSearchTicketByCustomer(_this);
        })
        .catch(() => {
            _this.setState(state => {
                return Object.assign({}, state, {
                    messageInfo: {
                        message: 'Service Error Occured!!!',
                        open: true
                    }
                });
            });
        });
};

/*API CALLS END
==================*/

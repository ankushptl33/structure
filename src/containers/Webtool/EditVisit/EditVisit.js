import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Form from 'react-jsonschema-materialui-forms';
import { REGISTRY_UNIT_NAME } from '@/helper/constants';
// import produce from 'immer';
import moment from 'moment';
import _ from 'lodash';
import { originalFormData, originalSchema, originalUISchema } from './form-runner';
import {
    addVisitData,
    fetchListOfPatientVisits,
    getSingleVisit,
    measureQueryParam,
    updateSelectedPracticeforVisit,
    updateSelectedProviderforVisit,
    updateSelectedYearforVisit,
    updateVisitData
} from '../../../redux/actions/visitAction';
import PageTitleHeader from '../../../components/Webtool/PageTitleHeader/PageTitleHeader';
import AlertDialogSlide from '../../../components/AlertDialogSlide/AlertDialogSlide';
import SnackBar from '../SnackBar';
import * as strings from '../strings';
import './EditVisit.css';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex'
    },
    mainGrid: {
        maxWidth: '100%'
    },
    content: {
        flexGrow: 1,
        height: '80vh',
        overflow: 'auto'
    },
    button: {
        margin: theme.spacing.unit
    },
    btnAlign: {
        padding: theme.spacing.unit,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    searchBox: {
        padding: theme.spacing.unit * 2,
        margib: '10px'
    }
});

class EditVisit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            autocompleteData: [],
            value: '',
            flag: false,
            isError: false,
            isSaveDisabled: false,
            errorMessage: null,
            isOpen: false,
            modelTitle: null,
            isValidDate: true
        };
        this.handleChange = this.handleChange.bind(this);
        // this.onChange = this.onChange.bind(this);
        // this.onSelect = this.onSelect.bind(this);
        // this.getItemValue = this.getItemValue.bind(this);
        // this.renderItem = this.renderItem.bind(this);
        // this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
        this.softDeleteVisitAfterYesConfirmation = this.softDeleteVisitAfterYesConfirmation.bind(
            this
        );
        this.closeDeleteVisitConfirmationModal = this.closeDeleteVisitConfirmationModal.bind(this);
        this.redirectTo = this.redirectTo.bind(this);
        this.originalData = null;
    }

    async componentDidMount() {
        let nextState;
        if (
            this.props.visitDetailsFromReduxStore.visits &&
            this.props.visitDetailsFromReduxStore.visits.editVisit
        ) {
            nextState = await this.processFetch(
                originalSchema,
                originalUISchema,
                originalSchema,
                originalUISchema,
                originalFormData,
                this,
                this.props.visitDetailsFromReduxStore
            );
        } else {
            nextState = {
                schema: originalSchema,
                uiSchema: originalUISchema,
                formData: originalFormData
            };
        }

        if (
            this.props.visitDetailsFromReduxStore.visits.editVisit == undefined ||
            this.props.visitDetailsFromReduxStore.visits.editVisit.VisitUid == null
        ) {
            let formData = nextState.formData;
            for (let key in formData) {
                if (formData.hasOwnProperty(key)) {
                    formData[key] = '';
                }
            }
            nextState.formData = formData;
        }
        this.setState({ profile: nextState });

        let singlePractice = [];
        if (this.props.visitDetailsFromReduxStore.practices) {
            let practiceInfo = this.props.visitDetailsFromReduxStore.practices;
            let selectedPractice = this.props.visitDetailsFromReduxStore.practiceId;
            singlePractice = practiceInfo.filter(function (item) {
                return selectedPractice == parseInt(item.id);
            });
        }
        this.props.updateSelectedPracticeforVisit(singlePractice[0].name);

        let singleProvider = [];
        if (this.props.visitDetailsFromReduxStore.providers) {
            let providerInfo = this.props.visitDetailsFromReduxStore.providers;
            let selectedProvider = this.props.visitDetailsFromReduxStore.providerUid;
            singleProvider = providerInfo.filter(function (item) {
                return selectedProvider == parseInt(item.id);
            });
        }
        this.props.updateSelectedProviderforVisit(singleProvider[0]);

        let singleYear = [];
        if (this.props.visitDetailsFromReduxStore.year) {
            let yearInfo = this.props.visitDetailsFromReduxStore.year;
            let selectedVisitYear = this.props.visitDetailsFromReduxStore.selectedYear;
            singleYear = yearInfo.filter(function (item) {
                return selectedVisitYear == parseInt(item.id);
            });
        }
        this.props.updateSelectedYearforVisit(singleYear[0].name);
        this.originalData = _.cloneDeep(this.state.profile.formData);
    }

    closeDeleteVisitConfirmationModal() {
        this.setState({
            isOpen: false,
            modelTitle: null
        });
    }

    softDeleteVisitAfterYesConfirmation = async () => {
        let queryParamsUpdateVisit = this.state.profile.formData;
        let params = {
            PracticeId: this.props.visitDetailsFromReduxStore.practiceId,
            ProviderId: this.props.visitDetailsFromReduxStore.providerUid,
            PatientUid: ''
        };
        const queryUpdateVisitParams = {
            input: { ...params, ...queryParamsUpdateVisit }
        };
        await this.props.addVisitsList(queryUpdateVisitParams);
        this.props.history.push('/editmeasures');
    };

    /**
     * Method exceutes when each form field changes
     */
    handleChange(data) {
        const schema = { ...this.state.profile.schema };
        const uiSchema = { ...this.state.profile.uiSchema };
        const { formData } = data;
        const newState = processForm(originalSchema, originalUISchema, schema, uiSchema, formData);
        this.setState({ profile: newState });
    }

    reset = () => {
        let formData = this.state.profile.formData;
        for (let key in formData) {
            if (formData.hasOwnProperty(key)) {
                formData[key] = '';
            }
        }
        this.setState({ formData });
    };

    // retrieveDataAsynchronously = async inputValue => {
    //     /**
    //      * TODO: under testing. Need to remove it later
    //      */
    //     const params = {
    //         PracticeId: 23,
    //         ProviderId: 1652,
    //         Unit: 'AAO',
    //         Year: 2018,
    //         PageSize: 50,
    //         PageNumber: 1
    //     };

    //     await this.props.fetchListOfPatientVisits();
    //     const autocompleteData = [];
    //     _.map(this.props.visitDetailsFromReduxStore.patientVisitList, item => {
    //         if (
    //             item.FirstName.toLowerCase().indexOf(
    //                 inputValue.toLowerCase()
    //             ) !== -1 ||
    //             item.LastName.toLowerCase().indexOf(
    //                 inputValue.toLowerCase()
    //             ) !== -1 ||
    //             item.MRN.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
    //         ) {
    //             autocompleteData.push({
    //                 label: item.FirstName,
    //                 value: item.VisitUid
    //             });
    //         }
    //     });
    //     this.setState({
    //         autocompleteData
    //     });
    // };

    handleButtonClick = data => {
        const isDataChanged = !_.isEqual(this.state.profile.formData, this.originalData);
        if (isDataChanged) {
            let modelTitle = 'Do you want to save changes before leave the page';
            this.setState({
                isOpen: true,
                modelTitle: modelTitle
            });
        } else {
            this.props.history.push('/editmeasures');
        }
    };

    processFetch = async (
        originalSchema,
        originalUISchema,
        schema,
        uiSchema,
        formData,
        scope,
        props
    ) => {
        const params = {
            input: {
                VisitUid: props.visits.editVisit.VisitUid,
                PatientUid: props.visits.editVisit.PatientUid,
                ProviderId: props.visits.editVisit.ProviderId
                    ? parseInt(props.visits.editVisit.ProviderId)
                    : null,
                PracticeId: props.visits.editVisit.PracticeId
                    ? parseInt(props.visits.editVisit.PracticeId)
                    : null,
                Unit: REGISTRY_UNIT_NAME,
                PageSize: 10,
                PageNumber: 1,
                Year: props.visits.selectedVisitYearValue,
                Unit: REGISTRY_UNIT_NAME
            }
        };

        await this.props.getSingleVisitForPatient(params);
        if (this.props.visitDetailsFromReduxStore.singleVisitDetails) {
            var visitDetails = this.props.visitDetailsFromReduxStore
                .singleVisitDetails;
            for (var key in visitDetails) {
                if (visitDetails.hasOwnProperty(key)) {
                    for (var fields in formData) {
                        if (formData.hasOwnProperty(fields)) {
                            if (key == fields) {
                                formData[fields] = visitDetails[key];
                            }
                        }
                    }
                }
            }
        }

        return {
            schema,
            uiSchema,
            formData
        };
    };

    handleSubmit = async data => {
        if (data.formData.DOB) {
            var birthDate = moment(new Date(data.formData.DOB));
            var visitDate = moment(new Date(data.formData.VisitDate));
            var duration = moment.duration(visitDate.diff(birthDate));
            var days = duration._data.days;
            let isValidDate = true;
            if (days == 0 || birthDate > visitDate) {
                isValidDate = false;
                this.setState({ isValidDate: isValidDate });
            }
            if (!isValidDate) {
                return;
            }
        }

        let queryParamsSaveVisit = data.formData;
        let masterParam = '';

        if (this.props.visitDetailsFromReduxStore.visits.editVisit != undefined) {
            masterParam = {
                PracticeId: this.props.visitDetailsFromReduxStore.practiceId
                    ? parseInt(this.props.visitDetailsFromReduxStore.practiceId)
                    : '',
                ProviderId: this.props.visitDetailsFromReduxStore.providerUid
                    ? parseInt(this.props.visitDetailsFromReduxStore.providerUid)
                    : '',
                PatientUid: this.props.visitDetailsFromReduxStore.visits.editVisit
                    ? this.props.visitDetailsFromReduxStore.visits.editVisit.PatientUid
                    : '',
                VisitUid: this.props.visitDetailsFromReduxStore.visits.editVisit
                    ? this.props.visitDetailsFromReduxStore.visits.editVisit.VisitUid
                    : ''
            };
        } else {
            masterParam = {
                PracticeId: this.props.visitDetailsFromReduxStore.practiceId
                    ? parseInt(this.props.visitDetailsFromReduxStore.practiceId)
                    : '',
                ProviderId: this.props.visitDetailsFromReduxStore.providerUid
                    ? parseInt(this.props.visitDetailsFromReduxStore.providerUid)
                    : '',
                PatientUid: this.props.visitDetailsFromReduxStore.visits.editVisit
                    ? this.props.visitDetailsFromReduxStore.visits.editVisit.PatientUid
                    : ''
            };
        }
        const querySaveVisitParams = {
            input: { ...masterParam, ...queryParamsSaveVisit }
        };

        this.setState({ isSaveDisabled: true });

        if (this.props.visitDetailsFromReduxStore.visits.editVisit) {
            await this.props.updateVisitsList(querySaveVisitParams);
        } else {
            await this.props.addVisitsList(querySaveVisitParams);
        }

        if (this.props.visitDetailsFromReduxStore.visits.measureDetailVisit && this.props.visitDetailsFromReduxStore.visits.measureDetailVisit.message
        ) {
            this.setState({
                isError: true,
                isSaveDisabled: false,
                errorMessage: this.props.visitDetailsFromReduxStore.visits.measureDetailVisit.message
            });

        } else {
            this.setState({ flag: true, errorMessage: null });
        }

        // if the save api call has gone through successfully, then set the visit details in the redux store so that the webtool interface can render properly
        const params = {
            input: {
                visitId: this.props.visitDetailsFromReduxStore.visits.measureDetailVisit.VisitUid,
                providerId: this.props.visitDetailsFromReduxStore.providerUid,
                practiceId: this.props.visitDetailsFromReduxStore.practiceId,
                filters: {
                    measureId: this.props.visitDetailsFromReduxStore.visits
                        .visitProviderProfileMeasure
                }
            }
        };
        this.props.setMeasureQueryParam(params);
    };

    // onChange(e) {
    //     this.setState({
    //         value: e.target.value
    //     });

    //     if (e.target.value.length > 2) {
    //         this.retrieveDataAsynchronously(e.target.value);
    //     } else {
    //         this.setState({
    //             autocompleteData: []
    //         });
    //     }
    // }

    // onSelect(event, value) {
    //     this.setState({
    //         value: value.label
    //     });
    // }

    redirectTo() {
        this.props.history.push('/visits');
    }

    transformErrors = errors => {
        errors = _.uniqBy(errors, (e) => {
            return e.property;
        });

        return errors.map(error => {
            if (error.property === '.MRN') {
                error.message = 'MRN  should contain alphabets and/or numbers only';
            } else if (error.property === '.FirstName') {
                error.message = 'First Name should contain alphabets only';
            } else if (error.property === '.LastName') {
                error.message = 'Last Name should contain alphabets only';
            } else if (error.property === '.Gender') {
                error.message = 'Select any one option';
            } else if (error.property === '.DOB') {
                error.message = 'Select Date of Birth';
            } else if (error.property === '.InsuranceType') {
                error.message = 'Select any one option';
            } else if (error.property === '.VisitDate') {
                error.message = 'Select Visit date';
            }
            error.stack = undefined;
            return error;
        });
    };

    onCloseSnackBar = () => {
        this.props.history.push('/editmeasures');
    };

    onCloseSnackBarError = () => {
        this.setState({ isValidDate: true });
    };

    render() {
        const { classes } = this.props;
        let formJSX = <div>Loading.......</div>;
        if (this.props.visitDetailsFromReduxStore.visits) {
            if (
                this.props.visitDetailsFromReduxStore.visits.editVisit == undefined ||
                this.props.visitDetailsFromReduxStore.visits.editVisit.VisitUid == null
            ) {
                originalUISchema.MRN['ui:disabled'] = false;
            } else {
                originalUISchema.MRN['ui:disabled'] = this.props.visitDetailsFromReduxStore.visits
                    ? true
                    : true;
            }

            if (this.state.profile.schema)
                formJSX = (
                    <div className='add-visit-form'>
                        <div style={{ display: 'none' }} className={classes.searchBox}>
                            {/* <Autocomplete
                                inputProps={{placeholder: 'Enter Patient Name'}}
                                getItemValue={this.getItemValue}
                                items={this.state.autocompleteData}
                                renderItem={this.renderItem}
                                value={this.state.value}
                                onChange={this.onChange}
                                onSelect={this.onSelect}
                            /> */}
                        </div>
                        <Form
                            transformErrors={this.transformErrors}
                            schema={this.state.profile.schema}
                            uiSchema={this.state.profile.uiSchema}
                            formData={this.state.profile.formData}
                            onChange={this.handleChange.bind(this)}
                            onSubmit={this.handleSubmit}
                        >
                            <Grid container className={classes.btnAlign}>
                                <Button
                                    variant='outlined'
                                    className={classes.button}
                                    onClick={this.reset}
                                >
                                    Reset
                                </Button>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    className={classes.button}
                                    disabled={this.state.isSaveDisabled ? true : false}
                                    type="submit">
                                    Save
                                </Button>
                                {this.props.visitDetailsFromReduxStore.visits.editVisit && (
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        className={classes.button}
                                        onClick={e => this.handleButtonClick(e)}
                                    >
                                        Go to Patient Questionarie
                                    </Button>
                                )}
                            </Grid>
                        </Form>
                    </div>
                );
        }

        return (
            <Grid container className={classes.root}>
                <Grid className={classes.mainGrid} item xs>
                    {this.state.flag ? (
                        <SnackBar
                            message={strings.visitSaveSuccess}
                            open={true}
                            closeSnackBar={this.onCloseSnackBar}
                            variant='success'
                        />
                    ) : null}
                    {this.state.isError ? (
                        <SnackBar
                            message={this.state.errorMessage}
                            open={true}
                            variant="error"
                        />
                    ) : null}
                    {!this.state.isValidDate ? (
                        <SnackBar message={strings.dateFormat} open={true}
                            closeSnackBar={this.onCloseSnackBarError}
                            variant='error' />
                    ) : null}
                    <AlertDialogSlide
                        open={this.state.isOpen}
                        modelTitle={this.state.modelTitle}
                        onNoClose={this.closeDeleteVisitConfirmationModal}
                        onYesClose={this.softDeleteVisitAfterYesConfirmation}
                    />
                    <PageTitleHeader
                        redirectTo={this.redirectTo}
                        PageTitleHeader={[
                            {
                                Type: 'Label',
                                Value: this.props.visitDetailsFromReduxStore.visits.editVisit
                                    ? 'Edit Visit'
                                    : 'Add Visit'
                            },
                            {
                                Type: 'Badge',
                                Value: this.props.visitDetailsFromReduxStore.selectedYearInVisit
                            },
                            {
                                Value: this.props.visitDetailsFromReduxStore.selectedPracticeInVisit
                            },
                            {
                                Value:
                                    this.props.visitDetailsFromReduxStore.selectedProviderInVisit &&
                                    this.props.visitDetailsFromReduxStore.selectedProviderInVisit
                                        .firstname +
                                    ' ' +
                                    this.props.visitDetailsFromReduxStore
                                        .selectedProviderInVisit.lastname +
                                    ' ' +
                                    this.props.visitDetailsFromReduxStore
                                        .selectedProviderInVisit.npi
                            }
                        ]}
                    />
                    <Typography variant='h6' align='left'>
                        Patient Details and Visit Profile
                    </Typography>
                    <Paper>{formJSX}</Paper>
                </Grid>
            </Grid>
        );
    }
}

EditVisit.propTypes = {
    classes: PropTypes.object.isRequired
};

/**
 * Calculate new state for form based on UI Schema field conditions and current form data
 *
 * @param originalSchema - Original full schema containing all possible fields
 * @param originalUISchema - Original full UI Schema containing all possible fields
 * @param schema - Current schema
 * @param uiSchema - Current UI schema
 * @param formData - Current form data
 * @return {object} - Object containing new schema, uiSchema, and formData
 */

function processForm(originalSchema, originalUISchema, schema, uiSchema, formData) {
    return {
        schema,
        uiSchema,
        formData
    };
}

const mapStateToProps = state => {
    return {
        visitDetailsFromReduxStore: {
            visits: state.visits,
            selectedYear: state.QualityMeasure.selectedYearUid,
            practiceId: state.QualityMeasure.selectedWebtoolPracticeId,
            providerUid: state.QualityMeasure.selectedProviderUid,
            year: state.QualityMeasure.yearList,
            practices: state.QualityMeasure.practices,
            providers: state.QualityMeasure.providers,
            selectedPracticeInVisit: state.visits.selectedPracticeInVisit,
            selectedProviderInVisit: state.visits.selectedProviderInVisit,
            selectedYearInVisit: state.visits.selectedYearInVisit,
            updatedVisitDetails: state.visits.updateSelectedYearforVisit,
            patientVisitList: state.visits.patientVisitList,
            singleVisitDetails: state.visits.singleVisitDetails
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addVisitsList: params => dispatch(addVisitData(params)),

        updateVisitsList: params => dispatch(updateVisitData(params)),

        // eslint-disable-next-line no-undef
        editVisitsList: params => dispatch(editVisitData(params)),

        fetchListOfPatientVisits: async params => dispatch(fetchListOfPatientVisits(params)),

        getSingleVisitForPatient: params => dispatch(getSingleVisit(params)),

        updateSelectedPracticeforVisit: params => {
            dispatch(updateSelectedPracticeforVisit(params));
        },

        updateSelectedProviderforVisit: params => {
            dispatch(updateSelectedProviderforVisit(params));
        },

        updateSelectedYearforVisit: params => {
            dispatch(updateSelectedYearforVisit(params));
        },
        setMeasureQueryParam: params => {
            dispatch(measureQueryParam(params));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(EditVisit));

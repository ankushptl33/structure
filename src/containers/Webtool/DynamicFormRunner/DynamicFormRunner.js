import React, { Component } from 'react';
import { getMeasures, saveAnswers } from '@/redux/actions/fetchMeasuresActions';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import MenuList from '@material-ui/core/MenuList';
import _ from 'lodash';
import { Button, Divider, Grid, MenuItem, Paper, Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import SplitterLayout from 'react-splitter-layout';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Form from 'react-jsonschema-materialui-forms'; // "react-jsonschema-form";
import mingo from 'mingo';
import NoResultError from '../../../layouts/ErrorLayout/NoResultFound';
import Loader from '../Loader';
import ErrorPage from '../ErrorOccured';
import './DynamicFormRunner.css';
import * as strings from '../strings';
import { styles } from './styles';
import PageTitleHeader from '../../../components/Webtool/PageTitleHeader/PageTitleHeader';
import VisitSummaryView from './VisitSummaryView';
import SnackBar from '../SnackBar';
import { _calculateAge, _dateFormatter } from '../webtoolUtils';
// import Fab from '@material-ui/core/Fab';
// import { CheckCircle, Error, Warning } from '@material-ui/icons';

class DynamicFormRunner extends Component {
    constructor(props) {
        super(props);

        this.queryParams = {
            input: {
                visitId: null,
                providerId: null,
                practiceId: null,
                filters: { measureId: [1, 2, 3] }
            }
        };

        this.state = {
            // Represents the UI's current state
            selectedSectionIndex: null,
            processedFormDataSchema: {}, // scope: entire form (across all sections)
            processedFormUiSchema: {}, // scope: entire form (across all sections)
            processedFormData: {}, // scope: entire form (across all sections)

            // Represents the form's state in the DB
            sectionLabels: [],
            sectionsArray: [],
            persistedFormDataSchema: {},
            persistedFormUiSchema: {},
            persistedFormData: {},
            persistedFormInstanceId: null,
            isFormSaved: false
        };

        this.persistedFormDefinition = {
            sectionsWithHiddenField: [],
            conditionalSections: [],
            conditionalFields: [],
            validationRulePerField: []
        };
        this.isFormValid = true;
        this.selectedPracticeProviderData = {
            selectedYear: null,
            selectedPractice: null,
            selectedProvider: null
        };
        this.completionLimit = 0.4;
    }

    async componentDidMount() {
        // Invoke AJAX call to fetch entire form definition
        // This includes dataSchema and uiSchema for all sections, i.e measure definitions
        await this.props.loadMeasures(this.props.measureQueryParam);
        let selectedYear = this.props.selectedYear;
        let selectedPractice = this.props.practiceId;
        let selectedProvider = this.props.providerUid;
        let selectedIndex;
        if (this.props.practices) {
            selectedIndex = _.findIndex(this.props.yearList, function(year) {
                return year.id == selectedYear;
            });
            selectedYear = this.props.yearList[selectedIndex].name;

            selectedIndex = _.findIndex(this.props.practices, function(practice) {
                return practice.id == selectedPractice;
            });
            selectedPractice = this.props.practices[selectedIndex].name;

            selectedIndex = _.findIndex(this.props.providers, function(provider) {
                return provider.id == selectedProvider;
            });
            selectedProvider =
                this.props.providers[selectedIndex].firstname +
                ' ' +
                this.props.providers[selectedIndex].lastname +
                ' (NPI- ' +
                this.props.providers[selectedIndex].npi +
                ')';
        }

        this.selectedPracticeProviderData = {
            selectedYear: selectedYear,
            selectedPractice: selectedPractice,
            selectedProvider: selectedProvider
        };

        if (this.props.measureDefinition) {
            let formDefinition = this.props.measureDefinition.data.sectionList;
            let persistedFormDataSchema = formDefinition.dataSchema;
            let persistedFormUiSchema = formDefinition.uiSchema;
            let persistedFormData = formDefinition.data ? formDefinition.data : {};
            let processedFormDataSchema = formDefinition.dataSchema;
            let processedFormUiSchema = formDefinition.uiSchema;
            let processedFormData = formDefinition.data ? formDefinition.data : {};
            let persistedFormInstanceId = formDefinition.formInstanceId;

            // let {
            //     measureDefinition: {
            //         data: {
            //             sectionList: {
            //                 dataSchema: { persistedFormDataSchema  } = {},
            //                 uiSchema: {  persistedFormUiSchema   } = {},
            //                 data: { persistedFormData } = {},
            //                 dataSchema: { processedFormDataSchema } = {},
            //                 uiSchema: { processedFormUiSchema } = {},
            //                 data: { processedFormData } = {},
            //                 formInstanceId: { persistedFormInstanceId }
            //             }
            //         }
            //     }
            // } = this.props;

            let sectionLabels = [];
            let sectionsArray = [];
            _.mapKeys(persistedFormDataSchema.properties, (section, sectionName) => {
                sectionLabels.push(sectionName);
                sectionsArray.push({ name: sectionName, status: null });
            });

            this.persistedFormDefinition = fetchConditionalAndScoreCalculatingFields(
                persistedFormUiSchema
            );
            sectionsArray = this.computeSectionStatus(
                processedFormData,
                persistedFormData,
                processedFormDataSchema,
                sectionsArray
            ); // this is correct

            // Store the dataSchema, uiSchema, entireFormData and the list of section labels
            // that represent the contents in the DB in the component's state.
            // This will trigger re-rendering of the component.
            this.setState({
                selectedSectionIndex: 0,
                processedFormDataSchema,
                processedFormUiSchema,
                processedFormData,
                sectionLabels,
                sectionsArray,
                persistedFormDataSchema,
                persistedFormUiSchema,
                persistedFormData,
                persistedFormInstanceId
            });
        }
    }

    /**
     * function for computation of section status viz: started, completed , not started ,no change
     */
    computeSectionStatus = (
        processedFormData,
        persistedFormData,
        processedFormDataSchema,
        sectionsArray
    ) => {
        let sectionIndex, sectionData, fieldcount, totalFields, undefinedFields, completionStatus;

        _.mapKeys(processedFormData, (sectionKey, sectionName) => {
            totalFields = 0;
            _.mapKeys(processedFormDataSchema.properties[sectionName], (field, fieldName) => {
                totalFields++;
            });
            if (processedFormData[sectionName] != {}) {
                sectionData = processedFormData[sectionName];
                fieldcount = 0;
                undefinedFields = 0;
                sectionIndex = -1;
                _.mapKeys(sectionData, (field, fieldName) => {
                    if (
                        sectionData[fieldName] !== undefined &&
                        sectionData[fieldName] !== null &&
                        sectionData[fieldName] != '' &&
                        sectionData[fieldName] != []
                    ) {
                        fieldcount++;
                    } else {
                        undefinedFields++;
                    }
                });
                sectionIndex = _.findIndex(sectionsArray, section => {
                    return section.name === sectionName;
                });

                if (
                    fieldcount == totalFields &&
                    undefinedFields == 0 &&
                    sectionIndex != -1 &&
                    sectionsArray[sectionIndex]
                ) {
                    sectionsArray[sectionIndex].status = 'completed';
                } else if (fieldcount > 0 && sectionIndex != -1 && sectionsArray[sectionIndex]) {
                    if (totalFields > 0) {
                        completionStatus = fieldcount / totalFields;
                        if (completionStatus >= this.completionLimit) {
                            sectionsArray[sectionIndex].status = 'completed';
                        } else {
                            sectionsArray[sectionIndex].status = 'in progress';
                        }
                    } else {
                        sectionsArray[sectionIndex].status = 'started';
                    }
                } else {
                    if (sectionIndex != -1 && sectionsArray[sectionIndex]) {
                        sectionsArray[sectionIndex].status = 'not started';
                    }
                }
                if (sectionIndex != -1 && sectionsArray[sectionIndex]) {
                    if (
                        sectionsArray[sectionIndex].status == 'completed' ||
                        sectionsArray[sectionIndex].status == 'started'
                    ) {
                        sectionsArray[sectionIndex].iconName = 'CheckCircle';
                    } else if (sectionsArray[sectionIndex].status == 'in progress') {
                        sectionsArray[sectionIndex].iconName = 'Warning';
                    } else {
                        sectionsArray[sectionIndex].iconName = 'Error';
                    }
                } else if (sectionsArray[this.state.selectedSectionIndex]) {
                    sectionsArray[this.state.selectedSectionIndex].status = 'not started';
                    sectionsArray[this.state.selectedSectionIndex].iconName = 'Error';
                }
            }
        });
        return sectionsArray;
    };

    /**
     * Handle click event on the section name in the left panel on the UI.
     */
    handleSectionNameClick = sectionName => {
        let selectedSectionIndex = this.state.sectionLabels.indexOf(sectionName);
        let sectionsArray = this.computeSectionStatus(
            this.state.processedFormData,
            this.state.persistedFormData,
            this.state.processedFormDataSchema,
            this.state.sectionsArray
        );

        this.setState({
            selectedSectionIndex: selectedSectionIndex,
            sectionsArray: sectionsArray
        });
    };

    /**
     * Handle changes in form data change. Invoked when the user changes anything on form
     */
    handleFormDataChange = data => {
        let currentFormData = data.formData;
        // let currentFormData =this.state.processedFormData;
        // currentFormData[this.state.sectionLabels[this.state.selectedSectionIndex]] =  data.formData;
        // TODO: Invoke the data field watcher function

        const processedForm = processForm(
            this.state.persistedFormDataSchema, // scope: across all sections and represents the DB state
            this.state.persistedFormUiSchema, // scope: across all sections and represents the DB state
            this.state.processedFormDataSchema, // scope: across all sections and represents the entire form runner state
            this.state.processedFormUiSchema, // scope: across all sections and represents the entire form runner state
            currentFormData, // scope: across all sections and represents the entire form runner state
            this.persistedFormDefinition.sectionsWithHiddenField,
            this.persistedFormDefinition.conditionalSections,
            this.persistedFormDefinition.conditionalFields,
            this.persistedFormDefinition.validationRulePerField
        );
        let sectionsArray = this.computeSectionStatus(
            processedForm.processedFormData,
            this.state.persistedFormData,
            processedForm.processedFormDataSchema,
            this.state.sectionsArray
        );
        // Update data schema, UI schema and the processed form data and update the state of the component.
        // This will trigger re-rendering of the component.
        this.setState({
            processedFormDataSchema: processedForm.processedFormDataSchema, // scope: across all sections and represents the DB state
            processedFormUiSchema: processedForm.processedFormUiSchema, // scope: across all sections and represents the DB state
            processedFormData: processedForm.processedFormData, // scope: across all sections and represents the entire form runner state
            sectionsArray: sectionsArray
        });
    };

    /**
     * Handle changes in form data change. Invoked when the user clicks on "Reset" button
     */
    handleFormReset = () => {
        let resetSectionData = _.omit(this.state.processedFormData, [
            this.state.sectionLabels[this.state.selectedSectionIndex]
        ]);

        // This will trigger re-rendering of the component.
        // This re-render will also trigger the onChange event
        // of the form runner component. The handleFormDataChange
        // function will internally invoke the field observer and
        // the `processForm` functions. This will ensure that all
        // side effects have been taken care of.
        this.setState({
            processedFormData: resetSectionData // scope: across all sections and represents the entire form runner state
        });
    };

    /**
     * Handle entire form submission.
     */
    handleFormSubmit = event => {
        const mutationParams = {
            input: {
                formInstanceId: this.state.persistedFormInstanceId,
                data: this.state.processedFormData,
                prefer: 'representation',
                isSubmitted: false
            }
        };

        // Persist form data in DB
        this.props.saveAnswers(mutationParams);
    };

    /**
     * Handle cross section form validation
     */
    handleFormValidation = (formData, errors) => {
        let invalidFieldCount = 0;

        _.each(this.persistedFormDefinition.validationRulePerField, field => {
            let { validate, sectionName, fieldName } = field;

            _.mapKeys(validate, (ruleObj, ruleName) => {
                if (errors[fieldName]) {
                    try {
                        errors[fieldName]['__errors'] = [];
                        var validateFunction = eval('(' + ruleObj.validator + ')');
                        let isValid = validateFunction(
                            this.state.processedFormUiSchema,
                            this.state.processedFormData,
                            { sectionName: sectionName }
                        );
                        if (!isValid) {
                            errors[fieldName].addError(ruleObj.error);
                            invalidFieldCount++;
                        }
                    } catch (err) {}
                }
            });
        });
        this.isFormValid = invalidFieldCount <= 0;
        return errors;
    };

    sectionDefinitionCreater = sectionIndex => {
        let currentSectionDataSchema = { type: 'object', properties: {} };
        currentSectionDataSchema.properties[
            this.state.sectionLabels[sectionIndex]
        ] = this.state.processedFormDataSchema.properties[this.state.sectionLabels[sectionIndex]];

        let currentSectionUiSchema = { 'ui:order': [] };
        currentSectionUiSchema['ui:order'].push(this.state.sectionLabels[sectionIndex]);
        currentSectionUiSchema[
            this.state.sectionLabels[sectionIndex]
        ] = this.state.processedFormUiSchema[this.state.sectionLabels[sectionIndex]];

        let currentFormData = {};
        if (this.state.processedFormData != {}) {
            currentFormData[this.state.sectionLabels[sectionIndex]] = this.state.processedFormData[
                this.state.sectionLabels[sectionIndex]
            ];
        }

        return {
            currentSectionDataSchema,
            currentSectionUiSchema,
            currentFormData
        };
    };

    /**
     * Render the selected section in the right hand side pane
     */
    formRenderer = sectionIndex => {
        const { classes } = this.props;
        let { currentSectionDataSchema, currentSectionUiSchema } = this.sectionDefinitionCreater(
            sectionIndex
        );

        return (
            <Form
                className='QuestionForm'
                schema={currentSectionDataSchema}
                uiSchema={currentSectionUiSchema}
                formData={this.state.processedFormData}
                onSubmit={this.handleFormSubmit}
                validate={this.handleFormValidation}
                onChange={this.handleFormDataChange}
            >
                <div className={classes.alignRight}>
                    <Button className={classes.displayInline} onClick={this.handleFormReset}>
                        {strings.btnClear}
                    </Button>
                    <Button
                        variant='outlined'
                        color='primary'
                        type='submit'
                        className={classes.button}
                    >
                        {strings.btnSave}
                    </Button>
                </div>
            </Form>
        );
    };

    /**
     * Renders the react component tree of the Dynamic form runner component
     */
    render() {
        const { classes } = this.props;
        let patientAge = null;
        let dateOfBirth = null;
        let patientGender = null;

        let visitDate = null;
        let measureQuestionLayout = (
            <div>
                <Loader />
            </div>
        );

        if (
            !this.props.isLoading &&
            this.props.measureDefinition &&
            !this.props.isFailure &&
            this.props.measureDetailVisit
        ) {
            patientGender = this.props.measureDetailVisit.Gender;

            dateOfBirth = _dateFormatter(this.props.measureDetailVisit.DOB, 'MM/DD/YYYY');
            patientAge = _calculateAge(dateOfBirth);
            patientGender =
                patientGender == 'FEMALE' || patientGender == 'Female'
                    ? 'Female'
                    : patientGender == 'MALE' || patientGender == 'Male'
                    ? 'Male'
                    : 'Unidentified';
            visitDate = _dateFormatter(this.props.measureDetailVisit.VisitDate, 'MM/DD/YYYY HH:mm');

            measureQuestionLayout = this.state.sectionLabels.length ? (
                <SplitterLayout
                    customClassName={'maxHeightSplitter '}
                    percentage={true}
                    secondaryInitialSize={85}
                >
                    <MenuList className='borderPane padding-0'>
                        {this.state.sectionsArray.map((section, index) => (
                            <div key={index} className='SplitterLayoutMenuContainer'>
                                <MenuItem
                                    className={
                                        index === this.state.selectedSectionIndex
                                            ? classes.menuSel
                                            : classes.menuItem
                                    }
                                    onClick={() => {
                                        this.handleSectionNameClick(section.name);
                                    }}
                                >
                                    <ListItemText
                                        classes={{ primary: classes.primary }}
                                        inset
                                        primary={section.name}
                                    />
                                    {/* TODO: uncomment below block when section status icon is needed */}
                                    {/* {section.iconName == 'CheckCircle' ? (
                                        <CheckCircle color="secondary" />
                                    ) : section.iconName == 'Warning' ? (
                                        <Warning style={{color: '#b36b00'}} />
                                    ) : (
                                        <Error color="error" />
                                    )} */}
                                </MenuItem>
                                <Divider />
                            </div>
                        ))}
                    </MenuList>

                    <Grid container>
                        {this.state.selectedSectionIndex != null &&
                            this.formRenderer(this.state.selectedSectionIndex)}
                    </Grid>
                </SplitterLayout>
            ) : (
                <Grid container>
                    <NoResultError message={strings.noMeasures} />
                </Grid>
            );
        } else if (this.props.isFailure) {
            measureQuestionLayout = (
                <div>
                    <ErrorPage />
                </div>
            );
        }

        return (
            <Grid container>
                {this.props.isSaving ? <Loader /> : null}
                {this.props.isSaved ? <SnackBar message={strings.formSuccess} open={true} variant="success" /> : null}
                <PageTitleHeader
                    PageTitleHeader={[
                        { Type: 'Label', Value: strings.webtool },
                        {
                            Type: 'Badge',
                            Value: this.selectedPracticeProviderData.selectedYear
                        },
                        {
                            Type: 'Badge',
                            Value: this.selectedPracticeProviderData.selectedPractice
                        },
                        {
                            Type: 'Badge',
                            Value: this.selectedPracticeProviderData.selectedProvider
                        }
                    ]}
                    redirectTo={this.props.history.goBack}
                />
                {this.props.measureDetailVisit ? (
                    <Grid item xs>
                        <Paper className={classes.editMeasurePaper}>
                            <VisitSummaryView
                                mrn={this.props.measureDetailVisit.MRN}
                                name={
                                    this.props.measureDetailVisit.FirstName +
                                    ' ' +
                                    this.props.measureDetailVisit.LastName
                                }
                                gender={patientGender}
                                dob={dateOfBirth}
                                age={patientAge}
                                dateofvisit={visitDate}
                                insurence={this.props.measureDetailVisit.InsuranceType}
                            />

                            <Grid container className='measures-quetionnaire__ttl-wrapper'>
                                <Typography variant='body2'>
                                    {strings.plzAnswerQuestionnaire}
                                </Typography>
                            </Grid>
                            <Grid container className='editmeasure-wrapper'>
                                <Grid item xs>
                                    {measureQuestionLayout}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ) : (
                    <Loader />
                )}
            </Grid>
        );
    }
}

/**
 * Calculate new state for form based on UI Schema field conditions and current form data
 *
 * @param persistedFormDataSchema - Original full data schema containing all possible fields from DB
 * @param persistedFormUiSchema - Original full UI Schema containing all possible fields from DB
 * @param processedFormDataSchema - Current full data schema containing all possible fields
 * @param processedFormUiSchema - Current full UI schema containing all possible fields
 * @param processedFormData - Current form data across all sections
 * @param sectionsWithHiddenField - Original score calculation functions across all sections from DB
 * @param conditionalSections - Original list of conditions for section visibility across all sections from DB
 * @param conditionalFields - Original score calculation functions across all sections from DB
 * @param validationRulePerField - Original score calculation functions across all sections from DB
 *
 * @return {object} - Object containing new processedFormDataSchema, new processedFormUiSchema, and updated processedFormData
 */
function processForm(
    persistedFormDataSchema,
    persistedFormUiSchema,
    processedFormDataSchema,
    processedFormUiSchema,
    processedFormData,
    sectionsWithHiddenField,
    conditionalSections,
    conditionalFields,
    validationRulePerField
) {
    processedFormDataSchema =
        processedFormDataSchema != null ? processedFormDataSchema : persistedFormDataSchema;
    processedFormUiSchema =
        processedFormUiSchema != null ? processedFormUiSchema : persistedFormUiSchema;

    if (_.isEmpty(conditionalFields) && _.isEmpty(conditionalSections)) {
        return {
            processedFormDataSchema,
            processedFormUiSchema,
            processedFormData
        };
    }

    _.forEach(sectionsWithHiddenField, function(section) {
        processedFormData = section.computeHiddenField(
            // processedFormDataSchema = computeHiddenField(
            processedFormData,
            {
                sectionName: section.sectionName
            }
        );
    });
    // Recursively clone values
    let newSchema = _.cloneDeep(processedFormDataSchema);
    let newUISchema = _.cloneDeep(processedFormUiSchema);
    let newFormData = _.cloneDeep(processedFormData);

    if (!_.isEmpty(conditionalFields)) {
        // Excecute condition for each dependant field
        _.each(conditionalFields, dependantSchema => {
            let { dependant, sectionName, condition } = dependantSchema; // Dependant field name	and its section name

            // Test if an object matches query
            let query = new mingo.Query(condition);
            let shouldBeVisible = query.test(newFormData);
            if (newFormData[sectionName]) {
                if (shouldBeVisible) {
                    // newSchema.properties[sectionName].properties[dependant] = persistedFormDataSchema.properties[sectionName].properties[dependant];
                    newUISchema[sectionName][dependant]['ui:disabled'] = false;
                } else {
                    // newSchema.properties[sectionName].properties = _.omit(newSchema.properties[sectionName].properties, [dependant]);
                    // newFormData[sectionName] = _.omit(newFormData[sectionName], [dependant]);
                    newFormData[sectionName][dependant] = undefined;
                    newUISchema[sectionName][dependant]['ui:disabled'] = true;
                }
            }
        });
    }

    // Update UI Schema section UI order
    // react-jsonschema-form cannot handle extra properties found in UI order
    newUISchema['ui:order'] = _.intersection(
        persistedFormUiSchema['ui:order'],
        _.keys(newSchema.properties)
    );

    // Update UI Schema fields UI order
    // react-jsonschema-form cannot handle extra properties found in UI order
    _.mapKeys(newSchema.properties, function(value, sectionName) {
        newUISchema[sectionName]['ui:order'] = _.intersection(
            persistedFormUiSchema[sectionName]['ui:order'],
            _.keys(newSchema.properties[sectionName].properties)
        );
    });

    return {
        processedFormDataSchema: newSchema,
        processedFormUiSchema: newUISchema,
        processedFormData: newFormData
    };
}

/**
 * Function to fetch all conditional sections, fields, validations and score calculation fields
 * @param persistedFormUiSchema - Original full schema
 */
function fetchConditionalAndScoreCalculatingFields(persistedFormUiSchema) {
    let sectionsWithHiddenField = [];
    let conditionalSections = [];

    let conditionalFields = [];
    let validationRulePerField = [];

    // Traverse through each section to get conditional fields
    _.mapKeys(persistedFormUiSchema, function(section, sectionName) {
        // If section contains scoreCalculation function
        if (section.hasOwnProperty('computeHiddenField')) {
            sectionsWithHiddenField.push({
                ...section,
                sectionName: sectionName
            });
        }

        if (section.hasOwnProperty('condition')) {
            conditionalSections.push({
                dependant: sectionName,
                condition: section.condition
            });
        } else {
            _.mapKeys(section, function(field, fieldName) {
                // If field contains condition(mingo criteria) property
                if (field.hasOwnProperty('condition')) {
                    conditionalFields.push({
                        ...field,
                        sectionName: sectionName,
                        dependant: fieldName
                    });
                }
                if (field.hasOwnProperty('validate')) {
                    validationRulePerField.push({
                        ...field,
                        sectionName: sectionName,
                        fieldName: fieldName
                    });
                }
            });
        }
    });
    return {
        sectionsWithHiddenField,
        conditionalSections,
        conditionalFields,
        validationRulePerField
    };
}

const mapStateToProps = state => {
    return {
        measureDefinition: state.MeasureList.measures,
        isLoading: state.MeasureList.isLoading,
        isFailure: state.MeasureList.isFailure,
        isSaving: state.MeasureList.isSaving,
        isSaved: state.MeasureList.isSaved,
        patientInfo: state.visits.measureDetailVisit,
        measureQueryParam: state.visits.measureQueryParam,
        measureDetailVisit: state.visits.measureDetailVisit,
        practiceId: state.QualityMeasure.selectedWebtoolPracticeId,
        providerUid: state.QualityMeasure.selectedProviderUid,
        selectedYear: state.QualityMeasure.selectedYearUid,
        yearList: state.QualityMeasure.yearList,
        practices: state.QualityMeasure.practices,
        providers: state.QualityMeasure.providers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMeasures: async params => {
            return dispatch(getMeasures(params));
        },
        saveAnswers: params => {
            return dispatch(saveAnswers(params));
        }
    };
};

DynamicFormRunner.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(DynamicFormRunner));

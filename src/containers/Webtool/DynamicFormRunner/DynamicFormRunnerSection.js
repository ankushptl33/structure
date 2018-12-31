import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getMeasures } from '@/redux/actions/fetchMeasuresActions';
import { getAMeasureByID } from '@/redux/actions/fetchMeasureQuestionsActions';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Form from 'react-jsonschema-materialui-forms'; // "react-jsonschema-form";
import mingo from 'mingo';
import Button from '@material-ui/core/Button';

import { measureQuestionStyles } from './styles';
import * as strings from '../strings';
import Loader from '../Loader';
import ErrorPage from '../ErrorOccured';

const conditionalFields = [];
const validationFields = [];
const conditionalSections = [];
const scoreCalculationSections = [];
let originalFormData = {};
let originalSchema = {};
let originalUISchema = {};
let measureQuestions;
let queryParams;
class MeasureDisplay extends Component {
    constructor(props) {
        super(props);
        queryParams = {
            input: {
                formInstanceId: this.props.formInstanceId,
                sectionId: this.props.measureId
            }
        };
        measureQuestions = this.props.loadMeasureQuestions(queryParams, this.props.measureList);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        if (this.props.selectedMeasure) {
            originalSchema = this.props.selectedMeasure.data.getSection.dataSchema;
            originalUISchema = this.props.selectedMeasure.data.getSection.uiSchema;
            originalFormData = this.props.selectedMeasure.data.getSection.data;
            fetchConditionalAndScoreCalculatingFields(originalUISchema);
            this.state = processForm(
                originalSchema,
                originalUISchema,
                originalSchema,
                originalUISchema,
                originalFormData
            );
        } else {
            this.state = {
                schema: undefined,
                uiSchema: undefined,
                formData: undefined
            };
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.measureId !== nextProps.measureId) {
            queryParams = {
                input: {
                    formInstanceId: nextProps.formInstanceId,
                    sectionId: nextProps.measureId
                }
            };
            measureQuestions = this.props.loadMeasureQuestions(queryParams, this.props.measureList);
            if (nextProps.selectedMeasure) {
                originalSchema = nextProps.selectedMeasure.data.getSection.dataSchema;
                originalUISchema = nextProps.selectedMeasure.data.getSection.uiSchema;
                originalFormData = nextProps.selectedMeasure.data.getSection.data;

                fetchConditionalAndScoreCalculatingFields(originalUISchema);
                this.setState(
                    processForm(
                        originalSchema,
                        originalUISchema,
                        originalSchema,
                        originalUISchema,
                        originalFormData
                    )
                );
            }
        }
    }

    onSubmit(event) {
        console.log('Form Data: --------------> ', event.formData);
    }

    /**
     * Method exceutes when each form field changes
     */
    handleChange(data) {
        const schema = { ...this.state.schema };
        const uiSchema = { ...this.state.uiSchema };
        const { formData } = data;
        const newState = processForm(originalSchema, originalUISchema, schema, uiSchema, formData);
        this.setState(newState);
    }

    handleFormReset = () => {
        this.setState({ ...this.state, formData: originalFormData });
    };

    validate(formData, errors) {
        _.each(validationFields, field => {
            let { validate, sectionName, fieldName } = field;
            // Traverse objects key value pair
            _.mapKeys(validate, (ruleObj, ruleName) => {
                let isValid = ruleObj.validator(this.state.uiSchema, formData, {
                    sectionName: sectionName
                });
                if (!isValid) {
                    errors[sectionName][fieldName].addError(ruleObj.error);
                }
            });
        });
        return errors;
    }

    render() {
        const { classes } = this.props;
        let formJSX = <Loader />;
        if (this.state.schema) {
            formJSX = (
                <Form
                    schema={this.state.schema}
                    uiSchema={this.state.uiSchema}
                    formData={this.state.formData}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    onChange={this.handleChange.bind(this)}
                >
                    <div className={classes.alignRight}>
                        <Button className={classes.displayInline} onClick={this.handleFormReset}>
                            {strings.btnClear}
                        </Button>
                        <Button variant='outlined' type='submit' className={classes.button}>
                            {strings.btnSave}
                        </Button>
                    </div>
                </Form>
            );
        } else if (this.props.isFailure) {
            formJSX = <ErrorPage />;
        }
        return <div className='padding-2'>{formJSX}</div>;
    }
}

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
    let newSchema, newUISchema, newFormData;
    if (_.isEmpty(conditionalFields) && _.isEmpty(conditionalSections)) {
        return {
            schema,
            uiSchema,
            formData
        };
    }

    _.forEach(scoreCalculationSections, function(section) {
        formData = section.computeHiddenField(formData, uiSchema, {
            sectionName: section.sectionName
        });
    });
    // Recursively clone values
    newSchema = _.cloneDeep(schema);
    newUISchema = _.cloneDeep(uiSchema);
    newFormData = _.cloneDeep(formData);

    if (!_.isEmpty(conditionalFields)) {
        // Excecute condition for each dependant field
        _.each(conditionalFields, dependantSchema => {
            let { dependant, sectionName, condition } = dependantSchema; // Dependant field name	and its section name

            // Test if an object matches query

            let query = new mingo.Query(condition);
            let shouldBeVisible = query.test(newFormData);

            if (newFormData[sectionName]) {
                if (shouldBeVisible) {
                    // newSchema.properties[sectionName].properties[dependant] = originalSchema.properties[sectionName].properties[dependant];
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
        originalUISchema['ui:order'],
        _.keys(newSchema.properties)
    );

    // Update UI Schema fields UI order
    // react-jsonschema-form cannot handle extra properties found in UI order
    _.mapKeys(newSchema.properties, function(value, sectionName) {
        newUISchema[sectionName]['ui:order'] = _.intersection(
            originalUISchema[sectionName]['ui:order'],
            _.keys(newSchema.properties[sectionName].properties)
        );
    });

    return {
        schema: newSchema,
        uiSchema: newUISchema,
        formData: newFormData
    };
}

/**
 * Function to fetch all conditional Sections, Fields and Score calculation fields
 * @param uiSchema - Original full schema
 */
function fetchConditionalAndScoreCalculatingFields(uiSchema) {
    // Traverse through each section to get conditional fields
    _.mapKeys(uiSchema, function(section, sectionName) {
        // If section contains scoreCalculation function
        if (section.hasOwnProperty('computeHiddenField')) {
            scoreCalculationSections.push({
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
                    validationFields.push({
                        ...field,
                        sectionName: sectionName,
                        fieldName: fieldName
                    });
                }
            });
        }
    });
}

const mapStateToProps = state => {
    return {
        selectedMeasure: state.getMeasureQuestions.selectedMeasure,
        isLoading: state.getMeasureQuestions.isLoading,
        isFailure: state.getMeasureQuestions.isFailure
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMeasureQuestions: (params, measureList) => {
            dispatch(getAMeasureByID(params, measureList));
        }
    };
};

MeasureDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(measureQuestionStyles, { withTheme: true })(MeasureDisplay));

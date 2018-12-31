export const originalSchema = {
    title: ' ',
    type: 'object',
    required: ['MRN', 'FirstName', 'LastName', 'Gender', 'DOB', 'InsuranceType', 'VisitDate'],
    properties: {
        MRN: {
            type: 'string',
            title: 'MRN No',
            maxLength: 19,
            pattern: `^[a-zA-Z0-9]*$`
        },
        FirstName: {
            type: 'string',
            title: 'First Name',
            pattern: `^[a-zA-Z-']*$`
        },
        LastName: {
            type: 'string',
            title: 'Last Name',
            pattern: `^[a-zA-Z-']*$`
        },
        Gender: {
            type: 'string',
            title: 'Gender',
            oneOf: [
                {
                    type: 'string',
                    title: 'Male',
                    enum: ['MALE']
                },
                {
                    type: 'string',
                    title: 'Female',
                    enum: ['FEMALE']
                },
                {
                    type: 'string',
                    title: 'Unidentified',
                    enum: ['UNIDENTIFIED']
                }
            ]
        },
        DOB: {
            type: 'string',
            format: 'date-time',
            title: 'DOB'
        },
        InsuranceType: {
            type: 'integer',
            title: 'Insurance Type',
            enum: [1, 2, 3, 4, 5],
            enumNames: [
                'Medicare',
                'Medicaid',
                'Private Health Insurance',
                'Other Payer',
                'Medicare Part B'
            ]
        },
        VisitDate: {
            type: 'string',
            format: 'date-time',
            title: 'Visit Date & Time'
        }
    }
};

export const originalUISchema = {
    'ui:order': ['MRN', 'FirstName', 'LastName', 'Gender', 'DOB', 'InsuranceType', 'VisitDate'],
    MRN: {
        'ui:disabled': ' ',
        classNames: 'formControlGroup'
    },
    Gender: {
        'ui:widget': 'select',
        'ui:options': {
            shortLabel: 'Gender',
            label: false,
            placeholder: "Gender *"
        }
    },
    InsuranceType: {
        'ui:widget': 'select',
        'ui:options': {
            shortLabel: 'Insurance Type',
            label: false,
            placeholder: "Insurance Type *"
        }
    },
    DOB: {
        'ui:options': {
            disableFuture: true,
            clearable: true,
            keyboard: true,
            formatPattern: 'MM-DD-YYYY',
            format: 'date-time',
            placeholder: 'MM-DD-YYYY',
            disableOpenOnEnter: true,
            animateYearScrolling: false,
            renderDateTimePickerAsDatePicker: true,
            invalidLabel: ''
        },
        classNames: 'formControlGroup'
    },
    VisitDate: {
        'ui:options': {
            disableFuture: true,
            clearable: true,
            keyboard: true,
            formatPattern: 'MM-DD-YYYY hh:mm',
            format: 'date-time',
            placeholder:'MM-DD-YYYY hh:mm',
            disableOpenOnEnter: true,
            animateYearScrolling: false,
            invalidLabel: ''
        },
        classNames: 'formControlGroup'
    },
    FirstName: {
        classNames: 'formControlGroup'
    },
    LastName: {
        classNames: 'formControlGroup'
    },
    Gender: {
        classNames: 'formControlGroup'
    },
    InsuranceType: {
        classNames: 'formControlGroup'
    }
};

export const originalFormData = {
    MRN: '',
    FirstName: '',
    LastName: '',
    Gender: '',
    DOB: '',
    InsuranceType: '',
    VisitDate: ''
};

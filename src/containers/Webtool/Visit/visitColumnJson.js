import React from 'react';

export const columnObj = [
    {
        VisitUid: {
            type: 'string',
            header: 'VisitUid',
            cssClasses: ['measure-performance'],

            style: {
                display: 'none' //this is required for send value to edit visit and measure detail page
            }
        }
    },
    {
        PatientUid: {
            type: 'string',
            header: 'PatientUid',
            cssClasses: ['measure-performance'],
            style: {
                display: 'none' //this is required for send value to edit visit and measure detail page
            }
        }
    },
    {
        MRN: {
            type: 'string',
            header: 'MRN',
            cssClasses: ['measure-performance'],
            style: {
                display: 'none' //this is required for send value to edit visit and measure detail page
            }
        }
    },
    {
        Unit: {
            type: 'string',
            header: 'Unit',
            cssClasses: ['measure-performance'],
            style: {
                display: 'none' //this is required for send value to edit visit and measure detail page
            }
        }
    },
    {
        DataSource: {
            type: 'string',
            header: 'DataSource',
            cssClasses: ['measure-performance'],
            style: {
                display: 'none' //this is required for send value to edit visit and measure detail page
            }
        }
    },
    {
        PracticeId: {
            type: 'string',
            header: 'PracticeId',
            cssClasses: ['measure-performance'],
            style: {
                display: 'none' //this is required for send value to edit visit and measure detail page
            }
        }
    },
    {
        ProviderId: {
            type: 'string',
            header: 'ProviderId',
            cssClasses: ['measure-performance'],
            style: {
                display: 'none' //this is required for send value to edit visit and measure detail page
            }
        }
    },
    {
        LocationId: {
            type: 'string',
            header: 'LocationId',
            cssClasses: ['measure-performance'],
            style: {
                display: 'none' //this is required for send value to edit visit and measure detail page
            }
        }
    },
    {
        PatientName: {
            type: 'string',
            header: 'PATIENT NAME & MRN',
            cssClasses: ['measure-performance'],
            style: {},
            cols: 3
        }
    },
    {
        Gender: {
            type: 'string',
            header: 'GENDER',
            cssClasses: ['measure-name'],
            style: {},
            cols: 1
        }
    },
    {
        DOB: {
            type: 'string',
            header: 'DATE OF BIRTH',
            cssClasses: ['measure-performance'],
            style: {},
            cols: 1
        }
    },
    {
        VisitDate: {
            type: 'string',
            header: 'VISIT DATE & TIME',
            cssClasses: ['measure-performance'],
            style: {},
            cols: 4
        }
    },
    {
        InsuranceType: {
            type: 'string',
            header: 'INSURANCE TYPE',
            cssClasses: ['measure-performance'],
            style: {},
            cols: 2
        }
    }
];

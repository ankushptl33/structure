export const styles = theme => ({
    editMeasurePaper: {
        padding: theme.spacing.unit * 3
    },
    root: {
        flexGrow: 1
    },
    menuItem: {
        '&:focus': {
            backgroundColor: '#efefef',
            '& $primary, & $icon': {
                color: 'black'
            }
        },
        '&:disabled': {
            'text-decoration': 'line-through !important'
        }
    },
    menuSel: {
        backgroundColor: '#efefef',
        color: 'black',
        'border-style': 'solid',
        'border-width': '1px 1px 1px 4px',
        'border-color': 'grey'
    },
    primary: {
        fontWeight: 'bold'
    },
    button: {
        margin: theme.spacing.unit,
        'text-transform': 'capitalize',
        'font-size': '14px',
        'border-radius': '20px'
    },
    input: {
        display: 'none'
    },
    fab: {
        margin: theme.spacing.unit
    },
    alignRight: {
        float: 'right'
    },
    displayInline: {
        display: 'inline',
        align: 'left',
        'text-transform': 'capitalize',
        'font-size': '14px'
    },
    alingLeft: {
        align: 'left'
    }
});

export const measureQuestionStyles = theme => ({
    SplitterLayout: {
        position: 'inherit'
    },
    button: {
        margin: theme.spacing.unit,
        'text-transform': 'capitalize',
        'font-size': '14px',
        'border-radius': '20px'
    },
    input: {
        display: 'none'
    },
    fab: {
        margin: theme.spacing.unit
    },
    alignRight: {
        float: 'right'
    },
    displayInline: {
        display: 'inline',
        align: 'left',
        'text-transform': 'capitalize',
        'font-size': '14px'
    },
    alingLeft: {
        align: 'left'
    }
});

export const stylesVisitView = theme => ({
    ProfileSummaryRow: {
        alignItems: 'center'
    },
    profilePlaceholder: {
        width: '45px',
        height: '45px',
        backgroundColor: '#BDBDBD',
        textAlign: 'center'
    },
    contentDob: {
        display: 'inline-flex',
        verticalAlign: 'middle',
        lineHeight: '32px'
    }
});

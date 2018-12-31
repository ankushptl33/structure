import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    tabContainerSpace: {
        padding: theme.spacing.unit * 3
    }
});

const TemporaryPage = props => {
    return (
        <div square className='mastertab-outer'>
            {props.children}
        </div>
    );
};

export default withStyles(styles)(TemporaryPage);

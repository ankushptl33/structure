import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import NavigateBefore from '@material-ui/icons/NavigateBefore';

const styles = theme => ({
    root: {
        width: '97%',
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap'
    },
    chip: {
        margin: theme.spacing.unit
    },
    icon: {
        fontSize: 32,
        margin: theme.spacing.unit,
        cursor: 'pointer'
    }
});

function PageTitleHeader(props) {
    const { classes } = props;
    return (
        <div className={classes.root + ' page-title__container'}>
            <NavigateBefore
                onClick={props.redirectTo}
                className={classes.icon}
            />
            {props.PageTitleHeader.map((item, index) => (
                <row key={index}>
                    {item.Type == 'Label' ? (
                        <Typography variant="h2" className="fi-subheader__title">
                            {item.Value}
                        </Typography>
                    ) : (
                        <Chip label={item.Value} className={classes.chip} />
                    )}
                </row>
            ))}
        </div>
    );
}

PageTitleHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    redirectTo: PropTypes.func.isRequired
};

export default withStyles(styles)(PageTitleHeader);

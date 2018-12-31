import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import cakeIcon from '@material-ui/icons/Cake';
// import Icon from '@material-ui/core/Icon';
import PlayArrowIcon from '@material-ui/icons/Cake';
import * as strings from '../strings';
import { stylesVisitView } from './styles';
// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
class VisitSummaryView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <div sm={6} className={classes.details}>
                    <CardContent className={classes.content}>
                        <div className={classes.contentMrn}>
                            <div className={classes.boxDiv} />
                            <div>
                                <Typography
                                    className={classes.marginNone}
                                    variant='button'
                                    gutterBottom
                                >
                                    {strings.mrnLabel}
                                    <b>{this.props.mrn}</b>
                                </Typography>
                                <Typography
                                    className={classes.marginNone}
                                    variant='h6'
                                    gutterBottom
                                >
                                    {this.props.name}
                                </Typography>
                                <Typography variant='caption' gutterBottom>
                                    {this.props.gender}
                                </Typography>
                            </div>
                        </div>
                    </CardContent>
                </div>
                <div sm={6} className={classes.contentDob}>
                    <CardContent className={classes.content}>
                        <div style={{ display: 'inline-flex' }}>
                            <div>
                                {/* <IconButton aria-label="Play/pause"> */}
                                <PlayArrowIcon className={classes.playIcon} />
                                {/* </IconButton> */}
                            </div>
                            <div style={{ paddingLeft: 2 }}>
                                <Typography
                                    className={classes.flex}
                                    variant='subheading'
                                    gutterBottom
                                >
                                    {this.props.dob}
                                </Typography>
                            </div>
                        </div>
                    </CardContent>
                </div>
                <div sm={6} className={classes.contentDob}>
                    <CardContent className={classes.content}>
                        <Typography variant='subheading' gutterBottom>
                            {strings.ageLabel} <b>{this.props.age}</b>
                        </Typography>
                    </CardContent>
                </div>
                {this.props.dateofvisit && (
                    <div sm={6} className={classes.contentDob}>
                        <CardContent className={classes.content}>
                            <Typography variant='button' gutterBottom>
                                {strings.dateOfVisit}
                                <b> {this.props.dateofvisit} </b>
                            </Typography>
                        </CardContent>
                    </div>
                )}
                {this.props.insurence && (
                    <div sm={6} className={classes.contentDob}>
                        <CardContent className={classes.content}>
                            <Typography variant='button' gutterBottom>
                                {strings.insuranceType}
                                <b> {this.props.insurence} </b>
                            </Typography>
                        </CardContent>
                    </div>
                )}
            </Card>
        );
    }
}

VisitSummaryView.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};
export default withStyles(stylesVisitView, { withTheme: true })(VisitSummaryView);

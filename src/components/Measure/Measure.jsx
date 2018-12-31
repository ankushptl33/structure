import React from 'react';
import classNames from 'classnames';
import { Grid, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Measure.less';

const styles = theme => ({
    measureRow: {
        justifyContent: 'space-between'
    }
});

const Measure = props => {
    const pdfDownload = e => {
        window.open('/static/pdf/template.pdf', '_blank');
    };

    let isnverseMeassage = props.config.nonInverseMeasureText;
    let isInverseArrow = 'arrow-up';
    let isInversedClass = 'measure__up_arrow';
    if (props.measure.isinverse === true) {
        isnverseMeassage = props.config.inverseMeasureText;
        isInverseArrow = 'arrow-down';
    }

    return (
        <Grid container className='measure_wrapper'>
            <Grid item className='measure_description__wrapper-main'>
                <Grid item className='measure_description__wrapper'>
                    {' '}
                    {props.measure.displayname}
                </Grid>
                <Grid item>
                    {props.measure.measuredescription !== null &&
                    props.measure.measuredescription !== undefined ? (
                        <Tooltip title={props.measure.measuredescription}>
                            <FontAwesomeIcon
                                className='icon_measure'
                                icon={['fal', 'exclamation-circle']}
                            />
                        </Tooltip>
                    ) : (
                        <FontAwesomeIcon
                            className='icon_measure'
                            icon={['fal', 'exclamation-circle']}
                        />
                    )}

                    {/* <Tooltip title={props.measure.measuredescription}>
<FontAwesomeIcon
  className="icon_measure"
  icon={['fal', 'exclamation-circle']}
/>
</Tooltip>
 */}

                    <FontAwesomeIcon
                        className='icon_measure'
                        icon={['fal', 'file-pdf']}
                        onClick={pdfDownload}
                    />

                    <Tooltip title={isnverseMeassage}>
                        <FontAwesomeIcon
                            icon={['fal', isInverseArrow]}
                            className={classNames('icon_measure', isInversedClass)}
                        />
                    </Tooltip>
                    {/* <Tooltip title={isnverseMeassage}>
          <FontAwesomeIcon icon={['fal', 'thumbs-up']} className="icon_measure" />
        </Tooltip> */}
                </Grid>
            </Grid>
        </Grid>
    );
};

Measure.defaultProps = {
    config: {
        inverseMeasureText: 'Lower score for this measure is better',
        nonInverseMeasureText: 'Higher score for this measure is better'
    },
    measure: {
        measuredescription: 'lorem ipsum asghrj jasnsam',
        isinverse: false,
        displayname: 'abc'
    }
};

export default withStyles(styles)(Measure);

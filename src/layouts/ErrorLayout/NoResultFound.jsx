import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import NoResultFound from '../../assets/svg/No_result_found.svg';

const NoResultError = props => {
    let msg = props.message
        ? props.message
        : 'Sorry, there is no data that matches the filter criterion.';
    return (
        <Grid container className='no--result_wrapper'>
            <Grid item className='no--result_grid'>
                <Grid item className='no--result_content'>
                    <h2 className='no--result_heading'>No Results Found</h2>
                    <Typography variant='p' className='no--result_message'>
                        {msg}
                    </Typography>
                    {/* <Button variant="contained" className="go--back__link-btn">
            <FontAwesomeIcon
              icon={['fal', 'long-arrow-left']}
              className="go--back__left-arrow"
            />{' '}
            Go Back
          </Button> */}
                </Grid>

                <Grid item className='no--result_img-grid'>
                    <img src={NoResultFound} alt={NoResultFound} className='page-not-found_img' />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NoResultError;

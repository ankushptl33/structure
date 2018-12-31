import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import SomethingWentWrg from '../../assets/svg/Something_went_wrong.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AppError = () => {
    return (
        <Grid container className='page-error_wrapper'>
            <Grid item className='page-error_grid'>
                <Grid item className='page-error_content'>
                    <h2 className='page-error_heading'>Something Went Wrong</h2>
                    <Typography variant='p' className='page-error_message'>
                        We are working on it and we'll fix it as soon as possible.
                    </Typography>
                    <Link to='/' className='go--back__link'>
                        <Button variant='contained' className='go--back__link-btn'>
                            <FontAwesomeIcon
                                icon={['fal', 'long-arrow-left']}
                                className='go--back__left-arrow'
                            />{' '}
                            Go Back
                        </Button>
                    </Link>
                </Grid>

                <Grid item className='page-error_img-grid'>
                    <img
                        src={SomethingWentWrg}
                        alt={SomethingWentWrg}
                        className='page-not-found_img'
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AppError;

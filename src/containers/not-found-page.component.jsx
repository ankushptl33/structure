import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';
import PageNotFound from './../assets/svg/404.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NotFoundPage = () => {
    return (
        <Grid container className='page-error_wrapper'>
            <Grid item className='page-error_grid'>
                <Grid item className='page-error_content'>
                    <h2 className='page-error_heading'>Page Not Found</h2>
                    <Typography variant='p' className='page-error_message'>
                        We can't find the page that you are looking for :(
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
                    <img src={PageNotFound} alt={PageNotFound} className='page-error_img' />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NotFoundPage;

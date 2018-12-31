import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import TemporaryPage from '@/components/TemporaryPage/TemporaryPage';

const DashboardOOS = () => (
    <TemporaryPage
        children={
            <React.Fragment>
                <Grid container className="quality-dashboard--page__wrapper">
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={5}
                        className="page-title__container">
                        <Typography
                            variant="h2"
                            className="fi-subheader__title ">
                            Quality Dashboard
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            Data extraction is in progress. Performance
                            dashboard will be available on 10th Feb 2019.
                        </Typography>
                    </Grid>
                </Grid>
            </React.Fragment>
        }
    />
);

export default DashboardOOS;

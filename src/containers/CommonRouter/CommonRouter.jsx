import React from 'react';
import { Typography } from '@material-ui/core';
import TemporaryPage from '@/components/TemporaryPage/TemporaryPage';

const CommonRouter = () => (
    <TemporaryPage
        children={
            <Typography variant='subtitle1' gutterBottom>
                Data extraction is in progress. Performance dashboard will be available on 10th Feb
                2019.
            </Typography>
        }
    />
);

export default CommonRouter;

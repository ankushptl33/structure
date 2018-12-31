import * as React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const loading = () => (
    <LinearProgress className='loader__linear-progress' style={{ color: '#4caf50' }} />
);
export default loading;

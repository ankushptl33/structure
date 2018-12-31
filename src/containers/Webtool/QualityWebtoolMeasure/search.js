import React from 'react';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const Search = props => {
    const defaultProps = Object.assign({}, defaultObjects, props);
    console.log('defaultProps', defaultProps);

    return (
        <Grid container>
            <Grid item xs={12} sm={8} md={6} lg={4} className='search'>
                <input
                    id={defaultProps.id}
                    type='text'
                    placeholder={defaultProps.placeholder}
                    data-value=''
                    onKeyPress={e => {
                        console.log('onKeyPress', e);
                        if (typeof defaultProps.onKeyPress === 'function') {
                            // if (e.which == 13) {
                            defaultProps.onKeyPress(e);
                            //  }
                        }
                    }}
                    onChange={e => {
                        e.target.setAttribute('data-value', e.target.value);
                        if (typeof defaultProps.onChange === 'function') {
                            defaultProps.onChange(e);
                        }
                    }}
                />
                <label htmlFor={defaultProps.id} />
            </Grid>
        </Grid>
    );
};

const defaultObjects = {
    placeholder: 'Enter search keyword...',
    onChange: undefined,
    onKeyPress: undefined,
    value: undefined,
    id: new Date().getTime()
};

export default Search;

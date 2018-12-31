import React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';

// const divSelect = {
//   minWidth: '250px',
// };

const WebtoolDropdown = props => (
    <FormControl className={props.className}>
        <InputLabel htmlFor='age-native-simple'>{props.title}</InputLabel>
        <Select
            native
            // style={props.style}
            name='provider'
            value={props.value != undefined ? props.value : ''}
            onChange={props.onchange}
        >
            {props.data != null
                ? props.data.map(value => (
                      <option key={value.id} value={value.id}>
                          {value.name}
                      </option>
                  ))
                : []}
        </Select>
    </FormControl>
);
export default WebtoolDropdown;

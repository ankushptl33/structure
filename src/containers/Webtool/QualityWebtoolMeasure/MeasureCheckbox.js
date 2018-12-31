import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class MeasureCheckbox extends React.Component {
    state = {
        checkedA: true,
        checkedB: true,
        checkedF: true
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        return (
            <div>
                <Checkbox
                    // checked={this.state.checkedB}
                    onChange={this.handleChange('checkedB')}
                    value='checkedB'
                    color='primary'
                />
            </div>
        );
    }
}

export default MeasureCheckbox;

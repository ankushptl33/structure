import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { SetMeasureIdSelectionAction } from '@/redux/modules/registryMeasureList';

class ViewDetails extends React.Component {
    handlerViewDetails = (viewDetailsSelection, history) => {
        this.props.SetMeasureIdSelectionAction(viewDetailsSelection);
        setTimeout(() => {
            history.push({
                pathname: '/measuredetails'
            });
        }, 1000);
    };

    render() {
        // const measureno = this.props.rowdata.measure.measure.measureno;
        const viewDetailsSelection = {
            id: this.props.rowdata.measure.measure.measureno,
            rowData: this.props.rowdata
        };
        return (
            <Route
                key={viewDetailsSelection.id}
                render={({ history }) => (
                    <Button
                        key={viewDetailsSelection.id}
                        type='button'
                        onClick={() => {
                            this.handlerViewDetails(viewDetailsSelection, history);
                        }}
                    >
                        View Details
                    </Button>
                )}
            />
        );
    }
}

const mapDispatchToProps = {
    SetMeasureIdSelectionAction
};

export default connect(
    null,
    mapDispatchToProps
)(ViewDetails);

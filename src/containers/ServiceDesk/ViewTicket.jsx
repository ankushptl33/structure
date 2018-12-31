import React from 'react';
import { Route } from 'react-router-dom';
import { Button } from '@material-ui/core';

class ViewTicket extends React.Component {
    handlerViewTicket = (rowData, history) => {
        setTimeout(() => {
            history.push({
                pathname: history.location.pathname + '/TicketDetails',
                state: { selectedRow: rowData }
            });
        }, 1000);
    };

    render() {
        return (
            <Route
                key={this.props.rowdata.id}
                render={({ history }) => (
                    <Button
                        type='button'
                        key={`${this.props.rowdata.id}-${this.props.description}`}
                        onClick={() => {
                            this.handlerViewTicket(this.props.rowdata, history);
                        }}
                    >
                        View Ticket
                    </Button>
                )}
            />
        );
    }
}

// const mapDispatchToProps = {
//     SetMeasureIdSelectionAction
// };

// export default connect(
//     null,
//     mapDispatchToProps
// )(ViewDetails);

export default ViewTicket;

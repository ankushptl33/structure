import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import { lighten } from '@material-ui/core/styles/colorManipulator';
import Chip from '@material-ui/core/Chip';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

// eslint-disable-next-line no-unused-vars
function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

// eslint-disable-next-line no-unused-vars
function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {
            onSelectAllClick,
            order,
            orderBy,
            numSelected,
            rowCount,
            isShowAllRecordsSelected
        } = this.props;
        return (
            <TableHead className='table-head'>
                <TableRow className='table-head-row'>
                    <TableCell padding='checkbox'>
                        {isShowAllRecordsSelected ? (
                            <Checkbox
                                color='primary'
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={numSelected === rowCount}
                                onChange={onSelectAllClick}
                            />
                        ) : (
                            ''
                        )}
                    </TableCell>
                    {this.props.columnDef.map(row => {
                        return (
                            <TableCell
                                className='table-head-cell'
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title=''
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel active={orderBy === row.id}>
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3
    }
});

class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.selectedMeasure, // ["QPP-1","QPP-2","QPP-3","QPP-4","QPP-5","QPP-6"],
            data: this.props.data, // .map(value=>(createData(value.ID,value.MEASURETITLE,value.HIGH,value.OUTCOME) )),
            page: 0,
            rowsPerPage: 10,
            columnDef: this.props.columnDef,
            isShowAllRecordsSelected: this.props.isShowAllRecordsSelected
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ data: nextProps.data });
        }

        if (
            nextProps.selectedMeasure.length > 0 &&
            nextProps.selectedMeasure !== this.state.selected
        ) {
            this.setState({ selected: nextProps.selectedMeasure });
        }

        if (nextProps.isShowAllRecordsSelected !== this.props.isShowAllRecordsSelected) {
            this.setState({
                isShowAllRecordsSelected: nextProps.isShowAllRecordsSelected
            });
        }
    }

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            var selectedID = this.state.data.map(n => n.id);
            this.props.onSelectTableCell(selectedID);
            return;
        } else {
        }
        this.setState({ selected: [] });
        this.props.onSelectTableCell([]);
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        if (newSelected[0] === '') {
            newSelected.splice(0, 1);
        }

        this.setState({ selected: newSelected });
        this.props.onSelectTableCell(newSelected);
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div className={classes.root}>
                <div className='tableWrapper'>
                    <Table className='table' aria-labelledby='tableTitle'>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                            columnDef={this.state.columnDef}
                            isShowAllRecordsSelected={this.state.isShowAllRecordsSelected}
                        />
                        <TableBody className='table-body'>
                            {/* {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                            {data.map(n => {
                                const isSelected = this.isSelected(n.id);
                                var chipMeasureTypeHighpriority;
                                var chipMeasureTypeOutcome = '';
                                if (n.OUTCOME)
                                    chipMeasureTypeOutcome = (
                                        <Chip
                                            label='Outcome'
                                            className='chip  chip_outcome--color'
                                        />
                                    );
                                if (n.HIGH)
                                    chipMeasureTypeHighpriority = (
                                        <Chip
                                            label='High Priority'
                                            className='chip chip_high-priority--color'
                                        />
                                    );

                                return (
                                    <TableRow
                                        className='table-row'
                                        hover
                                        role='checkbox'
                                        aria-checked={
                                            this.state.isShowAllRecordsSelected ? isSelected : false
                                        }
                                        tabIndex={-1}
                                        key={n.id}
                                        selected={
                                            this.state.isShowAllRecordsSelected ? isSelected : false
                                        }
                                    >
                                        <TableCell padding='checkbox'>
                                            {this.state.isShowAllRecordsSelected ? (
                                                <Checkbox
                                                    color='primary'
                                                    checked={isSelected}
                                                    onClick={event => this.handleClick(event, n.id)}
                                                />
                                            ) : (
                                                ''
                                            )}
                                        </TableCell>

                                        <TableCell
                                            className='table-body-cell figw-measure-grid-id'
                                            component='th'
                                            scope='row'
                                            padding='none'
                                        >
                                            {n.ID}
                                        </TableCell>
                                        <TableCell
                                            className='table-body-cell figw-measure-grid-title'
                                            numeric
                                        >
                                            {n.MEASURETITLE}
                                        </TableCell>
                                        <TableCell
                                            className='table-body-cell figw-measure-grid-tag'
                                            numeric
                                        >
                                            {chipMeasureTypeOutcome}
                                            {chipMeasureTypeHighpriority}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 5 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />  */}
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import './BasicTable.less';

const BasicTable = props => {
    const { cols, data, labels } = props.basicTableDataProp;
    let columnValues = null;
    let dataValues = null;
    let cells = null;
    let lableValues = null;
    let dataColumns = [];
    if (cols === null || cols === undefined) {
        columnValues = null;
    } else {
        columnValues = cols.map((colData, i) => {
            return colData.Description != undefined ? (
                <Tooltip title={colData.Description}>
                    <TableCell className='basicTable__table-cell' key={i}>
                        {colData.label}
                    </TableCell>
                </Tooltip>
            ) : (
                <TableCell className='basicTable__table-cell' key={i}>
                    {colData.label}
                </TableCell>
            );
        });
    }

    if (labels === null || labels === undefined) {
        lableValues = null;
    } else {
        lableValues = labels;
    }

    if (data === null || data === undefined) {
        dataValues = null;
    } else {
        if (cols != null || cols != undefined) {
            dataValues = data.map((item, index) => {
                dataColumns = [];
                cells = cols.map((colData, i) => {
                    let ChildComp = item[colData.key];

                    if (colData.link) {
                        let events = {};
                        ChildComp =
                            item[colData.key] == 0 ? (
                                item[colData.key]
                            ) : (
                                <a
                                    key={i}
                                    style={{
                                        color: 'black',
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                    onClick={e => {
                                        colData.onclick(e, item, colData.key);
                                    }}
                                >
                                    {item[colData.key]}
                                </a>
                            );
                    }
                    dataColumns.push(
                        React.createElement(
                            TableCell,
                            {
                                className: 'basicTable__cell',
                                key: i
                            },
                            null,
                            ChildComp
                        )
                    );
                    // return <TableCell key={i}>{item[colData.key]}</TableCell>;
                });
                return (
                    <TableRow className='basicTable__row' key={index}>
                        {dataColumns}
                    </TableRow>
                );
            });
        } else {
            dataValues = data.map(row, key => (
                <TableRow key={key} className='basicTable__row'>
                    {Object.values(row).map(rowValue => (
                        <TableCell className='basicTable__table-cell' key={key}>
                            {rowValue}
                        </TableCell>
                    ))}
                </TableRow>
            ));
        }
    }

    if (dataValues || columnValues || lableValues) {
        return (
            <Grid item xs className='basicTable__main--block'>
                <Table className='basicTable'>
                    <TableHead className='basicTable__head'>
                        <TableRow className='basicTable__row'>{columnValues}</TableRow>
                    </TableHead>
                    <TableBody className='basicTable__body'>{dataValues}</TableBody>
                </Table>
                <Typography constiant='body2'>
                    <span className='basicTable__labels'>{lableValues}</span>
                </Typography>
            </Grid>
        );
    } else {
        return <Paper />;
    }
};

BasicTable.propTypes = {
    basicTableDataProp: PropTypes.object.isRequired
};
export default BasicTable;

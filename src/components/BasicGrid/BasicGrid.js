import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import './BasicGrid.less';
import NoResultFound from '@/layouts/ErrorLayout/NoResultFound';

let headerColumns = [];
let dataColumns = [];
let dataRow = [];
const childComponentProps = [];
const childComponentEvents = [];
const propsString = {};
let columnStyle = {};
let cssClasses = [];

const BasicGrid = props => {
    if (
        (props.data !== undefined || props.data.length > 0) &&
        (props.columnDefs === undefined ||
            props.columnDefs === null ||
            props.columnDefs.length == 0)
    ) {
        return props.config.schemaErrorMessge;
    }

    if (props.data === undefined || props.data === null) {
        return props.config.dataErrorMessage;
    }

    if (props.data.length == 0) {
        return props.config.noRecordsFound;
    }

    headerColumns = [];
    dataColumns = [];
    dataRow = [];

    props.data.map((data, dataIndex) => {
        props.columnDefs.map((column, index) => {
            const key = Object.keys(column);
            const columnDef = column[key];
            let headerName = columnDef.header;
            let type = columnDef.type;
            let component = columnDef.component;
            columnStyle = createStyleObject(columnDef, key);
            let isData = columnDef.data;
            if (isData === undefined) {
                isData = true;
            }

            // header rows
            if (headerColumns.length != props.columnDefs.length) {
                let headerColumn = null;
                // checks
                if (headerName === undefined || headerName === '') {
                    headerName = key;
                }
                headerColumn = headerName; // add component or text in header column
                headerColumns.push(React.createElement(Grid, columnStyle, headerColumn));
            }

            CreateChildComponent(
                column,
                component,
                childComponentProps,
                childComponentEvents,
                data,
                key,
                propsString,
                dataColumns,
                columnStyle,
                isData
            );
        });

        dataRow.push(
            <Grid
                container
                item
                xs={props.config.minColumns}
                key={dataIndex}
                className='tableRow dataTable__row'
            >
                {[...dataColumns]}
            </Grid>
        );

        dataColumns = [];
    });

    return (
        <Grid
            container
            item
            xs={props.config.minColumns}
            className={`${props.config.parentTableClass.join(' ')} table`}
            columns={props.columnDefs.length}
        >
            <Grid
                container
                item
                xs={props.config.minColumns}
                className='tableHead tableRow fig_basic_grid-header'
            >
                {headerColumns}
            </Grid>
            {dataRow}
        </Grid>
    );
};

const CreateDyanamicComponent = (componentName, propsArray, Childrens) => {
    const DyanamicComp = componentName;
    const comp = React.createElement(DyanamicComp, propsArray, [...Childrens]);
    return comp;
};

function createStyleObject(columnDef, key) {
    try {
        let cols = columnDef.cols;
        if (cols === undefined) {
            cols = true;
        }
        const style = columnDef.style;
        cssClasses = columnDef.cssClasses;
        if (cssClasses === undefined) {
            cssClasses = [];
        }
        columnStyle['key'] = key;
        columnStyle['style'] = style;
        const customColumnClass = `fig-${key}`;
        columnStyle['className'] = `tableColumn ${customColumnClass} ${[...cssClasses]}`;
        columnStyle['item'] = true;
        columnStyle['xs'] = cols;
    } catch (err) {
        // console.log(('createstyle', err);
    }
    return columnStyle;
}

function CreateChildComponent(
    column,
    component,
    childComponentProps,
    childComponentEvents,
    data,
    key,
    propsString,
    dataColumns,
    columnStyle,
    isData
) {
    try {
        let childrens = [];
        if (component !== null && component !== undefined) {
            let childComponent = component.component;

            if (childComponent !== null && childComponent !== undefined) {
                propsString = {};
                // if child component has children's
                if (component.childrens !== undefined) {
                    childrens = [...component.childrens];
                }
                // get column component props
                if (component.props !== undefined) {
                    childComponentProps = [...component.props];
                    if (isData) {
                        var columnValue = data[key];
                        // map through props
                        if (
                            childComponentProps[0] !== undefined &&
                            columnValue !== null &&
                            Object.keys(columnValue)[0] !== undefined
                        ) {
                            childComponentProps.map((prop, j) => {
                                propsString[prop] = columnValue[prop];
                            });
                        } else {
                            propsString[key] = columnValue;
                        }
                    }
                }

                if (component.events !== undefined) {
                    childComponentEvents = [...component.events];
                    if (childComponentEvents[0] !== undefined) {
                        childComponentEvents.map((event, j) => {
                            propsString[Object.keys(event)] = e => {
                                event[Object.keys(event)](e, data);
                            };
                        });
                    }
                }

                propsString['rowdata'] = data;
                let dataColumn = null;
                dataColumn = CreateDyanamicComponent(childComponent, propsString, [...childrens]);
                dataColumns.push(React.createElement(Grid, columnStyle, dataColumn));
            } else {
                dataColumns.push(React.createElement(Grid, columnStyle));
            }
        } else {
            if (
                column[key].type === 'logo' ||
                column[key].type === 'image' ||
                column[key].type === 'img'
            ) {
                const img = <img src={data[key]} />;
                dataColumns.push(React.createElement(Grid, columnStyle, img));
            } else {
                dataColumns.push(React.createElement(Grid, columnStyle, data[key]));
            }
        }
    } catch (err) {
        // console.log((err);
    }
}

BasicGrid.propTypes = {
    config: PropTypes.object,
    columnDefs: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
};

const displayText = (e, data) => {
    // console.log(('callback clicked!', JSON.stringify(data));
};
BasicGrid.defaultProps = {
    config: {
        minColumns: 12,
        parentTableClass: ['basic-grid fig_basic_grid-wrapper'],
        dataErrorMessage: 'please provide data property.',
        schemaErrorMessge: 'please provide columnDefs property.',
        noRecordsFound: <NoResultFound />
    },
    columnDefs: [
        {
            logo: {
                type: 'image',
                header: 'Logo'
            }
        },
        {
            favourite: {
                type: 'string',
                header: 'Favoruite',
                cssClasses: ['measure-performance'],
                style: {}
            }
        },
        {
            id: {
                type: 'string',
                header: 'ID',
                cssClasses: ['measure-id'],
                style: {}
            }
        },
        {
            measure: {
                type: 'string',
                header: 'MEASURE',
                cssClasses: ['measure-name'],
                style: {}
            }
        },
        {
            performance: {
                type: 'string',
                header: 'ACHIEVED PERFORMANCE',
                cssClasses: ['measure-performance'],
                style: {}
            }
        },
        {
            measureDetails: {
                header: 'Measure Details',
                type: 'string',
                data: false,
                component: {
                    name: '',
                    props: ['text'],
                    component: null,
                    events: [],
                    childrens: []
                }
            }
        }
    ],
    data: [
        {
            logo: '../../../assets/images/hub.png',
            favourite: 'component',
            id: '232323',
            measure: 'abc',
            performance: 'Measure Performance',
            ankush: 'messi'
        },
        {
            logo: '../../../assets/images/hub.png',
            favourite: 'component',
            id: '102',
            measure: 'xyz',
            performance: 'Measure Performance',
            ankush: 'lio'
        }
    ]
};

export default BasicGrid;

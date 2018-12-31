import React from 'react';
import Moment from 'moment';
import { List, ListItem, Tooltip } from '@material-ui/core';
import './DateTimeLabel.less';

const DateTimeLabel = props => {
    return (
        <List className='datatime-flexContainer'>
            {props.dates.map((obj, i) => {
                let date = Moment(obj.date).format(obj.format.toString());

                date = date.split(' ');
                let dayString = [];
                dayString = date.map((singledate, i) =>
                    singledate.match(/[0-9]+/g) && singledate.match(/[a-zA-Z]+/g)
                        ? React.createElement(
                              'strong',
                              { key: i },
                              ' ' + singledate.match(/[0-9]+/g).toString(),
                              React.createElement(
                                  'sup',
                                  { key: i },
                                  singledate.match(/[a-z]+/g).toString()
                              )
                          )
                        : ' ' + singledate
                );

                return (
                    <ListItem key={i} className='datatime-content'>
                        <Tooltip title={obj.title ? obj.title : ''}>
                            <span className='datatime-label'>{obj.label} :</span>
                        </Tooltip>
                        <span className='datatime-numbers__span'>
                            {obj.date ? (
                                React.createElement('strong', { key: i }, dayString)
                            ) : (
                                <div>no data available.</div>
                            )}
                        </span>
                    </ListItem>
                );
            })}
        </List>
    );
};

DateTimeLabel.defaultProps = {
    dates: [
        {
            label: 'Date',
            format: 'DD MMM YYYY HH:mm A',
            date: '10 10 2001 04:22:22',
            title: 'Last when the practice date was refreshed & measure re-calculated'
        }
    ]
};
export default DateTimeLabel;

// <List className="flexContainerH">
// {
//     props.dates.map((obj , i) => <ListItem key={i}>{obj.label}: <strong><Moment date={obj.date} format={obj.format}/></strong></ListItem>
// )}
// </List>

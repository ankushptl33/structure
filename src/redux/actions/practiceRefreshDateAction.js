import { getPracticesRefreshDate } from '../services/practiceRefreshDateApi';

export const PRACTICE_REFRESH_DATE_REQUEST = 'PRACTICE_REFRESH_DATE_REQUEST';
export const PRACTICE_REFRESH_DATE_RECEIVE = 'PRACTICE_REFRESH_DATE_RECEIVE';
export const PRACTICE_REFRESH_DATE_FAILURE = 'PRACTICE_REFRESH_DATE_FAILURE';
export const PRACTICE_REFRESH_DATE_CLEAR = 'PRACTICE_REFRESH_DATE_CLEAR';

const requestPracticeRefreshdates = () => ({
    type: PRACTICE_REFRESH_DATE_REQUEST
});

const receivePracticeRefreshdates = payload => ({
    type: PRACTICE_REFRESH_DATE_RECEIVE,
    payload
});

const failurePracticeRefreshdates = () => ({
    type: PRACTICE_REFRESH_DATE_FAILURE
});

// export cont

export const getPracticesRefreshDates = param => {
    return dispatch => {
        dispatch(requestPracticeRefreshdates());
        getPracticesRefreshDate(param)
            .then(data => {
                const response = data.data.getPracticeRefreshStatus;
                let dates = [
                    {
                        label: 'Updated On',
                        format: 'MMM Do YYYY HH:mm', // 'Do MMM YYYY HH:mm',
                        date: '',
                        title: 'Last when the practice date was refreshed & measure re-calculated'
                    },
                    {
                        label: 'Start Date',
                        format: 'MMM Do YYYY',
                        date: '',
                        title:
                            'Start date of the duration against which the date was last refreshed'
                    },
                    {
                        label: 'End Date',
                        format: 'MMM Do YYYY',
                        date: '',
                        title: 'End date of the duration against which the date was refreshed'
                    }
                ];
                if (response.length > 0) {
                    dates[0].date =
                        response[0].lastrefreshtime != null
                            ? new Date(Number(response[0].lastrefreshtime))
                            : null;
                    dates[1].date =
                        response[0].startdate != null
                            ? new Date(Number(response[0].startdate))
                            : null;
                    dates[2].date =
                        response[0].enddate != null ? new Date(Number(response[0].enddate)) : null;
                }
                dispatch(receivePracticeRefreshdates(dates));
            })
            .catch(ex => {
                dispatch(failurePracticeRefreshdates());
            });
    };
};

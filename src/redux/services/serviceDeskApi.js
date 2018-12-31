import { getJwt } from '../../utils/jwtUtils';
import APIHelper from '@/helper/apihelper';

const api = new APIHelper();

export const searchticketbycustomerAPI = (issuetype, summary, description) => {
    const requestOption = api.getRequestOption(
        {},
        {},
        api.Actions.View,
        getJwt()
    );

    return api.PegasusAPI(
        'http://192.168.105.169:3434/servicedesk/searchticketbycustomer',
        requestOption,
        response => {
            return response;
        }
    );
};


export const createIssueAPI = (issuetype, summary, description) => {
    const requestOption = api.getRequestOption(
        {
            "fields": {
               "project":
               {
                  "key": "TSD"
               },
               "summary": summary,
               "description": description,
               "issuetype": {
                  "name": issuetype
               }
           }
        },
        {},
        api.Actions.View,
        getJwt()
    );

    return api.PegasusAPI(
        'http://192.168.105.169:3434/servicedesk/createissue',
        requestOption,
        response => {
            return response;
        }
    );
};

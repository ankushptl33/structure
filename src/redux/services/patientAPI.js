import { GET_PATIENTS_BY_ENTITY } from '../../graphql/query';
import APIHelper from '@/helper/apihelper';
import { getJwt } from '../../utils/jwtUtils';

const api = new APIHelper();

export const getAllPatientByEntity = params => {
    const requestOption = api.getRequestOption(
        GET_PATIENTS_BY_ENTITY,
        params,
        api.Actions.View,
        getJwt()
    );
    return api.PegasusAPI(api.Resources.Patient, requestOption, response => {
        return response;
    });
};

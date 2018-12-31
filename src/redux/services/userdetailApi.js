import axios from 'axios';
import { getJwt } from '../../utils/jwtUtils';
import APIHelper from '@/helper/apihelper';

const apiHelper = new APIHelper();

export const userdetailApi = params => {
    return axios.get(apiHelper.Resources.GetUserProfile, {
        headers: {
            Authorization: getJwt(),
            'Content-Type': 'application/json',
            resource: 'defaultread',
            Action: 'view'
        }
    });
};

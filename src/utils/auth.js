/*
 * @file: auth.js
 * @description: Auth functions here
 * @date: 05.07.2018
 * @author: Rajesh Parihar
 * */

import { getJwt } from './jwtUtils';

export const auth = store => {
    return getJwt() || false;
};

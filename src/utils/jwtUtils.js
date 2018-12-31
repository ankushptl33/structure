import Cookies from 'universal-cookie';
import axios from 'axios';
import APIHelper from '@/helper/apihelper';
import { DOMAIN_NAME, MINUS_TOKEN_TIME } from '@/helper/constants';

const apiHelperInstance = new APIHelper();

let flag = 0;
/* ================================================================
 -----------SET COOKIES WITH COOKIE NAME AND MAX-AGE--------------
================================================================ */
export const setJwt = (jwt, duration) => {
    setCookies('interval', jwt, duration * 60 - MINUS_TOKEN_TIME);
    setCookies('jwt-token', jwt, duration * 60);
};

/* ================================================================
 -----------GET COOKIE USING COOKIE NAME-------------------------
================================================================ */
export const getJwt = () => {
    if (!getCookies('interval')) {
        if (getCookies('jwt-token')) renewToken();
    }

    return getCookies('jwt-token');
};

/* ================================================================
 -----------REMOVE COOKIE USING COOKIE NAME-------------------------
================================================================ */
export const removeJwt = () => {
    setCookies('interval', '', 1);
    return setCookies('jwt-token', '', 1);
};

/* ================================================================
 -----------SET COOKIES AS SECURE-------------------------
================================================================ */
export const isSecure = () => {
    return 0;
};

/* ================================================================
 -----------SET COOKIES AS ONLY SPECIFIC DOMAIN-------------------
================================================================ */
export const getdomain = () => {
    return DOMAIN_NAME;
};

/* ================================================================
 -----------SET COOKIES AS ONLY ACCESS FOR SAME SITE--------------
================================================================ */
export const getSameSite = () => {
    return 'Strict';
};

/* ================================================================
 -----------PRIVATE ::::SET COOKIES ------------------------------
================================================================ */
function setCookies(name, value, timespan) {
    const cookies = new Cookies();
    cookies.set(name, value, {
        path: '/',
        secure: isSecure(),
        maxAge: timespan
        // sameSite: getSameSite(),
        // domain: getdomain(),
    });
}

/* ================================================================
 -----------PRIVATE ::::GET COOKIES ------------------------------
================================================================ */
function getCookies(name) {
    const cookies = new Cookies();
    return cookies.get(name);
}

/* ================================================================
 -----------PRIVATE ::::REMOVE COOKIES ------------------------------
================================================================ */
// eslint-disable-next-line no-unused-vars
function removeCookies(name) {
    const cookies = new Cookies();
    return cookies.remove(name);
}

/* ================================================================
 --PRIVATE ::::THIS FUNCTION USED TO RENEW TOKEN-------------------
================================================================ */
function renewToken() {
    if (flag == 0) {
        flag = 1;
        axios
            .get(apiHelperInstance.Resources.RenewToken, {
                headers: {
                    Authorization: getCookies('jwt-token'),
                    'Content-Type': 'application/json',
                    Resource: 'defaultread',
                    Action: 'View'
                }
            })
            .then(data => {
                if (data.data.statusCode == 1) {
                    setJwt(data.data.data.token, data.data.data.duration);
                }
                flag = 1;
            })
            .catch(e => {
                flag = 1;
                window.location.href = '/login';
            });
    }
}

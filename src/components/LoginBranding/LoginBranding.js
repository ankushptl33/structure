import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import './LoginBranding.less';
import MainLogo from '../../assets/svg/figmd_logo.svg';

/* THIS IS LOGIN BRANDING COMPONENT USED TO SHOW LOGO AND OBJECTIVE OR TAGLINE
  ================================================================ */
const LoginBranding = props => {
    const { loginleftProp } = props;
    const { logo, first, tagline } = loginleftProp;
    return (
        <Grid container justify='center' alignItems='center' className='login__wrapper-1'>
            <Grid item className='login__contanier'>
                <Grid item xs={12} className='login__logo'>
                    <img src={MainLogo} alt={logo} />
                </Grid>
                <Grid item className='login__contanier-info'>
                    <Typography variant='h2' className='login--title__h2'>
                        {' '}
                        {tagline}
                    </Typography>
                    <Typography component='h4' className='login--title__h4'>
                        {first}
                    </Typography>
                    {/* {info.map((data, index) => (
            <Typography
              key={index}
              component="h5"
              className="login--title__h5">
              {data}
            </Typography>
          ))} */}
                </Grid>
            </Grid>
        </Grid>
    );
};

/* LOGIN BRANDING DEFAULT PROPS:
  ================================================================ */
LoginBranding.defaultProps = {
    loginleftProp: {
        logo: 'LOGO',
        // path: '../../../assets/media/img/logo/figmd_logo.svg',
        tagline: [' "The goal is to turn data into information, and information into insight" '],
        first: [
            // 'For assistance connect at'
        ]
        //  info: [
        // 'FIGmd-abc@figmd.in',
        // 'Registry-xyz@Registry.com',
        //  'CAMs-def@camfigmd.com',
        //  'FIGmd-abc@figmd.org',
        //  'Registry-abc@Registry.org',
        //  'CAMs-def@camfigmd.com',
        //  ],
    }
};

/* PROP TYPES:
================================================================ */
LoginBranding.propTypes = {
    loginleftProp: PropTypes.shape({
        logo: PropTypes.string,
        tagline: PropTypes.array
    })
};
export default LoginBranding;

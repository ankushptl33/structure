import React from 'react';
import PropTypes from 'prop-types';

/* THIS IS FOOTER COMPOENT
  ================================================================ */
const Footer = props => {
    const { copyright } = props;
    return <div>{copyright}</div>;
};

/* DEFAULT PROPS
  ================================================================ */
Footer.defaultProps = {
    copyright: `© ${new Date().getFullYear()}, FIGmd, Inc. USA. All rights reserved.`
};

Footer.propTypes = {
    copyright: PropTypes.string
};
export default Footer;

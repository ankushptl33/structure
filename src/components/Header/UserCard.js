import React from 'react';
import PropTypes from 'prop-types';
import { userProfileImage } from '../../json/navigation.json';
import { Card, Chip, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import Cookies from 'universal-cookie';

const UserCard = props => {
    const { visibility } = props.userInfo;

    const logoutHandler = e => {
        const cookies = new Cookies();
        cookies.remove('jwt-token');
    };

    return (
        <Card className='tooltip-card'>
            <List component='nav' className='usercard-group'>
                <ListItem alignItems='flex-start' className='usercard-group-detail'>
                    {/* <ListItemAvatar> */}
                    <img className='usercard-image' alt='' src={props.userInfo.iconUrl} />
                    {/* </ListItemAvatar> */}
                    <ListItemText
                        primary={props.userInfo.userName}
                        secondary={
                            <React.Fragment>
                                <Typography component='span' color='textPrimary'>
                                    {props.userInfo.email}
                                </Typography>
                                <Typography component='span' color='textPrimary'>
                                    {props.userInfo.userRole}
                                </Typography>
                                {/* <Typography className="profile-edit-btn"> */}
                                {visibility.editProfile ? (
                                    <Chip
                                        label='Edit Profile'
                                        className='edit-btn'
                                        onClick={props.userInfo.onClick}
                                        clickable
                                    />
                                ) : null}
                                {/* </Typography> */}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
            <Divider />
            <List component='nav' className='profile-logout-btn'>
                <ListItemLink className='logout-btn' onClick={event => props.onLogoutClick()}>
                    <ListItemText primary='Logout' />
                </ListItemLink>
            </List>
        </Card>
    );
};

const ListItemLink = props => {
    return <ListItem button {...props} />;
};

UserCard.propTypes = {
    userInfo: PropTypes.object.isRequired
};

const EditProfile = () => {
    // console.log(('You clicked the edit profile.');
};

UserCard.defaultProps = {
    userInfo: {
        userName: 'John Doe',
        email: 'john_doe@xyz.com',
        userRole: 'Registry Admin',
        iconUrl: userProfileImage.iconUrl,
        onClick: EditProfile,
        visibility: {
            editProfile: false
        }
    },
    onLogoutClick: e => {
        //   // console.log(("usercard");
    }
};

export default UserCard;

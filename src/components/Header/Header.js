import React from 'react';
import { ClickAwayListener, Tooltip } from '@material-ui/core';
import UserCard from './UserCard';
import './Header.less';
import { withStyles } from '@material-ui/core/styles';
import { userProfileImage } from '../../json/navigation.json';

const styles = theme => ({
    lightTooltip: {
        background: theme.palette.common.white,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        fontSize: 11
    }
});

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    handleTooltipClose = () => {
        this.setState({ open: false });
    };

    handleTooltipOpen = () => {
        this.setState({ open: true });
    };

    render() {
        const { classes } = this.props;

        const User = (
            <UserCard
                onLogoutClick={e => this.props.onLogoutClick()}
                className='usercardicon-tooltip'
                userInfo={this.props.UserCard}
            />
        );

        const popup = this.props.data.icons.map((icon, index) => {
            return (
                <ClickAwayListener onClickAway={this.handleTooltipClose} key={index}>
                    <Tooltip
                        // PopperProps={{
                        //   disablePortal: true,
                        // }}
                        classes={{ tooltip: classes.lightTooltip }}
                        onClose={this.handleTooltipClose}
                        open={this.state.open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={User}
                        key={index}
                    >
                        <i className={icon.className} onClick={this.handleTooltipOpen}>
                            {icon.name}
                        </i>
                    </Tooltip>
                </ClickAwayListener>
            );
        });

        return <div>{popup}</div>;
    }
}

Header.defaultProps = {
    data: {
        icons: [
            {
                color: 'grey',
                name: 'account_circle',
                backgroundColor: 'none',
                className: 'material-icons profile-material-icons',
                styleprops: {
                    ListComponent: 'nav'
                }
            }
        ]
    },
    UserCard: {
        userName: 'John Doe',
        email: 'john_doe@xyz.com',
        userRole: 'Registry Admin',
        iconUrl: userProfileImage.iconUrl,
        onClick: e => {},
        visibility: {
            editProfile: false
        }
    },
    onLogoutClick: e => {
        // // console.log(("header")
    }
};

export default withStyles(styles)(Header);

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Drawer, Grid, Hidden, IconButton, Toolbar } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Userprofile from '../../components/Header/Header';
import APIHelper from '@/helper/apihelper';
import MasterNavigationMenu from '@/components/MasterNavigationMenu';
import { getJwt, removeJwt } from '@/utils/jwtUtils';
import NavigationMenu from '@/json/navigation.json';
import { userProfileImage } from '../../json/navigation.json';

import { userProfileAction, updateUserProfileTypeAction } from '@/redux/modules/userProfile';
import { resetReduxState } from '@/redux/modules/userModule';

const apiHelperInstance = new APIHelper();

const MainLogo = require('../../assets/media/img/logo/figmd_logo.svg');

const drawerWidth = 'auto';

const styles = theme => ({
    root: {
        display: 'flex'
    },
    list: {
        width: 240
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    hide: {
        display: 'none'
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },

    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    }
});

class DashboardLayout extends React.Component {
    // state = {
    //   mobileOpen: false,
    // };

    constructor(props) {
        super(props);
        /* SET INITIAL STATE:
    ===================================== */
        this.state = {
            activeIcon: 'selected-main__nav',
            open: false,
            selectedMenuIndex: 0,
            menu: {}
        };
    }

    /* GET ALL SIDE MENU AND LOAD FIRST MENU
  ===================================== */
    componentDidMount() {
        axios
            .post(
                apiHelperInstance.Resources.GetMenuDetails,
                { ismenu: 'true' },
                {
                    headers: {
                        Authorization: getJwt(),
                        'Content-Type': 'application/json',
                        resource: 'defaultread',
                        action: 'view'
                    }
                }
            )
            .then(data => {
                if (data.data.statusCode === 1) {
                    this.setState({ menu: data.data.data.menudetails });
                    if (data.data.data.menudetails)
                        this.props.history.push(data.data.data.menudetails[0].router);
                }
            })
            .catch(() => this.props.history.push('/login'));
            this.props.userProfileAction();
    }

    /* HANDLE LOGOUT BUTTON CLICK. REMOVED COOKIES AND REDIRECT TO LOGINPAGE
  ================================================================ */
    handleLogoutClick = () => {
        this.props.resetReduxState();
        const jwt = getJwt();
        removeJwt();
        this.props.history.push('/');
        if (jwt) {
            axios
                .get(apiHelperInstance.Resources.TokenDeactivate, {
                    headers: {
                        authorization: jwt,
                        'Content-Type': 'application/json',
                        Action: 'delete'
                    }
                })
                .then(res => {
                    if (res.data.data.deactivated) {
                        removeJwt();
                        this.props.history.push('/');
                    }
                })
                .catch(() => {
                    removeJwt();
                    this.props.history.push('/');
                });
        } else {
            this.props.history.push('/');
        }
    };

    activeMenu = () => {
        this.setState({ activeIcon: 'selected-main__nav' });
    };

    // handleDrawerToggle = () => {
    //   this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    // };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    /* HANDLE SIDE MENU SELECTION. REDIRECT PAGE TO ACTIVE MENU
  ================================================================ */
    handleActiveInactiveMenu = (index, RoutePath) => {
        this.setState({ selectedMenuIndex: index });
        this.props.history.push(RoutePath);
    };
    render() {
        const { classes, theme } = this.props;
        const userProfileDetais = {
            userName:
                this.props.UserProfileDetails.firstname +
                ' ' +
                this.props.UserProfileDetails.lastname,
            email: this.props.UserProfileDetails.emailaddress,
            userRole: this.props.UserProfileDetails.roles,
            iconUrl: userProfileImage.iconUrl,
            onClick: function onClick(e) {
                // console.log(('userprofile=>', e);
            },
            visibility: {
                editProfile: false
            }
        };

        return (
            <div className={classes.root + ' page-header__wrapper'}>
                <CssBaseline />

                <AppBar
                    position='fixed'
                    className={
                        classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.open
                        }) + ' page-header'
                    }
                >
                    <Toolbar disableGutters={!this.state.open} className='page-header__toolbar'>
                        <Grid
                            item
                            className='fi-container fi-container--fluid fi-container--full-height'
                        >
                            <Grid item className='fi-stack fi-stack--ver fi-stack--desktop'>
                                <div className='fi-stack__item fi-brand '>
                                    <div className='fi-stack fi-stack--ver fi-stack--general'>
                                        <Grid className='fi-stack__item fi-stack__item--middle fi-hamburger-container'>
                                            <IconButton
                                                color='inherit'
                                                aria-label='Open drawer'
                                                onClick={this.handleDrawerOpen}
                                                className={classNames(classes.menuButton, {
                                                    [classes.hide]: this.state.open
                                                })}
                                            >
                                                <MenuIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid className='fi-stack__item fi-stack__item--middle fi-brand__logo'>
                                            <Link to='/' className='fi-brand__logo-wrapper'>
                                                <img src={MainLogo} alt='Logo' />
                                            </Link>
                                        </Grid>

                                        <Grid
                                            item
                                            className='fi-stack__item fi-stack__item--middle fi-brand__tools'
                                        >
                                            <Userprofile
                                                UserCard={userProfileDetais}
                                                onLogoutClick={() => this.handleLogoutClick()}
                                            />
                                        </Grid>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Hidden mdUp implementation='css'>
                    <Drawer
                        variant='temporary'
                        ModalProps={{ onBackdropClick: this.handleDrawerClose }}
                        className={classNames(classes.drawer, {
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open
                        })}
                        classes={{
                            paper: classNames({
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open
                            })
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {theme.direction === 'rtl' ? (
                                    <ChevronRightIcon />
                                ) : (
                                    <ChevronLeftIcon />
                                )}
                            </IconButton>
                        </div>

                        {/* <List>
            {menu.map(({ MenuName, Icon, RoutePath }, index) => (
              <Link to={RoutePath}>
                <ListItem button key={MenuName}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={MenuName} />
                </ListItem>
              </Link>
            ))}
          </List> */}
                        <Grid container onClick={this.handleDrawerClose} className={classes.list}>
                            <Grid item xs={12}>
                                <MasterNavigationMenu
                                    menu={this.state.menu}
                                    {...this.state}
                                    sideNavigation={NavigationMenu.sideNavigation}
                                    activeMenu={this.activeMenu}
                                    selectedMenuIndex={this.state.selectedMenuIndex}
                                    onListItemClick={(e, index, RoutePath) => {
                                        this.handleActiveInactiveMenu(index, RoutePath);
                                        this.activeMenu(e, index, RoutePath);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation='css' className='fi-aside-left--fixed'>
                    <Drawer
                        variant='permanent'
                        className={
                            'fi-aside-left ' +
                            classNames(classes.drawer, {
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open
                            })
                        }
                        classes={{
                            paper: classNames({
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open
                            })
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {theme.direction === 'rtl' ? (
                                    <ChevronRightIcon />
                                ) : (
                                    <ChevronLeftIcon />
                                )}
                            </IconButton>
                        </div>
                        {/* <List>
              {menu.map(({ MenuName, Icon, RoutePath }, index) => (
                <ListItem
                  button
                  selected={this.state.selectedMenuIndex === index}
                  key={MenuName}
                  onClick={(event) => { this.onListItemClick(event, index) }}
                >
                  <ListItemIcon >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={MenuName} />
                </ListItem>
              ))}
            </List> */}
                        <Grid container onClick={this.handleDrawerClose} className={classes.list}>
                            <Grid item xs={12}>
                                <MasterNavigationMenu
                                    menu={this.state.menu}
                                    {...this.state}
                                    sideNavigation={NavigationMenu.sideNavigation}
                                    activeMenu={this.activeMenu}
                                    selectedMenuIndex={this.state.selectedMenuIndex}
                                    onListItemClick={(e, index, RoutePath) => {
                                        this.handleActiveInactiveMenu(index, RoutePath);
                                        this.activeMenu(e, index, RoutePath);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Drawer>
                </Hidden>
                <main
                    className={
                        classes.content +
                        ' fi-container fi-container--fluid fi-container--full-height'
                    }
                >
                    <div
                        className={
                            classes.toolbar +
                            ' fi-stack fi-stack--ver fi-stack--desktop fi-stack--desktop--toolbar'
                        }
                    />
                    {this.props.children}
                </main>
            </div>
        );
    }
}

/* DEFAULT PROPS
  ================================================================ */
DashboardLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};


const mapStateToProps = state => {
    return {
        UserProfileDetails: state.userProfile.UserDataList,
        IsFailure: state.userProfile.isFailure,
        IsLoading: state.userProfile.isLoading
    };
};

const mapDispatchToProps = dispatch => ({
    
    updateUserProfileTypeAction,
    userProfileAction: bindActionCreators(userProfileAction, dispatch),
    resetReduxState: bindActionCreators(resetReduxState, dispatch)
});

export default withRouter(
    withStyles(styles, { withTheme: true })(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(DashboardLayout)
    )
);

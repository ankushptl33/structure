import React from 'react';
import { NavLink } from 'react-router-dom';
// @material-ui/core components
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// core components
// import HeaderLinks from "../Header/HeaderLinks.jsx";
const Sidebar = ({ ...props }) => {
    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName) {
        return props.location.pathname.indexOf(routeName) > -1;
    }
    const { routes } = props;
    const links = (
        <List>
            {routes.map((prop, key) => {
                if (prop.redirect) return null;
                return (
                    <NavLink to={prop.path} activeClassName='active' key={key}>
                        <ListItem button>
                            <ListItemIcon>
                                <prop.icon />
                            </ListItemIcon>
                            <ListItemText primary={prop.sidebarName} disableTypography={true} />
                        </ListItem>
                    </NavLink>
                );
            })}
        </List>
    );
    const brand = (
        <div>
            <a href='#' />
        </div>
    );
    return (
        <div>
            <Hidden mdUp>
                <Drawer
                    variant='temporary'
                    anchor='right'
                    open={props.open}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                >
                    {brand}
                    <div>
                        {/* <HeaderLinks /> */}
                        {links}
                    </div>
                </Drawer>
            </Hidden>
            <Hidden smDown>
                <Drawer anchor='left' variant='permanent' open>
                    {brand}
                    <div>{links}</div>
                </Drawer>
            </Hidden>
        </div>
    );
};

export default Sidebar;

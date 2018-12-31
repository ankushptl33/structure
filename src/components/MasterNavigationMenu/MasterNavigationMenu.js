import React from 'react';
import { List, ListItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '@material-ui/core/Tooltip';

const styles = () => ({
    selected: {
        backgroundColor: 'rgba(204, 224, 248, 1)',
        color: 'rgba(65, 148, 242, 1)'
    }
});
/* THIS IS SIDE MENU COMPONENT:
  ================================================================ */
const MasterNavigationMenu = props => {
    const { classes, menu } = props;
    return (
        <div className='main-navigation__container'>
            <List className='main-navigation__ul'>
                {menu.length
                    ? menu.map((menuObj, index) => (
                          <ListItem
                              className={props.selectedMenuIndex === index ? props.activeIcon : ' '}
                              button
                              selected={props.selectedMenuIndex === index}
                              classes={{ selected: classes.selected }}
                              key={menuObj.resource}
                              onClick={() => {
                                  props.onListItemClick('', index, menuObj.router);
                              }}
                          >
                              <ListItemIcon className='main-nav--icon__wrapper'>
                              <Tooltip title={menuObj.resource} placement='right'>
                                      <FontAwesomeIcon icon={['fal', menuObj.class]} />
                                  </Tooltip>
                              </ListItemIcon>
                              <ListItemText primary={menuObj.resource} />
                          </ListItem>
                      ))
                    : null}
            </List>
        </div>
    );
};

/* PROP TYPES OF SUBMENUS:
================================================================ */
const Submenus = {
    resource: PropTypes.string,
    router: PropTypes.string,
    class: PropTypes.string,
    id: PropTypes.number,
    listorder: PropTypes.number
};

/* PROP TYPES OF MAIN MENUES:
================================================================ */
const MasterNavigationMenuPropTypes = {
    resource: PropTypes.string,
    router: PropTypes.string,
    class: PropTypes.string,
    id: PropTypes.number,
    listorder: PropTypes.number,
    submenus: PropTypes.arrayOf(PropTypes.shape(Submenus))
};

/* PROP TYPES:
================================================================ */
MasterNavigationMenu.propTypes = {
    menu: PropTypes.oneOfType([
        PropTypes.objectOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.shape(MasterNavigationMenuPropTypes))
    ]),
    selectedMenuIndex: PropTypes.number,
    onListItemClick: PropTypes.func,
    classes: PropTypes.shape({
        selected: PropTypes.string
    }),
    activeIcon: PropTypes.string
};

export default withStyles(styles)(MasterNavigationMenu);

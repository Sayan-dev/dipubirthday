import React from 'react';
import PropTypes from 'prop-types';

import NavMenu from '../../commons/Menu/NavMenu';

import dummyMenu from '../../../assets/json/dummyMenu';

const SidebarMenu = props => {
    return (
        <NavMenu menuList={dummyMenu.menus} />
    );
};

SidebarMenu.propTypes = {

};

export default SidebarMenu;
import React, { useContext } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import BeerContext from '../context/BeerContext';

const TopBarComponent = () => {
  const { toggleSideBar, setToggleSideBar } = useContext(BeerContext);
  const handleItemClick = () => setToggleSideBar(!toggleSideBar);

  return (
    <Menu>
      <Menu.Item
        name="topHamburguer"
        data-testid="top-hamburguer"
        onClick={ handleItemClick }
      >
        <Icon name="bars" />
      </Menu.Item>
      <Menu.Item header data-testid="top-title">TryBeer</Menu.Item>
    </Menu>
  );
};

export default TopBarComponent;

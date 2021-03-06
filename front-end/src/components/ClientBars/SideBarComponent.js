import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react';
import BeerContext from '../../context/BeerContext';

const ClientSideBar = ({ Component }) => {
  const history = useHistory();
  const { toggleSideBar, setToggleSideBar } = useContext(BeerContext);

  return (
    <Grid columns={ 1 }>
      <Grid.Column>
        <Sidebar.Pushable as={ Segment }>
          <Sidebar
            as={ Menu }
            animation="overlay"
            icon="labeled"
            inverted
            vertical
            visible={ toggleSideBar }
            width="thin"
            className="side-menu-container"

          >
            <Menu.Item
              as="a"
              data-testid="side-menu-item-products"
              onClick={ () => {
                setToggleSideBar(!toggleSideBar);
                history.push('/products');
              } }
            >
              Produtos
            </Menu.Item>
            <Menu.Item
              as="a"
              data-testid="side-menu-item-my-orders"
              onClick={ () => {
                setToggleSideBar(!toggleSideBar);
                history.push('/orders');
              } }
            >
              Meus Pedidos
            </Menu.Item>
            <Menu.Item
              as="a"
              data-testid="side-menu-item-my-profile"
              onClick={ () => {
                setToggleSideBar(!toggleSideBar);
                history.push('/profile');
              } }
            >
              Meu Perfil
            </Menu.Item>
            <Menu.Item
              as="a"
              data-testid="side-menu-item-logout"
              onClick={ () => {
                localStorage.clear();
                setToggleSideBar(!toggleSideBar);
                history.push('/');
              } }
            >
              Sair
            </Menu.Item>
          </Sidebar>
          <Component />
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  );
};

ClientSideBar.propTypes = {
  Component: PropTypes.func.isRequired,
};

export default ClientSideBar;

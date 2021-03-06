import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';

import TopBarComponent from '../components/ClientBars/TopBarComponent';
import SideBarComponent from '../components/ClientBars/SideBarComponent';
import ProfileComponent from '../components/ClientProfile/ProfileComponent';

function Profile() {
  return (
    <Grid textAlign="center" style={ { height: '100vh' } } verticalAlign="middle">
      <Grid.Column style={ { maxWidth: 500 } }>
        <TopBarComponent>Meu perfil</TopBarComponent>
        <SideBarComponent Component={ ProfileComponent } />
      </Grid.Column>
    </Grid>
  );
}

export default Profile;

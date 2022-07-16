// in src/admin/App.jsx
import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { UsuarioList, UsuarioShow, UsuarioCreate, UsuarioEdit } from './Usuarios';
import { ClienteList, ClienteShow, ClienteCreate, ClienteEdit } from './Clientes';

const dataProvider = jsonServerProvider('http://localhost:4000');

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="usuarios" list={UsuarioList} edit={UsuarioEdit} show={UsuarioShow} create={UsuarioCreate} />
    <Resource name="clientes" list={ClienteList} edit={ClienteEdit} show={ClienteShow} create={ClienteCreate} />
  </Admin>
);

export default App;


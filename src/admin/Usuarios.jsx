import * as React from "react";
import { 
  List, Show, Create, Edit, 
  SimpleShowLayout, SimpleForm, 
  Datagrid,
  TextInput, TextField, DateInput, DateField 
} from 'react-admin';

export const UsuarioList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="codigo" />
            <TextField source="nombre" />
            <DateField label="Creado" source="created_at" />
            <DateField label="Actualizado" source="updated_at" />
        </Datagrid>
    </List>
);

export const UsuarioShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="codigo" />
            <TextField source="nombre" />
            <DateField label="Creado" source="created_at" />
            <DateField label="Actualizado" source="updated_at" />
        </SimpleShowLayout>
    </Show>
);

export const UsuarioCreate = props => (
      <Create {...props}>
          <SimpleForm>
            <TextInput source="codigo" />
            <TextInput source="nombre" />
          </SimpleForm>
      </Create>
);

export const UsuarioEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="codigo" />
            <TextInput source="nombre" />
        </SimpleForm>
    </Edit>
);

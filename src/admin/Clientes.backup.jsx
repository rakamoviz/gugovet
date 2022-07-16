import * as React from "react";
import Button from '@mui/material/Button';
import { 
  List, Show, Create, Edit, 
  SimpleShowLayout, SimpleForm, 
  Datagrid, TopToolbar, 
  TextField, DateField, ReferenceField, 
  TextInput, DateInput, ReferenceInput, SelectInput,
  useRecordContext, useGetList,
} from 'react-admin';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const FormDialog = ({ open, handleClose }) => {
  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <MyCustomList />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
  )
}

const MemoizedFormDialog = React.memo(FormDialog)

const MyCustomList = (props) => {
  const sort = { field: 'nombre', order: 'ASC' };
  const {data, total, isLoading} = useGetList(
    'usuarios',
    { pagination: { page: 1, perPage: 10 }, sort: sort }
  );

  console.log(data, total, isLoading)
  return <span>XXXXXX</span>
}

function customAction(e) {
    e.preventDefault();
    console.log('You clicked submit.');
}

const ClienteCreateActions = () => (
    <TopToolbar>
        {/* Add your custom actions */}
        <Button variant="contained" onClick={customAction}>Custom Action</Button>
    </TopToolbar>
);

export const ClienteList = props => {
  console.log("props", props)
  return (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="codigo" />
            <TextField source="nombre" />
            <ReferenceField label="Usuario" source="id_usuario" reference="usuarios">
                <TextField source="nombre" />
            </ReferenceField>
            <DateField label="Creado" source="created_at" />
            <DateField label="Actualizado" source="updated_at" />
        </Datagrid>
    </List>
  )
}

export const ClienteShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="codigo" />
            <TextField source="nombre" />
            <DateField label="Creado" source="created_at" />
            <DateField label="Actualizado" source="updated_at" />
        </SimpleShowLayout>
    </Show>
);

const UsuarioField = () => {
    const record = useRecordContext();
    
    if (!record) return null;
    return <span>{record.nombre} ({record.codigo})</span>;
};

const usuarioChoiceRenderer = choice => `${choice.nombre} (${choice.codigo})`;

export const ClienteCreate = props => {
  const [formDialogOpen, setFormDialogOpen] = React.useState(false);


  const handleClickOpenFormDialog = () => {
    setFormDialogOpen(true);
  };

  const handleCloseFormDialog = () => {
    setFormDialogOpen(false);
  };

  return (
      <Create {...props} actions={<ClienteCreateActions />}>
          <SimpleForm>
            <TextInput source="codigo" />
            <TextInput source="nombre" />
            <Button variant="outlined" onClick={handleClickOpenFormDialog}>
              Seleciona usuario 
            </Button>
            <MemoizedFormDialog open={formDialogOpen} handleClose={handleCloseFormDialog} />
          </SimpleForm>
      </Create>
  )
};

export const ClienteEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="codigo" />
            <TextInput source="nombre" />
            <ReferenceInput source="id_usuario" reference="usuarios">
              <SelectInput label="Usuario" optionText={<UsuarioField />} />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

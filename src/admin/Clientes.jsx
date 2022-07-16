import * as React from "react";
import { DevTool } from '@hookform/devtools';
import Button from '@mui/material/Button';
import { 
  List, Show, Create, Edit, 
  SimpleShowLayout, SimpleForm, 
  Datagrid, DatagridBody, TopToolbar, 
  TextField, DateField, ReferenceField, 
  TextInput, DateInput, ReferenceInput, SelectInput,
  useRecordContext, useGetList,
  RecordContextProvider,
} from 'react-admin';
import { TableCell, TableRow, Checkbox } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const FormDialog = ({ opened, handleClose, ...props }) => {
  console.log("propsssss is ", props)
  return (
      <Dialog open={opened} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <List {...props} hasCreate={false} exporter={false} resource="usuarios">
            <MyDatagrid bulkActionButtons={false}>
              <TextField source="codigo" />
              <TextField source="nombre" />
              <DateField label="Creado" source="created_at" />
              <DateField label="Actualizado" source="updated_at" />
            </MyDatagrid>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
  )
}

const MemoizedFormDialog = React.memo(FormDialog)

export const MyDatagridContext = React.createContext({
  source: '',
  handleClose: () => {},
  usuario: {current: {}},
});

const MyDatagridRow = ({ record, id, onToggleItem, children, selected, selectable }) => {
  const { setValue } = useFormContext();

  return (
    <MyDatagridContext.Consumer>
      {({source, handleClose, usuario}) => {
      
        console.log("HAHAJAJAJAHA AH", source, handleClose)
        const selectUsuario = (e) => {
          e.preventDefault()
          usuario.current = record
          setValue(source, record.id)
          console.log("fuck", record.id, handleClose)
          handleClose(e)
        }
      
        return (
          <RecordContextProvider value={record}>
              <TableRow onClick={selectUsuario}>
                  {React.Children.map(children, field => (
                      <TableCell key={`${id}-${field.props.source}`}>
                          {field}
                      </TableCell>
                  ))}
              </TableRow>
          </RecordContextProvider>
        )
      }}
    </MyDatagridContext.Consumer>
  )
};

const MyDatagridBody = props => <DatagridBody {...props} row={<MyDatagridRow />} />;
const MyDatagrid = props => <Datagrid {...props} body={<MyDatagridBody />} />;


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

const ClearCountry = () => {
    const { setValue } = useFormContext();

    const handleClick = (e) => {
      e.preventDefault()
        setValue('codigo', 'edan');
    };

    return <button onClick={handleClick}>Clear country</button>
}

export const ClienteCreate = props => {
  const [formDialogOpened, setFormDialogOpened] = React.useState(false);
  const usuarioRef = React.useRef({})

  const handleClickOpenFormDialog = () => {
    setFormDialogOpened(true);
  };

  const handleCloseFormDialog = () => {
    setFormDialogOpened(false);
  };

  return (
      <Create {...props} actions={<ClienteCreateActions />}>
          <SimpleForm>
            <span>{usuarioRef.current.nombre}</span>
            <TextInput source="codigo" />
            <TextInput source="nombre" />
            <ClearCountry />
            <Button onClick={handleClickOpenFormDialog}>Dia.lo.gue</Button>
            <MyDatagridContext.Provider value={{handleClose: handleCloseFormDialog, source: "id_usuario", usuario: usuarioRef}}>
              <MemoizedFormDialog opened={formDialogOpened} />
            </MyDatagridContext.Provider>
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

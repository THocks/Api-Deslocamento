import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { api } from '@/api/Api';
import { useFetch } from '@/hooks/useSWR';
function PageHeader() {
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({
    kmInicial: '',
    inicioDeslocamento: '',
    checkList: '',
    motivo: '',
    observacao: '',
    idCondutor: '',
    idVeiculo: '',
    idCliente: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormValues({
      kmInicial: '',
      inicioDeslocamento: '',
      checkList: '',
      motivo: '',
      observacao: '',
      idCondutor: '',
      idVeiculo: '',
      idCliente: ''
    });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const isFormValid = Object.values(formValues).every(
        (value) => value !== ''
      );
      if (!isFormValid) {
        toast.error('Por favor, preencha todos os campos.', {
          duration: 3000,
          icon: '🚨 '
        });
        return;
      }
      const response = await api.post(
        '/Deslocamento/IniciarDeslocamento',
        formValues
      );
      console.log('Resposta da API:', response.data);
      mutate();
      resetForm();
      handleCloseModal();
      toast.success(
        'Deslocamento criado com sucesso confira novamente a lista.',
        {
          duration: 3000,
          icon: '🚀'
        }
      );
    } catch (error) {
      console.log('Erro ao enviar a solicitação:', error);
      toast.error(
        'Erro ao processar sua solicitação deslocamento não iniciado.',
        {
          duration: 3000,
          icon: '🚨 '
        }
      );
    }
  };

  const { mutate } = useFetch(
    'https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento'
  );

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Lista deslocamentos cadastrados no sistema
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={handleOpenModal}
          >
            Iniciar deslocamento
          </Button>
        </Grid>
      </Grid>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Adicionar Cliente</DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={14} md={6} marginTop={3}>
                <TextField
                  name="kmInicial"
                  label="KM INICIAL"
                  value={formValues.kmInicial}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={6} marginTop={3}>
                <TextField
                  name="inicioDeslocamento"
                  label="INICIO DESL"
                  value={formValues.inicioDeslocamento}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3}>
                <TextField
                  name="checkList"
                  label="CHECK LIST"
                  value={formValues.checkList}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3}>
                <TextField
                  name="motivo"
                  label="MOTIVO"
                  value={formValues.motivo}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3}>
                <TextField
                  name="observacao"
                  label="Observação"
                  value={formValues.observacao}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3}>
                <TextField
                  name="idCondutor"
                  label="ID CONDUTOR"
                  value={formValues.idCondutor}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3}>
                <TextField
                  name="idVeiculo"
                  label="ID VEICULO"
                  value={formValues.idVeiculo}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3}>
                <TextField
                  name="idCliente"
                  label="ID CLIENTE"
                  value={formValues.idCliente}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default PageHeader;

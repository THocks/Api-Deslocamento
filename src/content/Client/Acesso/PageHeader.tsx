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
    numeroDocumento: '',
    tipoDocumento: '',
    nome: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: ''
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
      numeroDocumento: '',
      tipoDocumento: '',
      nome: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: ''
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
      const response = await api.post('/Cliente', formValues);
      console.log('Resposta da API:', response.data);
      mutate();
      resetForm();
      handleCloseModal();
      toast.success('Usuário criado com sucesso confira novamente a lista.', {
        duration: 3000,
        icon: '🚀'
      });
    } catch (error) {
      console.log('Erro ao enviar a solicitação:', error);
      toast.error(
        'Erro ao processar sua solicitação usuário não pode ser criado.',
        {
          duration: 3000,
          icon: '🚨 '
        }
      );
    }
  };

  const { mutate } = useFetch(
    'https://api-deslocamento.herokuapp.com/api/v1/Cliente'
  );

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Lista de clientes cadastrados no sistema
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={handleOpenModal}
          >
            Adicionar novo cliente
          </Button>
        </Grid>
      </Grid>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Adicionar Cliente</DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} marginTop={3}>
                <TextField
                  name="numeroDocumento"
                  label="Número do Documento"
                  value={formValues.numeroDocumento}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3} marginTop={3}>
                <TextField
                  name="tipoDocumento"
                  label="Tipo do Documento"
                  value={formValues.tipoDocumento}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={6} marginTop={3}>
                <TextField
                  name="nome"
                  label="Nome"
                  value={formValues.nome}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3}>
                <TextField
                  name="logradouro"
                  label="Logradouro"
                  value={formValues.logradouro}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3}>
                <TextField
                  name="numero"
                  label="Número"
                  value={formValues.numero}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3}>
                <TextField
                  name="uf"
                  label="UF"
                  value={formValues.uf}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={14} md={6}>
                <TextField
                  name="bairro"
                  label="Bairro"
                  value={formValues.bairro}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={6}>
                <TextField
                  name="cidade"
                  label="Cidade"
                  value={formValues.cidade}
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

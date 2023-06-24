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
    categoriaHabilitacao: '',
    vencimentoHabilitacao: '',
    nome: '',
    numeroHabilitacao: ''
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
      categoriaHabilitacao: '',
      vencimentoHabilitacao: '',
      nome: '',
      numeroHabilitacao: ''
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
      const response = await api.post('/Condutor', formValues);
      console.log('Resposta da API:', response.data);
      mutate();
      resetForm();
      handleCloseModal();
      toast.success('Condutor criado com sucesso confira novamente a lista.', {
        duration: 3000,
        icon: '🚀'
      });
    } catch (error) {
      console.log('Erro ao enviar a solicitação:', error);
      toast.error(
        'Erro ao processar sua solicitação Condutor não pode ser criado.',
        {
          duration: 3000,
          icon: '🚨 '
        }
      );
    }
  };

  const { mutate } = useFetch(
    'https://api-deslocamento.herokuapp.com/api/v1/Condutor'
  );

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Lista de condutores cadastrados no sistema
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={handleOpenModal}
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Adicionar novo condutor</DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} marginTop={3}>
                <TextField
                  name="categoriaHabilitacao"
                  label="Número do Documento"
                  value={formValues.categoriaHabilitacao}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3} marginTop={3}>
                <TextField
                  name="vencimentoHabilitacao"
                  label="Vencimento Habilitação"
                  value={formValues.vencimentoHabilitacao}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3} marginTop={3}>
                <TextField
                  name="nome"
                  label="Nome"
                  value={formValues.nome}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3} marginTop={3}>
                <TextField
                  name="numeroHabilitacao"
                  label="Numero Habilitação"
                  value={formValues.numeroHabilitacao}
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

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
    placa: '',
    marcaModelo: '',
    anoFabricacao: '',
    kmAtual: ''
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
      placa: '',
      marcaModelo: '',
      anoFabricacao: '',
      kmAtual: ''
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
      const response = await api.post('/Veiculo', formValues);
      console.log('Resposta da API:', response.data);
      mutate();
      resetForm();
      handleCloseModal();
      toast.success('Veiculo criado com sucesso confira novamente a lista.', {
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
    'https://api-deslocamento.herokuapp.com/api/v1/Veiculo'
  );

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Lista de veículos cadastrados no sistema
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={handleOpenModal}
          >
            Adicionar novo veículo
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
                  name="placa"
                  label="Placa"
                  value={formValues.placa}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={6} marginTop={3}>
                <TextField
                  name="marcaModelo"
                  label="Marca Modelo"
                  value={formValues.marcaModelo}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3}>
                <TextField
                  name="anoFabricacao"
                  label="Ano Fabricação"
                  value={formValues.anoFabricacao}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={14} md={3}>
                <TextField
                  name="kmAtual"
                  label="KM Atual"
                  value={formValues.kmAtual}
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

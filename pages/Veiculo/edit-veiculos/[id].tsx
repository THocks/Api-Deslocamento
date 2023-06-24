import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import {
  Divider,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  CardHeader,
  Grid,
  Button,
  TextField
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';
import { api } from '@/api/Api';

const UserCliente = () => {
  const router = useRouter();
  const { id, marcaModelo, anoFabricacao, kmAtual } = router.query;

  const [formValues, setFormValues] = useState({
    id,
    marcaModelo,
    anoFabricacao,
    kmAtual
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }));
  };

  const handleUpdatedClient = async (id: string | any): Promise<void> => {
    try {
      const response = await api.put(`/Veiculo/${id}`, formValues);

      toast.success('Usuário foi atualizado com sucesso.', {
        duration: 2000,
        icon: '🚀'
      });
      router.push('/Veiculo');
      console.log('Veiculo Atualziado:', response.data);
    } catch (error) {
      toast.error(
        'Erro ao processar sua solicitação Veiculo não pode ser atualizado.',
        {
          duration: 3000,
          icon: '🚨 '
        }
      );
    }
  };

  return (
    <>
      <Head>
        <title>Editar Veiculo </title>
      </Head>

      <Card>
        <CardHeader title="Atualizando os dados do veiculo " align="center" />
        <Divider />
        <Grid marginX={2} marginY={2} justifyContent="center">
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleUpdatedClient(id)}
          >
            Atualizar veículo
          </Button>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">MARCA MODELO</TableCell>
                <TableCell align="center">ANO FABRICAÇÃO</TableCell>
                <TableCell align="center">KM ATUAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <TextField
                    name="id"
                    value={formValues.id}
                    onChange={handleChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </TableCell>

                <TableCell align="center">
                  <TextField
                    name="marcaModelo"
                    value={formValues.marcaModelo}
                    onChange={handleChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="anoFabricacao"
                    value={formValues.anoFabricacao}
                    onChange={handleChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </TableCell>

                <TableCell align="center">
                  <TextField
                    name="kmAtual"
                    value={formValues.kmAtual}
                    onChange={handleChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Footer />
    </>
  );
};

export default UserCliente;

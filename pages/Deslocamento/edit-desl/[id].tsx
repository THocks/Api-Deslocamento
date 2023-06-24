import { useRouter } from 'next/router';
import { useState } from 'react';
import { formatDate } from '@/utils';
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
  const { id, kmFinal, fimDeslocamento, observacao } = router.query;

  const [formValues, setFormValues] = useState({
    id,
    kmFinal,
    fimDeslocamento: formatDate(fimDeslocamento),
    observacao
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
      const response = await api.put(
        `/Deslocamento/${id}/EncerrarDeslocamento`,
        formValues
      );

      toast.success('Deslocamento foi atualizado com sucesso.', {
        duration: 2000,
        icon: '🚀'
      });
      router.push('/Deslocamento');
      console.log('Condutor Atualziado:', response.data);
    } catch (error) {
      toast.error(
        'Erro ao processar sua solicitação deslocamento não pode ser atualizado.',
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
        <title>Editar Deslocamento </title>
      </Head>

      <Card>
        <CardHeader title="Atualizando dados de deslocamento " align="center" />
        <Divider />
        <Grid marginX={2} marginY={2} justifyContent="center">
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleUpdatedClient(id)}
          >
            Atualizar condutor
          </Button>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">KM FINAL</TableCell>
                <TableCell align="center">FIM DESLOCAMENTO</TableCell>
                <TableCell align="center">OBSERVAÇÃO</TableCell>
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
                    name="kmFinal"
                    value={formValues.kmFinal}
                    onChange={handleChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </TableCell>

                <TableCell align="center">
                  <TextField
                    name="fimDeslocamento"
                    value={formValues.fimDeslocamento}
                    onChange={handleChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="observacao"
                    value={formValues.observacao}
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

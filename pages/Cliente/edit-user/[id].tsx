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
  const {
    id,
    bairro,
    cidade,
    logradouro,
    nome,
    numero,
    numeroDocumento,
    tipoDocumento,
    uf
  } = router.query;

  const [formValues, setFormValues] = useState({
    id,
    numeroDocumento,
    tipoDocumento,
    nome,
    logradouro,
    numero,
    bairro,
    cidade,
    uf
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
      const response = await api.put(`/Cliente/${id}`, formValues);

      toast.success('Usuário foi atualizado com sucesso.', {
        duration: 2000,
        icon: '🚀'
      });
      router.push('/Cliente');
      console.log('Cliente Atualziado:', response.data);
    } catch (error) {
      toast.error(
        'Erro ao processar sua solicitação usuário não pode ser atualizado.',
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
        <title>Editar Cliente </title>
      </Head>

      <Card>
        <CardHeader title="Atualizando os dados do cliente " align="center" />
        <Divider />
        <Grid marginX={2} marginY={2} justifyContent="center">
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => handleUpdatedClient(id)}
          >
            Atualizar cliente
          </Button>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">BAIRRO</TableCell>
                <TableCell align="center">CIDADE</TableCell>
                <TableCell align="center">LOGRADOURO</TableCell>
                <TableCell align="center">NOME</TableCell>
                <TableCell align="center">NUMERO</TableCell>
                <TableCell align="center">NUMERO DOCUMENTO</TableCell>
                <TableCell align="center">TIPO DOCUMENTO</TableCell>
                <TableCell align="center">UF</TableCell>
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
                    name="bairro"
                    value={formValues.bairro}
                    onChange={handleChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="cidade"
                    value={formValues.cidade}
                    onChange={handleChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="logradouro"
                    value={formValues.logradouro}
                    onChange={handleChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </TableCell>

                <TableCell align="center">
                  <TextField
                    name="nome"
                    value={formValues.nome}
                    onChange={handleChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="numero"
                    value={formValues.numero}
                    onChange={handleChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="numeroDocumento"
                    value={formValues.numeroDocumento}
                    onChange={handleChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="tipoDocumento"
                    value={formValues.tipoDocumento}
                    onChange={handleChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    name="uf"
                    value={formValues.uf}
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

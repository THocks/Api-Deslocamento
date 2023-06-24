import { FC, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import {
  Tooltip,
  Divider,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  Grid,
  TextField,
  Dialog
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Link from 'next/link';
import { api } from '@/api/Api';

interface ApiClient {
  mutate: any;
  data: {
    id: string;
    bairro: string;
    cidade: string;
    logradouro: string;
    nome: string;
    numero: string;
    numeroDocumento: string;
    tipoDocumento: string;
    uf: string;
    checked: boolean;
  }[];
}

const OrdersApi: FC<ApiClient> = ({ data, mutate }) => {
  //# DELETE Client
  const handleDeleteCliente = async (id: string): Promise<void> => {
    try {
      const response = await api.delete(`/Cliente/${id}`, { data: { id } });
      mutate();
      toast.success('Usuário foi deletado com sucesso.', {
        duration: 2000,
        icon: '🚀'
      });
      console.log('Cliente deletado:', response.data);
    } catch (error) {
      toast.error(
        'Erro ao processar sua solicitação usuário não pode ser deletado.',
        {
          duration: 3000,
          icon: '🚨 '
        }
      );
      console.log('Erro ao deletar cliente:', error);
    }
  };

  /**********************************************************************************************/
  //# Search Client ID
  const [id, setID] = useState('');
  const [foundClient, setFoundClient] = useState<ApiClient['data'][0] | null>(
    null
  );
  const SearchClienteID = async (id: string): Promise<void> => {
    try {
      const response = await api.get(`/Cliente/${id}`);
      setFoundClient(response.data);
      mutate();
      handleOpenModal();
      toast.success('Usuário encontrado em nosso sistema.', {
        duration: 2000,
        icon: '🚀'
      });
      console.log('Cliente encontrado:', response.data);
    } catch (error) {
      toast.error(
        'Erro ao processar sua solicitação usuário não pode ser encontrado.',
        {
          duration: 3000,
          icon: '🚨 '
        }
      );
      console.log('Erro ao procurar cliente:', error);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  /**********************************************************************************************/

  const theme = useTheme();

  return (
    <>
      <Card>
        <CardHeader title="Lista de Clientes" align="center" />
        <Grid container spacing={2} marginBottom={2} marginLeft={0}>
          <Grid item md={1} marginTop={3}>
            <TextField
              name="ID"
              label="Search ID"
              value={id}
              onChange={(e) => setID(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={1} marginTop={3}>
            <IconButton
              sx={{
                '&:hover': {
                  background: theme.colors.error.lighter
                },
                color: theme.palette.error.main
              }}
              color="inherit"
              size="small"
              onClick={() => id && SearchClienteID(id)}
            >
              <SearchTwoToneIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        {data.length === 0 ? (
          <Typography
            align="center"
            variant="body1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
          >
            Não foi encontrado nenhum cliente cadastrado ! Cadastre um novo
            agora.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">BAIRRO</TableCell>
                  <TableCell align="center">CIDADE</TableCell>
                  <TableCell align="center">LOGRADOURO</TableCell>
                  <TableCell align="center">NOME</TableCell>
                  <TableCell align="center">NUMERO</TableCell>
                  <TableCell align="center">NUMERO DOCUMENTO</TableCell>
                  <TableCell align="center">TIPO DOCUMENTO</TableCell>
                  <TableCell align="center">UF</TableCell>
                  <TableCell align="center">EDITAR</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => {
                  return (
                    <TableRow hover key={item.id}>
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {item.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          align="center"
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {item.bairro}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          align="center"
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {item.cidade}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          align="center"
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {item.logradouro}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          align="center"
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {item.nome}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          align="center"
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {item.numero}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          align="center"
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {item.numeroDocumento}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          align="center"
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {item.tipoDocumento}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          align="center"
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {item.uf}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Tooltip title="Editar cliente" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.primary.main
                            }}
                            color="inherit"
                            size="small"
                          >
                            <Link
                              href={`/Cliente/edit-user/${item.id}?id=${item.id}&bairro=${item.bairro}&cidade=${item.cidade}&logradouro=${item.logradouro}&nome=${item.nome}&numero=${item.numero}&numeroDocumento=${item.numeroDocumento}&tipoDocumento=${item.tipoDocumento}&uf=${item.uf}`}
                            >
                              <EditTwoToneIcon fontSize="small" />
                            </Link>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar cliente" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.error.lighter
                              },
                              color: theme.palette.error.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleDeleteCliente(item.id)}
                          >
                            <DeleteTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {foundClient && (
          <Dialog open={openModal} onClose={handleCloseModal}>
            <TableContainer>
              <Typography
                align="center"
                variant="body1"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                Cliente
              </Typography>
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
                    <TableCell align="center">EDITAR</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover key={foundClient.id}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {foundClient.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        align="center"
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {foundClient.bairro}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        align="center"
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {foundClient.cidade}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        align="center"
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {foundClient.logradouro}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        align="center"
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {foundClient.nome}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        align="center"
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {foundClient.numero}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        align="center"
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {foundClient.numeroDocumento}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        align="center"
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {foundClient.tipoDocumento}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        align="center"
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {foundClient.uf}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Tooltip title="Editar cliente">
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deletar cliente">
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleDeleteCliente(foundClient.id)}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Dialog>
        )}
      </Card>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default OrdersApi;

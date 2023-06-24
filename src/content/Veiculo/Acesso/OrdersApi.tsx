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
    placa: string;
    marcaModelo: string;
    anoFabricacao: number;
    kmAtual: number;
  }[];
}

const OrdersApi: FC<ApiClient> = ({ data, mutate }) => {
  //# DELETE Client
  const handleDeleteVeiculo = async (id: string): Promise<void> => {
    try {
      const response = await api.delete(`/Veiculo/${id}`, { data: { id } });
      mutate();
      toast.success('Veiculo foi deletado com sucesso.', {
        duration: 2000,
        icon: '🚀'
      });
      console.log('Veiculo deletado:', response.data);
    } catch (error) {
      toast.error(
        'Erro ao processar sua solicitação usuário não pode ser deletado.',
        {
          duration: 3000,
          icon: '🚨 '
        }
      );
      console.log('Erro ao deletar veiculo:', error);
    }
  };

  /**********************************************************************************************/
  //# Search Client ID
  const [id, setID] = useState('');
  const [foundClient, setFoundClient] = useState<ApiClient['data'][0] | null>(
    null
  );
  const SearchVeiculoID = async (id: string): Promise<void> => {
    try {
      const response = await api.get(`/Veiculo/${id}`);
      setFoundClient(response.data);
      mutate();
      handleOpenModal();
      toast.success('Veiculo encontrado em nosso sistema.', {
        duration: 2000,
        icon: '🚀'
      });
      console.log('Veiculo encontrado:', response.data);
    } catch (error) {
      toast.error(
        'Erro ao processar sua solicitação Veiculo não pode ser deletado.',
        {
          duration: 3000,
          icon: '🚨 '
        }
      );
      console.log('Erro ao deletar Veiculo:', error);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const theme = useTheme();

  return (
    <>
      <Card>
        <CardHeader title="Lista de Veiculos" align="center" />
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
              onClick={() => id && SearchVeiculoID(id)}
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
            Não foi encontrado nenhum veículo cadastrado ! Cadastre um novo
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
                  <TableCell align="center">PLACA</TableCell>
                  <TableCell align="center">MARCA MODELO</TableCell>
                  <TableCell align="center">ANO FABRICAÇÃO</TableCell>
                  <TableCell align="center">KM ATUAL</TableCell>
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
                          align="center"
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
                          {item.placa}
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
                          {item.marcaModelo}
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
                          {item.anoFabricacao}
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
                          {item.kmAtual}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
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
                              href={`/Veiculo/edit-veiculos/${item.id}?id=${item.id}&anoFabricacao=${item.anoFabricacao}&kmAtual=${item.kmAtual}&marcaModelo=${item.marcaModelo}&placa=${item.placa}`}
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
                            onClick={() => handleDeleteVeiculo(item.id)}
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
                Clientes cadastrados
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">PLACA</TableCell>
                    <TableCell align="center">MARCA MODELO</TableCell>
                    <TableCell align="center">ANO FABRICAÇÃO</TableCell>
                    <TableCell align="center">KM ATUAL</TableCell>
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
                        {foundClient.placa}
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
                        {foundClient.marcaModelo}
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
                        {foundClient.anoFabricacao}
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
                        {foundClient.kmAtual}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
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
                          onClick={() => handleDeleteVeiculo(foundClient.id)}
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

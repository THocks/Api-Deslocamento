import { FC, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { formatDate } from '@/utils';

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
    nome: string;
    numeroHabilitacao: string;
    vencimentoHabilitacao: string;
    catergoriaHabilitacao: string;
  }[];
}

const OrdersApi: FC<ApiClient> = ({ data, mutate }) => {
  //# DELETE Client
  const handleDeleteCondutor = async (id: string): Promise<void> => {
    try {
      const response = await api.delete(`/Condutor/${id}`, { data: { id } });
      mutate();
      toast.success('Condutor deletado com sucesso.', {
        duration: 2000,
        icon: '🚀'
      });
      console.log('Condutor deletado:', response.data);
    } catch (error) {
      toast.error(
        'Erro ao processar sua solicitação usuário não pode ser Condutor.',
        {
          duration: 3000,
          icon: '🚨 '
        }
      );
      console.log('Erro ao deletar Condutor:', error);
    }
  };

  /**********************************************************************************************/
  //# Search Client ID
  const [id, setID] = useState('');
  const [foundClient, setFoundClient] = useState<ApiClient['data'][0] | null>(
    null
  );
  const SearchCondutorID = async (id: string): Promise<void> => {
    try {
      const response = await api.get(`/Condutor/${id}`);
      setFoundClient(response.data);
      mutate();
      handleOpenModal();
      toast.success('Condutor encontrado em nosso sistema.', {
        duration: 2000,
        icon: '🚀'
      });
      console.log('Condutor encontrado:', response.data);
    } catch (error) {
      toast.error(
        'Erro ao processar sua solicitação Condutor não pode ser encontrado.',
        {
          duration: 3000,
          icon: '🚨 '
        }
      );
      console.log('Erro ao procurar Condutor:', error);
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
        <CardHeader title="Lista de Condutores" align="center" />
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
              onClick={() => id && SearchCondutorID(id)}
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
            Não foi encontrado nenhum condutor cadastrado ! Cadastre um novo
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
                  <TableCell align="center">NOME</TableCell>
                  <TableCell align="center">NUMERO HABILITAÇÃO</TableCell>
                  <TableCell align="center">VENCIMENTO HABILITAÇÃO</TableCell>
                  <TableCell align="center">CATEGORIA HABILITAÇÃO</TableCell>
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
                          {item.nome}
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
                          {item.numeroHabilitacao}
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
                          {formatDate(item.vencimentoHabilitacao)}
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
                          {item.catergoriaHabilitacao}
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
                              href={`/Condutores/edit-condutor/${item.id}?id=${item.id}&numeroHabilitacao=${item.numeroHabilitacao}&vencimentoHabilitacao=${item.vencimentoHabilitacao}&nome=${item.nome}`}
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
                            onClick={() => handleDeleteCondutor(item.id)}
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
                Condutor
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">NOME</TableCell>
                    <TableCell align="center">NUMERO HABILITAÇÃO</TableCell>
                    <TableCell align="center">VENCIMENTO HABILITAÇÃO</TableCell>
                    <TableCell align="center">CATEGORIA HABILITAÇÃO</TableCell>

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
                        {foundClient.nome}
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
                        {foundClient.numeroHabilitacao}
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
                        {foundClient.vencimentoHabilitacao}
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
                        {foundClient.catergoriaHabilitacao}
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
                          onClick={() => handleDeleteCondutor(foundClient.id)}
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

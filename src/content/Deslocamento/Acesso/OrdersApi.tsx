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
    kmInicial: number;
    kmFinal: number;
    inicioDeslocamento: string;
    fimDeslocamento: string;
    checkList: string;
    motivo: string;
    observacao: string;
    idCondutor: number;
    idVeiculo: number;
    idCliente: number;
  }[];
}

const OrdersApi: FC<ApiClient> = ({ data, mutate }) => {
  //# DELETE Client
  const handleDeleteDeslocamento = async (id: string): Promise<void> => {
    try {
      const response = await api.delete(`/Deslocamento/${id}`, {
        data: { id }
      });
      mutate();
      toast.success('Deslocamento foi deletado com sucesso.', {
        duration: 2000,
        icon: '🚀'
      });
      console.log('Deslocamento deletado:', response.data);
    } catch (error) {
      toast.error(
        'Erro ao processar sua solicitação Deslocamento não pode ser apagado do sistema.',
        {
          duration: 3000,
          icon: '🚨 '
        }
      );
      console.log('Erro ao deletar Deslocamento:', error);
    }
  };

  /**********************************************************************************************/
  //# Search Client ID
  const [id, setID] = useState('');
  const [foundClient, setFoundClient] = useState<ApiClient['data'][0] | null>(
    null
  );
  const SearchDeslocamentoID = async (id: string): Promise<void> => {
    try {
      const response = await api.get(`/Deslocamento/${id}`);
      setFoundClient(response.data);
      mutate();
      handleOpenModal();
      toast.success('Deslocamento encontrado em nosso sistema.', {
        duration: 2000,
        icon: '🚀'
      });
      console.log('Deslocamento encontrado:', response.data);
    } catch (error) {
      toast.error(
        'Erro ao processar sua solicitação Deslocamento não pode ser deletado.',
        {
          duration: 3000,
          icon: '🚨 '
        }
      );
      console.log('Erro ao deletar Deslocamento:', error);
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
        <CardHeader title="Lista de Deslocamento" align="center" />
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
              onClick={() => id && SearchDeslocamentoID(id)}
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
            Não foi encontrado nenhum deslocamento ! Cadastre um novo agora.
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
                  <TableCell align="center">KM INICIAL</TableCell>
                  <TableCell align="center">KM FINAL</TableCell>
                  <TableCell align="center">INICIO DESL</TableCell>
                  <TableCell align="center">FIM DESL</TableCell>
                  <TableCell align="center">CHECKLIST</TableCell>
                  <TableCell align="center">MOTIVO</TableCell>
                  <TableCell align="center">OBSERVACÃO</TableCell>
                  <TableCell align="center">ID CONDUTOR</TableCell>
                  <TableCell align="center">ID VEICULO</TableCell>
                  <TableCell align="center">ID CLIENTE</TableCell>
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
                          {item.kmInicial}
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
                          {item.kmFinal}
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
                          {formatDate(item.inicioDeslocamento)}
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
                          {formatDate(item.fimDeslocamento)}
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
                          {item.checkList}
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
                          {item.motivo}
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
                          {item.observacao}
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
                          {item.idCondutor}
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
                          {item.idVeiculo}
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
                          {item.idCliente}
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
                              href={`/Deslocamento/edit-desl/${item.id}?id=${item.id}&observacao=${item.observacao}&fimDeslocamento=${item.fimDeslocamento}&kmFinal=${item.kmFinal}`}
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
                            onClick={() => handleDeleteDeslocamento(item.id)}
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
                    <TableCell align="center">KM INICIAL</TableCell>
                    <TableCell align="center">KM FINAL</TableCell>
                    <TableCell align="center">INICIO DESL</TableCell>
                    <TableCell align="center">FIM DESL</TableCell>
                    <TableCell align="center">CHECKLIST</TableCell>
                    <TableCell align="center">MOTIVO</TableCell>
                    <TableCell align="center">OBSERVACÃO</TableCell>
                    <TableCell align="center">ID CONDUTOR</TableCell>
                    <TableCell align="center">ID VEICULO</TableCell>
                    <TableCell align="center">ID CLIENTE</TableCell>
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
                        {foundClient.kmInicial}
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
                        {foundClient.kmFinal}
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
                        {foundClient.inicioDeslocamento}
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
                        {foundClient.fimDeslocamento}
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
                        {foundClient.checkList}
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
                        {foundClient.motivo}
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
                        {foundClient.observacao}
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
                        {foundClient.idCondutor}
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
                        {foundClient.idVeiculo}
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
                        {foundClient.idCliente}
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
                          onClick={() =>
                            handleDeleteDeslocamento(foundClient.id)
                          }
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

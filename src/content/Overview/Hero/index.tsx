import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled
} from '@mui/material';
import Link from 'next/link';

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const NextJsAvatar = styled(Box)(
  ({ theme }) => `
  width: ${theme.spacing(8)};
  height: ${theme.spacing(8)};
  border-radius: ${theme.general.borderRadius};
  background-color: #dfebf6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);
const SWRAvatar = styled(Box)(
  ({ theme }) => `
  width: ${theme.spacing(8)};
  height: ${theme.spacing(8)};
  border-radius: ${theme.general.borderRadius};
  background-color: #dfebf6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing(2)};

    img {
      width: 80%;
      height: 80%;
      display: block;
    }
`
);

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} marginTop={5}>
          <TypographyH2 sx={{ mb: 2 }} variant="h1">
            Projeto Front End Nextjs & Material UI & Typescript & API Rest
          </TypographyH2>

          <Link href="/Cliente">
            <Button href="/Cliente" size="large" variant="contained">
              Entrar no portal
            </Button>
          </Link>

          <Grid container spacing={3} mt={5}>
            <Grid item md={3}>
              <MuiAvatar>
                <img
                  src="/static/images/logo/material-ui.svg"
                  alt="Material-UI"
                />
              </MuiAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Material-UI</b>
                </Box>
              </Typography>
            </Grid>
            <Grid item md={3}>
              <NextJsAvatar>
                <img src="/static/images/logo/next-js.svg" alt="Next.js" />
              </NextJsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Nextjs</b>
                </Box>
              </Typography>
            </Grid>
            <Grid item md={3}>
              <SWRAvatar>
                <img src="/static/images/logo/useSWR.svg" alt="SWR" />
              </SWRAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>UseSWR</b>
                </Box>
              </Typography>
            </Grid>
            <Grid item md={3}>
              <TsAvatar>
                <img
                  src="/static/images/logo/typescript.svg"
                  alt="Typescript"
                />
              </TsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Typescript</b>
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;

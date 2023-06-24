import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Veiculo/Acesso/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import CardOrder from '@/content/Veiculo/Acesso/CardOrder';

function ApplicationsApi() {
  return (
    <>
      <Head>
        <title>Veiculos cadastrados no sistema</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <CardOrder />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ApplicationsApi.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default ApplicationsApi;

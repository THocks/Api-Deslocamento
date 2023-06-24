import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Deslocamento/Acesso/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import CardOrder from '@/content/Deslocamento/Acesso/CardOrder';

function ApplicationsApi() {
  return (
    <>
      <Head>
        <title>Deslocamento registrados no sistema</title>
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

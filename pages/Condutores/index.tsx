import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';
import CardOrder from '@/content/Condutor/Acesso/CardOrder';
import PageHeader from '@/content/Condutor/Acesso/PageHeader';

function ApplicationsApi() {
  return (
    <>
      <Head>
        <title>Condutores cadastrados no sistema</title>
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

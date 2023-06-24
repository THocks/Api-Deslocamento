import { Box, styled } from '@mui/material';

import Head from 'next/head';
import Hero from 'src/content/Overview/Hero';

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
      overflow: auto;
      background: ${theme.palette.common.white};
      flex: 1;
      overflow-x: hidden;
    
  `
);

function Overview() {
  return (
    <OverviewWrapper>
      <Head>
        <title>Pagina inicial do Projeto</title>
      </Head>

      <Hero />
    </OverviewWrapper>
  );
}

export default Overview;

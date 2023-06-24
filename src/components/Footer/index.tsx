import { Box, Container, Link, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">&copy; 2023 - Thiago Lima</Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          Contato{' '}
          <Link
            href="https://www.linkedin.com/in/thiago-limaaa-/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </Link>
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;

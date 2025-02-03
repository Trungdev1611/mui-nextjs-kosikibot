import '../styles/tailwind.scss';
import '../styles/globals.scss';
import React  from 'react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    blue: {
      main: '#1F5FAD',
    },
  },
});

export default function MyApp({ Component, pageProps }: any) {
  return (
    <div>
      <main>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </div>
  );
}

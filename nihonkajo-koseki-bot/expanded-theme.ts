import '@material-ui/core/styles';

declare module '@mui/material/styles' {
  interface Palette {
    blue: Palette['primary'];
  }

  interface PaletteOptions {
    blue?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Pagination' {
  interface PaginationPropsColorOverrides {
    blue: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    blue: true;
  }
}

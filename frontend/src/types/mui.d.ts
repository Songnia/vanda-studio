import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface PaletteColor {
        transparent?: string;
    }

    interface SimplePaletteColorOptions {
        transparent?: string;
    }
}

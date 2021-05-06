import {
  ColorPartial,
  Palette,
  PaletteOptions,
  SimplePaletteColorOptions,
} from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface SimplePaletteColorOptions {
    lighter?: string;
    light?: string;
    main: string;
    dark?: string;
    darkest?: string;
  }

  interface PaletteColor {
    lighter?: string;
    light: string;
    main: string;
    dark: string;
    darkest?: string;
    contrastText: string;
  }

  type PaletteColorOptions = SimplePaletteColorOptions | ColorPartial;

  interface Palette {
    customPrimary?: PaletteColor;
    customSecondary?: PaletteColor;
    customWarning?: PaletteColor;
    customMistyVariant?: PaletteColor;
  }
  interface PaletteOptions {
    customPrimary?: PaletteColorOptions;
    customSecondary?: PaletteColorOptions;
    customWarning?: PaletteColorOptions;
    customMistyVariant?: PaletteColorOptions;
  }
}

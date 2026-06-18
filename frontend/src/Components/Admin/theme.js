import { createContext, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

export const tokens = () => ({
  grey: {
    100: '#111827',
    200: '#1f2937',
    300: '#374151',
    400: '#4b5563',
    500: '#6b7280',
    600: '#9ca3af',
    700: '#d1d5db',
    800: '#e5e7eb',
    900: '#f3f4f6',
  },
  primary: {
    100: '#111827',
    200: '#1f2937',
    300: '#374151',
    400: '#f4f6f8',
    500: '#ffffff',
    600: '#eef2f7',
    700: '#d1d5db',
    800: '#9ca3af',
    900: '#6b7280',
  },
  greenAccent: {
    100: '#064e3b',
    200: '#065f46',
    300: '#047857',
    400: '#059669',
    500: '#10b981',
    600: '#34d399',
    700: '#6ee7b7',
    800: '#a7f3d0',
    900: '#d1fae5',
  },
  redAccent: {
    100: '#7f1d1d',
    200: '#991b1b',
    300: '#b91c1c',
    400: '#dc2626',
    500: '#ef4444',
    600: '#f87171',
    700: '#fca5a5',
    800: '#fecaca',
    900: '#fee2e2',
  },
  blueAccent: {
    100: '#1e3a8a',
    200: '#1d4ed8',
    300: '#2563eb',
    400: '#3b82f6',
    500: '#6366f1',
    600: '#818cf8',
    700: '#a5b4fc',
    800: '#c7d2fe',
    900: '#e0e7ff',
  },
});

export const ThemeContext = () => ({
  palette: {
    mode: 'light',
    primary: { main: '#111827' },
    secondary: { main: '#10b981' },
    error: { main: '#dc2626' },
    text: {
      primary: '#111827',
      secondary: '#374151',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#ffffff',
          color: '#111827',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: { shrink: true },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#111827',
        },
        input: {
          color: '#111827',
        },
        notchedOutline: {
          borderColor: '#cbd5e1',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#374151',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#4b5563',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
        },
        outlined: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#111827',
          borderColor: '#d1d5db',
        },
        columnHeaders: {
          backgroundColor: '#f8fafc',
          color: '#111827',
        },
        cell: {
          color: '#111827',
          borderColor: '#e5e7eb',
        },
        footerContainer: {
          backgroundColor: '#ffffff',
          color: '#111827',
          borderColor: '#e5e7eb',
        },
      },
    },
  },
  typography: {
    fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
    fontSize: 12,
    h1: { fontFamily: ['Source Sans Pro', 'sans-serif'].join(','), fontSize: 40 },
    h2: { fontFamily: ['Source Sans Pro', 'sans-serif'].join(','), fontSize: 32 },
    h3: { fontFamily: ['Source Sans Pro', 'sans-serif'].join(','), fontSize: 24 },
    h4: { fontFamily: ['Source Sans Pro', 'sans-serif'].join(','), fontSize: 20 },
    h5: { fontFamily: ['Source Sans Pro', 'sans-serif'].join(','), fontSize: 16 },
    h6: { fontFamily: ['Source Sans Pro', 'sans-serif'].join(','), fontSize: 14 },
  },
});

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const colorMode = useMemo(() => ({ toggleColorMode: () => {} }), []);
  const theme = useMemo(() => createTheme(ThemeContext()), []);
  return [theme, colorMode];
};

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '~/App.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '~/theme.ts'
import { BrowserRouter } from 'react-router-dom'
import { Providers } from './providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Providers>
          <App />
        </Providers>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)

import React from 'react'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import WalletConnect from '@/components/WalletConnect'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Web3 Dashboard',
  description: 'A Web3 Dashboard application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Web3 Dashboard
              </Typography>
              <WalletConnect />
            </Toolbar>
          </AppBar>
          <Box sx={{ padding: '20px', textAlign: 'center' }}>{children}</Box>
        </Providers>
      </body>
    </html>
  )
}

'use client'

import React, { ReactNode } from 'react'
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { walletAddress, clearAuth } = useAuthStore()

  const handleLogout = () => {
    clearAuth()
    router.push('/')
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Web3 Dashboard
          </Typography>
          {walletAddress && (
            <Typography variant="body1" style={{ marginRight: '1rem' }}>
              {walletAddress}
            </Typography>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </Container>
  )
}

export default Layout

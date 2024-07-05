'use client'

import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, CircularProgress, Alert } from '@mui/material'
import { useConnect, useAccount, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { authService } from '@/api/services'
import Image from 'next/image'

interface WalletModalProps {
  onClose: () => void
}

const WalletModal: React.FC<WalletModalProps> = ({ onClose }) => {
  const { connectors, connect, isPending } = useConnect()
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { setAuth } = useAuthStore()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isConnected) {
      const signInWithEthereum = async () => {
        try {
          const message = new SiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in with Ethereum to the app.',
            uri: window.location.origin,
            version: '1',
            chainId: 1,
          })

          const signature = await signMessageAsync({
            message: message.prepareMessage(),
          })

          const response = await authService.signIn(
            address!,
            message.prepareMessage(),
            signature
          )

          setAuth(address!, response.access_token)
          onClose()
          router.push('/dashboard') // Navigate to dashboard
        } catch (error) {
          setError('Sign in failed. Please try again.')
          console.error('Sign in failed:', error)
        }
      }

      signInWithEthereum()
    }
  }, [isConnected, address, signMessageAsync, setAuth, onClose, router])

  if (!mounted) {
    return null // Render nothing on the server
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3,
        minWidth: '300px',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Connect Wallet
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {connectors.length > 0 && (
        <Button
          onClick={() => {
            setError(null)
            connect({ connector: connectors[0] })
          }}
          disabled={isPending}
          sx={{
            mt: 2,
            width: '100%',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src="/metamask.svg" alt="MetaMask" width={20} height={20} />
          MetaMask
          {isPending && <CircularProgress size={14} sx={{ ml: 1 }} />}
        </Button>
      )}
    </Box>
  )
}

export default WalletModal

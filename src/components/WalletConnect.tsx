'use client'

import React, { useState, useEffect } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import { useAccount, useDisconnect } from 'wagmi'
import WalletModal from './WalletModal'
import { formatAddress } from '@/utils/formatAddress'
import { useRouter } from 'next/navigation'

const WalletConnect: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    }
  }, [isConnected, router])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {isConnected ? (
        <>
          <Typography variant="body1" sx={{ marginRight: '10px' }}>
            {formatAddress(address!)}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => disconnect()}
          >
            Disconnect
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          Connect Wallet
        </Button>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            outline: 0,
          }}
        >
          <WalletModal onClose={() => setModalOpen(false)} />
        </Box>
      </Modal>
    </Box>
  )
}

export default WalletConnect

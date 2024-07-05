'use client';

import React, { useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useConnect, useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import axios from 'axios';

interface WalletModalProps {
    onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ onClose }) => {
    const { connectors, connect, isPending } = useConnect();
    const { address, isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();

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
                    });

                    const signature = await signMessageAsync({
                        message: message.prepareMessage(),
                    });

                    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/signin`, {
                        message: message.prepareMessage(),
                        signature,
                        walletAddress: address,
                    });

                    onClose();
                } catch (error) {
                    console.error('Sign in failed:', error);
                }
            };

            signInWithEthereum();
        }
    }, [isConnected, address, signMessageAsync, onClose]);

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
            <Typography variant="h6" gutterBottom>Connect Wallet</Typography>
            {connectors.map((connector) => (
                <Button
                    key={connector.id}
                    onClick={() => connect({ connector })}
                    disabled={isPending}
                    sx={{ mt: 2, width: '100%' }}
                >
                    {connector.name}
                    {isPending && <CircularProgress size={14} sx={{ ml: 1 }} />}
                </Button>
            ))}
        </Box>
    );
};

export default WalletModal;

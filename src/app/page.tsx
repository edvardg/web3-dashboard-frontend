import { Container } from '@mui/material';
import WalletConnect from "@/components/WalletConnect";

export default function Home() {
    return (
        <Container>
            <h1>Welcome to the Web3 Dashboard</h1>
            <WalletConnect />
        </Container>
    );
}

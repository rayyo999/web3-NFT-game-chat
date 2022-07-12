import '@rainbow-me/rainbowkit/styles.css';
import {
  Chain,
  connectorsForWallets,
  getDefaultWallets,
  getWalletConnectConnector,
  RainbowKitProvider,
  Wallet,
  wallet,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { FC } from 'react';

//custom chain
const avalancheChain: Chain = {
  id: 43_114,
  name: 'Avalanche',
  network: 'avalanche',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: 'https://api.avax.network/ext/bc/C/rpc',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [chain.rinkeby, chain.mainnet, avalancheChain, chain.localhost],
  // [chain.mainnet, chain.rinkeby, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider(),
    // jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
  ]
);

// const { connectors } = getDefaultWallets({
//   appName: 'My RainbowKit App',
//   chains,
// });
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      wallet.metaMask({ chains }),
      wallet.rainbow({ chains }),
      wallet.argent({ chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      wallet.walletConnect({ chains }),
      wallet.trust({ chains }),
      wallet.imToken({ chains }),
      wallet.brave({ chains }),
      wallet.ledger({ chains }),
      wallet.coinbase({ appName: 'C', chains }),
      wallet.injected({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const WalletProvider: FC<any> = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} showRecentTransactions>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
export default WalletProvider;

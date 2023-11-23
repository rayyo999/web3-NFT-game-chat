import { Chain, connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import {
  argentWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  injectedWallet,
  coinbaseWallet,
  ledgerWallet,
  braveWallet,
  imTokenWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { FC } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, localhost, sepolia, optimism, arbitrum } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
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
    default: {
      http: ['https://api.avax.network/ext/bc/C/rpc'],
    },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
}

const NEXT_PUBLIC_ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID || ''
const NEXT_PUBLIC_INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID || ''
const { chains, provider } = configureChains(
  // [sepolia, mainnet, avalancheChain, localhost, optimism, arbitrum],
  [sepolia, mainnet, localhost, optimism, arbitrum],
  [
    alchemyProvider({
      apiKey: NEXT_PUBLIC_ALCHEMY_ID,
      // priority: 0,
    }),
    infuraProvider({
      apiKey: NEXT_PUBLIC_INFURA_ID,
      // priority: 0,
    }),
    publicProvider(),
    // publicProvider({ priority: 1 }),
    // jsonRpcProvider({
    //   rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    // }),
  ]
)

// const { connectors } = getDefaultWallets({
//   appName: 'My RainbowKit App',
//   chains,
// });
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [metaMaskWallet({ chains }), rainbowWallet({ chains }), argentWallet({ chains })],
  },
  {
    groupName: 'Others',
    wallets: [
      walletConnectWallet({ chains }),
      trustWallet({ chains }),
      imTokenWallet({ chains }),
      braveWallet({ chains }),
      ledgerWallet({ chains }),
      coinbaseWallet({ chains, appName: 'C' }),
      injectedWallet({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const WalletProvider: FC<any> = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} showRecentTransactions>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
export default WalletProvider

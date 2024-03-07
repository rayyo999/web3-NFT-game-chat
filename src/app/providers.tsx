'use client'

import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import {
  argentWallet,
  braveWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, fallback, http } from 'wagmi'
import { localhost, mainnet, sepolia } from 'wagmi/chains'

const NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''
const NEXT_PUBLIC_ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ''
const NEXT_PUBLIC_INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY || ''

//custom chain
// const avalancheChain: Chain = {
//   id: 43_114,
//   name: 'Avalanche',
//   network: 'avalanche',
//   iconUrl: 'https://example.com/icon.svg',
//   iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Avalanche',
//     symbol: 'AVAX',
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://api.avax.network/ext/bc/C/rpc'],
//     },
//   },
//   blockExplorers: {
//     default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
//     etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
//   },
//   testnet: false,
// }

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, rainbowWallet, argentWallet],
    },
    {
      groupName: 'Others',
      wallets: [
        walletConnectWallet,
        trustWallet,
        imTokenWallet,
        braveWallet,
        ledgerWallet,
        coinbaseWallet,
        injectedWallet,
      ],
    },
  ],
  {
    appName: 'NFT-Game-Chat-App',
    projectId: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  }
)

const ALCHEMY_SEPOLIA_RPC_URL = `https://eth-sepolia.g.alchemy.com/v2/${NEXT_PUBLIC_ALCHEMY_API_KEY}`
const INFURA_SEPOLIA_RPC_URL = `https://sepolia.infura.io/v3/${NEXT_PUBLIC_INFURA_API_KEY}`
const ALCHEMY_SEPOLIA_TRANSPORT = http(ALCHEMY_SEPOLIA_RPC_URL)
const INFURA_SEPOLIA_TRANSPORT = http(INFURA_SEPOLIA_RPC_URL)

const config = createConfig({
  connectors,
  chains: [mainnet, sepolia, localhost],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: fallback([ALCHEMY_SEPOLIA_TRANSPORT, INFURA_SEPOLIA_TRANSPORT]),
    [localhost.id]: http(),
  },
  ssr: true,
})

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider showRecentTransactions>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

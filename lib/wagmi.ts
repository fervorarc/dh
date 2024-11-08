import { connectorsForWallets, getDefaultConfig } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rabbyWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { createConfig, http } from 'wagmi'
import {
  arbitrum,
  avalanche,
  base,
  blast,
  bsc,
  celo,
  fantom,
  filecoin,
  fraxtal,
  kava,
  linea,
  mainnet,
  mantle,
  moonbeam,
  optimism,
  polygon,
  scroll,
} from 'wagmi/chains'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        injectedWallet,
        coinbaseWallet,
        rabbyWallet,
      ],
    },
  ],
  {
    appName: 'Diamond Hands',
    projectId: '17b8b809be8a7ff519253d9735f9a23f',
  }
)

export const config = createConfig({
  chains: [
    {
      ...mainnet,
      iconUrl: '/chains/ethereum.svg',
    },
    {
      ...bsc,
      iconUrl: '/chains/bsc.svg',
    },
    {
      ...polygon,
      iconUrl: '/chains/polygon.svg',
      iconBackground: '#fff',
    },
    {
      ...avalanche,
      iconUrl: '/chains/avalanche.svg',
    },
    {
      ...arbitrum,
      iconUrl: '/chains/arbitrum.svg',
    },
    {
      ...base,
      iconUrl: '/chains/base.svg',
      iconBackground: '#fff',
    },
    {
      ...fantom,
      iconUrl: '/chains/fantom.svg',
    },
    {
      ...optimism,
      iconUrl: '/chains/optimism.svg',
    },
    {
      ...mantle,
      iconUrl: '/chains/mantle.svg',
    },
    {
      ...moonbeam,
      iconUrl: '/chains/moonbeam.svg',
    },
    {
      ...filecoin,
      iconUrl: '/chains/filecoin.svg',
    },
    {
      ...celo,
      iconUrl: '/chains/celo.svg',
    },
    {
      ...kava,
      iconUrl: '/chains/kava.svg',
    },
    {
      ...scroll,
      iconUrl: '/chains/scroll.svg',
    },
    {
      ...linea,
      iconUrl: '/chains/linea.svg',
    },
    {
      ...blast,
      iconUrl: '/chains/blast.svg',
    },
    {
      ...fraxtal,
      iconUrl: '/chains/frax.svg',
    },
  ],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
    [avalanche.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [fantom.id]: http(),
    [optimism.id]: http(),
    [mantle.id]: http(),
    [moonbeam.id]: http(),
    [filecoin.id]: http(),
    [celo.id]: http(),
    [kava.id]: http(),
    [scroll.id]: http(),
    [linea.id]: http(),
    [blast.id]: http(),
    [fraxtal.id]: http(),
  },
  connectors,
  ssr: true,
})

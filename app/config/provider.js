import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
  } from "@web3modal/ethereum";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

//const chains = [chain.mainnet];

export const zkTestnet = {
  id: 280,
  name: 'zkSync Era Testnet',
  network: 'zkSync Era Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://testnet.era.zksync.dev'] },
    default: { http: ['https://testnet.era.zksync.dev'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://goerli.explorer.zksync.io/' },
    default: { name: 'SnowTrace', url: 'https://goerli.explorer.zksync.io/' },
  }
}

export const bscTestnet = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'BNB Smart Chain Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    public: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545/'] },
    default: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545/'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://testnet.bscscan.com/' },
    default: { name: 'SnowTrace', url: 'https://testnet.bscscan.com/' },
  }
}

const { chains, publicClient } = configureChains(
  [zkTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://testnet.era.zksync.dev`,
      }),
    }),
  ],
)

const auth = () => {
    try{
        const { provider } = configureChains(chains, [
            walletConnectProvider({ projectId: "c3aa2dd660a1a5a1922e0dbdfc712912"}),
          ]);
          
           const wagmiClient = createClient({
            autoConnect: false,
            connectors: modalConnectors({ appName: "Noname", chains }),
            provider,
          });
        const ethereumClient = new EthereumClient(wagmiClient, chains);
        
        return {wagmiClient , ethereumClient}
    }catch(error){
        console.log(error)
    }
}

export const {wagmiClient , ethereumClient} = auth()

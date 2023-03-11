import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
  } from "@web3modal/ethereum";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

const chains = [chain.mainnet];

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

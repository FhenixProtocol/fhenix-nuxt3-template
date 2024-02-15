import { ref } from 'vue';
import { ethers } from "ethers";

import { FhenixClient } from "fhenixjs";
import type { SupportedProvider } from "fhenixjs";

type ExtendedProvider = SupportedProvider & {  
  getTransactionReceipt(txHash: string): Promise<ethers.TransactionReceipt>;
  send(method: string, params: any[] | Record<string, any>): Promise<any>;
  getSigner(): Promise<any>;
  getBalance(address: string): Promise<any>;
}

const config = useRuntimeConfig();

const ERROR_CHAIN_DOES_NOT_EXIST = 4902;

var provider = null as ExtendedProvider | ethers.BrowserProvider | null;
const fheClient = ref<FhenixClient | null>(null);
const fnxChainId = config.public.NETWORK_CHAIN_ID;
const networkRPC = config.public.NETWORK_RPC_URL;
const explorerURL = config.public.NETWORK_EXPLORER_URL;
const mmChainId = ref<number>(-1);
const isItFhenixNetwork = ref<boolean>(false);
const eventWasAdded = ref<boolean>(false);
const balance = ref<string>("");
const address = ref<string>("");

export default function useChain() {
  return { 
    isItFhenixNetwork,
    balance,
    address,

    fnxConnect,
    initFHEClient,
    getFheClient,
    getBalance
  }
}

function initFHEClient() {
  fheClient.value = new FhenixClient({ provider: provider as SupportedProvider })
}

function getFheClient() {
  return fheClient.value;
}

async function fnxConnect() {
  try {
    if (provider === null) {
      provider = new ethers.BrowserProvider(window.ethereum);
    }
    if (provider === null)
      return;

     const chainId = await provider.send('eth_chainId', []);
     if (Number(chainId) !== Number(fnxChainId)) {
       await addFhenixChain();
     }
     mmChainId.value = Number(chainId);
     await switchEthereumChain(Number(chainId));
     if (!eventWasAdded.value) {
      eventWasAdded.value = true;
      setupMetaMaskListeners();          
     }
     localStorage.setItem("isConnected", "1");
     balance.value = await getBalance(); 
     initFHEClient();
  } catch (err) {
    console.error('Error:', err);
  }
}

async function addFhenixChain() {
  try {
    if (provider !== null) {
      const chainData = [{
        chainId: '0x' + (Number(fnxChainId)).toString(16),
        chainName: 'Fhenix Network',
        nativeCurrency: { name: 'FHE Token', symbol: 'FHE', decimals: 18 },
        rpcUrls: [networkRPC],
        blockExplorerUrls: [explorerURL]
      }];
      await provider.send("wallet_addEthereumChain", chainData);
      console.log('Custom network added'); 
    }
  } catch (addError) {
      console.error('Error adding custom network:', addError);
  }
}

async function switchEthereumChain(chainId: number) {
  try {
    if (!provider) {
      return;
    }

    await provider.send('wallet_switchEthereumChain', [{ chainId: '0x' + (chainId).toString(16) }]);
    console.log('Switched to network:', chainId);
    isItFhenixNetwork.value = Number(chainId) === Number(fnxChainId);          
  } catch (switchError: unknown) {
      console.error('Error switching networks:', switchError);
      if (switchError instanceof Error) {
        const errorDetails = (switchError as any).error; // Using any to access nested properties
        
        if (errorDetails && errorDetails.code === ERROR_CHAIN_DOES_NOT_EXIST) {
          addFhenixChain();
        }
      }
  }
}

async function setupMetaMaskListeners() {
  window.ethereum.on('accountsChanged', async (accounts: string[]) => {
      console.log('Account changed:', accounts[0]);
      provider = new ethers.BrowserProvider(window.ethereum);
  });

  // Listen for chain changes
  window.ethereum.on('chainChanged', async (chainId: number) => {
      console.log('Network changed to:', chainId);
      mmChainId.value = Number(chainId);
      provider = new ethers.BrowserProvider(window.ethereum);
      isItFhenixNetwork.value = Number(chainId) === Number(fnxChainId);
  });
}

async function getBalance(): Promise<string> {
  try {
    var returnBalance = "0";
    if (provider !== null) {
      const signer = await provider.getSigner();
      address.value = await signer.getAddress();
      const balance = await provider.getBalance(address.value);
      
      if (balance) {
        returnBalance = `${Number(ethers.formatEther(balance))} ETH`;
      }
      console.log(`Balance: ${returnBalance}`);
    }
    return returnBalance;
  } catch (error) {
      console.error('Error getting balance:', error);
      return "-1";
  }
}
import { defineComponent } from 'vue';
import { ethers } from "ethers";
import type { SupportedProvider } from "fhenixjs";

import CommonProps from '@/mixins/CommonProps'

import EventBus from "../event-bus"

type ExtendedProvider = SupportedProvider & {  
  getTransactionReceipt(txHash: string): Promise<ethers.TransactionReceipt>;
  send(method: string, params: any[] | Record<string, any>): Promise<any>;
  getSigner(): Promise<any>;
}

const ERROR_CHAIN_DOES_NOT_EXIST = 4902;

export var provider: ExtendedProvider | ethers.BrowserProvider | null = null;

export default defineComponent({
  mixins: [ CommonProps ],

  data() {
    return {
      connected: false,
      eventWasAdded: false,

    };
  },
  computed: {

  },
  mounted() {
    
    const asyncMount = async () => {
      if (localStorage.getItem("isConnected")) {
        if (typeof window.ethereum !== 'undefined') {
          await this.connect();
          EventBus.emitEvent('network:connected', true);
        }
      }
    };
    asyncMount();
  },
  methods: {
    async addFhenixChain() {
      try {
        if (provider !== null) {
          const chainData = [{
            chainId: '0x' + (Number(this.chainId)).toString(16),
            chainName: 'Fhenix Network',
            nativeCurrency: { name: 'FHE Token', symbol: 'FHE', decimals: 18 },
            rpcUrls: [this.networkRPC],
            blockExplorerUrls: [this.explorerURL]
          }];
          await provider.send("wallet_addEthereumChain", chainData);
          console.log('Custom network added'); 
        }
      } catch (addError) {
          console.error('Error adding custom network:', addError);
      }
    },
    async switchEthereumChain(chainId: number) {
        try {
          if (!provider) {
            return;
          }

          await provider.send('wallet_switchEthereumChain', [{ chainId: '0x' + (chainId).toString(16) }]);
          console.log('Switched to network:', chainId);
          this.isItFhenixNetwork = Number(chainId) === Number(this.chainId);          
        } catch (switchError: unknown) {
            console.error('Error switching networks:', switchError);
            if (switchError instanceof Error) {
              const errorDetails = (switchError as any).error; // Using any to access nested properties
              
              if (errorDetails && errorDetails.code === ERROR_CHAIN_DOES_NOT_EXIST) {
                this.addFhenixChain();
              }
            }
        }
    },

    async getBalance(provider: any): Promise<string> {
      try {
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const balance = await provider.getBalance(address);
          var returnBalance = "0";
          if (balance) {
            returnBalance = `${Number(ethers.formatEther(balance))} ETH`;
          }
          console.log(`Balance: ${returnBalance}`);
          return returnBalance;
      } catch (error) {
          console.error('Error getting balance:', error);
          return "-1";
      }
    },

    async setupMetaMaskListeners() {
        window.ethereum.on('accountsChanged', async (accounts: string[]) => {
            console.log('Account changed:', accounts[0]);
            provider = new ethers.BrowserProvider(window.ethereum);
        });

        // Listen for chain changes
        window.ethereum.on('chainChanged', async (chainId: number) => {
            console.log('Network changed to:', chainId);
            this.mmChainId = Number(chainId);
            provider = new ethers.BrowserProvider(window.ethereum);
            this.isItFhenixNetwork = Number(chainId) === Number(this.chainId);
        });
    },


    async connect() {
      try {
        if (provider == null) {
           provider = new ethers.BrowserProvider(window.ethereum);
        }

        const chainId = await provider.send('eth_chainId', []);
        
        if (Number(chainId) !== Number(this.chainId)) {
          await this.addFhenixChain();
        }
        this.mmChainId = Number(chainId);

        await this.switchEthereumChain(Number(this.chainId));

        if (!this.eventWasAdded) {
          this.eventWasAdded = true;
          this.setupMetaMaskListeners();          
        }
        localStorage.setItem("isConnected", "1");
        EventBus.emitEvent('network:connected', true);        
      } catch (err) {
        console.error('Error:', err);

      }
    },  
  }

});


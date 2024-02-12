import { defineComponent } from 'vue';
import { FhenixClient } from "fhenixjs";

export var fheClient: FhenixClient | null = null;

export default defineComponent({
  // this.$config.public is defined in nuxt.config.ts
  computed: {
    chainId() {
      return this.$config.public.NETWORK_CHAIN_ID;
    },
    networkRPC() {
      return this.$config.public.NETWORK_RPC_URL;
    },
    explorerURL() {
      return this.$config.public.NETWORK_EXPLORER_URL;
    }
  },
  data() {
    return {
      isItFhenixNetwork: false,
      mmChainId: -1,
    };
  },
  methods: {
    updateFHEClient(client: FhenixClient | null) {
      fheClient = client
    }

  }
});
# Nuxt 3 + Fhenixjs + Ethers.js + Bootstrap Starter

With this template you can easily start developing your Fhenix front-end app using Nuxt 3 (vue3).  
This template uses composables with the new Composition-API, you can read more about it [here](https://nuxt.com/docs/guide/concepts/auto-imports)  
  
**This template contains:**
- [x] Integration with MetaMask
- [x] Adding Fhenix Network chain information
- [x] Basic interaction with the chain (get balance)
- [x] Basic example of number encryption using Fhenix.js

## Recommended VSCode extensions
**vscode-goto-alias**   
useful when using Nuxt auto-imports:  
https://marketplace.visualstudio.com/items?itemName=antfu.goto-alias

**Volar**  
syntax highlighting for Vue 3, CSS, LESS and SCSS and TypeScript support:  
https://marketplace.visualstudio.com/items?itemName=vue.volar


## Environment Variables

You can override the default values of these variables:
| Variable   |     Default Value      |
|----------|:-------------:|
| NUXT_ENV_NETWORK_CHAIN_ID |  412346 | 
| NUXT_ENV_NETWORK_RPC_URL |    https://test01.fhenix.zone/evm   | 
| NUXT_ENV_NETWORK_EXPLORER_URL | https://your.explorer.url.here | 

## Files

Under the composables folder you can find:  
 - useChain.ts - Contains all the necessary code that handles the connection to the chain.
 - useFHE.ts - Code that handles the FHE related actions such as encryption, unseal, etc.
 - useCommon.ts - Some common variables and functions
 - useThemeToggle.ts - Switch between dark and light mode
     
 # Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

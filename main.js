   import { ethers } from 'ethers';
import { abi as IUniswapV3RouterABI } from '@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const routerAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564'; // Uniswap V3 Router
const tokenIn = '0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2';  // ETH (WETH)
const tokenOut = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'; // USDC (Arbitrum)
const fee = 3000; // 0.3% комиссия пула

const router = new ethers.Contract(routerAddress, IUniswapV3RouterABI, signer);

async function swapTokens(amountIn) {
  const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 минут
  const amountInWei = ethers.utils.parseEther(amountIn.toString());
  
  const params = {
    tokenIn,
    tokenOut,
    fee,
    recipient: await signer.getAddress(),
    deadline,
    amountIn: amountInWei,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  };

  try {
    const tx = await router.exactInputSingle(params, { value: amountInWei });
    await tx.wait();
    console.log('✅ Swap successful');
  } catch (error) {
    console.error('❌ Swap failed:', error);
  }
}
 
async function loadUniswapTokens() {
  const response = await fetch('https://gateway.ipfs.io/ipns/tokens.uniswap.org');
  const data = await response.json();
  const tokens = data.tokens.filter(token => token.chainId === 42161); // Arbitrum only
  console.log(tokens); // или обработай как нужно
}
loadUniswapTokens();
<button id="connect-wallet-button" class="connect-button">Connect Wallet</button>  

document.getElementById('connectWallet').addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      alert(`Connected: ${account}`);
    } catch (error) {
      console.error('User denied account access or error occurred:', error);
      alert('Failed to connect wallet');
    }
  } else {
    alert('Please install MetaMask!');
  }
});

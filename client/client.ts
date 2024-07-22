// Client code written in java script

await performChecks(pg);

console.log("ProgramID: ", pg.PROGRAM_ID.toString());

// Get the latest blockhash info
const blockhashInfo = await pg.connection.getLatestBlockhash();

// Create transaction
const tx = new web3.Transaction({
  ...blockhashInfo,
});

// Add our Hello World instruction

tx.add(
  new web3.TransactionInstruction({
    programId: pg.PROGRAM_ID,
    keys: [],
    data: Buffer.from([]),
  })
);

// Sign transaction
tx.sign(pg.wallet.keypair);

// Send the transaction to solana network
const txHash = await pg.connection.sendRawTransaction(tx.serialize());
console.log("Transaction sent with hash:", txHash);

var result = await pg.connection.confirmTransaction({
  blockhash: blockhashInfo.blockhash,
  lastValidBlockHeight: blockhashInfo.lastValidBlockHeight,
  signature: txHash,
});

console.log(
  `Congratulations! Look at your transaction in the Solana Explorer: 
  https://explorer.solana.com/tx/${txHash}?cluster=devnet`
);

// The following are just some checks to make sure your playground is setup correctly and you got enough devnet sol

async function performChecks(pg: any) {
  const MINIMUM_BALANCE_REQUIRED = 1e9; // for example, 1 SOL

  if (!pg.wallet || !pg.wallet.keypair) {
    throw new Error(
      "You first need to connect your playground wallet at the bottom left"
    );
  }

  // Get the balance of the wallet and check if we have enough
  const walletBalance = await pg.connection.getBalance(
    pg.wallet.keypair.publicKey
  );

  if (walletBalance < MINIMUM_BALANCE_REQUIRED) {
    console.log(
      `Your sol balance is low. To get some devnet SOL you can use this link:
      https://faucet.solana.com/?walletAddress=${pg.wallet.keypair.publicKey.toString()}&amount=1`
    );
  }

  if (!pg.PROGRAM_ID) {
    throw new Error("You first need to ‘build‘ and ‘deploy‘ your program");
  }
}

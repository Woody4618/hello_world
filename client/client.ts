// Client code...

console.log("programID: ", pg.PROGRAM_ID.toString());

//Get the latest blockhash info
const blockhashInfo = await pg.connection.getLatestBlockhash();

//create transaction
const tx = new web3.Transaction({
  ...blockhashInfo,
});

//Add hello world program

tx.add(
  new web3.TransactionInstruction({
    programId: pg.PROGRAM_ID,
    keys: [],
    data: Buffer.from([]),
  })
);

// sign transaction
tx.sign(pg.wallet.keypair);

//send the transaction to solana network
const txHash = await pg.connection.sendRawTransaction(tx.serialize());
console.log("transaction sent with hash:", txHash);

var result = await pg.connection.confirmTransaction(txHash);
console.log("confrim:", txHash);

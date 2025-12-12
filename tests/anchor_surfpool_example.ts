import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorSurfpoolExample } from "../target/types/anchor_surfpool_example";

// =========// Helper function to airdrop SOL to a given address
async function airdrop(connection: any, address: any, amount = 10000000000) {
  await connection.confirmTransaction(await connection.requestAirdrop(address, amount), "confirmed");
}

describe("anchor_surfpool_example", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.anchorSurfpoolExample as Program<AnchorSurfpoolExample>;

  it("Initializes PDA and sets value", async () => {
    // Generate a random keypair for the test user
    const user = anchor.web3.Keypair.generate();
    await airdrop(program.provider.connection, user.publicKey);
    
    const [pda, bump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("pda"), user.publicKey.toBuffer()],
      program.programId
    );

    let tx = await program.methods.initialize()
      .accounts({
        pdaAccount: pda,
        user: user.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([user]) // Ensure the user signs the transaction if needed
      .rpc();
    console.log("Transaction signature", tx);

    const account = await program.account.pdaAccount.fetch(pda);
    console.log("PDA value:", account.value.toString());
    if (!account.value.eq(new anchor.BN(123))) throw new Error("PDA value not set correctly");
  });
});

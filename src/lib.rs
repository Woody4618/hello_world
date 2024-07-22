// Solana on chain program code, written in Rust

use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

// This is your programs entry point. All transactions interacting with your program will end up here.
entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
) -> ProgramResult {
    msg!("Hello, World!");

    msg!(
        "You called your program with id {} with {} additional accounts and with instruction data: {:?}",
        program_id.to_string(),
        accounts.len(),
        instruction_data
    );

    Ok(())
}
